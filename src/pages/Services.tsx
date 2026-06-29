import { useSiteContent } from "../content/SiteContentProvider";
import Reveal from "../components/Reveal";

export default function Services() {
  const { content } = useSiteContent();
  const { services, contact } = content;

  return (
    <div className="max-w-container-max mx-auto px-gutter md:px-section-padding-sm pt-32 pb-section-padding-lg overflow-hidden">
      <Reveal className="text-center max-w-2xl mx-auto mb-section-padding-sm">
        <h1 className="font-display-xl-mobile text-display-xl-mobile md:font-headline-lg md:text-headline-lg mb-6">
          Services
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Tailored, evidence-informed support — at your pace, in a space that feels safe.
        </p>
      </Reveal>

      <div className="flex flex-col gap-12 md:gap-20">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.05}>
            <section
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-stretch gap-8 md:gap-12 bg-surface rounded-[32px] border border-surface-variant shadow-[0_4px_24px_rgba(49,48,44,0.05)] overflow-hidden`}
            >
              <div className="md:w-2/5 bg-secondary-container/60 flex items-start justify-center pt-12 md:pt-16 p-8 md:p-12 min-h-[180px] md:min-h-[220px] relative">
                <div className="absolute inset-6 bg-surface/40 blob-sage opacity-30" />
                <span className="material-symbols-outlined relative z-10 text-7xl text-on-secondary-container">
                  {s.icon}
                </span>
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-headline-md text-headline-md mb-4">{s.title}</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 whitespace-pre-line">
                  {s.details || s.blurb}
                </p>
                <a
                  href={contact.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 font-label-sm text-label-sm text-primary hover:gap-3 transition-all"
                >
                  Book this <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
