import TreeItem from '/lib/models/TreeItem.js';

function defaults(obj, template) {
    Object.getOwnPropertyNames(template).forEach((fieldName) => {
        if (!obj[fieldName]) {
            obj[fieldName] = template[fieldName];
        }
    });
}

export default class LoadTreeAction {
    constructor(parent) {
        this.parent = parent;
        this.level = parent.level + 1;
    }

    get name() { return "LoadTreeAction"; }

    execute(context, callback) {
        var level = this.level;
        // Get a hold of one of the temp files, as JSON
        System.import('/tmpTreeLvl' + level + '.json!text').then((text) => {
            let rawData = JSON.parse(text);
            // Cook into a suitable data object
            if (!rawData.GetElementsResponse ||
                !rawData.GetElementsResponse.GetElementsResult ||
                !rawData.GetElementsResponse.GetElementsResult.ClientElement) {
                    return;
                }
            let elements = rawData.GetElementsResponse.GetElementsResult.ClientElement;
            if (!Array.isArray(elements)) {
                elements = [elements];
            }
            let treeItemData = elements.map((element) => {
                let treeItem = {};
                treeItem.actions = element.Actions.ClientAction;
                if (!Array.isArray(treeItem.actions)) {
                    treeItem.actions = [treeItem.actions];
                }
                delete element.Actions;
                delete element.ActionKeys;
                defaults(treeItem, element);
                treeItem.level = level;
                return treeItem;
            });
            // Update the tree state at level - need a tree state for this.
            let treeItems = treeItemData.map((data) => new TreeItem(data));
            this.parent.children(treeItems);
            // Finish
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
}
