import ko from 'knockout';

export default class {
    constructor(params) {
        this.actionGroups = ko.pureComputed(() => {
            return params.actionGroups() &&
                params.actionGroups()().filter(params.filter || () => {});
        });
    }

    getClickHandler(action) {
        return () => {
            console.log(action.key);
        };
    }
}
