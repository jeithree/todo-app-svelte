<script>
    import Todo from './Todo.svelte';

    export let todoItems;

	$: todoPending = todoItems.filter(item => item.checked !== true);
	$: todoCompleted = todoItems.filter(item => item.checked !== false);

	function toggleCompleted(id)
	{
		const index = todoItems.findIndex(item => item.id === Number(id));
        todoItems[index].checked = !todoItems[index].checked;
	}
</script>

{#if todoItems.length}
    <div class="card-header border-top d-flex justify-content-between align-items-center">
        Pending <span class="badge bg-secondary">{todoPending.length}</span>
    </div>
    <ul class="list-group list-group-flush">
        {#if todoPending.length}
            {#each todoPending as todo (todo.id)}
                <Todo {toggleCompleted} {todo} />
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
                <Todo {toggleCompleted} {todo} />
            {/each}
        {:else}
            <li class="list-group-item">None</li>
        {/if}
    </ul>
{/if}