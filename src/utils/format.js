// Utility functions for formatting

export const formatPhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2-$3");
};

export const formatWhatsAppLink = (phone) => {
  if (!phone) return "";
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}`;
};

export const formatEmailLink = (email) => {
  if (!email) return "";
  return `mailto:${email}`;
};

export const formatAddressLink = (address) => {
  if (!address) return "";
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};
