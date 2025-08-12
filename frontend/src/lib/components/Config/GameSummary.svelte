<script lang="ts">
	import { GameState } from '$lib/state/gameState.svelte';
	import { expansionAbbreviations } from '$lib/data/gameData';

	interface Props {
		showTitle?: boolean;
		compact?: boolean;
	}

	let { showTitle = true, compact = false }: Props = $props();

	const abbreviatedExpansions = $derived(
		GameState.activeExpansions
			.map(exp => expansionAbbreviations[exp] || exp)
			.join(', ')
	);

	const difficultyDescription = $derived.by(() => {
		if (!GameState.isUsingAdversaries || !GameState.leadingAdversary) return '';
		
		let description = `L${GameState.leadingAdversaryLevel}`;
		if (GameState.supportingAdversary) {
			description += ` + L${GameState.supportingAdversaryLevel}`;
		}
		return description;
	});

	function getDifficultyLevel() {
		let baseLevel = GameState.leadingAdversaryLevel;
		if (GameState.supportingAdversary) {
			baseLevel += Math.floor(GameState.supportingAdversaryLevel / 2);
		}
		return baseLevel;
	}

	function getDifficultyDescription(level: number) {
		if (level === 0) return 'None';
		if (level <= 2) return 'Beginner';
		if (level <= 4) return 'Intermediate';
		if (level <= 6) return 'Advanced';
		if (level <= 8) return 'Expert';
		return 'Impossible';
	}

	function getDifficultyColor(level: number) {
		if (level <= 2) return 'text-green-600';
		if (level <= 4) return 'text-yellow-600';
		if (level <= 6) return 'text-orange-600';
		if (level <= 8) return 'text-red-600';
		return 'text-purple-600';
	}

	function capitalizeBoolean(value: boolean): string {
		return value ? 'True' : 'False';
	}
</script>

<div class="bg-gray-50 border rounded p-4 {compact ? 'text-sm' : ''}">
	{#if showTitle}
		<h3 class="mb-4 text-lg font-medium text-gray-800 border-b pb-2">Game Summary</h3>
	{/if}
	
	<div class="space-y-2">
		<div class="flex">
			<span class="font-medium text-gray-600 w-24 mr-2">Spirits:</span>
			<span class="text-gray-900">{GameState.numberOfSpirits}</span>
		</div>

		{#if GameState.activeExpansions.length > 0}
			<div class="flex">
				<span class="font-medium text-gray-600 w-24 mr-2">Expansions:</span>
				<span class="text-gray-900">{abbreviatedExpansions}</span>
			</div>
		{/if}

		{#if GameState.isUsingAdversaries && GameState.leadingAdversary}
			<div class="flex">
				<span class="font-medium text-gray-600 w-24 mr-2">Leading:</span>
				<span class="text-gray-900">
					{GameState.leadingAdversary} L{GameState.leadingAdversaryLevel}
				</span>
			</div>
			{#if GameState.supportingAdversary}
				<div class="flex">
					<span class="font-medium text-gray-600 w-24 mr-2">Supporting:</span>
					<span class="text-gray-900">
						{GameState.supportingAdversary} L{GameState.supportingAdversaryLevel}
					</span>
				</div>
			{/if}
			<div class="flex">
				<span class="font-medium text-gray-600 w-24 mr-2">Difficulty:</span>
				<span class="font-semibold {getDifficultyColor(getDifficultyLevel())}">
					{getDifficultyDescription(getDifficultyLevel())} ({difficultyDescription})
				</span>
			</div>
		{/if}

		<div class="flex">
			<span class="font-medium text-gray-600 w-24 mr-2">Blight Card:</span>
			<span class="{GameState.isUsingBlightCard ? 'text-green-600 font-semibold' : 'text-gray-500'}">{capitalizeBoolean(GameState.isUsingBlightCard)}</span>
		</div>

		<div class="flex">
			<span class="font-medium text-gray-600 w-24 mr-2">Events:</span>
			<span class="{GameState.isUsingEvents ? 'text-green-600 font-semibold' : 'text-gray-500'}">{capitalizeBoolean(GameState.isUsingEvents)}</span>
		</div>

		<div class="flex">
			<span class="font-medium text-gray-600 w-24 mr-2">Scenarios:</span>
			<span class="{GameState.isUsingScenarios ? 'text-green-600 font-semibold' : 'text-gray-500'}">{capitalizeBoolean(GameState.isUsingScenarios)}</span>
		</div>
	</div>
</div>
