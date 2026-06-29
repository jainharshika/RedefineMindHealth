import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "../../../content/SiteContentProvider";
import { useSave } from "../useSave";
import SaveBar from "../SaveBar";
import type { ServiceEntry } from "../../../content/types";

function newService(): ServiceEntry {
  return { id: `svc-${Date.now()}`, icon: "favorite", title: "", blurb: "", details: "" };
}

export default function AdminServices() {
  const { content, loading } = useSiteContent();
  const { save, status, errorMsg } = useSave();
  const [entries, setEntries] = useState<ServiceEntry[]>(() => content.services);
  const [editing, setEditing] = useState<ServiceEntry | null>(null);
  const [isNew, setIsNew] = useState(false);

  if (loading) return <div className="py-20 text-center font-body-md text-on-surface-variant">Loading…</div>;

  function openNew() { setIsNew(true); setEditing(newService()); }
  function openEdit(s: ServiceEntry) { setIsNew(false); setEditing({ ...s }); }
  function cancelEdit() { setEditing(null); }

  function commitEdit() {
    if (!editing) return;
    if (isNew) {
      setEntries((prev) => [...prev, editing]);
    } else {
      setEntries((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    }
    setEditing(null);
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((s) => s.id !== id));
  }

  function handleSave() {
    save({ ...content, services: entries });
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow";

  return (
    <section className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
        <h2 className="font-headline-md text-[24px] text-on-background">Services</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 text-primary font-label-sm text-label-sm hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span> Add Service
        </button>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4 bg-surface-container-low border-b border-outline-variant">
              <h3 className="font-label-sm text-label-sm text-on-background">
                {isNew ? "New Service" : "Edit Service"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-background mb-1">Title</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={editing.title}
                    onChange={(e) => setEditing((p) => p && ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Individual Counselling"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-background mb-1">
                    Icon{" "}
                    <a
                      href="https://fonts.google.com/icons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline font-normal"
                    >
                      (Material Symbols name)
                    </a>
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={editing.icon}
                    onChange={(e) => setEditing((p) => p && ({ ...p, icon: e.target.value }))}
                    placeholder="e.g. person, favorite, groups"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-background mb-1">Short Blurb (cards / home page)</label>
                <textarea
                  rows={2}
                  className={`${inputClass} resize-y`}
                  value={editing.blurb}
                  onChange={(e) => setEditing((p) => p && ({ ...p, blurb: e.target.value }))}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-background mb-1">Full Details (Services page)</label>
                <textarea
                  rows={4}
                  className={`${inputClass} resize-y`}
                  value={editing.details ?? ""}
                  onChange={(e) => setEditing((p) => p && ({ ...p, details: e.target.value }))}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={commitEdit}
                  className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  {isNew ? "Add" : "Update"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-on-surface-variant font-label-sm text-label-sm px-5 py-2 rounded-full hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="divide-y divide-outline-variant">
        {entries.length === 0 && (
          <li className="p-6 text-center font-body-md text-body-md text-on-surface-variant">
            No services yet — add one above.
          </li>
        )}
        {entries.map((s) => (
          <li key={s.id} className="p-6 hover:bg-surface-container-lowest transition-colors flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">{s.icon}</span>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm text-on-background text-base">{s.title || <span className="italic text-on-surface-variant">Untitled</span>}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-1">{s.blurb}</p>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => openEdit(s)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
              <button onClick={() => deleteEntry(s.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <SaveBar status={status} errorMsg={errorMsg} onSave={handleSave} label="Save Services" />
    </section>
  );
}
