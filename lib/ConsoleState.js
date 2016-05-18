import ko from 'knockout';
import TreeItem from '/lib/models/TreeItem.js';
export default class State {
    constructor () {
        this.topMenus = ko.observableArray();
        // Some debug data:
        ['admin', 'help', 'settings', 'developer'].forEach((label) => {
            this.topMenus.push({ label: label, icon: label });
        });

        this.treeMenuRoot = new TreeItem({ HasChildren: true });
        this.treeMenuRoot.level = 0;
    }
}
