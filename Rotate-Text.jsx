#target photoshop

// Create a new document
var doc = app.documents.add(
    8,     // Width in inches
    10,    // Height in inches
    150,   // Resolution in DPI
    '8-bit Test Document', // Document Name
    NewDocumentMode.RGB,   // Document Mode: RGB
    DocumentFill.WHITE,    // Background Color: White
    1,     // Pixel Aspect Ratio
    BitsPerChannelType.EIGHT // 8 bits per channel
);

// Function to create a text layer
function createTextLayer(textContent, fontName, fontSize, textColor, rotationAngle, index, positionOffset) {
    var textLayer = doc.artLayers.add();
    textLayer.kind = LayerKind.TEXT;
    textLayer.name = 'Text Layer ' + index;
    
    var textItem = textLayer.textItem;
    textItem.contents = textContent;
    textItem.font = fontName;
    textItem.size = fontSize;
    textItem.color = textColor;
    
    // Position the text in the center of the document with an optional offset
    textItem.position = [doc.width / 2, (doc.height / 2) + (positionOffset || 0)];
    textItem.justification = Justification.CENTER;
    
    // Rotate the text layer
    textLayer.rotate(rotationAngle);
}

// Set text properties
var textContent = 'We are Adobe Photoshop';
var textColor = new SolidColor();
textColor.rgb.red = 94;
textColor.rgb.green = 27;
textColor.rgb.blue = 27;

// Create the text layers with different fonts, each rotated 20 degrees apart
createTextLayer(textContent, 'Arial-BoldMT', 40, textColor, 0, 1);
createTextLayer(textContent, 'CourierNewPSMT', 40, textColor, 20, 2);
createTextLayer(textContent, 'Georgia', 40, textColor, 40, 3);
createTextLayer(textContent, 'TimesNewRomanPSMT', 30, textColor, 60, 4);
createTextLayer(textContent, 'Verdana', 30, textColor, 80, 5);

// Create a new text layer with Times New Roman Italic font, size 55, and RGB 48, 61, 140, moved 100 pixels up
var rabbitHoleColor = new SolidColor();
rabbitHoleColor.rgb.red = 48;
rabbitHoleColor.rgb.green = 61;
rabbitHoleColor.rgb.blue = 140;
createTextLayer('Find the Rabbit Hole', 'TimesNewRomanPS-ItalicMT', 55, rabbitHoleColor, 0, 6, -1);

// Display the document
app.activeDocument = doc;
