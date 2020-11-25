module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        'ultramarine-1': '#3368FA',
        'ultramarine-2': '#104EF9',
      },
    },
    /* maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    }, */
  },
  variants: {
    backgroundColor: ['hover', 'active'],
  },
  plugins: [],
};
