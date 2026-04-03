interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  condensedBottom?: boolean;
  condensedTop?: boolean;
}

export function SectionWrapper({ children, className = '', id, dark, condensedBottom, condensedTop }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full ${condensedTop ? 'pt-12 md:pt-16' : 'pt-20 md:pt-28'} ${condensedBottom ? 'pb-8 md:pb-10' : 'pb-20 md:pb-28'} ${
        dark ? 'bg-brand-green-dark text-white' : 'bg-white'
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
