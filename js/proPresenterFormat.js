/**
 * ProPresenter Format Module
 * Handles ProPresenter .pro6 XML and RTF generation
 */

import { TextProcessor } from './textProcessing.js';

export class ProPresenterFormat {
  // ProPresenter XML templates
  static XML_DOCUMENT_BEFORE = '<RVPresentationDocument CCLIArtistCredits="" CCLIAuthor="" CCLICopyrightYear="" CCLIDisplay="false" CCLIPublisher="" CCLISongNumber="" CCLISongTitle="REPLACETITEL" backgroundColor="0 0 0 0" buildNumber="100991749" category="de Basis" chordChartPath="" docType="0" drawingBackgroundColor="false" height="1080" lastDateUsed="REPLACEDATUM" notes="" os="2" resourcesDirectory="" selectedArrangementID="" usedCount="0" uuid="REPLACEUUID" versionNumber="600" width="1920"><RVTimeline duration="0.000000" loop="false" playBackRate="1.000000" rvXMLIvarName="timeline" selectedMediaTrackIndex="0" timeOffset="0.000000"><array rvXMLIvarName="timeCues"></array><array rvXMLIvarName="mediaTracks"></array></RVTimeline><array rvXMLIvarName="groups"><RVSlideGrouping color="0 0 0 0" name="" uuid="REPLACEUUID"><array rvXMLIvarName="slides">';
  
  static XML_DOCUMENT_AFTER = '</array></RVSlideGrouping></array><array rvXMLIvarName="arrangements"></array></RVPresentationDocument>';
  
  static XML_SLIDE_BEFORE = '<RVDisplaySlide UUID="REPLACEUUID" backgroundColor="0 0 0 1" chordChartPath="" drawingBackgroundColor="false" enabled="true" highlightColor="1 1 0 1" hotKey="" label="" notes="REPLACENOTES" socialItemCount="1"><array rvXMLIvarName="cues"></array><array rvXMLIvarName="displayElements"><RVTextElement UUID="REPLACEUUID" additionalLineFillHeight="0.000000" adjustsHeightToFit="false" bezelRadius="0.000000" displayDelay="0.000000" displayName="Default" drawLineBackground="false" drawingFill="false" drawingShadow="false" drawingStroke="false" fillColor="1 1 1 1" fromTemplate="false" lineBackgroundFillColor="1 1 1 1" lineBackgroundType="0" lineFillVerticalOffset="0.000000" locked="false" opacity="1.000000" persistent="false" revealType="0" rotation="0.000000" source="" textSourceRemoveLineReturnsOption="false" typeID="0" useAllCaps="true" verticalAlignment="0"><RVRect3D rvXMLIvarName="position">{-4 877 0 1930 153}</RVRect3D><shadow rvXMLIvarName="shadow">0.000000|0 0 0 1|{4, -4}</shadow><dictionary rvXMLIvarName="stroke"><NSColor rvXMLDictionaryKey="RVShapeElementStrokeColorKey">0 0 0 1</NSColor><NSNumber hint="integer" rvXMLDictionaryKey="RVShapeElementStrokeWidthKey">0</NSNumber></dictionary><NSString rvXMLIvarName="RTFData">';
  
  static XML_SLIDE_AFTER = '</NSString></RVTextElement></array></RVDisplaySlide>';

  // RTF templates
  static RTF_BEFORE = '{\\rtf1\\ansi\\ansicpg1252\\cocoartf2580\n' +
    '\\cocoatextscaling0\\cocoaplatform0{\\fonttbl\\f0\\fnil\\fcharset0 CMGSans-Medium;\\f1\\fnil\\fcharset0 CMGSans-Regular;}\n' +
    '{\\colortbl;\\red255\\green255\\blue255;\\red255\\green255\\blue255;\\red0\\green0\\blue0;}\n' +
    '{\\*\\expandedcolortbl;;\\cssrgb\\c100000\\c100000\\c100000;\\cssrgb\\c0\\c0\\c0;}\n' +
    '\\deftab720\n' +
    '\\pard\\pardeftab720\\qc\\partightenfactor0\n' +
    '\n' +
    '\\f0\\fs70 \\cf2 \\kerning1\\expnd28\\expndtw140\n' +
    '\\outl0\\strokewidth-40 \\strokec3 ';

  static RTF_BETWEEN = '\\\n' +
    '\\pard\\pardeftab720\\qc\\partightenfactor0\n' +
    '\n' +
    '\\f1\\i\\fs60 \\cf2 \\kerning1\\expnd16\\expndtw80\n';

  static RTF_AFTER = '}';

  /**
   * Generate UUID v4
   * @returns {string} UUID string
   */
  static generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  /**
   * Create RTF content for a slide
   * @param {string} englishText - English text line
   * @param {string} dutchText - Dutch text line (optional)
   * @returns {string} RTF formatted content
   */
  static createRTFContent(englishText, dutchText = '') {
    if (dutchText) {
      // Only Dutch text goes in the slide text box (using primary font style)
      return this.RTF_BEFORE + dutchText + this.RTF_BETWEEN + this.RTF_AFTER;
    } else {
      // If no Dutch text, use English text in the slide text box
      return this.RTF_BEFORE + englishText + this.RTF_BETWEEN + this.RTF_AFTER;
    }
  }

  /**
   * Create a single slide XML
   * @param {string} englishText - English text for the slide
   * @param {string} dutchText - Dutch text for the slide (optional)
   * @returns {string} Complete slide XML
   */
  static createSlide(englishText, dutchText = '') {
    const rtfContent = this.createRTFContent(englishText, dutchText);
    const base64RTF = TextProcessor.b64utf8(rtfContent);
    
    return this.XML_SLIDE_BEFORE
      .replace('REPLACENOTES', TextProcessor.xmlAttrEscape(englishText))
      .replace(/REPLACEUUID/g, this.generateUUID())
      + base64RTF + this.XML_SLIDE_AFTER;
  }

  /**
   * Generate complete ProPresenter document
   * @param {Object} options - Generation options
   * @param {string} options.title - Song title
   * @param {string} options.artist - Artist name
   * @param {string[]} options.lines - Array of text lines
   * @param {boolean} options.noTranslation - Single line mode
   * @returns {string} Complete ProPresenter XML document
   */
  static generateDocument({ title, artist, lines, noTranslation = false }) {
    let slidesXML = '';
    
    for (let i = 0; i < lines.length;) {
      const englishLine = lines[i] || '';
      
      if (englishLine === '' || noTranslation) {
        // Single line slide
        slidesXML += this.createSlide(englishLine);
        i += 1;
      } else {
        // Bilingual slide
        const dutchLine = lines[i + 1] || '';
        slidesXML += this.createSlide(englishLine, dutchLine);
        i += 2;
      }
    }

    // Get current timestamp
    const timestamp = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
    
    return this.XML_DOCUMENT_BEFORE
      .replace(/REPLACEUUID/g, this.generateUUID())
      .replace('REPLACETITEL', TextProcessor.xmlAttrEscape(title))
      .replace('REPLACEDATUM', timestamp)
      + slidesXML + this.XML_DOCUMENT_AFTER;
  }
}
