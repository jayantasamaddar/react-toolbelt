export const isExternalLink = (link: string) => {
  return /^http/.test(link);
};
