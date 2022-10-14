/** @type {import('tailwindcss').Config} */
const { createGlobPatternsForDependencies } = require("@nrwl/react/tailwind");
const { join } = require("path");
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base", // only generate global styles
    }),
  ],
};
