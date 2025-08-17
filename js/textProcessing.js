/**
 * Text Processing Module
 * Handles text normalization, validation, and formatting
 */

export class TextProcessor {
  /**
   * Normalize curly punctuation and NBSP
   * @param {string} text - Text to normalize
   * @returns {string} Normalized text
   */
  static normalize(text) {
    return text
      .replace(/\u2019|\u2018/g, "'")   // ' ' → '
      .replace(/\u201C|\u201D/g, '"')   // " " → "
      .replace(/\u2013|\u2014/g, '-')   // – — → -
      .replace(/\u00A0/g, ' ');         // NBSP → space
  }

  /**
   * Escape text for XML attributes
   * @param {string} text - Text to escape
   * @returns {string} XML-safe text
   */
  static xmlAttrEscape(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * UTF-8 safe Base64 encoding (instead of btoa)
   * @param {string} str - String to encode
   * @returns {string} Base64 encoded string
   */
  static b64utf8(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin);
  }

  /**
   * Parse input text into clean lines
   * @param {string} rawText - Raw input text
   * @returns {string[]} Array of non-empty, trimmed lines
   */
  static parseLines(rawText) {
    return rawText
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  /**
   * Generate safe filename from artist and title
   * @param {string} artist - Artist name
   * @param {string} title - Song title
   * @returns {string} Safe filename with .pro6 extension
   */
  static generateFilename(artist, title) {
    const normalizedArtist = this.normalize(artist.trim());
    const normalizedTitle = this.normalize(title.trim());
    
    if (!normalizedTitle && !normalizedArtist) {
      return 'song.pro6';
    }
    
    return [normalizedArtist, normalizedTitle]
      .filter(Boolean)
      .join(' - ') + '.pro6';
  }
}
