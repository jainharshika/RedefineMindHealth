import { useSiteContent } from "../content/SiteContentProvider";
import Reveal from "../components/Reveal";

export default function Contact() {
  const { content } = useSiteContent();
  const { contact, profile } = content;

  const rows = [
    { icon: "call", label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: "location_on", label: "Location", value: contact.address, href: undefined },
    { icon: "photo_camera", label: "Instagram", value: "@redefinemindhealth", href: contact.instagram },
  ];

  return (
    <div className="max-w-container-max mx-auto px-gutter md:px-section-padding-sm pt-32 pb-section-padding-lg overflow-hidden">
      <Reveal className="text-center max-w-2xl mx-auto mb-section-padding-sm">
        <h1 className="font-display-xl-mobile text-display-xl-mobile md:font-headline-lg md:text-headline-lg mb-6">
          Get in touch
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          The easiest way to begin is to book a session directly. For anything else, reach out below.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Booking card */}
        <Reveal>
          <div className="rounded-[32px] bg-secondary-container p-10 md:p-12 h-full flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-surface blob-sage opacity-20" />
            <h2 className="font-headline-md text-headline-md mb-4 relative z-10">Book a session</h2>
            <p className="font-body-lg text-body-lg text-on-secondary-container mb-8 relative z-10">
              Pick a time that works for you on {profile.displayName.split(" ")[0]}'s calendar — it opens in a new tab.
            </p>
            <a
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex w-fit items-center justify-center px-8 py-4 rounded-full bg-primary-container text-on-surface font-label-sm text-label-sm hover:opacity-90 transition-opacity"
            >
              Open Booking Calendar
            </a>
          </div>
        </Reveal>

        {/* Details */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-2">
            {rows.map((r) => {
              const inner = (
                <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-primary mt-0.5">{r.icon}</span>
                  <div>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant/70">
                      {r.label}
                    </p>
                    <p className="font-body-lg text-body-lg text-on-surface">{r.value}</p>
                  </div>
                </div>
              );
              return r.href ? (
                <a key={r.label} href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={r.label}>{inner}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
