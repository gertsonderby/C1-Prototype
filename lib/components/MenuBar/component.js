import ko from 'knockout';
import model from './ViewModel.js';
import markup from './template.ko!text';

ko.components.register('menubar', {
    viewModel: model,
    template: markup
});
