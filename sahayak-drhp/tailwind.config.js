/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          950: '#081428', 900: '#0b1e3f', 800: '#0f2a54', 700: '#16386c', 600: '#1e4d92',
        },
        gold: {
          DEFAULT: '#d4af5f', soft: '#e7d3a1', deep: '#b8923f',
        },
        ink: { DEFAULT: '#0d1b2e', 2: '#31435c' },
        muted: '#6b7c96',
        line: '#e2e8f2',
        paper: '#f7f9fc',
        ok: { DEFAULT: '#159a62', bg: '#e6f6ee' },
        warn: { DEFAULT: '#d9902a', bg: '#fdf3e2' },
        bad: { DEFAULT: '#d5493f', bg: '#fbe9e7' },
        info: { DEFAULT: '#2f6fdc', bg: '#e9f1fd' },
      },
      boxShadow: {
        sm2: '0 1px 2px rgba(13,27,46,.06),0 1px 3px rgba(13,27,46,.05)',
        md2: '0 8px 24px rgba(13,27,46,.08),0 2px 6px rgba(13,27,46,.05)',
        lg2: '0 24px 60px rgba(13,27,46,.16)',
        gold: '0 6px 18px rgba(184,146,63,.35),inset 0 1px 0 rgba(255,255,255,.35)',
      },
      borderRadius: { xl2: '18px', '2xl2': '22px' },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        blink: { '0%,60%,100%': { opacity: '.3', transform: 'translateY(0)' }, '30%': { opacity: '1', transform: 'translateY(-3px)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        blink: 'blink 1.3s infinite',
      },
    },
  },
  plugins: [],
}
