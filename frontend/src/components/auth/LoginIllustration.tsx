export function LoginIllustration() {
  return (
    <svg
      viewBox="0 0 420 300"
      className="w-full max-w-md"
      role="img"
      aria-label="Books and support"
    >
      <ellipse cx="200" cy="270" rx="170" ry="14" className="fill-brand-800" />

      <rect x="60" y="226" width="200" height="34" rx="4" className="fill-brand-500" />
      <rect x="60" y="226" width="12" height="34" className="fill-brand-700" />
      <rect x="80" y="240" width="150" height="4" rx="2" className="fill-brand-100" />
      <rect x="74" y="192" width="176" height="34" rx="4" className="fill-amber-400" />
      <rect x="74" y="192" width="12" height="34" className="fill-amber-600" />
      <rect x="94" y="206" width="130" height="4" rx="2" className="fill-amber-100" />

      <rect x="90" y="96" width="30" height="96" rx="3" className="fill-brand-50" />
      <rect x="96" y="112" width="18" height="4" rx="2" className="fill-brand-500" />
      <rect x="124" y="80" width="36" height="112" rx="3" className="fill-brand-500" />
      <rect x="131" y="98" width="22" height="4" rx="2" className="fill-brand-50" />
      <rect x="131" y="108" width="22" height="4" rx="2" className="fill-brand-50" />
      <rect x="164" y="104" width="26" height="88" rx="3" className="fill-sky-400" />
      <rect x="169" y="120" width="16" height="4" rx="2" className="fill-sky-100" />
      <rect
        x="196"
        y="92"
        width="32"
        height="100"
        rx="3"
        transform="rotate(12 212 192)"
        className="fill-rose-400"
      />

      <path d="M58 226c-10-30 4-60 30-70-4 28-12 50-30 70z" className="fill-brand-500" />
      <path d="M58 226c6-24 16-44 30-70" className="stroke-brand-800" strokeWidth="2" fill="none" />

      <g>
        <rect x="262" y="40" width="140" height="78" rx="14" className="fill-white" />
        <path d="M284 118l-6 18 22-18z" className="fill-white" />
        <circle cx="286" cy="66" r="10" className="fill-brand-500" />
        <rect x="304" y="60" width="78" height="6" rx="3" className="fill-slate-300" />
        <rect x="304" y="72" width="54" height="6" rx="3" className="fill-slate-200" />
        <rect x="278" y="92" width="104" height="6" rx="3" className="fill-slate-200" />
      </g>

      <g>
        <rect x="300" y="150" width="96" height="46" rx="12" className="fill-brand-500" />
        <path d="M376 196l6 14-20-14z" className="fill-brand-500" />
        <path
          d="M322 173l8 8 16-16"
          className="stroke-white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="354" y="170" width="28" height="6" rx="3" className="fill-brand-100" />
      </g>

      <g>
        <circle cx="312" cy="244" r="26" className="fill-amber-400" />
        <circle cx="312" cy="244" r="19" className="fill-none stroke-amber-600" strokeWidth="2" />
        <text x="312" y="252" textAnchor="middle" className="fill-amber-700 text-[22px] font-bold">
          ₹
        </text>
      </g>

      <circle cx="40" cy="70" r="4" className="fill-brand-500" />
      <circle cx="240" cy="30" r="3" className="fill-amber-400" />
      <circle cx="400" cy="250" r="3" className="fill-brand-500" />
    </svg>
  );
}
