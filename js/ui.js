/**
 * UI Module
 * Handles user interface interactions and events
 */

import { TextProcessor } from './textProcessing.js';
import { ProPresenterFormat } from './proPresenterFormat.js';
import { Diagnostics } from './diagnostics.js';

export class UI {
  constructor() {
    this.elements = this.initializeElements();
    this.bindEvents();
    this.showDiagnostics();
  }

  /**
   * Initialize DOM element references
   * @returns {Object} Object containing DOM element references
   */
  initializeElements() {
    return {
      input: document.getElementById('input'),
      title: document.getElementById('titel'),
      artist: document.getElementById('artiest'),
      noTranslation: document.getElementById('noTranslation'),
      diagnostics: document.getElementById('diagnostics'),
      exportBtn: document.getElementById('exportBtn')
    };
  }

  /**
   * Bind event listeners to UI elements
   */
  bindEvents() {
    // Real-time diagnostics
    this.elements.input.addEventListener('input', () => this.showDiagnostics());
    this.elements.title.addEventListener('input', () => this.showDiagnostics());
    this.elements.artist.addEventListener('input', () => this.showDiagnostics());
    this.elements.noTranslation.addEventListener('change', () => this.showDiagnostics());

    // Export functionality
    this.elements.exportBtn.addEventListener('click', () => this.handleExport());
  }

  /**
   * Get current form data
   * @returns {Object} Current form values
   */
  getFormData() {
    return {
      artist: this.elements.artist.value.trim(),
      title: this.elements.title.value.trim(),
      text: this.elements.input.value.trim(),
      noTranslation: this.elements.noTranslation.checked
    };
  }

  /**
   * Update diagnostics display
   */
  showDiagnostics() {
    const formData = this.getFormData();
    const lines = TextProcessor.parseLines(formData.text);
    
    const diagnosticData = {
      title: formData.title,
      artist: formData.artist,
      lines: lines
    };

    const message = Diagnostics.getDiagnosticMessage(diagnosticData);
    this.elements.diagnostics.textContent = message;
  }

  /**
   * Handle export button click
   */
  handleExport() {
    try {
      const formData = this.getFormData();
      
      // Normalize input data
      const normalizedData = {
        artist: TextProcessor.normalize(formData.artist),
        title: TextProcessor.normalize(formData.title),
        lines: TextProcessor.parseLines(TextProcessor.normalize(formData.text)),
        noTranslation: formData.noTranslation
      };

      // Generate ProPresenter document
      const xmlOutput = ProPresenterFormat.generateDocument(normalizedData);
      
      // Generate filename
      const filename = TextProcessor.generateFilename(normalizedData.artist, normalizedData.title);
      
      // Download file
      this.downloadFile(xmlOutput, filename);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('An error occurred during export. Check the console for details.');
    }
  }

  /**
   * Create and trigger file download
   * @param {string} content - File content
   * @param {string} filename - File name
   */
  downloadFile(content, filename) {
    // Clean up any existing object URL
    if (this.currentFileURL) {
      URL.revokeObjectURL(this.currentFileURL);
    }

    // Create new blob and object URL
    const blob = new Blob([content], { type: 'text/plain' });
    this.currentFileURL = URL.createObjectURL(blob);

    // Create and trigger download link
    const link = document.createElement('a');
    link.setAttribute('download', filename);
    link.href = this.currentFileURL;
    link.dispatchEvent(new MouseEvent('click'));
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.currentFileURL) {
      URL.revokeObjectURL(this.currentFileURL);
    }
  }
}
