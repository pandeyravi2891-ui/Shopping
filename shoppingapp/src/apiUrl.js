export const getBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  //   return "http://localhost:3000";
  // }
  return "https://shopping-tawny-kappa.vercel.app/";
};
