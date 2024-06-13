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

// Create a new layer for the checkerboard pattern
var checkerboardLayer = doc.artLayers.add();
checkerboardLayer.name = 'Checkerboard Pattern';

// Define the checkerboard pattern size
var squareSizeInches = 2; // Size of each square in inches
var squareSizePixels = squareSizeInches * 150; // Convert square size to pixels (2 inches * 150 DPI)

// Calculate the number of squares needed
var numSquaresX = Math.ceil(doc.width * 150 / squareSizePixels);
var numSquaresY = Math.ceil(doc.height * 150 / squareSizePixels);

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
            setColor(255, 0, 0); // Red
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

// Create a new dialog window
var dlg = new Window('dialog', 'Photoshop Script Dialog');

// Add a dropdown list to the dialog
dlg.add('statictext', undefined, 'Choose an effect:');
var dropdown = dlg.add('dropdownlist', undefined, [
    'Gaussian Blur', 
    'Sharpen', 
    'Invert Colors'
]);
dropdown.selection = 0; // Default selection

// Add an "Apply" button
var applyBtn = dlg.add('button', undefined, 'Apply');

// Add a "Cancel" button
var cancelBtn = dlg.add('button', undefined, 'Cancel', {name: 'cancel'});

// Define the functionality for the "Apply" button
applyBtn.onClick = function() {
    var effect = dropdown.selection.text;
    
    // Apply the selected effect to the active document
    if (app.documents.length > 0) {
        var doc = app.activeDocument;
        
        switch (effect) {
            case 'Gaussian Blur':
                applyGaussianBlur(doc);
                break;
            case 'Sharpen':
                applySharpen(doc);
                break;
            case 'Invert Colors':
                applyInvertColors(doc);
                break;
            default:
                alert('Unknown effect selected.');
        }
        app.refresh(); // Refresh the document to show the changes
    } else {
        alert('No document is open.');
    }
};

// Define the functionality for the "Cancel" button
cancelBtn.onClick = function() {
    dlg.close();
};

// Functions to apply effects
function applyGaussianBlur(doc) {
    doc.activeLayer.applyGaussianBlur(5);
}

function applySharpen(doc) {
    doc.activeLayer.applySharpen();
}

function applyInvertColors(doc) {
    doc.activeLayer.invert();
}

// Show the dialog and keep it open until the user closes it
dlg.center();
dlg.show();
