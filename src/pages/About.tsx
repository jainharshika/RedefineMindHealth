import { motion } from "framer-motion";
import { useSiteContent } from "../content/SiteContentProvider";
import Reveal from "../components/Reveal";
import { IMAGES } from "../assets/images";

export default function About() {
  const { content } = useSiteContent();
  const { profile, experience, affiliations, contact } = content;

  return (
    <div className="max-w-container-max mx-auto px-gutter md:px-section-padding-sm pt-32 pb-section-padding-lg overflow-hidden">
      {/* Heading */}
      <Reveal className="text-center max-w-2xl mx-auto mb-section-padding-sm">
        <h1 className="font-display-xl-mobile text-display-xl-mobile md:font-headline-lg md:text-headline-lg mb-6">
          About
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          A more holistic, tailored experience — built on empathy, respect, and collaboration.
        </p>
      </Reveal>

      {/* Meet the practitioner */}
      <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-section-padding-lg">
        <motion.div
          className="w-full md:w-2/5 relative"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-secondary-container blob-sage opacity-40 mix-blend-multiply blur-2xl" />
          <img
            src={IMAGES.portrait}
            alt={profile.displayName}
            className="relative z-10 w-full aspect-[4/5] object-cover rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl shadow-sm"
          />
        </motion.div>
        <Reveal className="w-full md:w-3/5" delay={0.1}>
          <p className="font-accent-script text-accent-script text-3xl text-primary mb-2">
            Meet {profile.displayName}
          </p>
          <h2 className="font-headline-md text-sm md:text-base lg:text-lg leading-snug text-on-background mb-2">{profile.credentials}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant whitespace-pre-line">
            {profile.bio}
          </p>
        </Reveal>
      </section>

      {/* Currently exploring */}
      <Reveal>
        <section className="rounded-3xl bg-tertiary-fixed p-10 md:p-16 mb-section-padding-lg relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-surface blob-blush opacity-30" />
          <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-fixed-variant mb-4">
            Currently Exploring
          </p>
          <p className="relative z-10 font-headline-md text-headline-md text-xl md:text-2xl text-on-tertiary-fixed max-w-3xl leading-relaxed">
            {profile.currentlyExploring}
          </p>
        </section>
      </Reveal>

      {/* Clinical journey timeline */}
      <section className="mb-section-padding-lg">
        <Reveal className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md">Clinical Journey</h2>
        </Reveal>
        <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
          <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-0.5 bg-secondary/40 md:-translate-x-1/2" />
          {experience.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <div
                className={`relative mb-12 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                <span
                  className={`absolute top-1.5 -left-8 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-background ${
                    i % 2 === 0 ? "md:left-auto md:-right-[7px]" : "md:-left-[7px]"
                  }`}
                />
                <h3 className="font-headline-md text-headline-md text-lg">{e.role}</h3>
                <p className="font-label-sm text-label-sm text-primary mb-1">{e.org}</p>
                <p className="font-body-md text-body-md text-on-surface-variant/80 mb-2">{e.period}</p>
                {e.description && (
                  <p className="font-body-md text-body-md text-on-surface-variant">{e.description}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Affiliations */}
      {affiliations.length > 0 && (
        <Reveal>
          <section className="text-center mb-section-padding-lg">
            <h2 className="font-headline-md text-headline-md mb-8">Credentials &amp; Affiliations</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {affiliations.map((a) => (
                <span
                  key={a}
                  className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm border border-outline-variant"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal>
        <section className="rounded-3xl bg-secondary-container p-10 md:p-16 text-center">
          <h2 className="font-headline-md text-headline-md mb-4">Ready to start your journey?</h2>
          <p className="font-body-lg text-body-lg text-on-secondary-container mb-8 max-w-xl mx-auto">
            Take the first step toward feeling more like yourself again.
          </p>
          <a
            href={contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-container text-on-surface font-label-sm text-label-sm hover:opacity-90 transition-opacity"
          >
            Book a Session
          </a>
        </section>
      </Reveal>
    </div>
  );
}
