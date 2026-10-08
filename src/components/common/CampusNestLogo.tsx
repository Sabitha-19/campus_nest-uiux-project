import React from 'react';

interface CampusNestLogoProps {
  variant?: 'horizontal' | 'stacked' | 'iconOnly';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const CampusNestMark: React.FC<{ sizePx?: number; theme?: 'light' | 'dark'; className?: string }> = ({
  sizePx = 48,
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const brownColor = isDark ? '#F7F1E8' : '#2D2421';
  const terracottaColor = '#B85C52';

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="CampusNest Logo Mark"
    >
      {/* Outer Stylized Location Pin Loop */}
      <path
        d="M60 112 C52 100, 20 68, 20 44 C20 21.9 37.9 4 60 4 C82.1 4, 100 21.9, 100 44 C100 68, 68 100, 60 112 Z"
        stroke={brownColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Intertwining Organic Base Loop */}
      <path
        d="M26 54 C34 74, 52 82, 70 82 C88 82, 98 70, 96 52 C94 40, 84 32, 60 32"
        stroke={brownColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* House Chimney */}
      <rect
        x="72"
        y="25"
        width="8"
        height="14"
        fill={terracottaColor}
        rx="1"
      />

      {/* House Main Roof Outer Ridge */}
      <path
        d="M38 48 L60 28 L82 48"
        stroke={brownColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Terracotta Accent Roof Beam */}
      <path
        d="M44 46 L60 33 L76 46"
        stroke={terracottaColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* House Body / Walls */}
      <path
        d="M44 48 L44 68 L76 68 L76 48"
        stroke={brownColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terracotta Centered House Door */}
      <rect
        x="54"
        y="50"
        width="12"
        height="18"
        fill={terracottaColor}
        rx="2"
      />

      {/* Intertwined subtle curve under the door */}
      <path
        d="M40 70 C48 76, 72 76, 80 70"
        stroke={terracottaColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const CampusNestLogo: React.FC<CampusNestLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showTagline = true
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-[#F7F1E8]' : 'text-[#2D2421]';
  const taglineColor = isDark ? 'text-[#D99A8F]' : 'text-[#756762]';

  const markSizes = {
    sm: 36,
    md: 44,
    lg: 56,
    xl: 72
  };

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base'
  };

  if (variant === 'iconOnly') {
    return <CampusNestMark sizePx={markSizes[size]} theme={theme} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <CampusNestMark sizePx={markSizes[size]} theme={theme} />
        <div className="mt-2.5">
          <span className={`font-sans font-bold tracking-tight block ${titleSizes[size]} ${textColor}`}>
            Campus<span className="font-medium">Nest</span>
          </span>
          {showTagline && (
            <p className={`font-sans font-normal tracking-normal mt-0.5 ${taglineSizes[size]} ${taglineColor}`}>
              Find a place that feels like home.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <CampusNestMark sizePx={markSizes[size]} theme={theme} />
      <div className="flex flex-col">
        <span className={`font-sans font-bold tracking-tight leading-none ${titleSizes[size]} ${textColor}`}>
          Campus<span className="font-medium">Nest</span>
        </span>
        {showTagline && (
          <span className={`font-sans font-normal tracking-tight mt-1 leading-none ${taglineSizes[size]} ${taglineColor}`}>
            Find a place that feels like home.
          </span>
        )}
      </div>
    </div>
  );
};
