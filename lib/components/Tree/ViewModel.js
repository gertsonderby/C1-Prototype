import ko from 'knockout';
export default class {
    constructor(params) {
        this.root = params.root;
        this.loadNode = params.loadNode || () => {};
    }

    getClickHandler(node) {
        return () => {
            if (node.isOpen()) {
                node.isOpen(false);
            } else {
                this.loadNode(node);
                node.isOpen(true);
            }
        };
    }
}
