
/* =================================
   AURUM PREMIUM STORE
   WEBSITE CONFIGURATION
================================= */

const STORE_CONFIG = {
  // Store Information
  storeName: "AURUM",
  storeSubtitle: "Premium E-commerce Store",
  tagline: "Experience Luxury. Shop AURUM.",

  // Theme Colors
  theme: {
    background: "#080808",
    surface: "#141414",
    gold: "#D7B56D",
    text: "#FFFFFF",
    muted: "#A5A5A5"
  },

  // Currency
  currency: "BDT",
  currencySymbol: "৳",

  // Delivery Settings
  shippingFee: 100,
  freeShippingAt: 5000,

  // Tax Settings
  taxRate: 0,

  // Website Settings
  settings: {
    demoMode: true,
    enableWishlist: true,
    enableSearch: true,
    enableCategories: true,
    enableCart: true
  },

  // Contact Information
  contact: {
    email: "",
    phone: "",
    address: ""
  }
};

// Make configuration available to other scripts
window.STORE_CONFIG = STORE_CONFIG;
