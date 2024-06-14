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
                } else if (layer.kind === LayerKind.NORMAL) {
                    layerInfo.imageLayers.push(getLayerInfo(layer));
                } else if (layer.kind === LayerKind.SOLIDFILL) {
                    layerInfo.shapeLayers.push(getLayerInfo(layer));
                } else if (layer.kind === LayerKind.SMARTOBJECT) {
                    layerInfo.smartObjectLayers.push(getLayerInfo(layer) + " (Smart Object)");
                } else if (layer.kind === LayerKind.PATTERNFILL) {
                    layerInfo.patternLayers.push(getLayerInfo(layer) + " (Patterns)");
                } else if (layer.kind === LayerKind.COLORLOOKUP) {
                    layerInfo.lutLayers.push(getLayerInfo(layer) + " (LUT)");
                } else {
                    layerInfo.otherLayers.push(getLayerInfo(layer));
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

function showLayerInfoDialog(layerInfo, docInfo) {
    var dialog = new Window("dialog", "PreFlight Check");

    var docInfoGroup = dialog.add("panel", undefined, "Document Information");
    docInfoGroup.add("statictext", undefined, "Color Mode: " + docInfo.colorMode);
    docInfoGroup.add("statictext", undefined, "Bit Depth: " + docInfo.bitDepth);
    docInfoGroup.add("statictext", undefined, "Resolution: " + docInfo.ppi + " ppi");
    docInfoGroup.add("statictext", undefined, "Document Dimensions: " + docInfo.width + " x " + docInfo.height + " pixels");

    var countGroup = dialog.add("panel", undefined, "Counts");
    countGroup.add("statictext", undefined, "Total Layers: " + layerInfo.totalLayers);
    countGroup.add("statictext", undefined, "Total Folders: " + layerInfo.totalFolders);

    var textLayerGroup = dialog.add("panel", undefined, "Text Layers");
    var textLayerList = textLayerGroup.add("edittext", undefined, layerInfo.textLayers.join("\n"), {multiline: true, readonly: true});
    textLayerList.size = [300, 50];

    var imageLayerGroup = dialog.add("panel", undefined, "Image Layers");
    var imageLayerList = imageLayerGroup.add("edittext", undefined, layerInfo.imageLayers.join("\n"), {multiline: true, readonly: true});
    imageLayerList.size = [300, 50];

    var shapeLayerGroup = dialog.add("panel", undefined, "Shape Layers");
    var shapeLayerList = shapeLayerGroup.add("edittext", undefined, layerInfo.shapeLayers.join("\n"), {multiline: true, readonly: true});
    shapeLayerList.size = [300, 50];

    var smartObjectLayerGroup = dialog.add("panel", undefined, "Smart Object Layers");
    var smartObjectLayerList = smartObjectLayerGroup.add("edittext", undefined, layerInfo.smartObjectLayers.join("\n"), {multiline: true, readonly: true});
    smartObjectLayerList.size = [300, 50];

    var patternLayerGroup = dialog.add("panel", undefined, "Pattern Layers");
    var patternLayerList = patternLayerGroup.add("edittext", undefined, layerInfo.patternLayers.join("\n"), {multiline: true, readonly: true});
    patternLayerList.size = [300, 50];

    var lutLayerGroup = dialog.add("panel", undefined, "LUT Layers");
    var lutLayerList = lutLayerGroup.add("edittext", undefined, layerInfo.lutLayers.join("\n"), {multiline: true, readonly: true});
    lutLayerList.size = [300, 50];

    var otherLayerGroup = dialog.add("panel", undefined, "Other Layers");
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
showLayerInfoDialog(layerInfo, docInfo);
