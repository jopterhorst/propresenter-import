# ProPresenter Import Tool

A web-based tool for converting bilingual song lyrics into ProPresenter .pro6 format with dual-language support.

## How It Works

This tool creates ProPresenter files that leverage **slide text** and **slide notes** for bilingual displays:

- **First language** (e.g., English) → Goes into slide **notes** (accessible via slide notes text box)
- **Second language** (e.g., Dutch, Spanish, French, etc.) → Goes into slide **text** (main slide content)

This allows you to create ProPresenter themes with both:
1. **Main slide text box** displaying the second language lyrics
2. **Slide notes text box** displaying the first language lyrics

Both languages can be shown simultaneously with different formatting, positioning, and styling.

**Note**: While the examples use English/Dutch, this tool works with **any language pair**. The first language goes to slide notes, the second to slide text.

## ProPresenter Setup Required

To use the generated .pro6 files effectively:

1. **Create a custom theme** in ProPresenter with two text elements:
   - Main text element for slide content (second language)
   - Notes text element for slide notes (first language)
2. **Position and style** each text element as desired (different fonts, sizes, colors, positions)
3. **Import the .pro6 file** - it will use your dual-language theme automatically

## Files Structure

- `index.html` - Main HTML file with modular JavaScript architecture
- `js/` - JavaScript modules folder
  - `main.js` - Application entry point
  - `textProcessing.js` - Text normalization and utility functions
  - `proPresenterFormat.js` - ProPresenter XML/RTF generation
  - `diagnostics.js` - Text analysis and issue detection
  - `ui.js` - User interface management

## Features

- **Dual-Language Support**: First language in slide notes, second language in slide text
- **Universal Language Support**: Works with any language pair (English/Dutch, English/Spanish, etc.)
- **ProPresenter Integration**: Works with slide text + slide notes text boxes
- **Smart Text Processing**: Automatically normalizes curly quotes, dashes, and NBSP
- **Real-time Diagnostics**: Shows potential text issues before export
- **XML Safety**: Proper escaping for XML attributes
- **UTF-8 Safe**: Uses proper Base64 encoding for international characters
- **ProPresenter Compatible**: Generates valid .pro6 files with proper RTF formatting

## Usage

### Step 1: Prepare Your Lyrics
1. Open `index.html` in a web browser
2. Enter artist and title information
3. Paste lyrics in the text area in alternating format:
   ```
   First language line 1 (e.g., English)
   Second language line 1 (e.g., Dutch)
   
   First language line 2
   Second language line 2
   ```
4. Check "No translations" for single-language mode
5. Click "Convert Now" to generate and download the .pro6 file

### Step 2: Setup ProPresenter Theme
1. **Create a new theme** in ProPresenter
2. **Add two text elements**:
   - **Slide Text Element**: Will display second language lyrics (main slide content)
   - **Slide Notes Element**: Will display first language lyrics (from slide notes)
3. **Position and style** each element:
   - Different fonts, sizes, colors
   - Different screen positions
   - Set text sources: "Slide Text" and "Slide Notes"

### Step 3: Import and Use
1. **Import the .pro6 file** into ProPresenter
2. **Apply your dual-language theme**
3. Both languages will display simultaneously according to your theme layout

## Development

The main application (`index.html`) uses a modular architecture that provides better:
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

- **Language Flexibility**: Works with any language pair - English/Spanish, French/German, etc.
- Use the diagnostics panel to check for text formatting issues
- Non-ASCII characters are preserved safely via UTF-8 encoding
- Empty lines are automatically filtered out
- File names are generated from artist/title fields
- The tool alternates lines: odd lines → slide notes, even lines → slide text
