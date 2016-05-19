import State from 'lib/ConsoleState.js';
import 'lib/components/MenuBar/component.js';
import ActionExecutor from 'action-executor';
import LoadTreeAction from 'lib/actions/LoadTreeAction.js';

class Main {
    constructor() {
        this.state = new State();
        this.actionExecutor = new ActionExecutor({
            context: {
                state: this.state
            }
        });
    }

    loadTree(level) {
        let node = this.state.treeMenuRoot;
        let nextNode = node;
        while (level && nextNode) {
            level -= 1;
            node = nextNode;
            nextNode = node.children()[0];
        }
        let action = new LoadTreeAction(node);
        this.actionExecutor.enqueue(action);
    }
}

self.main = new Main();
ko.applyBindings(main);
