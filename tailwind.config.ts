import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './data/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { fontFamily: { sans: ['var(--font-inter)'], display: ['var(--font-space)'] }, colors: { accent: 'var(--accent)' }, borderRadius: { '2xl': '1.25rem' } } },
  plugins: [require('tailwindcss-animate')],
};
export default config;
