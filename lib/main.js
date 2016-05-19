import State from 'lib/ConsoleState.js';
import 'lib/components/MenuBar/component.js';
import 'lib/components/ToolBar/component.js';
import 'lib/components/Tree/component.js';
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

    loadTree(node) {
        let action = new LoadTreeAction(node);
        this.actionExecutor.enqueue(action);
    }
}

self.main = new Main();
ko.applyBindings(main);
main.loadTree(main.state.treeMenuRoot);
