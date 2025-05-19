<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


<div class="bg-tiled bg-[50px] md:bg-[100px] min-h-screen">
	{@render children()}
</div>

<style>
	.bg-tiled {
		background-image: url('$lib/static/si-assets/Ocean_Terrain.png');
		background-repeat: repeat;
	}
</style>