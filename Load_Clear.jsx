// Get the folder of the current JSX script
var scriptFile = new File($.fileName);
var scriptFolder = scriptFile.parent;

// Suppress all dialogs
app.displayDialogs = DialogModes.NO;

// Define the path to the .atn file located in the same folder as the JSX script
var actionFilePath = new File(scriptFolder + "/Dialogs.atn");

// Load the action file
app.load(actionFilePath);

// Name of the action set and action within the set
var actionSetName = "Dialogs";  // The name of the action set inside the .atn file
var actionName = "Dialog_Test"; // The name of the specific action you want to play

// Play the action after loading it
app.doAction(actionName, actionSetName);

// Function to clear specific actions
function clearActions(actionSetList) {
    for (var actionSetName in actionSetList) {
        clearActionSet(actionSetList[actionSetName]);
    }
}

function clearActionSet(actionSetName) {
    var iddelete = stringIDToTypeID("delete");
    var desc5 = new ActionDescriptor();
    var idnull = stringIDToTypeID("null");
    var ref17 = new ActionReference();
    var idactionSet = stringIDToTypeID("actionSet");
    ref17.putName(idactionSet, actionSetName);
    desc5.putReference(idnull, ref17);
    try {
        executeAction(iddelete, desc5, DialogModes.NO);
    } catch (error) {
        // $.writeln("Failed to clear actionSet '" + actionSetName + "' (it may not exist).")
    }
}

// Clear the action set after playing it
clearActions([actionSetName]);
