// place files you want to import through the `$lib` alias in this folder.

// Export components
export { default as GameSettings } from './components/Config/GameSettings.svelte';
export { default as GameSummary } from './components/Config/GameSummary.svelte';
export { default as ActiveEffects } from './components/ActiveEffects.svelte';
export { default as Card } from './components/Card/Card.svelte';
export { default as EventCard } from './components/Card/EventCard.svelte';
export { default as FearCard } from './components/Card/FearCard.svelte';
export { default as InvaderCard } from './components/Card/InvaderCard.svelte';

// Export state management
export { GameState, setConfiguration, updateGameState, resetGameState } from './state/gameState.svelte';

// Export game data
export { availableExpansions, availableAdversaries, expansionAbbreviations } from './data/gameData';