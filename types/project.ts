import { StaticImageData } from "next/image";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string | StaticImageData;
  featured?: boolean;
  year?: number;
}
