<script lang="ts">
    import Card from "./Card.svelte";
    import cardImageBack from '$lib/static/si-assets/invader/InvaderBack.png'
    import cardImageFront from '$lib/static/si-assets/invader/1-m.png'

    let isRevealed = $state(false);
</script>

<Card {cardImageBack} {cardImageFront} bind:isRevealed={isRevealed}/>