<script>
    import Todo from './Todo.svelte';

    export let todoPending;
    export let todoCompleted;
    export let toggleCompleted;
    export let editTodo;
    export let deleteTodo;

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
