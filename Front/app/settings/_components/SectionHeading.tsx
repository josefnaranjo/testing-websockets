import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl text-emerald-800 font-medium capitalize mt-3 select-none">
      {children}
    </h2>
  );
}
