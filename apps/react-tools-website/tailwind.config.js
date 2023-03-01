/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}', 'mdx-components.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'virgin-america': 'linear-gradient(to-right, #7B4397, #DC2430)',
        'grid-gradient':
          'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(to right, transparent 50%, rgba(0, 0, 0, 0.1) 50%)'
      },
      colors: {
        theme: {
          background: '#06001a',
          primary: '#0C0032',
          'primary-2': '#190061',
          accent: '#240090',
          'accent-2': '#3500D3',
          'accent-3': '#6C71FB',
          complementary: '#A9AD05',
          'ds-complementary': '#1495FA',
          secondary: '#282828',
          tertiary: '#7510F7'
        }
      },
      fontFamily: {
        'nexa-bold': ['Nexa', 'Helvetica', 'Arial', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif']
      },
      zIndex: {
        1: '1',
        100: '100',
        1000: '1000'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 }
        },
        'fade-out': {
          '0%': { opacity: 100 },
          '100%': { opacity: 0 }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        'smooth-slide-in-top': {
          '0%': { transform: 'translateY(-25%)', opacity: 0 },
          '100%': { transform: 'translateX(0%)', opacity: 100 }
        },
        'grid-lines': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '30px 30px' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out forwards 0.2s',
        'fade-out': 'fade-out 0.2s ease-out forwards 0.2s',
        'slide-in-left': 'slide-in-left 0.2s ease-in-out forwards',
        'smooth-slide-in-top': 'smooth-slide-in-top 0.2s ease-in-out forwards',
        grid: 'grid-lines 5s linear infinite'
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        circle: 'circle',
        square: 'square',
        decimal: 'decimal',
        'lower-roman': 'lower-roman',
        'upper-roman': 'upper-roman'
      }
    }
  },
  plugins: []
};

// module.exports = {
//   content: ['./src/**/*.{tsx,ts,jsx,js}'],
//   theme: {
//     extend: {
//   },
//   plugins: [
//     plugin(function ({ addVariant }) {
//       addVariant('middle', '&:not(:first-child):not(:last-child)');
//     })
//   ]
// };
