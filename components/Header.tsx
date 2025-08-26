"use client";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className = "" }: HeaderProps) {
  // Check if className contains mb-0 and replace all mb classes
  const hasMb0 = className.includes('mb-0');
  const baseClasses = hasMb0 
    ? "text-xs sm:text-sm font-semibold text-[#595959] uppercase tracking-wider mb-0"
    : "text-xs sm:text-sm font-semibold text-[#595959] uppercase tracking-wider mb-4 sm:mb-6";

  return (
    <h2 className={`${baseClasses} ${className}`}>
      {children}
    </h2>
  );
}
