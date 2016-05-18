import ko from 'knockout';
import model from './ViewModel.js';
import markup from './template.ko';
import "./style.less";

ko.components.register('menubar', {
    viewModel: model,
    template: markup
});
