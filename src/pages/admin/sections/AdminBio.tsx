import { useState } from "react";
import { useSiteContent } from "../../../content/SiteContentProvider";
import { useSave } from "../useSave";
import SaveBar from "../SaveBar";

export default function AdminBio() {
  const { content, loading } = useSiteContent();
  const { save, status, errorMsg } = useSave();

  const [form, setForm] = useState(() => ({ ...content.profile }));

  // Sync once content loads from runtime fetch
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-on-surface-variant font-body-md text-body-md">
        Loading…
      </div>
    );
  }

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  function handleSave() {
    save({ ...content, profile: form });
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow";

  return (
    <section className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
        <h2 className="font-headline-md text-[24px] text-on-background">Edit Professional Bio</h2>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Display Name
          </label>
          <input type="text" className={inputClass} {...field("displayName")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Primary Credentials
          </label>
          <input type="text" className={inputClass} placeholder="e.g. M.Sc Psychology · Counsellor" {...field("credentials")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Hero Tagline
          </label>
          <input type="text" className={inputClass} {...field("tagline")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Biography (public)
          </label>
          <textarea
            rows={6}
            className={`${inputClass} resize-y`}
            {...field("bio")}
          />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Home Page Quote
            <span className="ml-2 font-normal text-on-surface-variant">(shown in the quote band on the home page)</span>
          </label>
          <textarea
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="A first-person pull-quote for the home page…"
            {...field("quote")}
          />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Currently Exploring
            <span className="ml-2 font-normal text-on-surface-variant">(research card on About page)</span>
          </label>
          <textarea
            rows={3}
            className={`${inputClass} resize-y`}
            placeholder="What are you currently working on or exploring?"
            {...field("currentlyExploring")}
          />
        </div>
      </div>

      <SaveBar status={status} errorMsg={errorMsg} onSave={handleSave} label="Save Bio" />
    </section>
  );
}
