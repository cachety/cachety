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

export const FlagGB = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <rect width="60" height="40" fill="#012169" />
    <path d="M0 0L60 40M60 0L0 40" stroke="#ffffff" strokeWidth="8" />
    <path d="M0 0L60 40M60 0L0 40" stroke="#c8102e" strokeWidth="3.5" />
    <path d="M30 0V40M0 20H60" stroke="#ffffff" strokeWidth="12" />
    <path d="M30 0V40M0 20H60" stroke="#c8102e" strokeWidth="7" />
  </svg>
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

export const CloseIcon = ({ className }: IconProps) => (
  <Stroke className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </Stroke>
);

export const ChevronIcon = ({
  className,
  direction,
}: IconProps & { direction: "left" | "right" }) => (
  <Stroke className={className}>
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </Stroke>
);
