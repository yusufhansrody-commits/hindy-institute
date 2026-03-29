import Link from 'next/link';
import type { CSSProperties } from 'react';

/**
 * Brand lockup: Arabic letter Hāʾ (ه) in the gold square — site icon/mark —
 * plus “Hindy Institute” wordmark. Use this everywhere the logo appears.
 */
type SiteLogoProps = {
  href?: string | null;
  className?: string;
  style?: CSSProperties;
};

export function SiteLogo({ href = '/', className = 'nav-logo', style }: SiteLogoProps) {
  const mark = (
    <span className="nav-logo-mark arabic" aria-hidden="true">
      ه
    </span>
  );
  const wordmark = (
    <span className="nav-logo-text">
      Hindy <span>Institute</span>
    </span>
  );

  const content = (
    <>
      {mark}
      {wordmark}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}
