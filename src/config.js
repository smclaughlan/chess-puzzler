/* eslint-disable no-undef */
const production = env.NODE_ENV === "production";
const apiBaseUrl = production
  ? "https://chess-puzzler-back.onrender.com"
  : env.SERVER_URL;
const localBaseUrl = production
  ? "https://chess-puzzler.vercel.app"
  : "http://localhost:3000";

export { apiBaseUrl, localBaseUrl };
