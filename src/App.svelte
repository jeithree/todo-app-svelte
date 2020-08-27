<script>
	let prefix = '';
	let text = '';
	let textList = [];

	$: prefixedText = `${prefix} ${text}`;

	function add()
	{
		if (!text.length){return}
		textList = [prefixedText, ...textList];
		text = '';
	}
</script>

<main class="container">
	<h1 class="my-2">Hello Mr Texter</h1>
	<div class="input-group">
		<input class="form-control my-2" bind:value="{prefix}" type="text" placeholder="Enter a prefix">
		<input class="form-control my-2" bind:value="{text}" type="text" placeholder="Enter a Text">
	</div>
	<button class="btn btn-primary" on:click="{add}" type="submit">Create</button>
	{#if textList.length}
		<ul class="list-group mt-2">
			{#each textList as text}
				<li class="list-group-item">{text}</li>
			{/each}
		</ul>
	{:else}
		<p class="my-2">Enter your first text</p>
	{/if}
</main>

<style>
</style>