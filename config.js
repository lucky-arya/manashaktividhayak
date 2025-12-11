// API Configuration
// Update this after deploying to Vercel
const API_CONFIG = {
  // For local development
  LOCAL: 'http://localhost:5000',
  
  // For production (update with your Vercel URL after deployment)
  PRODUCTION: 'https://your-backend-url.vercel.app',
  
  // Auto-detect environment
  get BASE_URL() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? this.LOCAL
      : this.PRODUCTION;
  }
};

// Export for use in your application
window.API_CONFIG = API_CONFIG;
