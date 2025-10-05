export const FORMS_CONFIG = {
  formspree: {
    endpoint: "https://formspree.io/f/xpwgqkdp", // Placeholder - reemplazar con endpoint real
    enabled: true,
  },
  netlify: {
    enabled: import.meta.env.VITE_NETLIFY_FORMS === "true",
  },
};

export const FORM_FIELDS = {
  eventTypes: [
    "Evento Corporativo",
    "Concierto/Show",
    "Wedding/Evento Social",
    "Conferencia/Taller",
    "Festival",
    "Evento Deportivo",
    "Otro",
  ],
};
