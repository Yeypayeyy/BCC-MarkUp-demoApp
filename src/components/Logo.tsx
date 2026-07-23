export function Logo({ size = 28, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="4" y="8" width="7" height="28" rx="3.5" transform="rotate(-18 7.5 22)" fill="#102F73" />
        <rect x="14" y="8" width="7" height="28" rx="3.5" transform="rotate(-18 17.5 22)" fill="#3157D5" />
        <rect x="24" y="8" width="7" height="28" rx="3.5" transform="rotate(-18 27.5 22)" fill="#C500C7" />
        <circle cx="33" cy="9" r="5" fill="#FFDB3D" />
      </svg>
      {withText && (
        <span className="text-lg font-extrabold tracking-tight text-navy">MARK-UP</span>
      )}
    </div>
  );
}
