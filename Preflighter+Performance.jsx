#target photoshop

function extractLayersByType() {
    var doc = app.activeDocument;
    var layers = doc.layers;
    var layerInfo = {
        textLayers: [],
        shapeLayers: [],
        imageLayers: [],
        smartObjectLayers: [],
        patternLayers: [],
        lutLayers: [],
        otherLayers: [],
        textLayerCount: 0,
        shapeLayerCount: 0,
        imageLayerCount: 0,
        smartObjectLayerCount: 0,
        patternLayerCount: 0,
        lutLayerCount: 0,
        otherLayerCount: 0,
        totalLayers: 0,
        totalFolders: 0
    };

    function getLayerInfo(layer) {
        var info = layer.name;
        if (layer.grouped) {
            info += " (Clipped)";
        }
        if (hasLayerStyles(layer)) {
            info += " (FX)";
        }
        return info;
    }

    function hasLayerStyles(layer) {
        try {
            return layer.layerEffects.isValid;
        } catch (e) {
            return false;
        }
    }

    function traverseLayers(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            layerInfo.totalLayers++;
            if (layer.typename === "ArtLayer") {
                if (layer.kind === LayerKind.TEXT) {
                    layerInfo.textLayers.push(getLayerInfo(layer));
                    layerInfo.textLayerCount++;
                } else if (layer.kind === LayerKind.NORMAL) {
                    layerInfo.imageLayers.push(getLayerInfo(layer));
                    layerInfo.imageLayerCount++;
                } else if (layer.kind === LayerKind.SOLIDFILL) {
                    layerInfo.shapeLayers.push(getLayerInfo(layer));
                    layerInfo.shapeLayerCount++;
                } else if (layer.kind === LayerKind.SMARTOBJECT) {
                    layerInfo.smartObjectLayers.push(getLayerInfo(layer) + " (Smart Object)");
                    layerInfo.smartObjectLayerCount++;
                } else if (layer.kind === LayerKind.PATTERNFILL) {
                    layerInfo.patternLayers.push(getLayerInfo(layer) + " (Patterns)");
                    layerInfo.patternLayerCount++;
                } else if (layer.kind === LayerKind.COLORLOOKUP) {
                    layerInfo.lutLayers.push(getLayerInfo(layer) + " (LUT)");
                    layerInfo.lutLayerCount++;
                } else {
                    layerInfo.otherLayers.push(getLayerInfo(layer));
                    layerInfo.otherLayerCount++;
                }
            } else if (layer.typename === "LayerSet") {
                layerInfo.totalFolders++;
                traverseLayers(layer.layers);
            }
        }
    }

    traverseLayers(layers);

    return layerInfo;
}

function getDocumentInfo() {
    var doc = app.activeDocument;
    var colorMode;
    switch (doc.mode) {
        case DocumentMode.RGB:
            colorMode = "RGB";
            break;
        case DocumentMode.CMYK:
            colorMode = "CMYK";
            break;
        case DocumentMode.GRAYSCALE:
            colorMode = "Grayscale";
            break;
        case DocumentMode.BITMAP:
            colorMode = "Bitmap";
            break;
        case DocumentMode.INDEXEDCOLOR:
            colorMode = "Indexed Color";
            break;
        case DocumentMode.LAB:
            colorMode = "Lab Color";
            break;
        case DocumentMode.MULTICHANNEL:
            colorMode = "Multichannel";
            break;
        default:
            colorMode = "Unknown";
    }

    var bitDepth;
    switch (doc.bitsPerChannel) {
        case BitsPerChannelType.ONE:
            bitDepth = 1;
            break;
        case BitsPerChannelType.EIGHT:
            bitDepth = 8;
            break;
        case BitsPerChannelType.SIXTEEN:
            bitDepth = 16;
            break;
        case BitsPerChannelType.THIRTYTWO:
            bitDepth = 32;
            break;
        default:
            bitDepth = "Unknown";
    }

    var ppi = doc.resolution;
    var width = doc.width.as("px");
    var height = doc.height.as("px");

    return {
        colorMode: colorMode,
        bitDepth: bitDepth,
        ppi: ppi,
        width: width,
        height: height
    };
}

function checkPerformanceIssues() {
    var doc = app.activeDocument;
    var layerCount = doc.artLayers.length + doc.layerSets.length;
    var docWidth = doc.width.as('px');
    var docHeight = doc.height.as('px');
    var docResolution = doc.resolution;
    var docBitDepth = doc.bitsPerChannel;

    var performanceWarnings = [];

    // Check for large document size
    var docPixelCount = docWidth * docHeight;
    if (docPixelCount > 20000000) { // Example threshold: 20 million pixels
        performanceWarnings.push("Document size is very large (" + docHeight + " x " + docWidth + " pixels).");
    }

    // Check for high resolution
    if (docResolution > 300) { // Example threshold: 300 DPI
        performanceWarnings.push("Document resolution is very high (" + docResolution + " DPI).");
    }

    // Check for too many layers
    if (layerCount > 100) { // Example threshold: 100 layers
        performanceWarnings.push("Document has a high number of layers (" + layerCount + ").");
    }

    // Check for smart objects
    var smartObjectCount = 0;
    for (var i = 0; i < doc.artLayers.length; i++) {
        if (doc.artLayers[i].kind == LayerKind.SMARTOBJECT) {
            smartObjectCount++;
        }
    }
    if (smartObjectCount > 10) { // Example threshold: 10 smart objects
        performanceWarnings.push("Document has a high number of smart objects (" + smartObjectCount + ").");
    }

    // Check for layer effects
    var layerEffectsCount = 0;
    for (var j = 0; j < doc.artLayers.length; j++) {
        if (doc.artLayers[j].visible && hasLayerEffects(doc.artLayers[j])) {
            layerEffectsCount++;
        }
    }
    if (layerEffectsCount > 5) { // Example threshold: 5 layers with effects
        performanceWarnings.push("Document has a high number of layers with effects (" + layerEffectsCount + ").");
    }

    // Check for bit depth
    var bitDepthString = "";
    switch (docBitDepth) {
        case BitsPerChannelType.ONE:
            bitDepthString = "1-bit";
            break;
        case BitsPerChannelType.EIGHT:
            bitDepthString = "8-bit";
            break;
        case BitsPerChannelType.SIXTEEN:
            bitDepthString = "16-bit";
            break;
        case BitsPerChannelType.THIRTYTWO:
            bitDepthString = "32-bit";
            break;
        default:
            bitDepthString = "Unknown bit depth";
    }

    if (docBitDepth != BitsPerChannelType.EIGHT) { // Example check: anything other than 8-bit
        performanceWarnings.push("Document bit depth is " + bitDepthString + ".");
    }

    return performanceWarnings;
}

function hasLayerEffects(layer) {
    try {
        var layerDescriptor = layer.layerDescriptor;
        if (layerDescriptor.hasKey(stringIDToTypeID('layerEffects'))) {
            return true;
        }
    } catch (e) {
        // Error handling in case the layer doesn't have the layerDescriptor property
    }
    return false;
}

function showLayerInfoDialog(layerInfo, docInfo, performanceWarnings) {
    var dialog = new Window("dialog", "PreFlight Check");

    var docInfoGroup = dialog.add("panel", undefined, "Document Information");
    docInfoGroup.add("statictext", undefined, "Color Mode: " + docInfo.colorMode);
    docInfoGroup.add("statictext", undefined, "Bit Depth: " + docInfo.bitDepth);
    docInfoGroup.add("statictext", undefined, "Resolution: " + docInfo.ppi + " ppi");
    docInfoGroup.add("statictext", undefined, "Document Dimensions: " + docInfo.width + " x " + docInfo.height + " pixels");

    var countGroup = dialog.add("panel", undefined, "Counts");
    countGroup.add("statictext", undefined, "Total Layers: " + layerInfo.totalLayers);
    countGroup.add("statictext", undefined, "Total Folders: " + layerInfo.totalFolders);

    if (performanceWarnings.length > 0) {
        var performanceGroup = dialog.add("panel", undefined, "Performance Warnings");
        var performanceList = performanceGroup.add("edittext", undefined, performanceWarnings.join("\n"), {multiline: true, readonly: true});
        performanceList.size = [300, 50];
    }

    var textLayerGroup = dialog.add("panel", undefined, "Text Layers (Count: " + layerInfo.textLayerCount + ")");
    var textLayerList = textLayerGroup.add("edittext", undefined, layerInfo.textLayers.join("\n"), {multiline: true, readonly: true});
    textLayerList.size = [300, 50];

    var imageLayerGroup = dialog.add("panel", undefined, "Image Layers (Count: " + layerInfo.imageLayerCount + ")");
    var imageLayerList = imageLayerGroup.add("edittext", undefined, layerInfo.imageLayers.join("\n"), {multiline: true, readonly: true});
    imageLayerList.size = [300, 50];

    var shapeLayerGroup = dialog.add("panel", undefined, "Shape Layers (Count: " + layerInfo.shapeLayerCount + ")");
    var shapeLayerList = shapeLayerGroup.add("edittext", undefined, layerInfo.shapeLayers.join("\n"), {multiline: true, readonly: true});
    shapeLayerList.size = [300, 50];

    var smartObjectLayerGroup = dialog.add("panel", undefined, "Smart Object Layers (Count: " + layerInfo.smartObjectLayerCount + ")");
    var smartObjectLayerList = smartObjectLayerGroup.add("edittext", undefined, layerInfo.smartObjectLayers.join("\n"), {multiline: true, readonly: true});
    smartObjectLayerList.size = [300, 50];

    var patternLayerGroup = dialog.add("panel", undefined, "Pattern Layers (Count: " + layerInfo.patternLayerCount + ")");
    var patternLayerList = patternLayerGroup.add("edittext", undefined, layerInfo.patternLayers.join("\n"), {multiline: true, readonly: true});
    patternLayerList.size = [300, 50];

    var lutLayerGroup = dialog.add("panel", undefined, "LUT Layers (Count: " + layerInfo.lutLayerCount + ")");
    var lutLayerList = lutLayerGroup.add("edittext", undefined, layerInfo.lutLayers.join("\n"), {multiline: true, readonly: true});
    lutLayerList.size = [300, 50];

    var otherLayerGroup = dialog.add("panel", undefined, "Other Layers (Count: " + layerInfo.otherLayerCount + ")");
    var otherLayerList = otherLayerGroup.add("edittext", undefined, layerInfo.otherLayers.join("\n"), {multiline: true, readonly: true});
    otherLayerList.size = [300, 50];

    var closeButton = dialog.add("button", undefined, "Close", {name: "close"});

    closeButton.onClick = function() {
        dialog.close();
    };

    dialog.show();
}

// Run the functions
var layerInfo = extractLayersByType();
var docInfo = getDocumentInfo();
var performanceWarnings = checkPerformanceIssues();
showLayerInfoDialog(layerInfo, docInfo, performanceWarnings);
