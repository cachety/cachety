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

export const FlagJP = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <rect width="3" height="2" fill="#ffffff" />
    <circle cx="1.5" cy="1" r="0.6" fill="#bc002d" />
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

export const ChevronIcon = ({
  className,
  direction,
}: IconProps & { direction: "left" | "right" }) => (
  <Stroke className={className}>
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </Stroke>
);
