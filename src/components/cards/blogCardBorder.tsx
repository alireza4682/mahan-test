type BlogCardBorderProps = {
  clipPathId: string;
};

export function BlogCardBorder({ clipPathId }: BlogCardBorderProps) {
  return (
    <>
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path
              d="M 16 0 H 286 Q 302 0 302 16 V 312 Q 302 328 286 328 H 76 Q 64 328 64 316 V 276 Q 64 264 52 264 H 16 Q 0 264 0 248 V 16 Q 0 0 16 0 Z"
              transform="scale(0.0033112583 0.0030487805)"
            />
          </clipPath>
        </defs>
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 160 252"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 size-full bg-transparent md:hidden"
      >
        <path
          d="M 12 0 H 148 Q 160 0 160 12 V 240 Q 160 252 148 252 H 64 Q 52 252 52 240 V 212 Q 52 200 40 200 H 12 Q 0 200 0 188 V 12 Q 0 0 12 0 Z M 12 1 Q 1 1 1 12 V 188 Q 1 199 12 199 H 40 Q 53 199 53 212 V 240 Q 53 251 64 251 H 148 Q 159 251 159 240 V 12 Q 159 1 148 1 Z"
          fill="var(--natural-gray)"
          fillRule="evenodd"
        />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 302 328"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 hidden size-full bg-transparent md:block"
      >
        <path
          d="M 16 0 H 286 Q 302 0 302 16 V 312 Q 302 328 286 328 H 76 Q 64 328 64 316 V 276 Q 64 264 52 264 H 16 Q 0 264 0 248 V 16 Q 0 0 16 0 Z M 16 1 Q 1 1 1 16 V 248 Q 1 263 16 263 H 52 Q 65 263 65 276 V 316 Q 65 327 76 327 H 286 Q 301 327 301 312 V 16 Q 301 1 286 1 Z"
          fill="var(--natural-gray)"
          fillRule="evenodd"
        />
      </svg>
    </>
  );
}
