/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Palatino', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Colors matching Sahayak SME IPO Document Assistant screenshot
        brand: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#EFF6FF',
        },
        sidebar: {
          DEFAULT: '#182235',
          dark: '#0F172A',
          hover: '#243047',
          active: '#FFFFFF',
        },
        surface: '#FFFFFF',
        background: '#F3F4F6',
        text: '#1F2937',
        border: '#E5E7EB',
        primary: {
          DEFAULT: '#182235',
          dark: '#0F172A',
          light: '#2563EB',
        },
        accent: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#EFF6FF',
        },
        success: {
          DEFAULT: '#10B981',
          bg: '#ECFDF5',
          border: '#A7F3D0',
        },
        warning: {
          DEFAULT: '#F59E0B',
          bg: '#FFFBEB',
          border: '#FDE68A',
        },
        danger: {
          DEFAULT: '#EF4444',
          bg: '#FEF2F2',
          border: '#FCA5A5',
        },
        muted: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
          dark: '#4B5563',
        },
        // Legacy compatibility aliases
        navy: {
          950: '#0F172A',
          900: '#182235',
          850: '#243047',
          800: '#334155',
          700: '#475569',
          600: '#64748B',
        },
        gold: {
          DEFAULT: '#F59E0B',
          soft: '#FDE68A',
          deep: '#D97706',
        },
        ink: { DEFAULT: '#1F2937', 2: '#4B5563' },
        paper: '#F8FAFC',
        line: '#E5E7EB',
        ok: { DEFAULT: '#10B981', bg: '#ECFDF5' },
        warn: { DEFAULT: '#F59E0B', bg: '#FFFBEB' },
        bad: { DEFAULT: '#EF4444', bg: '#FEF2F2' },
        info: { DEFAULT: '#2563EB', bg: '#EFF6FF' },
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        paper: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
}
