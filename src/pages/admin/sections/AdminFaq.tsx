import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "../../../content/SiteContentProvider";
import { useSave } from "../useSave";
import SaveBar from "../SaveBar";
import type { FaqEntry } from "../../../content/types";

function newFaq(): FaqEntry {
  return { id: `faq-${Date.now()}`, question: "", answer: "" };
}

export default function AdminFaq() {
  const { content, loading } = useSiteContent();
  const { save, status, errorMsg } = useSave();
  const [entries, setEntries] = useState<FaqEntry[]>(() => content.faqs);
  const [editing, setEditing] = useState<FaqEntry | null>(null);
  const [isNew, setIsNew] = useState(false);

  if (loading) return <div className="py-20 text-center font-body-md text-on-surface-variant">Loading…</div>;

  function openNew() { setIsNew(true); setEditing(newFaq()); }
  function openEdit(f: FaqEntry) { setIsNew(false); setEditing({ ...f }); }
  function cancelEdit() { setEditing(null); }

  function commitEdit() {
    if (!editing) return;
    if (isNew) {
      setEntries((prev) => [...prev, editing]);
    } else {
      setEntries((prev) => prev.map((f) => (f.id === editing.id ? editing : f)));
    }
    setEditing(null);
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((f) => f.id !== id));
  }

  function handleSave() {
    save({ ...content, faqs: entries });
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow";

  return (
    <section className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
        <h2 className="font-headline-md text-[24px] text-on-background">FAQ</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 text-primary font-label-sm text-label-sm hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span> Add Question
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
                {isNew ? "New Question" : "Edit Question"}
              </h3>
              <div>
                <label className="block font-label-sm text-label-sm text-on-background mb-1">Question</label>
                <input
                  type="text"
                  className={inputClass}
                  value={editing.question}
                  onChange={(e) => setEditing((p) => p && ({ ...p, question: e.target.value }))}
                  placeholder="e.g. What happens in the first session?"
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-background mb-1">Answer</label>
                <textarea
                  rows={4}
                  className={`${inputClass} resize-y`}
                  value={editing.answer}
                  onChange={(e) => setEditing((p) => p && ({ ...p, answer: e.target.value }))}
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
            No questions yet — add one above.
          </li>
        )}
        {entries.map((f) => (
          <li key={f.id} className="p-6 hover:bg-surface-container-lowest transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <h3 className="font-label-sm text-label-sm text-on-background text-base">{f.question || <span className="italic text-on-surface-variant">No question</span>}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2">{f.answer}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => openEdit(f)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-base">edit</span>
              </button>
              <button onClick={() => deleteEntry(f.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <SaveBar status={status} errorMsg={errorMsg} onSave={handleSave} label="Save FAQ" />
    </section>
  );
}
