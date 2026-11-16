import { Fragment, useState } from 'react';

export type NavSection =
  | 'Labs'
  | 'Studio'
  | 'Openings'
  | 'Shop'
  | 'Get in touch';

interface NavbarProps {
  onSelectSection: (section: NavSection) => void;
  onResetHome: () => void;
}

const NAV_LINKS: Array<Exclude<NavSection, 'Get in touch'>> = [
  'Labs',
  'Studio',
  'Openings',
  'Shop',
];

export function Navbar({ onSelectSection, onResetHome }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (section: NavSection) => {
    setMenuOpen(false);
    onSelectSection(section);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo (left) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            onResetHome();
          }}
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <span className="font-heading text-[21px] sm:text-[26px] tracking-tight text-black whitespace-nowrap">
            Mainframe®
          </span>
          <span
            aria-hidden="true"
            className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] leading-none"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop nav links (center) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center text-[23px] text-black"
        >
          {NAV_LINKS.map((label, index) => (
            <Fragment key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(label);
                }}
                className="hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {label}
              </a>
              {index < NAV_LINKS.length - 1 && (
                <span aria-hidden="true">, </span>
              )}
            </Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('Get in touch');
          }}
          className="hidden md:inline-block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity whitespace-nowrap"
        >
          Get in touch
        </a>

        {/* Mobile hamburger (below md) */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden relative z-20 flex flex-col justify-center items-center gap-[5px] w-11 h-11 -mr-2 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              handleNavigate(label);
            }}
            className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          tabIndex={menuOpen ? 0 : -1}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('Get in touch');
          }}
          className="text-[32px] font-medium text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
