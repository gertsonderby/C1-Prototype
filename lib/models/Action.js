import ko from 'knockout';

export default class Action {
    constructor(modelData) {
        this.token = modelData.ActionToken;
        this.label = modelData.Label;
        this.tooltip = modelData.ToolTip;
        this.disabled = ko.observable(modelData.Disabled);
        this.iconNameSpace = modelData.Icon.ResourceNamespace;
        this.iconName = modelData.Icon.ResourceName;
        this.key = modelData.ActionKey;
        this.group = ko.observable();
    }
}
