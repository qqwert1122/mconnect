module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      blur: {
        xs: "1px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
