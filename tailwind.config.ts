import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1C1712',
          soft: '#282019',
          line: '#3A3025'
        },
        paper: '#FAF6EC',
        ember: {
          DEFAULT: '#E3A008',
          dim: '#B57F07'
        },
        flame: {
          DEFAULT: '#C1440E',
          soft: '#E0662C'
        },
        basil: '#4C7A50',
        smoke: '#8A8073'
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        widest2: '0.25em'
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"
      }
    }
  },
  plugins: []
}
