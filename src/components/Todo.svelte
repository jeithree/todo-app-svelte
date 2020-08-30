<script>
    export let todo;
    export let toggleCompleted;
</script>

<li class="list-group-item">
    <input
        id={todo.id}
        class="form-check-input mr-1 {todo.checked ? 'bg-success border-success' : ''}"
        on:click="{toggleCompleted(todo.id)}"
        type="checkbox"
        checked={todo.checked} />
    {todo.text}
</li>