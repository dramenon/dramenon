#target photoshop

// Create a new document
var doc = app.documents.add(9, 12, 300, "Sample Comic Page Template", NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1.0, BitsPerChannelType.EIGHT);

// Create a new layer for the background
var backgroundLayer = doc.artLayers.add();
backgroundLayer.name = "Background";

// Fill the background layer with the specified color
var fillColor = new SolidColor();
fillColor.rgb.red = 210;
fillColor.rgb.green = 210;
fillColor.rgb.blue = 190;
doc.selection.selectAll();
doc.selection.fill(fillColor);
doc.selection.deselect();

// Move the background layer to the bottom
backgroundLayer.move(doc, ElementPlacement.PLACEATEND);

// Create folders and layers
var artFolder = doc.layerSets.add();
artFolder.name = "Art";

// Create four subfolders within the "Art" folder and add an empty layer to each
var panelNames = ["Panel 1", "Panel 2", "Panel 3", "Panel 4"];
for (var i = 0; i < panelNames.length; i++) {
    var panelFolder = artFolder.layerSets.add();
    panelFolder.name = panelNames[i];
    var artLayer = panelFolder.artLayers.add();
    artLayer.name = "art " + panelNames[i];
}

var drawingLayer = artFolder.artLayers.add();
drawingLayer.name = "drawing";

var letteringFolder = doc.layerSets.add();
letteringFolder.name = "Lettering";

var colorAdjustmentsFolder = doc.layerSets.add();
colorAdjustmentsFolder.name = "Color Adjustments";

// Add new guide layout - first set
var margins1 = 0.375; // 0.375 inch offset
var resolution = doc.resolution; // Get the document resolution

// Convert margins from inches to pixels
var offset1 = margins1 * resolution;

// Horizontal guides
doc.guides.add(Direction.HORIZONTAL, UnitValue(offset1, "px"));
doc.guides.add(Direction.HORIZONTAL, UnitValue((doc.height - margins1) * resolution, "px"));

// Vertical guides
doc.guides.add(Direction.VERTICAL, UnitValue(offset1, "px"));
doc.guides.add(Direction.VERTICAL, UnitValue((doc.width - margins1) * resolution, "px"));

// Add new guide layout - second set
var margins2 = 0.125; // 0.125 inch offset

// Convert margins from inches to pixels
var offset2 = margins2 * resolution;

// Horizontal guides
doc.guides.add(Direction.HORIZONTAL, UnitValue(offset2, "px"));
doc.guides.add(Direction.HORIZONTAL, UnitValue((doc.height - margins2) * resolution, "px"));

// Vertical guides
doc.guides.add(Direction.VERTICAL, UnitValue(offset2, "px"));
doc.guides.add(Direction.VERTICAL, UnitValue((doc.width - margins2) * resolution, "px"));

// Function to collapse all folders
function collapseAllLayers(layerSet) {
    for (var i = 0; i < layerSet.layerSets.length; i++) {
        var subSet = layerSet.layerSets[i];
        subSet.visible = false; // Toggle visibility to collapse
        subSet.visible = true;
    }
}

// Collapse all top-level folders
collapseAllLayers(doc);

alert("9in x 12in Document setup complete!");
