"use client";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className = "" }: HeaderProps) {
  // Check if className contains mb-0 and replace all mb classes
  const hasMb0 = className.includes('mb-0');
  const baseClasses = hasMb0 
    ? "text-xs sm:text-sm font-medium  uppercase tracking-[0.15em] mb-0"
    : "text-xs sm:text-sm font-medium text-[#595959] uppercase tracking-[0.15em] mb-4 sm:mb-6";

  return (
    <h2 className={`${baseClasses} ${className}`}>
      {children}
    </h2>
  );
}
