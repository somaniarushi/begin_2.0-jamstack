export default {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    text: "#333333",
    headingText: "#003262",
    textOnHighlight: "#fb831f",
    background: "#f7f7f7",
    primary: "#FDB515",
    secondary: "#C4820E",
    accent: "#00B0DA",
    highlight: "#FFECC5",
    muted: "#F2EFEA",
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
    body: "freight-sans-pro, system-ui, sans-serif",
    heading: "freight-sans-pro, system-ui, sans-serif",
    monospace: "Menlo, monospace",
  },
  fontWeights: {
    body: 500,
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
  variants: {},
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      mb: 2,
      color: "headingText",
    },
    pageTitle: {
      variant: "text.heading",
      fontSize: [4, 5],
      mb: 3,
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.2em",
    },
  },
  links: {
    nav: {
      display: "block",
      width: "100%",
      p: 2,
      my: 2,
      color: "inherit",
      textDecoration: "none",
      fontSize: 2,
      fontWeight: "bold",
      bg: "transparent",
      transitionProperty: "background-color",
      transitionTimingFunction: "ease-out",
      transitionDuration: ".2s",
      borderRadius: 2,
      "&:hover": {
        bg: "highlight",
      },
      "&.active": {
        color: "textOnHighlight",
        bg: "highlight",
      },
    },
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
      fontFamily: "body",
      fontWeight: "body",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
  },
}
