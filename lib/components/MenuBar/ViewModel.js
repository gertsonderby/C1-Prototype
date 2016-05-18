export default class {
    constructor(params) {
        this.menus = ko.isObservable(params.menus)  && 'push' in params.menus ?
            params.menus :
            ko.observableArray([]);
    }
}
