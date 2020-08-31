<script>
    import Todo from './Todo.svelte';

    export let todoImputElement;
    export let todoText;
    export let editMode;

    let todoItems = [];
    let todoToEdit = '';

	$: todoPending = todoItems.filter(item => item.checked !== true);
	$: todoCompleted = todoItems.filter(item => item.checked !== false);

	function toggleCompleted(id)
	{
		const index = todoItems.findIndex(item => item.id === Number(id));
		todoItems[index].checked = !todoItems[index].checked;
	}

	export function addTodo()
	{
        console.log(editMode, todoText);

		todoText = todoText.trim();
		if (!todoText) {return;}

		if (editMode)
		{
			todoItems[todoToEdit].text = todoText;
			todoToEdit = '';
			editMode = false;
			todoText = '';
			todoImputElement.focus();
			return;
		}

		const newTodo = {
			id: Date.now(),
			text: todoText,
			checked: false,
		}
		todoItems = [newTodo, ...todoItems];
		todoText = '';
        todoImputElement.focus();
	}

	function editTodo(id)
    {
		const index = todoItems.findIndex(item => item.id === Number(id));

		todoImputElement.focus();
		todoText = todoItems[index].text;
		editMode = true;
		todoToEdit = index;
    }

    function deleteTodo(id)
    {
        todoItems = todoItems.filter(item => item.id !== Number(id));
    }

</script>

<div class="card-header border-top d-flex justify-content-between align-items-center">
    Pending <span class="badge bg-secondary">{todoPending.length}</span>
</div>
<ul class="list-group list-group-flush">
    {#if todoPending.length}
        {#each todoPending as todo (todo.id)}
            <Todo {todo} {toggleCompleted} {editTodo} {deleteTodo} />
        {/each}
    {:else}
        <li class="list-group-item">None</li>
    {/if}
</ul>
<div class="card-header border-top d-flex justify-content-between align-items-center">
    Completed <span class="badge bg-secondary">{todoCompleted.length}</span>
</div>
<ul class="list-group list-group-flush">
    {#if todoCompleted.length}
        {#each todoCompleted as todo (todo.id)}
            <Todo {todo} {toggleCompleted} {editTodo} {deleteTodo} />
        {/each}
    {:else}
        <li class="list-group-item">None</li>
    {/if}
</ul>
