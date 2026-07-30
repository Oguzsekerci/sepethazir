type AdSlotProps = {
  body?: string;
  cta?: string;
  className?: string;
  href?: string;
  label?: string;
  title?: string;
};

// This component intentionally renders only a first-party promotion. Google-served
// advertising stays off the site while the editorial library is being developed.
export default function AdSlot({
  body = "Sepete yakışacak fırsatları Amazon'da incele.",
  cta = "İncele",
  className = "",
  href,
  label = "Reklam",
  title = "SepetHazır seçkisi",
}: AdSlotProps) {
  return (
    <aside className={`ad-card ${className}`.trim()} aria-label={label}>
      <span>{label}</span>
      {href ? (
        <a className="house-ad" href={href} rel="noreferrer" target="_blank">
          <strong>{title}</strong>
          <small>{body}</small>
          <b>{cta}</b>
        </a>
      ) : (
        <div className="house-ad">
          <strong>{title}</strong>
          <small>{body}</small>
        </div>
      )}
    </aside>
  );
}
