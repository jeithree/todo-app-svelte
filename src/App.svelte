<script>
	import Todos from './components/Todos.svelte';

	let todoImputElement;
	let todoText;
	let todoItems = [];

	let editMode = false;
	let todoToEdit = '';

	$: todoPending = todoItems.filter(item => item.checked !== true);
	$: todoCompleted = todoItems.filter(item => item.checked !== false);

	function toggleCompleted(id)
	{
		const index = todoItems.findIndex(item => item.id === Number(id));
		todoItems[index].checked = !todoItems[index].checked;
	}

	function addTodo()
	{
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

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-8 mx-auto my-4">
			<div class="card">
				<div class="card-body">
					<h1 class="h3 mb-2 text-secondary">Add a Todo</h1>
					<div class="input-group mb-2">
						<input
							class="form-control"
							bind:this={todoImputElement}
							bind:value={todoText}
							on:keydown="{(e) => e.key === 'Enter' ? addTodo() : false }"
							type="text"
							placeholder="Enter a todo">
						<button
							class="btn btn-primary"
							on:click={addTodo}
							type="button">{!editMode ? 'Add' : 'Save'}</button>
					</div>
				</div>
				<Todos
					{todoPending}
					{todoCompleted}
					{toggleCompleted}
					{editTodo}
					{deleteTodo} />
			</div>
		</div>
	</div>
</div>

<style>
	.btn-primary {
		background-color: #1f99cd;
		border-color: #1f99cd;
	}
	.btn-primary:hover,
	.btn-primary:active {
		background-color: #1a80ab;
		border-color: #1a80ab;
	}
</style>