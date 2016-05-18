import ko from 'knockout';
export default class State {
    constructor () {
        this.topMenus = ko.observableArray();
        ['admin', 'help', 'settings', 'developer'].forEach((label) => {
            this.topMenus.push({ label: label, icon: label });
        });
    }
}
