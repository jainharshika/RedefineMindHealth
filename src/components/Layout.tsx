import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../content/SiteContentProvider";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

function BookButton({ url, className = "" }: { url: string; className?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-container text-on-surface font-label-sm text-label-sm hover:scale-95 transition-transform ${className}`}
    >
      Book a Session
    </a>
  );
}

export default function Layout() {
  const { content } = useSiteContent();
  const [open, setOpen] = useState(false);

  const linkBase =
    "font-body-md font-semibold transition-colors duration-300 hover:text-primary";

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 max-w-container-max">
        <div className="flex justify-between items-center px-gutter py-4 bg-background/80 backdrop-blur-md rounded-2xl mx-4 mt-3 shadow-sm border border-outline-variant/40">
          <Link
            to="/"
            className="font-headline-md text-base md:text-lg lg:text-2xl text-on-background tracking-tight shrink-0"
          >
            RedefineMindHealth
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary pb-1"
                    : `${linkBase} text-on-surface-variant`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <BookButton url={content.contact.bookingUrl} />
          </div>

          <button
            className="md:hidden text-on-background p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mx-gutter rounded-2xl bg-surface-container-low shadow-lg border border-outline-variant p-6 flex flex-col gap-4"
            >
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? "text-primary" : "text-on-surface-variant"}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <BookButton url={content.contact.bookingUrl} className="mt-2" />
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-section-padding-sm px-gutter bg-surface-container border-t border-outline-variant rounded-t-3xl">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="font-headline-md text-headline-md text-on-surface mb-2">
              RedefineMindHealth
            </div>
            <div className="font-body-md text-body-md text-secondary">
              © {new Date().getFullYear()} {content.profile.displayName}. All rights reserved.
            </div>
          </div>
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link className="text-on-surface-variant font-body-md font-semibold hover:text-primary transition-colors" to="/contact">
              Contact
            </Link>
            <a className="text-on-surface-variant font-body-md font-semibold hover:text-primary transition-colors" href={content.contact.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a className="text-on-surface-variant font-body-md font-semibold hover:text-primary transition-colors" href={content.contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
