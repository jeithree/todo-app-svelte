<script>
	let todoImputElement;
	let todoText;
	let todoItems = [];

	$: todoPending = todoItems.filter(item => item.checked !== true);
	$: todoCompleted = todoItems.filter(item => item.checked !== false);

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

	function toggleCompleted(id)
	{
		const index = todoItems.findIndex(item => item.id === Number(id));
  		todoItems[index].checked = !todoItems[index].checked;
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
				{#if todoItems.length}
					<div class="card-header border-top d-flex justify-content-between align-items-center">
						Pending <span class="badge bg-secondary">{todoPending.length}</span>
					</div>
					<ul class="list-group list-group-flush">
						{#if todoPending.length}
							{#each todoPending as todo (todo.id)}
								<li class="list-group-item">
									<input
										id={todo.id}
										class="form-check-input mr-1"
										on:click="{toggleCompleted(todo.id)}"
										type="checkbox"
										checked={todo.checked} />
									{todo.text}
								</li>
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
								<li class="list-group-item text-decoration-line-through">
									<input
										id={todo.id}
										class="form-check-input mr-1 bg-success border-success"
										on:click="{toggleCompleted(todo.id)}"
										type="checkbox"
										checked={todo.checked} />
									{todo.text}
								</li>
							{/each}
						{:else}
							<li class="list-group-item">None</li>
						{/if}
					</ul>
				{/if}
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