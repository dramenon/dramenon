#target photoshop

function clearActions(actionSetList) {
    // Loop through each action set in the list
    for (var i = 0; i < actionSetList.length; i++) {
        var actionSetName = actionSetList[i];
        clearActionSet(actionSetName);
    }
}

function clearActionSet(actionSetName) {
    var iddelete = stringIDToTypeID("delete");
    var desc5 = new ActionDescriptor();
    var idnull = stringIDToTypeID("null");
    var ref17 = new ActionReference();
    var idactionSet = stringIDToTypeID("actionSet");
    
    // Put the name of the action set into the reference
    ref17.putName(idactionSet, actionSetName);
    desc5.putReference(idnull, ref17);
    
    try {
        // Attempt to execute the delete action
        executeAction(iddelete, desc5, DialogModes.NO);
        $.writeln("Cleared action set: " + actionSetName);
    } catch (error) {
        // If the action set is not found or can't be deleted, skip and go to the next
        $.writeln("Failed to clear action set: " + actionSetName + " - Skipping to next.");
    }
}

// Example usage: list of action sets to be cleared
clearActions(["Default Actions", "add_here_name", "add_here_name2", "add_here_name3"]);
