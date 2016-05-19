import ko from 'knockout';

export default class TreeItem {
    constructor(modelData) {
        this.children = ko.observableArray();
        this.actions = ko.observableArray(modelData.actions);
        this.actionGroups = ko.observableArray(modelData.actionGroups);
        this.key = modelData.ElementKey;
        this.label = modelData.Label;
        this.hasChildren = ko.observable(!!modelData.HasChildren);
        this.isDisabled = ko.observable(!!modelData.IsDisabled);
        this.level = modelData.level;
        this.isOpen = ko.observable(false);
    }
}
