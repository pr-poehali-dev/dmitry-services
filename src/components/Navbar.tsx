import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Документы", href: "#documents" },
  { label: "Контакты", href: "#contacts" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-lg font-semibold tracking-widest text-amber-400 uppercase">МАХ</span>
        <ul className="hidden md:flex gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/60 hover:text-amber-400 transition-colors uppercase tracking-wider"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="tel:89935039859"
          className="hidden md:flex items-center gap-2 bg-amber-400 text-black font-semibold px-4 py-2 text-sm uppercase tracking-widest hover:bg-amber-300 transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <Icon name="Phone" size={14} />
          Позвонить
        </a>
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-white/70 hover:text-amber-400 uppercase tracking-wider transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:89935039859"
            className="mt-2 flex items-center gap-2 bg-amber-400 text-black font-semibold px-4 py-2.5 text-sm uppercase tracking-widest w-fit"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <Icon name="Phone" size={14} />
            8 (993) 503-98-59
          </a>
        </div>
      )}
    </nav>
  );
}
