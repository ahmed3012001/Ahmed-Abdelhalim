import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface':                        'var(--bg)',
        'surface-dim':                    'var(--bg)',
        'surface-bright':                 'var(--card)',
        'surface-container-lowest':       'color-mix(in srgb, var(--bg) 85%, black)',
        'surface-container-low':          'color-mix(in srgb, var(--bg) 92%, var(--card))',
        'surface-container':              'var(--card)',
        'surface-container-high':         'color-mix(in srgb, var(--card) 85%, var(--bg))',
        'surface-container-highest':      'color-mix(in srgb, var(--card) 70%, var(--bg))',
        'surface-variant':                'color-mix(in srgb, var(--card) 70%, var(--bg))',
        'on-surface':                     'var(--text)',
        'on-surface-variant':             'var(--text-muted)',
        'primary':                        'var(--primary)',
        'primary-container':              'var(--primary-soft)',
        'on-primary':                     '#ffffff',
        'on-primary-container':           'var(--primary)',
        'secondary':                      'var(--secondary)',
        'secondary-container':            'color-mix(in srgb, var(--secondary) 25%, var(--card))',
        'on-secondary':                   '#ffffff',
        'on-secondary-container':         'var(--secondary)',
        'outline':                        'var(--border)',
        'outline-variant':                'var(--border)',
        'background':                     'var(--bg)',
        'on-background':                  'var(--text)',
        'error':                          '#f87171',
        'error-container':                'rgba(239,68,68,0.15)',
        'on-error':                       '#ffffff',
        'on-error-container':             '#fca5a5',
        'success':                        '#22c55e',
      },

      fontFamily: {
        headline: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:     ['Manrope', 'system-ui', 'sans-serif'],
        label:    ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:     ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      borderRadius: {
        DEFAULT: '0.125rem',
        sm:      '0.25rem',
        md:      '0.5rem',
        lg:      '0.75rem',
        xl:      '1rem',
        '2xl':   '1.25rem',
        '3xl':   '1.5rem',
        full:    '9999px',
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--gradient-glow-1) 0%, var(--gradient-glow-3) 100%)',
      },

      boxShadow: {
        'glow-sm':    '0 0 15px color-mix(in srgb, var(--primary) 20%, transparent)',
        'glow-md':    '0 0 30px color-mix(in srgb, var(--primary) 25%, transparent)',
        'glow-lg':    '0 20px 50px color-mix(in srgb, var(--primary) 10%, transparent)',
        'card':       '0 4px 24px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.18), 0 0 0 1px color-mix(in srgb, var(--primary) 25%, transparent)',
      },

      animation: {
        'float':             'float 6s ease-in-out infinite',
        'pulse-slow':        'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-rotate':   'gradientRotate 4s linear infinite',
        'gradient-pulse':    'gradientPulse 3s ease-in-out infinite',
        'grid-drift':        'gridDrift 24s linear infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        gradientRotate: {
          '0%':   { transform: 'rotate(0deg)   scale(1.5)' },
          '100%': { transform: 'rotate(360deg) scale(1.5)' },
        },
        gradientPulse: {
          '0%, 100%': { opacity: '0.8' },
          '50%':      { opacity: '0.4' },
        },
        gridDrift: {
          '0%':   { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(48px, 48px)' },
        },
      },

      zIndex: {
        'navbar':        '1000',
        'modal':         '99999',
        'modal-close':   '100000',
        'chatbot':       '9998',
        'chatbot-panel': '9997',
      },
    },
  },
  plugins: [],
}

export default config
