<script>
	import Todos from './components/Todos.svelte';
	import {appStore} from './stores';
	import {todosStore} from './stores';

	let todoInputElement;
	let todosElement;

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
							bind:this={todoInputElement}
							bind:value={$appStore.todoInputText}
							on:keydown="{(e) => e.key === 'Enter' ? todosElement.addTodo() : false }"
							type="text"
							placeholder="Enter a todo">
						<button
							class="btn btn-primary"
							on:click={() => todosElement.addTodo()}
							type="button">{!todosStore.$editMode ? 'Add' : 'Save'}</button>
					</div>
				</div>
				<Todos
					bind:this={todosElement}
					{todoInputElement} />
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