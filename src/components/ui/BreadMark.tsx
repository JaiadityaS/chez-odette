// A simple line-art loaf, used as a warm placeholder / accent mark.
export default function BreadMark({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 28c0-6 4-11 16-11s16 5 16 11a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4Z" />
      <path d="M18 18c1-2 2.5-3 6-3s5 1 6 3" />
      <path d="M20 24l-2 4M27 24l-2 4M34 24l-2 4" opacity="0.7" />
    </svg>
  );
}
