<script lang="ts">
    import Card from "./Card.svelte";
    import cardImageBack from '$lib/static/si-assets/event/EventBack.png'
    import cardImageFront from '$lib/static/si-assets/event/BureaucratsAdjustFunding.png'

    let isRevealed = $state(false);
</script>

<Card {cardImageBack} {cardImageFront} bind:isRevealed={isRevealed}/>