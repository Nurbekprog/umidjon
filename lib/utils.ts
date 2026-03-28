/** Smooth-scrolls to a section by its id attribute. */
export const scrollToSection = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
