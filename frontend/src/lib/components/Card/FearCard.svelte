<script lang="ts">
    import Card from "./Card.svelte";
    import cardImageBack from '$lib/static/si-assets/fear/FearBack.png'
    import cardImageFront from '$lib/static/si-assets/fear/Demoralized.png'

    let isRevealed = $state(false);
</script>

<Card {cardImageBack} {cardImageFront} bind:isRevealed={isRevealed}/>