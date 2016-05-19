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
        if (level > 3) return;
        // Get a hold of one of the temp files, as JSON
        System.import('/tmpTreeLvl' + level + '.json!text').then((text) => {
            let rawData = JSON.parse(text);
            if (!rawData.GetElementsResponse ||
                !rawData.GetElementsResponse.GetElementsResult ||
                !rawData.GetElementsResponse.GetElementsResult.ClientElement) {
                    return;
                }
            let elements = rawData.GetElementsResponse.GetElementsResult.ClientElement;
            if (!Array.isArray(elements)) {
                elements = [elements];
            }
            let actionList = {};
            let treeItemData = elements.map((element) => {
                let treeItem = {};
                let actions = element.Actions && element.Actions.ClientAction;
                if (actions) {
                    if (!Array.isArray(actions)) {
                        actions = [actions];
                    }
                    actions.forEach((action) => {
                        actionList[action.ActionKey] = action;
                    });
                    delete element.Actions;
                }
                element.actions = [];
                let actionKeys = element.ActionKeys && element.ActionKeys.string;
                if (actionKeys) {
                    if (!Array.isArray(actionKeys)) {
                        actionKeys = [actionKeys];
                    }
                    actionKeys.forEach((key) => {
                        element.actions.push(actionList[key]);
                    });
                    delete element.ActionKeys;
                }
                defaults(treeItem, element);
                treeItem.level = level;
                return treeItem;
            });
            let treeItems = treeItemData.map((data) => new TreeItem(data));
            this.parent.children(treeItems);
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
}
