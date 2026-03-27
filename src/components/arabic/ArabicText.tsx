import { ReactNode } from "react";

type ArabicTextProps = {
  children: ReactNode;
  className?: string;
};

export function ArabicText({ children, className = "" }: ArabicTextProps) {
  return (
    <span lang="ar" dir="rtl" className={`font-arabic text-[1.1rem] leading-loose ${className}`.trim()}>
      {children}
    </span>
  );
}
