import { useState } from "react";
import { useSiteContent } from "../../../content/SiteContentProvider";
import { useSave } from "../useSave";
import SaveBar from "../SaveBar";

export default function AdminContact() {
  const { content, loading } = useSiteContent();
  const { save, status, errorMsg } = useSave();

  const [form, setForm] = useState(() => ({ ...content.contact }));

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
    save({ ...content, contact: form });
  }

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow";

  return (
    <section className="bg-surface rounded-2xl border border-outline-variant overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
        <h2 className="font-headline-md text-[24px] text-on-background">Contact & Links</h2>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">Email</label>
          <input type="email" className={inputClass} {...field("email")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">Phone</label>
          <input type="text" className={inputClass} {...field("phone")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">Address</label>
          <textarea rows={2} className={`${inputClass} resize-y`} {...field("address")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">
            Booking URL
            <span className="ml-2 font-normal text-on-surface-variant">(Google Calendar / Calendly link)</span>
          </label>
          <input type="url" className={inputClass} {...field("bookingUrl")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">Instagram URL</label>
          <input type="url" className={inputClass} {...field("instagram")} />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-background mb-2">LinkedIn URL</label>
          <input type="url" className={inputClass} {...field("linkedin")} />
        </div>
      </div>

      <SaveBar status={status} errorMsg={errorMsg} onSave={handleSave} label="Save Contact" />
    </section>
  );
}
