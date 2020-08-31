import {writable} from 'svelte/store';

export const todosStore = writable({editMode: false});
export const appStore = writable({todoInputText: ''});