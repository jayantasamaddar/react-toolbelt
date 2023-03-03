export const getBaseUrl = () => {
  if (process.env.NODE_ENV !== 'production') {
    return process.env.NEXT_PUBLIC_URL;
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
};
