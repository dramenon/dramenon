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

// Function to add text layer
function addTextLayer() {
    var doc = app.activeDocument;
    var textLayer = doc.artLayers.add();
    textLayer.kind = LayerKind.TEXT;
    textLayer.textItem.contents = "Photoshop";
    textLayer.textItem.position = [doc.width / 2, doc.height / 2]; // Position the text in the center
    textLayer.textItem.size = 110; // Set initial text size
    textLayer.textItem.justification = Justification.CENTER; // Center the text
    textLayer.textItem.color = app.foregroundColor;
    return textLayer;
}

// Function to scale text layer by 500%
function scaleTextLayer(layer, scale) {
    var idTrnf = charIDToTypeID("Trnf");
    var desc11 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref5 = new ActionReference();
    ref5.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc11.putReference(idnull, ref5);
    desc11.putUnitDouble(charIDToTypeID("Scl "), charIDToTypeID("#Prc"), scale);
    executeAction(idTrnf, desc11, DialogModes.NO);
}

// Function to convert text layer to path
function convertTextToPath() {
    var idMk = charIDToTypeID("Mk  ");
    var desc7 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref3 = new ActionReference();
    var idPath = charIDToTypeID("Path");
    ref3.putClass(idPath);
    desc7.putReference(idnull, ref3);
    var idFrom = charIDToTypeID("From");
    var ref4 = new ActionReference();
    var idTxLr = charIDToTypeID("TxLr");
    ref4.putEnumerated(idTxLr, charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    desc7.putReference(idFrom, ref4);
    executeAction(idMk, desc7, DialogModes.NO);
}

// Function to stroke the path
function strokePathWithNewLayer() {
    var doc = app.activeDocument;
    var layer = doc.artLayers.add();
    layer.name = "Stroke Layer";

    // Select the specific brush "KYLE Ultimate Pencil Hard" and set size to 35
    selectBrushByName("KYLE Ultimate Pencil Hard");
    setBrushProperties(35, 100, 100, 100);

    // Stroke the path with the brush
    var pathItem = doc.pathItems.getByName("Work Path");
    pathItem.strokePath(ToolType.BRUSH);
    pathItem.remove();
}

// Function to add text layer with the time taken
function addTextLayerWithTime(timeTaken) {
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

    // Add and scale text
    var textLayer = addTextLayer();
    scaleTextLayer(textLayer, 500); // Scale text layer to 500%

    // Convert text to path
    convertTextToPath();

    // Stroke path with new layer
    strokePathWithNewLayer();

    var endTime = new Date().getTime();
    var timeTaken = endTime - startTime;

    // Add text layer with the time taken
    addTextLayerWithTime(timeTaken);

    // alert("Time taken for the performance test: " + timeTaken + " ms"); // Commented out

    // Clean up
    // docRef.close(SaveOptions.DONOTSAVECHANGES); // Uncomment this line if you want to close the document automatically
}

// Run the test
runPerformanceTest();
