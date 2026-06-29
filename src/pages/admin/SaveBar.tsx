import { AnimatePresence, motion } from "framer-motion";
import type { SaveStatus } from "./useSave";

interface Props {
  status: SaveStatus;
  errorMsg?: string;
  onSave: () => void;
  label?: string;
}

export default function SaveBar({ status, errorMsg, onSave, label = "Save Changes" }: Props) {
  return (
    <div className="px-6 py-4 bg-surface-container border-t border-outline-variant flex items-center justify-between gap-4">
      <AnimatePresence mode="wait">
        {status === "saved" && (
          <motion.span
            key="saved"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 font-body-md text-body-md text-secondary"
          >
            <span className="material-symbols-outlined text-base">check_circle</span>
            Saved successfully
          </motion.span>
        )}
        {status === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 font-body-md text-body-md text-error"
          >
            <span className="material-symbols-outlined text-base">error</span>
            {errorMsg || "Save failed."}
          </motion.span>
        )}
        {(status === "idle" || status === "saving") && <span />}
      </AnimatePresence>

      <button
        onClick={onSave}
        disabled={status === "saving"}
        className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
      >
        {status === "saving" && (
          <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
        )}
        {status === "saving" ? "Saving…" : label}
      </button>
    </div>
  );
}
