export default {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    text: "#000000",
    background: "#f7f7f7",
    primary: "#003262",
    secondary: "#3B7EA1",
    accent: "#FDB515",
    muted: "#F6F5F1",
    modes: {
      dark: {
        text: "#ffffff",
        background: "#001931",
        primary: "#00B0DA",
        muted: "#002C56",
      },
    },
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: "freight-neo-pro, sans-serif, system-ui,",
    heading: "freight-text-pro, inherit",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
  },
  // variants: {
  // },
  // buttons: {
  //   primary: {
  //     color: 'white',
  //     bg: 'primary',
  //   }
  // },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
  },
}
