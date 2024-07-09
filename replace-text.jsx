#target photoshop

function main() {
    // Ensure a document is open
    if (!documents.length) {
        alert('No document open!');
        return;
    }

    // Collect all text layers
    var textLayers = collectTextLayers(app.activeDocument);

    // Create dialog
    var dlg = new Window('dialog', 'Text Layer Editor');
    dlg.orientation = 'column';

    var list = dlg.add('listbox', undefined, '', {multiselect: false, numberOfColumns: 2, showHeaders: true, columnTitles: ['Layer Name', 'Text']});
    list.preferredSize = [400, 200];
    
    for (var i = 0; i < textLayers.length; i++) {
        list.add('item', [textLayers[i].name, textLayers[i].textItem.contents]);
    }

    var inputGroup = dlg.add('group');
    inputGroup.orientation = 'row';
    inputGroup.add('statictext', undefined, 'Replace text with:');
    var input = inputGroup.add('edittext', undefined, '');
    input.characters = 30;

    var replaceBtn = dlg.add('button', undefined, 'Replace All');
    replaceBtn.onClick = function() {
        var newText = input.text;
        for (var i = 0; i < textLayers.length; i++) {
            textLayers[i].textItem.contents = newText;
        }
        dlg.close();
    };

    dlg.show();
}

function collectTextLayers(layerSet) {
    var textLayers = [];
    for (var i = 0; i < layerSet.artLayers.length; i++) {
        var layer = layerSet.artLayers[i];
        if (layer.kind == LayerKind.TEXT) {
            textLayers.push(layer);
        }
    }

    for (var j = 0; j < layerSet.layerSets.length; j++) {
        var nestedSet = layerSet.layerSets[j];
        textLayers = textLayers.concat(collectTextLayers(nestedSet));
    }

    return textLayers;
}

main();
