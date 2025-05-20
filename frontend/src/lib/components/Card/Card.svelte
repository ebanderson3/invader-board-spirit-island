<script lang="ts">
    let {
        cardImageBack, 
        cardImageFront, 
        isRevealed = $bindable(false)
    }: {
        cardImageBack: string, 
        cardImageFront: string,
        isRevealed: boolean
        } = $props();
    
    function flipCard() {
        isRevealed = !isRevealed;
    }
</script>
<div>
    {#if isRevealed}
        <img alt="Card Front" src={cardImageFront} class="w-full h-full object-cover">
    {:else}
        <div class="relative">
            <img alt="Card Back" src={cardImageBack} class="w-full h-full object-cover"/>
            <button 
                onclick={flipCard} 
                class="p-2 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 btn-background"
            >
                Reveal
            </button>
        </div>
    {/if}
</div>

<style>
	.btn-background {
        background-image: url('$lib/static/generic/wooden-floor-background.jpg');
		background-repeat: repeat;
        background-size: 200%;
        background-position: -10vw;
    }
</style>
