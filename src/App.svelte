<script>
	import Todos from './components/Todos.svelte';

	let todoImputElement;
	let todoText;
	let todoItems = [];

	function addTodo()
	{
		todoText = todoText.trim();
		if (!todoText) {return;}

		const newTodo = {
			id: Date.now(),
			text: todoText,
			checked: false,
		}
		todoItems = [newTodo, ...todoItems];
		todoText = '';
		todoImputElement.focus();
	}

</script>

<div class="container">
	<div class="row">
		<div class="col-10 mx-auto my-4">
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
							type="button">Add</button>
					</div>
				</div>
				<Todos {todoItems} />
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