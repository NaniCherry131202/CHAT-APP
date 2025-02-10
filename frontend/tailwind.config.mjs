import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html,vue}",  // Added more extensions
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
