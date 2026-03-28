export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  images: string[];
  category: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
  category?: string;
}

export interface ContactLinkConfig {
  name: string;
  url: string;
  ariaLabel: string;
}

export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
}
