# ProPresenter Import Tool

A web-based tool for converting bilingual song lyrics (English/Dutch) into ProPresenter .pro6 format.

## Files Structure

### Original Version
- `propresenter_import.html` - Single-file version with all code embedded

### Modular Version (NEW)
- `propresenter_import_modular.html` - Main HTML file with modular JavaScript
- `js/` - JavaScript modules folder
  - `main.js` - Application entry point
  - `textProcessing.js` - Text normalization and utility functions
  - `proPresenterFormat.js` - ProPresenter XML/RTF generation
  - `diagnostics.js` - Text analysis and issue detection
  - `ui.js` - User interface management

## Features

- **Bilingual Support**: Handles English/Dutch paired lyrics
- **Smart Text Processing**: Automatically normalizes curly quotes, dashes, and NBSP
- **Real-time Diagnostics**: Shows potential text issues before export
- **XML Safety**: Proper escaping for XML attributes
- **UTF-8 Safe**: Uses proper Base64 encoding for international characters
- **ProPresenter Compatible**: Generates valid .pro6 files

## Usage

1. Open either HTML file in a web browser
2. Enter artist and title information
3. Paste lyrics in the text area (alternating English/Dutch lines)
4. Check "Geen vertalingen" for single-language mode
5. Click "Omzetten maar" to generate and download the .pro6 file

## Development

The modular version provides better:
- **Code Organization**: Separated concerns across modules
- **Maintainability**: Easier to update individual components
- **Testing**: Each module can be tested independently
- **Extensibility**: Simple to add new features

### Module Responsibilities

- **TextProcessor**: Text normalization, XML escaping, filename generation
- **ProPresenterFormat**: XML/RTF template generation, document assembly
- **Diagnostics**: Text analysis, issue detection and reporting
- **UI**: DOM manipulation, event handling, file downloads

## Browser Compatibility

Requires modern browser support for:
- ES6 Modules
- TextEncoder/TextDecoder
- Crypto.getRandomValues
- Blob/URL APIs

## Tips

- Use the diagnostics panel to check for text formatting issues
- Non-ASCII characters are preserved safely via UTF-8 encoding
- Empty lines are automatically filtered out
- File names are generated from artist/title fields
