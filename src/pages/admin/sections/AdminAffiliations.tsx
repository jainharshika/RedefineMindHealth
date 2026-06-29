import { useState } from "react";
import { useSiteContent } from "../../../content/SiteContentProvider";
import { useSave } from "../useSave";
import SaveBar from "../SaveBar";

export default function AdminAffiliations() {
  const { content, loading } = useSiteContent();
  const { save, status, errorMsg } = useSave();

  const [text, setText] = useState(() => content.affiliations.join("\n"));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-on-surface-variant font-body-md text-body-md">
        Loading…
      </div>
    );
  }

  function handleSave() {
    const affiliations = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    save({ ...content, affiliations });
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow resize-y";

  return (
    <section className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
        <h2 className="font-headline-md text-[24px] text-on-background">Credentials & Affiliations</h2>
      </div>

      <div className="p-6 space-y-3">
        <p className="font-body-md text-body-md text-on-surface-variant">
          One entry per line. Each line becomes a pill chip on the About page.
        </p>
        <textarea
          rows={8}
          className={inputClass}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"Faculty, NMIMS University\nM.Sc Psychology, University of Dundee"}
        />
        <div className="flex flex-wrap gap-2 pt-2">
          {text.split("\n").filter(Boolean).map((a, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm border border-outline-variant text-sm"
            >
              {a.trim()}
            </span>
          ))}
        </div>
      </div>

      <SaveBar status={status} errorMsg={errorMsg} onSave={handleSave} label="Save Affiliations" />
    </section>
  );
}
