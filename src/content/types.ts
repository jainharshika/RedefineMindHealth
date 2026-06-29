/**
 * Shape of all editable site content (the JSON the admin page writes and the
 * public site reads at runtime). Keep this in sync with public/content/site.json
 * and the admin editor.
 *
 * `_placeholder: true` marks seed entries we invented because her existing site
 * (harshikajain.in) didn't have the data. Harshika should replace these via the
 * admin before go-live.
 */

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  period: string;
  description?: string;
  _placeholder?: boolean;
}

export interface ServiceEntry {
  id: string;
  icon: string; // Material Symbols name, e.g. "person"
  title: string;
  blurb: string; // short, for cards
  details?: string; // longer, for the Services page
  _placeholder?: boolean;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  _placeholder?: boolean;
}

export interface SiteContent {
  profile: {
    displayName: string;
    credentials: string;
    tagline: string; // hero subline
    bio: string; // long "about" paragraph(s)
    quote: string; // pull-quote on the home page (first-person, attributed)
    currentlyExploring: string; // About page "Currently Exploring" card
  };
  affiliations: string[];
  experience: ExperienceEntry[];
  services: ServiceEntry[];
  faqs: FaqEntry[];
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    linkedin: string;
    bookingUrl: string;
  };
}
