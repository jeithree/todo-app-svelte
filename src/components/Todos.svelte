<script>
    import Todo from './Todo.svelte';
    import {appStore} from '../stores';
    import {todosStore} from '../stores';

    export let todoInputElement;

    let todosItems = [];
    let todoToEdit = '';

    $: todosPending = todosItems.filter(item => item.checked !== true);
    $: todosCompleted = todosItems.filter(item => item.checked !== false);

    function toggleCompleted(id)
    {
        const index = todosItems.findIndex(item => item.id === Number(id));
        todosItems[index].checked = !todosItems[index].checked;
    }

    export function addTodo()
    {
        //console.log($todosStore.editMode, $appStore.todoInputText);

        $appStore.todoInputText = $appStore.todoInputText.trim();
        if (!$appStore.todoInputText) {return;}

        if ($todosStore.editMode)
        {
            todosItems[todoToEdit].text = $appStore.todoInputText;
            $todosStore.editMode = false;
            $appStore.todoInputText = '';
            todoInputElement.focus();
            $todosStore.alert.show = true;
            $todosStore.alert.type= 'success';
            $todosStore.alert.message = `The Todo ID: ${todosItems[todoToEdit].id}, was updated successfully`;;
            todoToEdit = '';
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: $appStore.todoInputText,
            checked: false,
        }
        todosItems = [newTodo, ...todosItems];
        $appStore.todoInputText = '';
        todoInputElement.focus();
    }

    function editTodo(id)
    {
        const index = todosItems.findIndex(item => item.id === Number(id));

        todoInputElement.focus();
        $appStore.todoInputText = todosItems[index].text;
        $todosStore.editMode = true;
        todoToEdit = index;
    }

    function deleteTodo(id)
    {
        todosItems = todosItems.filter(item => item.id !== Number(id));
        $todosStore.alert.show = true;
        $todosStore.alert.type= 'danger';
        $todosStore.alert.message = `The Todo ID: ${id}, was deleted successfully`;
    }

</script>

<div class="card-header border-top d-flex justify-content-between align-items-center">
    Pending <span class="badge bg-secondary">{todosPending.length}</span>
</div>
<ul class="list-group list-group-flush">
    {#if todosPending.length}
        {#each todosPending as todo (todo.id)}
            <Todo {todo} {toggleCompleted} {editTodo} {deleteTodo} />
        {/each}
    {:else}
        <li class="list-group-item">None</li>
    {/if}
</ul>
<div class="card-header border-top d-flex justify-content-between align-items-center">
    Completed <span class="badge bg-secondary">{todosCompleted.length}</span>
</div>
<ul class="list-group list-group-flush">
    {#if todosCompleted.length}
        {#each todosCompleted as todo (todo.id)}
            <Todo {todo} {toggleCompleted} {editTodo} {deleteTodo} />
        {/each}
    {:else}
        <li class="list-group-item">None</li>
    {/if}
</ul>
