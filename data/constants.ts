import { NavLink, Project, Skill, SocialLink } from "@/types";

export const SITE_TITLE = "Umidjon Haydarov | Graphic Designer & Visual Artist";
export const SITE_DESCRIPTION =
  "Graphic Designer specializing in brand identity, UI/UX design, and motion graphics with a passion for creating stunning visual experiences.";
export const SITE_URL = "https://umidjon.vercel.app";
export const AUTHOR_NAME = "Umidjon Haydarov";
export const AUTHOR_EMAIL = "uhaydarov464@gmail.com";
export const AUTHOR_PHONE = "+998 88 795 07 08";

export const BEHANCE_URL = "https://www.behance.net/khaydarov_off";
export const LINKEDIN_URL = "https://www.linkedin.com/in/umidjon-haydarov-556659362/";
export const TELEGRAM_URL = "https://t.me/uhaydarov_off";
export const TELEGRAM_HANDLE = "@uhaydarov_off";
export const PINTEREST_URL = "https://pin.it/4In6K0G7M";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const PROJECTS: Project[] = [
  {
    id: "project1",
    title: "Brand Identity",
    description:
      "Complete brand identity system — logo, color palette, typography, and brand guidelines crafted for a modern business.",
    tech: ["Adobe Illustrator", "Figma", "Brand Strategy"],
    link: "#",
    category: "Brand Identity",
    images: [
      "/projects/project1/img1.jpeg",
      "/projects/project1/img2.jpeg",
      "/projects/project1/img3.jpeg",
    ],
  },
  {
    id: "project2",
    title: "UI/UX Design",
    description:
      "End-to-end UI/UX design — wireframes, prototypes, and high-fidelity interfaces built in Figma.",
    tech: ["Figma", "Prototyping", "User Research"],
    link: "#",
    category: "UI/UX",
    images: ["/projects/project2/img1.jpeg", "/projects/project2/img2.jpeg"],
  },
  {
    id: "project3",
    title: "Poster Design",
    description:
      "Bold poster series combining expressive typography, vivid color, and strong visual hierarchy.",
    tech: ["Photoshop", "Illustrator", "Typography"],
    link: "#",
    category: "Print Design",
    images: [
      "/projects/project3/img1.jpeg",
      "/projects/project3/img2.jpeg",
      "/projects/project3/img3.jpeg",
    ],
  },
  {
    id: "project4",
    title: "Social Media Kit",
    description:
      "Cohesive social media design kit — templates, story formats, and branded content for digital platforms.",
    tech: ["Figma", "Photoshop", "Canva"],
    link: "#",
    category: "Digital Design",
    images: ["/projects/project4/img1.jpeg", "/projects/project4/img2.jpeg"],
  },
  {
    id: "project5",
    title: "Logo Design",
    description:
      "Minimalist and memorable logo design with strong geometric form and versatile usage.",
    tech: ["Adobe Illustrator", "Brand Strategy"],
    link: "#",
    category: "Logo Design",
    images: ["/projects/project5/img1.jpeg"],
  },
  {
    id: "project6",
    title: "Motion Graphics",
    description:
      "Kinetic typography and animated visual content for promotional campaigns and social media.",
    tech: ["After Effects", "Premiere Pro", "Illustrator"],
    link: "#",
    category: "Motion",
    images: ["/projects/project6/img1.jpeg"],
  },
];

export const SKILLS: Skill[] = [
  {
    name: "Figma",
    icon: "Pen",
    level: 95,
    description:
      "UI/UX design, interactive prototypes, and design systems in Figma",
    category: "Design",
  },
  {
    name: "Adobe Illustrator",
    icon: "PenTool",
    level: 93,
    description:
      "Vector graphics, logo design, and brand identity illustration",
    category: "Design",
  },
  {
    name: "Adobe Photoshop",
    icon: "Image",
    level: 90,
    description:
      "Photo manipulation, digital art, and high-end visual retouching",
    category: "Design",
  },
  {
    name: "Adobe After Effects",
    icon: "Play",
    level: 85,
    description:
      "Motion graphics, kinetic typography, and animated visual content",
    category: "Motion",
  },
  {
    name: "Adobe Premiere Pro",
    icon: "Film",
    level: 80,
    description:
      "Video editing and post-production for brand and social media content",
    category: "Motion",
  },
  {
    name: "Adobe InDesign",
    icon: "Layout",
    level: 82,
    description:
      "Print and digital layout design — magazines, brochures, and books",
    category: "Print",
  },
  {
    name: "Blender",
    icon: "RotateCcw",
    level: 70,
    description:
      "3D modeling and rendering for product visualization and abstract art",
    category: "3D",
  },
  {
    name: "Brand Identity",
    icon: "Star",
    level: 92,
    description:
      "Creating cohesive brand systems — logo, palette, typography, guidelines",
    category: "Strategy",
  },
  {
    name: "UI/UX Design",
    icon: "Monitor",
    level: 90,
    description:
      "User research, wireframing, and high-fidelity interface design",
    category: "Design",
  },
  {
    name: "Typography",
    icon: "Type",
    level: 88,
    description:
      "Typeface pairing, hierarchy, and expressive typographic layouts",
    category: "Design",
  },
  {
    name: "Color Theory",
    icon: "Palette",
    level: 91,
    description:
      "Strategic use of color psychology and harmony in visual design",
    category: "Design",
  },
  {
    name: "Social Media Design",
    icon: "Globe",
    level: 87,
    description:
      "Eye-catching content for Instagram, YouTube, and digital campaigns",
    category: "Digital",
  },
];

export const INSTAGRAM_HANDLE = "uhaydarov.off";
export const INSTAGRAM_URL = "https://www.instagram.com/uhaydarov.off/";

export interface InstagramPost {
  id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  date: string;
  type: "post" | "reel";
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    caption:
      "Brand identity for a local coffee shop — logo, palette, packaging all from scratch.",
    imageUrl: "/projects/portfolio.png",
    likes: 312,
    date: "2026-03-01",
    type: "reel",
  },
  {
    id: "ig-2",
    caption:
      "Mobile app UI concept — clean layout, soft shadows, and a calm color system.",
    imageUrl: "/projects/n-academy.png",
    likes: 198,
    date: "2026-02-18",
    type: "post",
  },
  {
    id: "ig-3",
    caption:
      "Motion graphics reel — kinetic typography and smooth transitions for a product launch.",
    imageUrl: "/projects/n-adminpanel.png",
    likes: 245,
    date: "2026-02-05",
    type: "reel",
  },
  {
    id: "ig-4",
    caption:
      "Poster series for a music festival — bold type, vivid gradients, and raw energy.",
    imageUrl: "/projects/cryptofolioapp.png",
    likes: 421,
    date: "2026-01-22",
    type: "post",
  },
  {
    id: "ig-5",
    caption:
      "Dark mode design system — deep tones, glass layers, and sharp contrast hierarchy.",
    imageUrl: "/image_0.png",
    likes: 503,
    date: "2026-01-10",
    type: "reel",
  },
  {
    id: "ig-6",
    caption:
      "Social media kit for a fashion brand — 12 templates, 3 color themes, ready to post.",
    imageUrl: "/avatar.jpeg",
    likes: 276,
    date: "2025-12-28",
    type: "post",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Behance",
    url: BEHANCE_URL,
    ariaLabel: "Visit Behance portfolio (opens in new tab)",
  },
  {
    name: "LinkedIn",
    url: LINKEDIN_URL,
    ariaLabel: "Visit LinkedIn profile (opens in new tab)",
  },
  {
    name: "Instagram",
    url: INSTAGRAM_URL,
    ariaLabel: "Visit Instagram profile (opens in new tab)",
  },
  {
    name: "Email",
    url: `mailto:${AUTHOR_EMAIL}`,
    ariaLabel: "Send email",
  },
];
