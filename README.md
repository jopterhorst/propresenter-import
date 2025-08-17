# ProPresenter Import Tool

A web-based tool for converting bilingual song lyrics (English/Dutch) into ProPresenter .pro6 format with dual-language support.

## How It Works

This tool creates ProPresenter files that leverage **slide text** and **slide notes** for bilingual displays:

- **English text** → Goes into slide **notes** (accessible via slide notes text box)
- **Dutch text** → Goes into slide **text** (main slide content)

This allows you to create ProPresenter themes with both:
1. **Main slide text box** displaying Dutch lyrics
2. **Slide notes text box** displaying English lyrics

Both languages can be shown simultaneously with different formatting, positioning, and styling.

## ProPresenter Setup Required

To use the generated .pro6 files effectively:

1. **Create a custom theme** in ProPresenter with two text elements:
   - Main text element for slide content (Dutch)
   - Notes text element for slide notes (English)
2. **Position and style** each text element as desired (different fonts, sizes, colors, positions)
3. **Import the .pro6 file** - it will use your dual-language theme automatically

## Files Structure

### Main Application
- `index.html` - Main HTML file with modular JavaScript architecture

### Legacy Version
- `propresenter_import.html` - Original single-file version with all code embedded
- `js/` - JavaScript modules folder
  - `main.js` - Application entry point
  - `textProcessing.js` - Text normalization and utility functions
  - `proPresenterFormat.js` - ProPresenter XML/RTF generation
  - `diagnostics.js` - Text analysis and issue detection
  - `ui.js` - User interface management

## Features

- **Dual-Language Support**: English in slide notes, Dutch in slide text
- **ProPresenter Integration**: Works with slide text + slide notes text boxes
- **Smart Text Processing**: Automatically normalizes curly quotes, dashes, and NBSP
- **Real-time Diagnostics**: Shows potential text issues before export
- **XML Safety**: Proper escaping for XML attributes
- **UTF-8 Safe**: Uses proper Base64 encoding for international characters
- **ProPresenter Compatible**: Generates valid .pro6 files with proper RTF formatting

## Usage

### Step 1: Prepare Your Lyrics
1. Open `index.html` in a web browser (or the legacy `propresenter_import.html`)
2. Enter artist and title information
3. Paste lyrics in the text area in alternating format:
   ```
   English line 1
   Dutch line 1
   
   English line 2
   Dutch line 2
   ```
4. Check "Geen vertalingen" for single-language mode
5. Click "Omzetten maar" to generate and download the .pro6 file

### Step 2: Setup ProPresenter Theme
1. **Create a new theme** in ProPresenter
2. **Add two text elements**:
   - **Slide Text Element**: Will display Dutch lyrics (main slide content)
   - **Slide Notes Element**: Will display English lyrics (from slide notes)
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

- Use the diagnostics panel to check for text formatting issues
- Non-ASCII characters are preserved safely via UTF-8 encoding
- Empty lines are automatically filtered out
- File names are generated from artist/title fields
