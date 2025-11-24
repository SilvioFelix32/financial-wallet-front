export const theme = {
  colors: {
    background: "#F5F6FA",
    surface: "#FFFFFF",
    surfaceAlt: "#F0F1F4",
    textPrimary: "#1A1A1A",
    textSecondary: "#4D4D4D",
    textDisabled: "#9A9A9A",
    primary: "#2F80ED",
    primaryHover: "#1C6CD3",
    primarySoft: "#E8F1FD",
    success: "#27AE60",
    successHover: "#1F8F52",
    successSoft: "#E7F7EF",
    warning: "#F2C94C",
    warningSoft: "#FFF8E1",
    error: "#EB5757",
    errorHover: "#C64545",
    errorSoft: "#FDECEC",
    border: "#E0E0E0",
    borderDark: "#C7C7C7",
    shadow: "rgba(0,0,0,0.08)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: "2rem",
    h2: "1.5rem",
    h3: "1.2rem",
    body: "1rem",
    small: "0.875rem",
  },
};

export type Theme = typeof theme;

