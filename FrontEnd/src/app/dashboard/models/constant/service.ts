// Service interface with bilingual support
export interface Service {
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  image: string;
}

// Blog interface for blog-specific data structure
export interface Blog {
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  image: string;
}

// Offer interface for offer-specific data structure
export interface Offer {
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  image: string;
}
