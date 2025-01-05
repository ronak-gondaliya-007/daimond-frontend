/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Add a custom breakpoint at 480px
        'sm': '640px',  // Keep default sm breakpoint
        'md': '768px',  // Keep default md breakpoint
        'md-2': '968px',  // Keep default md breakpoint
        'lg': '1024px', // Keep default lg breakpoint
        'xl': '1280px', // Keep default xl breakpoint
        '2xl': '1536px', // Keep default 2xl breakpoint
      },
    },
    plugins: [],
  }
}