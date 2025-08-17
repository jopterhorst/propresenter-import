/**
 * Diagnostics Module
 * Handles text analysis and issue detection
 */

export class Diagnostics {
  /**
   * Analyze text for potential issues
   * @param {string} text - Text to analyze
   * @returns {string[]} Array of detected issues
   */
  static analyzeText(text) {
    const issues = [];
    
    if (/[""]/.test(text)) issues.push('curly double quotes " "');
    if (/['']/.test(text)) issues.push('curly single quotes \' \'');
    if (/[–—]/.test(text)) issues.push('en/em dash – —');
    if (/\u00A0/.test(text)) issues.push('non-breaking space (NBSP)');
    if (/[&"<>]/.test(text)) issues.push('XML attr chars (& " < >)');
    if (/[^\x00-\x7F]/.test(text)) issues.push('non-ASCII (ok; UTF-8 safe)');
    
    return issues;
  }

  /**
   * Generate comprehensive analysis report
   * @param {Object} data - Data to analyze
   * @param {string} data.title - Song title
   * @param {string} data.artist - Artist name
   * @param {string[]} data.lines - Array of text lines
   * @returns {string} Analysis report
   */
  static generateReport({ title, artist, lines }) {
    const report = [];
    
    // Analyze title
    const titleIssues = this.analyzeText(title);
    if (titleIssues.length) {
      report.push(`Title issues: ${titleIssues.join(', ')}`);
    }

    // Analyze artist
    const artistIssues = this.analyzeText(artist);
    if (artistIssues.length) {
      report.push(`Artist issues: ${artistIssues.join(', ')}`);
    }

    // Check line pairing
    if (lines.length % 2 !== 0) {
      report.push(`⚠️ Odd number of non-empty lines (${lines.length}). EN/NL pairing may be off.`);
    }

    // Analyze individual lines
    lines.forEach((line, index) => {
      const lineIssues = this.analyzeText(line);
      if (lineIssues.length) {
        report.push(`Line ${index + 1}: ${lineIssues.join(', ')}\n  → ${line}`);
      }
    });

    return report.length 
      ? report.join('\n') 
      : 'No issues detected. Everything will be normalized/escaped safely.';
  }

  /**
   * Get diagnostic message with additional info
   * @param {Object} data - Data to analyze
   * @returns {string} Complete diagnostic message
   */
  static getDiagnosticMessage(data) {
    const report = this.generateReport(data);
    return `Diagnostics:\n${report}\n\n(Info) On export, text will be normalized (curly quotes/dashes/NBSP) and XML-escaped. Non-ASCII is preserved via UTF-8 Base64.`;
  }
}
