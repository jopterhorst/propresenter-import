/**
 * Main Application Entry Point
 * Initializes the ProPresenter Import application
 */

import { UI } from './ui.js';

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new UI();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    app.destroy();
  });
});
