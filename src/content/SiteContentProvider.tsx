import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "./types";
import { defaultContent } from "./defaultContent";

/**
 * Loads editable content at RUNTIME (design "D"): no rebuild needed when the
 * admin saves. In production set VITE_CONTENT_URL to the GitHub raw / jsDelivr
 * URL of content/site.json so edits show without a Netlify build. Locally it
 * falls back to the static copy in /public/content/site.json, and if any fetch
 * fails we use the bundled seed so the site never renders empty.
 */
const CONTENT_URL =
  import.meta.env.VITE_CONTENT_URL || "/content/site.json";

interface ContentState {
  content: SiteContent;
  loading: boolean;
}

const SiteContentContext = createContext<ContentState>({
  content: defaultContent,
  loading: true,
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`${CONTENT_URL}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: SiteContent) => {
        if (!cancelled) setContent(data);
      })
      .catch(() => {
        /* keep bundled defaultContent */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading }}>
      {children}
    </SiteContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent() {
  return useContext(SiteContentContext);
}
