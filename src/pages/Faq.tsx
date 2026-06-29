import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../content/SiteContentProvider";
import Reveal from "../components/Reveal";

export default function Faq() {
  const { content } = useSiteContent();
  const { faqs, contact } = content;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="max-w-container-max mx-auto px-gutter md:px-section-padding-sm pt-32 pb-section-padding-lg overflow-hidden">
      <Reveal className="text-center max-w-2xl mx-auto mb-section-padding-sm">
        <h1 className="font-display-xl-mobile text-display-xl-mobile md:font-headline-lg md:text-headline-lg mb-6">
          Questions, <span className="font-accent-script text-primary text-[1.1em]">answered</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Choosing to start is a big step. Here are a few things that may help you feel comfortable before we begin.
        </p>
      </Reveal>

      <div className="max-w-3xl mx-auto">
        {faqs.map((f, i) => {
          const open = openId === f.id;
          return (
            <Reveal key={f.id} delay={i * 0.05}>
              <div className="border-b border-outline-variant">
                <button
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-headline-md text-headline-md text-lg md:text-xl text-on-surface group-hover:text-primary transition-colors">
                    {f.question}
                  </span>
                  <span
                    className="material-symbols-outlined text-2xl text-primary transition-transform duration-300 shrink-0"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    add
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="font-body-lg text-body-lg text-on-surface-variant pb-6 max-w-2xl">
                        {f.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="text-center mt-section-padding-sm">
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
          Still have a question? I'm happy to help.
        </p>
        <a
          href={contact.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-container text-on-surface font-label-sm text-label-sm hover:opacity-90 transition-opacity"
        >
          Book a Session
        </a>
      </Reveal>
    </div>
  );
}
