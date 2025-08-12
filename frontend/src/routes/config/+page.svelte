<script lang="ts">
	import GameSettings from '$lib/components/Config/GameSettings.svelte';
	import GameSummary from '$lib/components/Config/GameSummary.svelte';
	import { goto } from '$app/navigation';
	import { GameState, setConfiguration, resetGameState } from '$lib';
	import { availableExpansions } from '$lib/data/gameData';

	let isFormValid = $state(true);

	function handleSave() {
        console.log(GameState)
		goto('/game/new');
	}

	function handleReset() {
		// Reset GameState to defaults
		resetGameState();
		// Set default expansions
		setConfiguration({
			activeExpansions: [...availableExpansions],
			isUsingBlightCard: true,
			isUsingEvents: true,
			isUsingAdversaries: true,
			isUsingScenarios: false,
			numberOfSpirits: 1,
			leadingAdversary: '',
			supportingAdversary: '',
			leadingAdversaryLevel: 0,
			supportingAdversaryLevel: 0,
			minDifficulty: 1,
			maxDifficulty: 10
		});
		console.log('Settings reset to defaults');
	}

	function handleValidationChange(isValid: boolean) {
		isFormValid = isValid;
	}
</script>

<svelte:head>
	<title>Spirit Island Digital Invader Board</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-4">
	<h1 class="text-center text-gray-800 mb-6 text-2xl font-light">Spirit Island Digital Invader Board</h1>
	
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<div class="lg:col-span-2">
			<GameSettings 
				showButtons={false}
				onvalidationchange={handleValidationChange}
			/>
		</div>
		
		<div class="order-last lg:order-none">
			<GameSummary showTitle={true} />
			
			<!-- Action Buttons -->
			<div class="flex flex-col gap-4 mt-6">
				<button 
					type="button" 
					class="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
					onclick={handleReset}
				>
					Reset to Defaults
				</button>
				<button 
					type="button" 
					class="px-6 py-3 text-white rounded transition-colors {isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}"
					onclick={handleSave}
					disabled={!isFormValid}
				>
					Start Game
				</button>
			</div>
		</div>
	</div>
</div>