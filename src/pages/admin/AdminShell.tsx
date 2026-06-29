import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminBio from "./sections/AdminBio";
import AdminExperience from "./sections/AdminExperience";
import AdminServices from "./sections/AdminServices";
import AdminFaq from "./sections/AdminFaq";
import AdminContact from "./sections/AdminContact";
import AdminAffiliations from "./sections/AdminAffiliations";

type Section = "bio" | "experience" | "services" | "faq" | "contact" | "affiliations";

const NAV: { id: Section; icon: string; label: string }[] = [
  { id: "bio", icon: "person", label: "Bio & Profile" },
  { id: "experience", icon: "work", label: "Experience" },
  { id: "services", icon: "article", label: "Services" },
  { id: "faq", icon: "help", label: "FAQ" },
  { id: "affiliations", icon: "school", label: "Affiliations" },
  { id: "contact", icon: "contact_mail", label: "Contact & Links" },
];

interface Props {
  onLogout: () => void;
}

export default function AdminShell({ onLogout }: Props) {
  const [active, setActive] = useState<Section>("bio");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = NAV.find((n) => n.id === active)?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container border-r border-outline-variant fixed h-full z-40">
        <div className="p-gutter border-b border-outline-variant flex items-center justify-between">
          <span className="font-headline-md text-headline-md tracking-tight text-on-background">
            RMH Admin
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-DEFAULT font-body-md text-body-md transition-colors ${
                active === n.id
                  ? "bg-secondary-container text-on-secondary-container font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-outline-variant">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-DEFAULT text-error hover:bg-error-container hover:text-on-error-container transition-colors font-body-md text-body-md"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 h-full w-64 bg-surface-container z-50 flex flex-col md:hidden"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
            >
              <div className="p-gutter border-b border-outline-variant">
                <span className="font-headline-md text-headline-md">RMH Admin</span>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => { setActive(n.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-DEFAULT font-body-md text-body-md transition-colors ${
                      active === n.id
                        ? "bg-secondary-container text-on-secondary-container font-semibold"
                        : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined">{n.icon}</span>
                    {n.label}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-outline-variant">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-DEFAULT text-error hover:bg-error-container transition-colors font-body-md text-body-md"
                >
                  <span className="material-symbols-outlined">logout</span>
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-surface-container border-b border-outline-variant sticky top-0 z-30 flex items-center justify-between px-gutter py-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-on-surface-variant"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline-md text-headline-md text-[24px]">{title}</h1>
          </div>
          <span className="font-body-md text-body-md text-on-surface-variant hidden sm:block">
            Harshika Jain
          </span>
        </header>

        <div className="flex-1 p-gutter md:p-8 max-w-[900px] mx-auto w-full space-y-8">
          {active === "bio" && <AdminBio />}
          {active === "experience" && <AdminExperience />}
          {active === "services" && <AdminServices />}
          {active === "faq" && <AdminFaq />}
          {active === "affiliations" && <AdminAffiliations />}
          {active === "contact" && <AdminContact />}
        </div>
      </main>
    </div>
  );
}
