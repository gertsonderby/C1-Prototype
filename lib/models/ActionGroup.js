import ko from 'knockout';

export default class ActionGroup {
    constructor(modelData) {
        this.id = modelData.GroupId;
        this.groupName = modelData.GroupName;
        this.name = modelData.Name;
        this.isInToolbar = !!modelData.IsInToolbar;
        this.isInFolder = !!modelData.IsInFolder;
        this.actions = ko.observableArray();
    }
}
