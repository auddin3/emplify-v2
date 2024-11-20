import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          custom1: '#00338D',
          custom2: '#005EB8',
          custom3: '#0071b6',
        },
        purple: {
          custom1: '#483698',
          custom2: '#470A68',
          custom3: '#6D2077',
          custom4: '#343481',
        },
        green: {
          custom1: '#007E7D',
          custom2: '#009A44',
          custom3: '#43B02A',
        },
        pink: { custom1: '#C6007E' },
        black: {
          custom1: '#333D49',
          custom2: '#000000',
          custom3: '#333E49',
        },
        gray: {
          custom1: '#F8F9FD',
          custom2: '#888888',
          custom3: '#F9FAFB',
        },
        orange: { custom1: '#F68D2E' },
        white: {
          custom1: '#F7F7F8',
          custom2: '#F9FAFB',
        },
      },
    },
  },
  plugins: [],
}
export default config
