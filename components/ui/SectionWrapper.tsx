interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function SectionWrapper({ children, className = '', id, dark }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full py-20 md:py-28 ${
        dark ? 'bg-brand-green-dark text-white' : 'bg-white'
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
