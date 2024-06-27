#target photoshop

// Function to create a new document using inches
function createNewDocument() {
    var widthInInches = 9;
    var heightInInches = 12;
    var resolution = 300; // DPI (dots per inch)

    var doc = app.documents.add(
        UnitValue(widthInInches, "in"),
        UnitValue(heightInInches, "in"),
        resolution,
        "Sample Comic Page Template",
        NewDocumentMode.RGB,
        DocumentFill.WHITE, // Use white background for "Background" layer
        1.0,
        BitsPerChannelType.EIGHT
    );
    return doc;
}

// Function to create a new blank layer with Multiply blend mode
function createMultiplyLayer() {
    var doc = app.activeDocument;
    var layer = doc.artLayers.add();
    layer.name = "Drawing Layer";
    layer.blendMode = BlendMode.MULTIPLY;
    return layer;
}

// Function to select the brush tool
function selectBrushTool() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(app.charIDToTypeID("PbTl"));
    desc.putReference(app.charIDToTypeID("null"), ref);
    executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
}

// Function to set the foreground color to black
function setForegroundColorToBlack() {
    var color = new SolidColor();
    color.rgb.red = 0;
    color.rgb.green = 0;
    color.rgb.blue = 0;
    app.foregroundColor = color;
}

// Function to select a specific brush by name
function selectBrushByName(brushName) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putName(app.stringIDToTypeID("brush"), brushName);
    desc.putReference(app.charIDToTypeID("null"), ref);
    executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
}

// Function to set brush properties
function setBrushProperties(size, hardness, opacity, flow) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(app.charIDToTypeID("Brsh"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
    desc.putReference(app.charIDToTypeID("null"), ref);

    var descBrush = new ActionDescriptor();
    descBrush.putUnitDouble(app.charIDToTypeID("Scl "), app.charIDToTypeID("#Prc"), 100);
    descBrush.putUnitDouble(app.charIDToTypeID("Sz  "), app.charIDToTypeID("#Pxl"), size);
    descBrush.putDouble(app.charIDToTypeID("Hrdn"), hardness);
    descBrush.putUnitDouble(app.charIDToTypeID("Opct"), app.charIDToTypeID("#Prc"), opacity);
    descBrush.putUnitDouble(app.charIDToTypeID("Flow"), app.charIDToTypeID("#Prc"), flow);

    desc.putObject(app.charIDToTypeID("T   "), app.charIDToTypeID("Brsh"), descBrush);
    executeAction(app.charIDToTypeID("setd"), desc, DialogModes.NO);
}

// Function to create and stroke a path
function createAndStrokePath(startX, startY, endX, endY) {
    var lineArray = [];
    var startPoint = new PathPointInfo();
    startPoint.kind = PointKind.CORNERPOINT;
    startPoint.anchor = [startX, startY];
    startPoint.leftDirection = startPoint.anchor;
    startPoint.rightDirection = startPoint.anchor;

    var endPoint = new PathPointInfo();
    endPoint.kind = PointKind.CORNERPOINT;
    endPoint.anchor = [endX, endY];
    endPoint.leftDirection = endPoint.anchor;
    endPoint.rightDirection = endPoint.anchor;

    lineArray.push(startPoint);
    lineArray.push(endPoint);

    var subPathInfo = new SubPathInfo();
    subPathInfo.closed = false;
    subPathInfo.operation = ShapeOperation.SHAPEXOR;
    subPathInfo.entireSubPath = lineArray;

    var pathItem = app.activeDocument.pathItems.add("LinePath", [subPathInfo]);
    pathItem.strokePath(ToolType.BRUSH);
    pathItem.remove();
}

// Function to add text layer with the time taken
function addTextLayer(timeTaken) {
    var doc = app.activeDocument;
    var textLayer = doc.artLayers.add();
    textLayer.kind = LayerKind.TEXT;
    textLayer.textItem.contents = "Time taken: " + timeTaken + " ms";
    textLayer.textItem.position = [UnitValue(0.5, "in"), UnitValue(11.5, "in")]; // Position at the bottom left corner
    textLayer.textItem.size = UnitValue(24, "pt");
    textLayer.textItem.color = app.foregroundColor;
}

// Main function to run the performance test
function runPerformanceTest() {
    var startTime = new Date().getTime();

    var docRef = createNewDocument();
    selectBrushTool();
    setForegroundColorToBlack();
    selectBrushByName("Kyle's Ultimate Pastel Palooza");
    setBrushProperties(75, 100, 100, 100); // Set brush size to 75

    // Create a new blank layer with Multiply blend mode
    createMultiplyLayer();

    // Document dimensions in pixels
    var width = 9 * 300;
    var height = 12 * 300;

    // Create and stroke the diagonal line from top-left to bottom-right
    createAndStrokePath(0, 0, width, height); // Top-left to bottom-right

    var endTime = new Date().getTime();
    var timeTaken = endTime - startTime;

    // Add text layer with the time taken
    addTextLayer(timeTaken);

   // alert("Time taken for the performance test: " + timeTaken + " ms");

    // Clean up
    // docRef.close(SaveOptions.DONOTSAVECHANGES); // Uncomment this line if you want to close the document automatically
}

// Run the test
runPerformanceTest();
