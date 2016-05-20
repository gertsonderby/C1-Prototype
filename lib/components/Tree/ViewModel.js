import ko from 'knockout';
export default class {
    constructor(params) {
        this.root = params.root;
        this.loadNode = params.loadNode || () => {};
        this.setActive = params.setActive || () => {};
    }

    getClickHandler(node) {
        return () => {
            if (node.isOpen()) {
                node.isOpen(false);
            } else {
                this.loadNode(node);
                node.isOpen(true);
            }
            this.setActive(node);
        };
    }
}
