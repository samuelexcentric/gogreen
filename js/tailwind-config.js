window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'on-surface': '#131b2e',
        'on-tertiary-container': '#b4ff53',
        'tertiary-fixed': '#acf847',
        'primary': '#005d42',
        'on-primary-fixed-variant': '#00513a',
        'surface-bright': '#faf8ff',
        'on-secondary': '#ffffff',
        'on-secondary-fixed-variant': '#005236',
        'secondary': '#006c49',
        'error': '#ba1a1a',
        'surface': '#faf8ff',
        'on-primary-container': '#9ffdd3',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'surface-variant': '#dae2fd',
        'inverse-surface': '#283044',
        'tertiary': '#375a00',
        'tertiary-fixed-dim': '#91db2a',
        'on-background': '#131b2e',
        'surface-tint': '#006c4e',
        'on-surface-variant': '#3e4943',
        'background': '#faf8ff',
        'outline': '#6e7a73',
        'surface-container': '#eaedff',
        'surface-container-low': '#f2f3ff',
        'surface-dim': '#d2d9f4',
        'on-tertiary-fixed-variant': '#304f00',
        'primary-fixed-dim': '#7bd8b1',
        'outline-variant': '#bdc9c1',
        'secondary-container': '#6cf8bb',
        'surface-container-highest': '#dae2fd',
        'inverse-on-surface': '#eef0ff',
        'primary-fixed': '#97f5cc',
        'tertiary-container': '#487500',
        'secondary-fixed-dim': '#4edea3',
        'on-tertiary': '#ffffff',
        'on-tertiary-fixed': '#102000',
        'primary-container': '#047857',
        'on-primary': '#ffffff',
        'surface-container-high': '#e2e7ff',
        'on-error-container': '#93000a',
        'surface-container-lowest': '#ffffff',
        'inverse-primary': '#7bd8b1',
        'secondary-fixed': '#6ffbbe',
        'on-primary-fixed': '#002115',
        'on-secondary-container': '#00714d',
        'on-secondary-fixed': '#002113'
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px'
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-lg': '1.5rem',
        'space-md': '1rem',
        'space-sm': '0.5rem',
        'gutter-mobile': '1rem',
        'margin-mobile': '1.25rem',
        'space-xl': '2.5rem',
        'gutter': '1.5rem',
        'margin': '2.5rem'
      },
      fontFamily: {
        'headline-lg-mobile': ['Plus Jakarta Sans'],
        'body-sm': ['Inter'],
        'headline-md': ['Plus Jakarta Sans'],
        'display-lg': ['Plus Jakarta Sans'],
        'body-md': ['Inter'],
        'body-lg': ['Inter'],
        'label-lg': ['Plus Jakarta Sans'],
        'label-sm': ['Plus Jakarta Sans'],
        'headline-sm': ['Plus Jakarta Sans'],
        'label-md': ['Plus Jakarta Sans'],
        'headline-lg': ['Plus Jakarta Sans'],
        'title-md': ['Plus Jakarta Sans'],
        'display-lg-mobile': ['Plus Jakarta Sans']
      },
      fontSize: {
        'headline-lg-mobile': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-sm': ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'headline-md': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-lg': ['56px', { lineHeight: '64px', letterSpacing: '-0.03em', fontWeight: '800' }],
        'body-md': ['15px', { lineHeight: '22px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-sm': ['11px', { lineHeight: '14px', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-sm': ['22px', { lineHeight: '28px', fontWeight: '600' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '700' }],
        'headline-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title-md': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'display-lg-mobile': ['38px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '800' }]
      }
    }
  }
};
if (typeof tailwind !== 'undefined') {
  tailwind.config = window.tailwind.config;
}
