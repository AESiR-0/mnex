"use client";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className = "" }: HeaderProps) {
  return (
    <h2 className={`text-xs sm:text-sm font-semibold text-[#595959] uppercase tracking-wider mb-4 sm:mb-6 ${className}`}>
      {children}
    </h2>
  );
}
