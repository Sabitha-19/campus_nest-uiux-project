import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  MapPin,
  GraduationCap,
  BookOpen,
  Utensils,
  Bus,
  Train,
  Cross,
  ShoppingBag,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Footprints,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Landmark } from '../../types';

interface CampusWalkMapProps {
  propertyTitle: string;
  originCoord: [number, number];
  landmarks: Landmark[];
  compact?: boolean;
  className?: string;
  onExploreClick?: () => void;
}

export const CampusWalkMap: React.FC<CampusWalkMapProps> = ({
  propertyTitle,
  originCoord,
  landmarks,
  compact = false,
  className = '',
  onExploreClick
}) => {
  const shouldReduceMotion = useReducedMotion();
  const sortedLandmarks = useMemo(() => {
    const list = compact ? landmarks.slice(0, 2) : landmarks;
    return [...list].sort((a, b) => a.distanceMeters - b.distanceMeters);
  }, [landmarks, compact]);

  const [selectedId, setSelectedId] = useState<string>(sortedLandmarks[0]?.id || '');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'walking' | 'all'>('walking');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [progress, setProgress] = useState<number>(0);
  const [countUpDistance, setCountUpDistance] = useState<number>(0);

  const selectedLandmark = useMemo(
    () => sortedLandmarks.find((l) => l.id === selectedId) || sortedLandmarks[0],
    [sortedLandmarks, selectedId]
  );

  // SVG viewBox definition
  const viewBoxWidth = 800;
  const viewBoxHeight = compact ? 450 : 500;

  // Path helper: convert [x, y][] points into SVG "d" string
  const getSvgPath = (points: [number, number][]) => {
    if (!points || points.length === 0) return '';
    return points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt[0]} ${pt[1]}` : `${acc} L ${pt[0]} ${pt[1]}`;
    }, '');
  };

  const activePathD = useMemo(() => {
    if (!selectedLandmark) return '';
    return getSvgPath(selectedLandmark.pathPoints);
  }, [selectedLandmark]);

  // Animate distance count-up and progress when selected landmark changes
  useEffect(() => {
    if (!selectedLandmark) return;
    if (shouldReduceMotion) {
      setProgress(1);
      setCountUpDistance(selectedLandmark.distanceMeters);
      return;
    }

    setProgress(0);
    setCountUpDistance(0);

    const target = selectedLandmark.distanceMeters;
    const startTime = performance.now();
    const duration = 900;

    let animationFrameId: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const easedT = 1 - Math.pow(1 - t, 3);
      setProgress(easedT);
      setCountUpDistance(Math.round(easedT * target));

      if (t < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedLandmark, shouldReduceMotion]);

  // Map Pan/Zoom to fit the route on selection
  useEffect(() => {
    if (compact || !selectedLandmark) return;
    // Calculate bounding box between origin and landmark
    const minX = Math.min(originCoord[0], selectedLandmark.x);
    const maxX = Math.max(originCoord[0], selectedLandmark.x);
    const minY = Math.min(originCoord[1], selectedLandmark.y);
    const maxY = Math.max(originCoord[1], selectedLandmark.y);

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Center offset relative to viewBox center
    const targetOffsetX = (viewBoxWidth / 2 - centerX) * 0.25;
    const targetOffsetY = (viewBoxHeight / 2 - centerY) * 0.25;

    setPanOffset({ x: targetOffsetX, y: targetOffsetY });
  }, [selectedLandmark, originCoord, compact]);

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.6, Math.max(0.85, prev + delta)));
  };

  // Landmark icon renderer
  const renderLandmarkIcon = (type: Landmark['type'], className = 'w-3.5 h-3.5 text-[#2D2421]') => {
    switch (type) {
      case 'campus_gate':
        return <GraduationCap className={className} />;
      case 'library':
        return <BookOpen className={className} />;
      case 'canteen':
        return <Utensils className={className} />;
      case 'bus_stop':
        return <Bus className={className} />;
      case 'metro':
        return <Train className={className} />;
      case 'pharmacy':
        return <Cross className={className} />;
      case 'market':
      default:
        return <ShoppingBag className={className} />;
    }
  };

  return (
    <div
      role="application"
      aria-label={`Interactive walking map from ${propertyTitle} to campus landmarks`}
      className={`rounded-[24px] bg-[#FFFDF9] border border-[#D99A8F] overflow-hidden shadow-[0_12px_32px_rgba(45,36,33,0.08)] ${className}`}
    >
      {/* Live region for accessibility announcements */}
      <div aria-live="polite" className="sr-only">
        {selectedLandmark &&
          `${selectedLandmark.name}, ${selectedLandmark.distanceMeters} metres, ${selectedLandmark.walkingMinutes} minutes walk from accommodation.`}
      </div>

      <div className={`grid grid-cols-1 ${compact ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} items-stretch`}>
        {/* Map View Canvas (Desktop left, Mobile full width) */}
        <div className={`relative ${compact ? 'lg:col-span-1' : 'lg:col-span-8'} bg-[#F7F1E8] overflow-hidden`}>
          {/* Controls Bar on top of map */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            {/* Mode Switcher */}
            <div className="pointer-events-auto flex items-center rounded-full bg-[#FFFDF9]/95 border border-[#D99A8F] p-1 shadow-sm backdrop-blur-xs">
              <button
                type="button"
                onClick={() => setViewMode('walking')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  viewMode === 'walking' ? 'bg-[#B85C52] text-[#FFFDF9]' : 'text-[#756762] hover:text-[#2D2421]'
                }`}
              >
                <Footprints className="w-3.5 h-3.5" />
                <span>Walking Route</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  viewMode === 'all' ? 'bg-[#B85C52] text-[#FFFDF9]' : 'text-[#756762] hover:text-[#2D2421]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Show All</span>
              </button>
            </div>

            {/* Zoom & Reset Controls */}
            {!compact && (
              <div className="pointer-events-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleZoom(0.15)}
                  className="w-10 h-10 rounded-full bg-[#FFFDF9]/95 border border-[#D99A8F] flex items-center justify-center text-[#2D2421] hover:bg-[#FFFDF9] shadow-sm transition-transform active:scale-95"
                  title="Zoom In"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4 text-[#2D2421]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(-0.15)}
                  className="w-10 h-10 rounded-full bg-[#FFFDF9]/95 border border-[#D99A8F] flex items-center justify-center text-[#2D2421] hover:bg-[#FFFDF9] shadow-sm transition-transform active:scale-95"
                  title="Zoom Out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4 text-[#2D2421]" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  className="w-10 h-10 rounded-full bg-[#FFFDF9]/95 border border-[#D99A8F] flex items-center justify-center text-[#2D2421] hover:bg-[#FFFDF9] shadow-sm transition-transform active:scale-95"
                  title="Reset Map View"
                  aria-label="Reset map view"
                >
                  <RotateCcw className="w-4 h-4 text-[#2D2421]" />
                </button>
              </div>
            )}
          </div>

          {/* Floating Distance & Walking Time Card */}
          {selectedLandmark && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedLandmark.id}
              className="absolute bottom-4 left-4 z-20 rounded-[18px] bg-[#FFFDF9]/95 border border-[#B85C52] p-3.5 sm:p-4 shadow-lg backdrop-blur-xs max-w-xs"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-full bg-[#B85C52]/10 border border-[#B85C52] flex items-center justify-center shrink-0">
                  {renderLandmarkIcon(selectedLandmark.type, 'w-3.5 h-3.5 text-[#B85C52]')}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-bold text-[#2D2421] truncate">
                    {selectedLandmark.name}
                  </h4>
                  <p className="text-[10px] text-[#756762]">
                    Walking Route from Property
                  </p>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-[#D99A8F]/40">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-2xl font-bold text-[#2D2421]">
                    {countUpDistance}
                  </span>
                  <span className="text-xs text-[#756762]">metres</span>
                </div>
                <span className="text-xs font-semibold text-[#B85C52]">
                  ~{selectedLandmark.walkingMinutes} min walk
                </span>
              </div>

              {/* Progress bar showing walking travel */}
              <div className="mt-2 w-full h-1.5 rounded-full bg-[#F7F1E8] overflow-hidden border border-[#D99A8F]/40">
                <div
                  className="h-full bg-[#B85C52] transition-all duration-100 ease-out"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </motion.div>
          )}

          {/* Map SVG Canvas strictly in 7-Color Palette */}
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/11]">
            <svg
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              className="w-full h-full select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: 'center center',
                transition: 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {/* Land background (Cream #F7F1E8) */}
              <rect width={viewBoxWidth} height={viewBoxHeight} fill="#F7F1E8" />

              {/* Campus green/park areas (Rose accents #D99A8F at low opacity) */}
              <path
                d="M 20 20 Q 120 40 180 120 T 60 220 Z"
                fill="#D99A8F"
                fillOpacity="0.22"
                stroke="#D99A8F"
                strokeWidth="1"
              />
              <path
                d="M 520 40 Q 680 10 760 100 T 700 240 Z"
                fill="#D99A8F"
                fillOpacity="0.25"
                stroke="#D99A8F"
                strokeWidth="1"
              />
              <path
                d="M 380 300 Q 520 280 620 380 T 400 480 Z"
                fill="#D99A8F"
                fillOpacity="0.18"
                stroke="#D99A8F"
                strokeWidth="1"
              />

              {/* Campus Lakes / Water accent */}
              <ellipse
                cx="120"
                cy="360"
                rx="65"
                ry="35"
                fill="#D99A8F"
                fillOpacity="0.3"
                stroke="#D99A8F"
                strokeWidth="1.5"
              />

              {/* Campus Buildings Outlines (Brown #2D2421 & Off-White fills) */}
              <rect x="580" y="70" width="110" height="70" rx="6" fill="#FFFDF9" stroke="#2D2421" strokeWidth="1.5" />
              <text x="635" y="110" fill="#2D2421" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                ACADEMIC BLOCK
              </text>

              <rect x="80" y="60" width="85" height="55" rx="6" fill="#FFFDF9" stroke="#2D2421" strokeWidth="1.5" />
              <text x="122" y="92" fill="#2D2421" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                CAMPUS HUB
              </text>

              {/* Road Grid (Off-White #FFFDF9 with Brown hairline borders) */}
              {/* Primary East-West Arterial Road */}
              <path
                d="M 0 200 L 800 200"
                fill="none"
                stroke="#FFFDF9"
                strokeWidth="24"
              />
              <path
                d="M 0 188 L 800 188 M 0 212 L 800 212"
                fill="none"
                stroke="#2D2421"
                strokeWidth="1"
                opacity="0.3"
              />
              <path
                d="M 0 200 L 800 200"
                fill="none"
                stroke="#756762"
                strokeWidth="1.5"
                strokeDasharray="12 12"
              />

              {/* Secondary North-South Arterial Road */}
              <path
                d="M 380 0 L 380 500"
                fill="none"
                stroke="#FFFDF9"
                strokeWidth="22"
              />
              <path
                d="M 369 0 L 369 500 M 391 0 L 391 500"
                fill="none"
                stroke="#2D2421"
                strokeWidth="1"
                opacity="0.3"
              />
              <path
                d="M 380 0 L 380 500"
                fill="none"
                stroke="#756762"
                strokeWidth="1.5"
                strokeDasharray="10 10"
              />

              {/* Local Campus Link Lanes */}
              <path
                d="M 120 115 L 120 360 M 240 200 L 240 400 L 380 400 M 520 0 L 520 200 M 520 200 L 680 320 L 800 320"
                fill="none"
                stroke="#FFFDF9"
                strokeWidth="14"
              />
              <path
                d="M 120 115 L 120 360 M 240 200 L 240 400 L 380 400 M 520 0 L 520 200 M 520 200 L 680 320 L 800 320"
                fill="none"
                stroke="#2D2421"
                strokeWidth="1"
                opacity="0.2"
              />

              {/* Mode "Show All": draw dashed rose routes to every landmark */}
              {viewMode === 'all' &&
                sortedLandmarks.map((lm) => {
                  const d = getSvgPath(lm.pathPoints);
                  return (
                    <g key={`all-path-${lm.id}`}>
                      <path
                        d={d}
                        fill="none"
                        stroke="#D99A8F"
                        strokeWidth="3"
                        strokeDasharray="6 6"
                      />
                      {/* Midpoint distance pill */}
                      {lm.pathPoints.length >= 2 && (
                        <g
                          transform={`translate(${
                            (originCoord[0] + lm.x) / 2
                          }, ${(originCoord[1] + lm.y) / 2})`}
                        >
                          <rect
                            x="-24"
                            y="-9"
                            width="48"
                            height="18"
                            rx="9"
                            fill="#FFFDF9"
                            stroke="#D99A8F"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="3"
                            fill="#2D2421"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="sans-serif"
                          >
                            {lm.distanceMeters}m
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

              {/* Hovered route preview in walking mode */}
              {viewMode === 'walking' && hoveredId && hoveredId !== selectedId && (
                (() => {
                  const hoveredLm = sortedLandmarks.find((l) => l.id === hoveredId);
                  if (!hoveredLm) return null;
                  return (
                    <path
                      d={getSvgPath(hoveredLm.pathPoints)}
                      fill="none"
                      stroke="#D99A8F"
                      strokeWidth="3.5"
                      strokeDasharray="6 6"
                      opacity="0.85"
                    />
                  );
                })()
              )}

              {/* Active Walking Route (Terracotta #B85C52 with animated stroke-dashoffset) */}
              {viewMode === 'walking' && selectedLandmark && (
                <g>
                  {/* Subtle halo route underlay */}
                  <path
                    d={activePathD}
                    fill="none"
                    stroke="#D99A8F"
                    strokeWidth="8"
                    opacity="0.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Primary Terracotta Path */}
                  <path
                    d={activePathD}
                    fill="none"
                    stroke="#B85C52"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '600',
                      strokeDashoffset: shouldReduceMotion ? '0' : `${600 * (1 - progress)}`,
                      transition: 'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  />

                  {/* Travelling Walking Dot along path */}
                  {!shouldReduceMotion && progress < 1 && (
                    <circle
                      cx={originCoord[0] + (selectedLandmark.x - originCoord[0]) * progress}
                      cy={originCoord[1] + (selectedLandmark.y - originCoord[1]) * progress}
                      r="6"
                      fill="#B85C52"
                      stroke="#FFFDF9"
                      strokeWidth="2"
                    />
                  )}
                </g>
              )}

              {/* Landmark Pins */}
              {sortedLandmarks.map((landmark) => {
                const isSelected = landmark.id === selectedId;
                const isHovered = landmark.id === hoveredId;

                return (
                  <g
                    key={landmark.id}
                    transform={`translate(${landmark.x}, ${landmark.y})`}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(landmark.id)}
                    onMouseEnter={() => setHoveredId(landmark.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${landmark.name}: ${landmark.distanceMeters} metres, ${landmark.walkingMinutes} minute walk`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(landmark.id);
                      }
                    }}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && !shouldReduceMotion && (
                      <circle
                        cx="0"
                        cy="0"
                        r="22"
                        fill="none"
                        stroke="#B85C52"
                        strokeWidth="1.5"
                        opacity="0.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer circle badge */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 16 : 13}
                      fill={isSelected ? '#B85C52' : isHovered ? '#D99A8F' : '#FFFDF9'}
                      stroke="#2D2421"
                      strokeWidth="2"
                    />

                    {/* Simple inner icon symbol */}
                    <circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill={isSelected ? '#FFFDF9' : '#2D2421'}
                    />

                    {/* Landmark Name Label */}
                    <g transform="translate(0, 24)">
                      <rect
                        x="-48"
                        y="-8"
                        width="96"
                        height="16"
                        rx="4"
                        fill="#FFFDF9"
                        stroke="#2D2421"
                        strokeWidth="0.8"
                        opacity="0.95"
                      />
                      <text
                        x="0"
                        y="3"
                        fill="#2D2421"
                        fontSize="8.5"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        {landmark.name.length > 14 ? `${landmark.name.substring(0, 13)}…` : landmark.name}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Accommodation Origin Pin (Terracotta #B85C52 with Soft Pulsing Ring) */}
              <g transform={`translate(${originCoord[0]}, ${originCoord[1]})`}>
                {!shouldReduceMotion && (
                  <circle
                    cx="0"
                    cy="0"
                    r="26"
                    fill="none"
                    stroke="#B85C52"
                    strokeWidth="2"
                    opacity="0.4"
                    className="animate-ping"
                  />
                )}
                {/* Pin shadow */}
                <ellipse cx="0" cy="18" rx="8" ry="3" fill="#2D2421" opacity="0.25" />
                {/* Teardrop Origin Pin */}
                <path
                  d="M 0 16 C -6 10 -12 2 -12 -6 C -12 -13 -6 -18 0 -18 C 6 -18 12 -13 12 -6 C 12 2 6 10 0 16 Z"
                  fill="#B85C52"
                  stroke="#2D2421"
                  strokeWidth="2"
                />
                <circle cx="0" cy="-6" r="4.5" fill="#FFFDF9" />
                {/* Label */}
                <g transform="translate(0, -26)">
                  <rect
                    x="-45"
                    y="-9"
                    width="90"
                    height="18"
                    rx="9"
                    fill="#2D2421"
                  />
                  <text
                    x="0"
                    y="3"
                    fill="#FFFDF9"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    THIS PROPERTY
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Legend and Note */}
          <div className="p-3 bg-[#FFFDF9] border-t border-[#D99A8F]/40 flex flex-wrap items-center justify-between text-[11px] text-[#756762] gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B85C52]" />
                <span>Accommodation</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFFDF9] border border-[#2D2421]" />
                <span>Campus Landmark</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-[#B85C52]" />
                <span>Walking Path</span>
              </span>
            </div>
            <span className="italic">
              * Distances are approximate walking routes based on 80 m/minute.
            </span>
          </div>
        </div>

        {/* Side List of Landmarks (Desktop Right, Mobile horizontal scroll row) */}
        <div
          className={`${
            compact ? 'lg:col-span-1 border-t' : 'lg:col-span-4 border-t lg:border-t-0 lg:border-l'
          } border-[#D99A8F]/40 bg-[#FFFDF9] p-4 sm:p-6 flex flex-col justify-between`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#D99A8F]/40 mb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-[#2D2421]">
                  Nearby Campus Locations
                </h3>
                <p className="text-xs text-[#756762]">
                  Sorted by shortest walking time
                </p>
              </div>
              <span className="text-xs font-bold text-[#B85C52] bg-[#F7F1E8] px-2.5 py-1 rounded-full border border-[#D99A8F]/50">
                {sortedLandmarks.length} Spots
              </span>
            </div>

            {/* List items (desktop vertical stack, mobile horizontal scroll-snap) */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scroll-smooth snap-x">
              {sortedLandmarks.map((lm) => {
                const isActive = lm.id === selectedId;
                const isHovered = lm.id === hoveredId;

                return (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => setSelectedId(lm.id)}
                    onMouseEnter={() => setHoveredId(lm.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 shrink-0 min-w-[220px] lg:min-w-0 snap-start border ${
                      isActive
                        ? 'bg-[#F7F1E8] border-l-4 border-l-[#B85C52] border-t-[#D99A8F] border-r-[#D99A8F] border-b-[#D99A8F] shadow-xs'
                        : isHovered
                        ? 'bg-[#FFFDF9] border-[#B85C52]'
                        : 'bg-[#FFFDF9] border-[#D99A8F]/40 hover:bg-[#F7F1E8]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          isActive
                            ? 'bg-[#B85C52] text-[#FFFDF9] border-[#B85C52]'
                            : 'bg-[#FFFDF9] text-[#2D2421] border-[#D99A8F]'
                        }`}
                      >
                        {renderLandmarkIcon(lm.type, isActive ? 'w-4 h-4 text-[#FFFDF9]' : 'w-4 h-4 text-[#2D2421]')}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-serif font-bold truncate ${isActive ? 'text-[#B85C52]' : 'text-[#2D2421]'}`}>
                          {lm.name}
                        </p>
                        <p className="text-[11px] text-[#756762]">
                          ~{lm.walkingMinutes} min walk
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#2D2421]">
                        {lm.distanceMeters}m
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact teaser CTA button if requested on Home */}
          {compact && onExploreClick && (
            <div className="pt-4 border-t border-[#D99A8F]/40 mt-4 text-center">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#B85C52] text-[#FFFDF9] text-xs font-semibold hover:bg-[#D99A8F] hover:text-[#2D2421] transition-all shadow-sm"
              >
                <span>Explore Stays Near Your Campus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
