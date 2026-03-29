import { CSSProperties, ReactNode } from "react";

type ArabicTextProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ArabicText({ children, className = "", style }: ArabicTextProps) {
  return (
    <span lang="ar" dir="rtl" className={`font-arabic text-[1.1rem] leading-loose ${className}`.trim()} style={style}>
      {children}
    </span>
  );
}
