import ko from 'knockout';

export default class TreeItem {
    constructor(modelData) {
        this.children = ko.observableArray();
        this.actions = ko.observableArray(modelData.actions); // Should be mapped to suitable class
        this.hasChildren = ko.observable(!!modelData.HasChildren);
        this.isDisabled = ko.observable(!!modelData.IsDisabled);
    }
}
