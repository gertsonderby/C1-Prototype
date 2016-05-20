import ko from 'knockout';
import ActionExecutor from 'action-executor';

import State from 'lib/ConsoleState.js';
import LoadTreeAction from 'lib/actions/LoadTreeAction.js';
import 'lib/components/MenuBar/component.js';
import 'lib/components/ToolBar/component.js';
import 'lib/components/Tree/component.js';

class Main {
    constructor() {
        this.state = new State();
        this.actionExecutor = new ActionExecutor({
            context: {
                state: this.state
            }
        });
        this.activeTreeNode = ko.observable();
        this.activeActionGroups = ko.pureComputed(() => {
            return this.activeTreeNode() && this.activeTreeNode().actionGroups;
        });
    }

    filterToolbarActionGroups(group) {
        return group.isInToolbar;
    }
    loadTree(node, cb) {
        let action = new LoadTreeAction(node);
        this.actionExecutor.enqueue(action, cb);
    }
}

self.main = new Main();
ko.applyBindings(main);
main.loadTree(main.state.treeMenuRoot, () => {
    main.activeTreeNode(main.state.treeMenuRoot.children()[0]);
});
