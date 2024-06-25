#target photoshop

// Create a new document with dimensions in inches
var widthInInches = 8;
var heightInInches = 10;
var resolution = 150; // DPI (dots per inch)

var doc = app.documents.add(
    UnitValue(widthInInches, "in"), // Width in inches
    UnitValue(heightInInches, "in"), // Height in inches
    resolution, // Resolution in DPI
    '8-bit Test Document', // Document Name
    NewDocumentMode.RGB, // Document Mode: RGB
    DocumentFill.WHITE, // Background Color: White
    1, // Pixel Aspect Ratio
    BitsPerChannelType.EIGHT // 8 bits per channel
);

// Create a new layer for the checkerboard pattern
var checkerboardLayer = doc.artLayers.add();
checkerboardLayer.name = 'Checkerboard Pattern';

// Define the checkerboard pattern size
var squareSizeInches = 2; // Size of each square in inches
var squareSizePixels = squareSizeInches * resolution; // Convert square size to pixels (2 inches * 150 DPI)

// Calculate the number of squares needed
var numSquaresX = Math.ceil(doc.width.as('px') / squareSizePixels);
var numSquaresY = Math.ceil(doc.height.as('px') / squareSizePixels);

// Function to set the foreground color
function setColor(r, g, b) {
    var color = new SolidColor();
    color.rgb.red = r;
    color.rgb.green = g;
    color.rgb.blue = b;
    app.foregroundColor = color;
}

// Create the checkerboard pattern
doc.selection.selectAll();
doc.selection.clear();
for (var y = 0; y < numSquaresY; y++) {
    for (var x = 0; x < numSquaresX; x++) {
        if ((x + y) % 2 == 0) {
            setColor(120, 50, 50); // Red
        } else {
            setColor(0, 0, 0); // Black
        }
        var rect = [
            [x * squareSizePixels, y * squareSizePixels],
            [(x + 1) * squareSizePixels, y * squareSizePixels],
            [(x + 1) * squareSizePixels, (y + 1) * squareSizePixels],
            [x * squareSizePixels, (y + 1) * squareSizePixels]
        ];
        doc.selection.select(rect);
        doc.selection.fill(app.foregroundColor);
        doc.selection.deselect();
    }
}

// Display the document
app.activeDocument = doc;
