import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "../../../content/SiteContentProvider";
import { useSave } from "../useSave";
import SaveBar from "../SaveBar";
import type { ExperienceEntry } from "../../../content/types";

function newEntry(): ExperienceEntry {
  return { id: `exp-${Date.now()}`, role: "", org: "", period: "", description: "" };
}

export default function AdminExperience() {
  const { content, loading } = useSiteContent();
  const { save, status, errorMsg } = useSave();

  const [entries, setEntries] = useState<ExperienceEntry[]>(() => content.experience);
  const [editing, setEditing] = useState<ExperienceEntry | null>(null);
  const [isNew, setIsNew] = useState(false);

  if (loading) return <div className="py-20 text-center font-body-md text-on-surface-variant">Loading…</div>;

  function openNew() { setIsNew(true); setEditing(newEntry()); }
  function openEdit(e: ExperienceEntry) { setIsNew(false); setEditing({ ...e }); }
  function cancelEdit() { setEditing(null); }

  function commitEdit() {
    if (!editing) return;
    if (isNew) {
      setEntries((prev) => [editing, ...prev]);
    } else {
      setEntries((prev) => prev.map((e) => (e.id === editing.id ? editing : e)));
    }
    setEditing(null);
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function handleSave() {
    save({ ...content, experience: entries });
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow";

  return (
    <section className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
        <h2 className="font-headline-md text-[24px] text-on-background">Experience &amp; Timeline</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 text-primary font-label-sm text-label-sm hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span> Add Entry
        </button>
      </div>

      {/* Inline editor */}
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
                {isNew ? "New Entry" : "Edit Entry"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-background mb-1">Role / Title</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={editing.role}
                    onChange={(e) => setEditing((prev) => prev && ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. Senior Therapist"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-background mb-1">Organisation</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={editing.org}
                    onChange={(e) => setEditing((prev) => prev && ({ ...prev, org: e.target.value }))}
                    placeholder="e.g. Mindful Wellness Clinic · Mumbai"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-background mb-1">Period</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={editing.period}
                    onChange={(e) => setEditing((prev) => prev && ({ ...prev, period: e.target.value }))}
                    placeholder="e.g. 2020 – Present"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-background mb-1">Description (optional)</label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-y`}
                  value={editing.description ?? ""}
                  onChange={(e) => setEditing((prev) => prev && ({ ...prev, description: e.target.value }))}
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
            No entries yet — add one above.
          </li>
        )}
        {entries.map((e) => (
          <li
            key={e.id}
            className="p-6 hover:bg-surface-container-lowest transition-colors flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <h3 className="font-label-sm text-label-sm text-on-background text-base">{e.role || <span className="italic text-on-surface-variant">Untitled</span>}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                {[e.org, e.period].filter(Boolean).join(" • ")}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => openEdit(e)}
                className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
              <button
                onClick={() => deleteEntry(e.id)}
                className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <SaveBar status={status} errorMsg={errorMsg} onSave={handleSave} label="Save Timeline" />
    </section>
  );
}
