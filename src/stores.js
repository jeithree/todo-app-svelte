import {writable} from 'svelte/store';

export const todosStore = writable({
    editMode: false,
    alert: {
        show: false,
        type: '',
        message: ''
    }
});
export const appStore = writable({todoInputText: ''});