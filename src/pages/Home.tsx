import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSiteContent } from "../content/SiteContentProvider";
import Reveal from "../components/Reveal";
import { IMAGES } from "../assets/images";

export default function Home() {
  const { content } = useSiteContent();
  const { profile, contact } = content;

  return (
    <div className="max-w-container-max mx-auto px-gutter md:px-section-padding-sm overflow-hidden pt-24 pb-section-padding-sm md:pb-section-padding-lg">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-section-padding-sm md:py-section-padding-lg">
        <motion.div
          className="w-full md:w-1/2 z-10 flex flex-col items-start gap-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display-xl-mobile text-display-xl-mobile md:font-display-xl md:text-display-xl text-on-background max-w-2xl">
            A space to{" "}
            <span className="font-accent-script text-accent-script text-primary">redefine</span>{" "}
            how you feel
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            {profile.tagline}
          </p>
          <a
            href={contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-container text-on-surface font-label-sm text-label-sm hover:opacity-90 transition-opacity"
          >
            Book a Session
          </a>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full h-[420px] md:h-[600px]">
            <div className="absolute inset-0 bg-secondary-container blob-sage opacity-40 mix-blend-multiply blur-2xl" />
            <img
              alt="Harshika Jain"
              className="relative z-10 w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px] rounded-tr-3xl rounded-bl-3xl shadow-sm"
              src={IMAGES.portrait}
            />
          </div>
          <span className="font-accent-script text-accent-script text-5xl text-primary">
            {profile.displayName}
          </span>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="relative py-section-padding-sm md:py-section-padding-lg flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <div className="absolute -left-20 top-10 w-64 h-64 bg-tertiary-fixed blob-blush opacity-30 mix-blend-multiply blur-3xl -z-10" />
        <Reveal className="w-full md:w-1/3">
          <div className="aspect-square overflow-hidden rounded-[40px] shadow-sm bg-surface-variant">
            <img className="w-full h-full object-cover" src={IMAGES.detailCalm} alt="" />
          </div>
        </Reveal>
        <Reveal className="w-full md:w-2/3" delay={0.1}>
          <h2 className="font-headline-md text-headline-md mb-6">
            Welcome to a different kind of practice.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            {profile.bio.split('\n\n')[0]}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary hover:gap-3 transition-all mt-4"
          >
            More about me <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </Reveal>
      </section>

      {/* What we offer — bento + service chips */}
      <section className="py-section-padding-sm md:py-section-padding-lg">
        <Reveal className="mb-12">
          <h2 className="font-headline-md text-headline-md">What we offer</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Explore the different ways we can work together.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:auto-rows-[280px]">

          {/* Individual Counselling — photo */}
          <Reveal className="md:col-span-7">
            <Link to="/services" className="block h-full rounded-[28px] relative overflow-hidden group min-h-[280px]">
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={IMAGES.detailCalm} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-70 mb-2">One-to-one · Confidential</p>
                <h3 className="font-headline-md text-headline-md text-2xl mb-4">Individual Counselling</h3>
                <span className="inline-flex items-center gap-2 font-label-sm text-label-sm border border-white/60 px-5 py-2 rounded-full group-hover:bg-white group-hover:text-on-background transition-colors">
                  Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Couples Counselling — blush color */}
          <Reveal className="md:col-span-5" delay={0.06}>
            <Link to="/services" className="block h-full min-h-[280px] rounded-[28px] bg-tertiary-fixed p-8 flex flex-col justify-between group hover:opacity-95 transition-opacity">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface/40 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-lg">favorite</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-tertiary-fixed text-xl mb-3">Couples Counselling</h3>
                <p className="font-body-md text-body-md text-on-tertiary-fixed-variant leading-relaxed">
                  A structured space for partners to explore their relationship and improve communication.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-tertiary-fixed-variant group-hover:text-on-tertiary-fixed transition-colors mt-6">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          </Reveal>

          {/* Career Counselling — sage color */}
          <Reveal className="md:col-span-5" delay={0.1}>
            <Link to="/services" className="block h-full min-h-[280px] rounded-[28px] bg-secondary-container p-8 flex flex-col justify-between group hover:opacity-95 transition-opacity">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface/40 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-secondary-container text-lg">work</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-secondary-container text-xl mb-3">Career Counselling</h3>
                <p className="font-body-md text-body-md text-on-secondary-container/70 leading-relaxed">
                  Reflect on your relationship with work, career direction, and professional identity.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-secondary-container/70 group-hover:text-on-secondary-container transition-colors mt-6">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          </Reveal>

          {/* Mental Fitness Assessments — warm neutral */}
          <Reveal className="md:col-span-7" delay={0.1}>
            <Link to="/services" className="block h-full min-h-[280px] rounded-[28px] bg-primary-container p-8 flex flex-col justify-between group hover:opacity-95 transition-opacity">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface/40 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-primary-container text-lg">verified</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-primary-container text-xl mb-3">Mental Fitness Assessments</h3>
                <p className="font-body-md text-body-md text-on-primary-container/70 leading-relaxed">
                  Purpose-specific psychological evaluations for legal, institutional, and performance requirements.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-primary-container/70 group-hover:text-on-primary-container transition-colors mt-6">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          </Reveal>

          {/* Corporate Workshops — photo */}
          <Reveal className="md:col-span-7" delay={0.14}>
            <Link to="/services" className="block h-full rounded-[28px] relative overflow-hidden group min-h-[280px]">
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={IMAGES.faq} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-70 mb-2">Organisations · Teams</p>
                <h3 className="font-headline-md text-headline-md text-2xl mb-4">Corporate Workshops</h3>
                <span className="inline-flex items-center gap-2 font-label-sm text-label-sm border border-white/60 px-5 py-2 rounded-full group-hover:bg-white group-hover:text-on-background transition-colors">
                  Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Research — photo */}
          <Reveal className="md:col-span-5" delay={0.14}>
            <Link to="/about" className="block h-full rounded-[28px] relative overflow-hidden group min-h-[280px]">
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={IMAGES.space} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="font-label-sm text-label-sm uppercase tracking-widest opacity-70 mb-2">Doctoral Research · NMIMS</p>
                <h3 className="font-headline-md text-headline-md text-2xl mb-4">Research</h3>
                <span className="inline-flex items-center gap-2 font-label-sm text-label-sm border border-white/60 px-5 py-2 rounded-full group-hover:bg-white group-hover:text-on-background transition-colors">
                  About me <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          </Reveal>

        </div>
      </section>

      {/* Quote — full-viewport, after bento */}
      <Reveal>
        <section className="flex items-center justify-center rounded-3xl bg-secondary-container px-gutter my-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface blob-sage opacity-15 -mr-16 -mt-16" />
          <div className="max-w-xl mx-auto text-center relative z-10 py-16 md:py-20">
            <span className="material-symbols-outlined text-3xl text-on-secondary-container/40 mb-8 block">
              spa
            </span>
            <p className="font-headline-md text-headline-md text-xl md:text-2xl text-on-secondary-container leading-relaxed mb-10">
              {profile.quote}
            </p>
            <div className="font-accent-script text-accent-script text-xl text-on-secondary-container/70">
              — {profile.displayName}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
