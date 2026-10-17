type IconProps = { className?: string };

function Stroke({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const Flag = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <rect width="1" height="2" fill="#223f92" />
    <rect width="1" height="2" x="1" fill="#ffffff" />
    <rect width="1" height="2" x="2" fill="#c4262e" />
  </svg>
);

export const ChevronDownIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M6 9l6 6 6-6" />
  </Stroke>
);

export const CheckIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M5 12l5 5L20 6" />
  </Stroke>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </Stroke>
);

export const UploadIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6" />
  </Stroke>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </Stroke>
);

export const LockIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Stroke>
);

export const EyeIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </Stroke>
);

export const EyeOffIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 5.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="M2 2l20 20" />
  </Stroke>
);

export const ShareIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </Stroke>
);

export const LinkIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </Stroke>
);

export const CloseIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Stroke>
);

/**
 * « left » et « right » suivent le sens de lecture : en arabe ou en persan
 * (dir="rtl"), la flèche est retournée (« suivant » pointe vers la gauche).
 */
export const ChevronIcon = ({
  className,
  direction,
}: IconProps & { direction: "left" | "right" }) => (
  <Stroke className={`rtl:-scale-x-100 ${className ?? ""}`}>
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </Stroke>
);

/** Poignée de glisser-déposer : deux colonnes de trois points. */
export const GripIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    {[6, 12, 18].map((y) =>
      [9, 15].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} />)
    )}
  </svg>
);

/** Logo Cachety : la feuille filigranée de l'icône d'application, en vectoriel. */
export const Logo = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="11" fill="#1a1e33" />
    <defs>
      <clipPath id="logo-sheet">
        <path d="M12 8h17l7 7v25a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
      </clipPath>
    </defs>
    <path d="M12 8h17l7 7v25a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#f2f3f0" />
    <g clipPath="url(#logo-sheet)" stroke="#c4262e" strokeWidth="2.4" strokeLinecap="round">
      <path d="M8 22L26 8" />
      <path d="M8 30L36 10" opacity="0.85" />
      <path d="M8 38L38 16" opacity="0.7" />
      <path d="M14 42L38 24" opacity="0.55" />
      <path d="M24 42L38 32" opacity="0.4" />
    </g>
    <path d="M29 8v5a2 2 0 0 0 2 2h5z" fill="#c9cbc4" />
  </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const WifiOffIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M2 2l20 20" />
    <path d="M8.5 16.5a5 5 0 0 1 7 0" />
    <path d="M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8" />
    <path d="M5 12.6a10 10 0 0 1 5.2-2.7M16.8 11.2A10 10 0 0 1 19 12.6" />
    <path d="M12 20h.01" />
  </Stroke>
);

export const CpuIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="5" y="4" width="14" height="10" rx="1.5" />
    <path d="M3 18h18M9 18v-4M15 18v-4" />
  </Stroke>
);

export const UserOffIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7 1.4 0 2.7.3 3.8.8" />
    <path d="M17 17l4 4M21 17l-4 4" />
  </Stroke>
);

export const CodeIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
  </Stroke>
);

export const HeartIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </Stroke>
);

export const GlobeIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </Stroke>
);

export const QuestionIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 2.2-2.4 3.8" />
    <path d="M12 17h.01" />
  </Stroke>
);

export const PencilIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 20h4L19 9l-4-4L4 16z" />
  </Stroke>
);

export const UndoIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 010 11H11" />
  </Stroke>
);

export const ZoomIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
  </Stroke>
);

export const HideIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <rect x="3" y="9" width="18" height="6" rx="1" fill="currentColor" />
    <path d="M3 5h10M3 19h14" />
  </Stroke>
);

export const SlidersIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
  </Stroke>
);
