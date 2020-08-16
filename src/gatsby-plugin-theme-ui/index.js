export default {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    text: "#333333",
    background: "#f7f7f7",
    primary: "#003262",
    secondary: "#3B7EA1",
    accent: "#FDB515",
    highlight: "rgba(0, 176, 218, 0.1)",
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
  radii: {
    default: 2,
  },
  variants: {},
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      mb: 2,
    },
    pageTitle: {
      variant: "text.heading",
      color: "primary",
      fontSize: [4, 5],
      mb: 5,
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
      borderRadius: "default",
      "&:hover": {
        bg: "highlight",
      },
      "&.active": {
        color: "secondary",
        bg: "highlight",
      },
    },
    resourceTitle: {
      textDecoration: "none",
      color: "inherit",
      "&:hover": {
        color: "secondary",
      },
    },
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
      fontFamily: "body",
      fontWeight: "body",
      cursor: "pointer",
      outline: "none",
    },
    chip: {
      cursor: "pointer",
      outline: "none",
      borderRadius: "default",
      border: "1px solid #FDB515",
      bg: "transparent",
      color: "accent",
      p: 1,
      mr: 2,
      mb: 2,
      fontFamily: "body",
      fontWeight: 700,
      "&.active": {
        bg: "accent",
        color: "white",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
    },
  },
}
