<script lang="ts">
	import { GameState, setConfiguration } from '$lib/state/gameState.svelte';
	import { availableExpansions, availableAdversaries } from '$lib/data/gameData';

	interface Props {
		showButtons?: boolean;
		buttonText?: string;
		onsave?: (detail: typeof formState) => void;
		onreset?: (detail: typeof formState) => void;
		onvalidationchange?: (isValid: boolean) => void;
	}

	let { showButtons = true, buttonText = 'Start Game', onsave, onreset, onvalidationchange }: Props = $props();

	// Local state for form inputs with defaults from GameState
	let formState = $state({
		activeExpansions: GameState.activeExpansions.length > 0 ? [...GameState.activeExpansions] : [...availableExpansions],
		isUsingBlightCard: GameState.isUsingBlightCard,
		isUsingEvents: GameState.isUsingEvents,
		isUsingAdversaries: GameState.isUsingAdversaries,
		isUsingScenarios: GameState.isUsingScenarios,
		numberOfSpirits: GameState.numberOfSpirits,
		leadingAdversary: GameState.leadingAdversary,
		supportingAdversary: GameState.supportingAdversary,
		leadingAdversaryLevel: GameState.leadingAdversaryLevel,
		supportingAdversaryLevel: GameState.supportingAdversaryLevel,
		minDifficulty: GameState.minDifficulty,
		maxDifficulty: GameState.maxDifficulty
	});

	// Initialize GameState with default expansions if empty
	if (GameState.activeExpansions.length === 0) {
		formState.activeExpansions = [...availableExpansions];
		setConfiguration(formState);
	}

	// Derived values for validation and display
	const isRandomAdversarySelected = $derived(
		formState.leadingAdversary === 'Random' || formState.supportingAdversary === 'Random'
	);

	const isLeadingAdversaryRequired = $derived(
		formState.isUsingAdversaries && !formState.leadingAdversary
	);

	// Notify parent about validation changes
	$effect(() => {
		onvalidationchange?.(!isLeadingAdversaryRequired);
	});

	function toggleExpansion(expansion: string) {
		if (formState.activeExpansions.includes(expansion)) {
			formState.activeExpansions = formState.activeExpansions.filter(e => e !== expansion);
		} else {
			formState.activeExpansions = [...formState.activeExpansions, expansion];
		}
		setConfiguration(formState);
	}

	function saveConfiguration() {
		setConfiguration(formState);
		onsave?.(formState);
	}

	function resetToDefaults() {
		Object.assign(formState, {
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
		setConfiguration(formState);
		onreset?.(formState);
	}
</script>

<div class="w-full">
	<!-- Basic Game Settings -->
	<section class="mb-6 p-4 border rounded bg-gray-50">
		<h3 class="mb-4 text-lg font-medium text-gray-800 border-b pb-2">Basic Settings</h3>
		
		<div class="mb-4">
			<label for="numberOfSpirits" class="block mb-2 font-medium text-gray-700">Number of Spirits:</label>
			<input 
				type="number" 
				id="numberOfSpirits"
				min="1" 
				max="8" 
				value={formState.numberOfSpirits}
				oninput={(e) => { 
					formState.numberOfSpirits = parseInt(e.currentTarget.value); 
					setConfiguration(formState);
				}}
				class="w-full p-2 border rounded"
			/>
		</div>
	</section>

	<!-- Expansions -->
	<section class="mb-6 p-4 border rounded bg-gray-50">
		<h3 class="mb-4 text-lg font-medium text-gray-800 border-b pb-2">Expansions</h3>
		<div class="space-y-3">
			{#each availableExpansions as expansion}
				<label class="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-blue-50">
					<input 
						type="checkbox" 
						checked={formState.activeExpansions.includes(expansion)}
						onchange={() => toggleExpansion(expansion)}
						class="w-4 h-4 text-blue-600"
					/>
					<span class="text-gray-800 font-medium">{expansion}</span>
				</label>
			{/each}
		</div>
	</section>

	<!-- Game Components -->
	<section class="mb-6 p-4 border rounded bg-gray-50">
		<h3 class="mb-4 text-lg font-medium text-gray-800 border-b pb-2">Game Components</h3>
		
		<div class="space-y-3">
			<label class="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-blue-50">
				<input 
					type="checkbox" 
					checked={formState.isUsingBlightCard}
					onchange={(e) => { 
						formState.isUsingBlightCard = e.currentTarget.checked; 
						setConfiguration(formState);
					}}
					class="w-4 h-4 text-blue-600"
				/>
				<span class="text-gray-800 font-medium">Use Blight Card</span>
			</label>
			
			<label class="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-blue-50">
				<input 
					type="checkbox" 
					checked={formState.isUsingEvents}
					onchange={(e) => { 
						formState.isUsingEvents = e.currentTarget.checked; 
						setConfiguration(formState);
					}}
					class="w-4 h-4 text-blue-600"
				/>
				<span class="text-gray-800 font-medium">Use Events</span>
			</label>
			
			<label class="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-blue-50">
				<input 
					type="checkbox" 
					checked={formState.isUsingScenarios}
					onchange={(e) => { 
						formState.isUsingScenarios = e.currentTarget.checked; 
						setConfiguration(formState);
					}}
					class="w-4 h-4 text-blue-600"
				/>
				<span class="text-gray-800 font-medium">Use Scenarios</span>
			</label>
		</div>
	</section>

	<!-- Adversaries -->
	<section class="mb-6 p-4 border rounded bg-gray-50">
		<h3 class="mb-4 text-lg font-medium text-gray-800 border-b pb-2">Adversaries</h3>
		
		<label class="flex items-center gap-3 p-3 bg-white border rounded cursor-pointer hover:bg-blue-50 mb-4">
			<input 
				type="checkbox" 
				checked={formState.isUsingAdversaries}
				onchange={(e) => { 
					formState.isUsingAdversaries = e.currentTarget.checked; 
					setConfiguration(formState);
				}}
				class="w-4 h-4 text-blue-600"
			/>
			<span class="text-gray-800 font-medium">Use Adversaries</span>
		</label>

		{#if formState.isUsingAdversaries}
			<div class="p-4 bg-white border rounded space-y-4">
				<div>
					<label for="leadingAdversary" class="block mb-2 font-medium text-gray-700">
						Leading Adversary: <span class="text-red-500">*</span>
					</label>
					<select 
						id="leadingAdversary" 
						value={formState.leadingAdversary} 
						onchange={(e) => { 
							formState.leadingAdversary = e.currentTarget.value; 
							setConfiguration(formState);
						}}
						class="w-full p-2 border rounded {isLeadingAdversaryRequired ? 'border-red-500' : ''}"
					>
						<option value="">Select an adversary</option>
						{#each availableAdversaries as adversary}
							<option value={adversary}>{adversary}</option>
						{/each}
					</select>
					{#if isLeadingAdversaryRequired}
						<p class="text-red-500 text-sm mt-1">A leading adversary is required when using adversaries.</p>
					{/if}
				</div>

				{#if formState.leadingAdversary && formState.leadingAdversary !== 'Random'}
					<div>
						<label for="leadingAdversaryLevel" class="block mb-2 font-medium text-gray-700">Leading Adversary Level:</label>
						<div class="flex items-center gap-3">
							<input 
								type="range" 
								id="leadingAdversaryLevel"
								min="0" 
								max="6" 
								value={formState.leadingAdversaryLevel}
								oninput={(e) => { 
									formState.leadingAdversaryLevel = parseInt(e.currentTarget.value); 
									setConfiguration(formState);
								}}
								class="flex-1"
							/>
							<span class="w-16 text-center font-bold text-blue-600">Level {formState.leadingAdversaryLevel}</span>
						</div>
					</div>
				{/if}

				<div>
					<label for="supportingAdversary" class="block mb-2 font-medium text-gray-700">Supporting Adversary:</label>
					<select 
						id="supportingAdversary" 
						value={formState.supportingAdversary} 
						onchange={(e) => { 
							formState.supportingAdversary = e.currentTarget.value; 
							setConfiguration(formState);
						}}
						class="w-full p-2 border rounded"
					>
						<option value="">None</option>
						{#each availableAdversaries as adversary}
							{#if adversary !== formState.leadingAdversary}
								<option value={adversary}>{adversary}</option>
							{/if}
						{/each}
					</select>
				</div>

				{#if formState.supportingAdversary && formState.supportingAdversary !== 'Random'}
					<div>
						<label for="supportingAdversaryLevel" class="block mb-2 font-medium text-gray-700">Supporting Adversary Level:</label>
						<div class="flex items-center gap-3">
							<input 
								type="range" 
								id="supportingAdversaryLevel"
								min="0" 
								max="6" 
								value={formState.supportingAdversaryLevel}
								oninput={(e) => { 
									formState.supportingAdversaryLevel = parseInt(e.currentTarget.value); 
									setConfiguration(formState);
								}}
								class="flex-1"
							/>
							<span class="w-16 text-center font-bold text-blue-600">Level {formState.supportingAdversaryLevel}</span>
						</div>
					</div>
				{/if}

				{#if isRandomAdversarySelected}
					<div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
						<h4 class="font-medium text-blue-800 mb-3">Random Adversary Difficulty Range</h4>
						<div class="space-y-4">
							<div>
								<label for="minDifficulty" class="block mb-2 font-medium text-gray-700">Minimum Difficulty:</label>
								<div class="flex items-center gap-3">
									<input 
										type="range" 
										id="minDifficulty"
										min="1" 
										max="15" 
										value={formState.minDifficulty}
										oninput={(e) => { 
											const newMin = parseInt(e.currentTarget.value);
											formState.minDifficulty = newMin;
											// Ensure max is not less than min
											if (formState.maxDifficulty < newMin) {
												formState.maxDifficulty = newMin;
											}
											setConfiguration(formState);
										}}
										class="flex-1"
									/>
									<span class="w-8 text-center font-bold text-blue-600">{formState.minDifficulty}</span>
								</div>
							</div>
							<div>
								<label for="maxDifficulty" class="block mb-2 font-medium text-gray-700">Maximum Difficulty:</label>
								<div class="flex items-center gap-3">
									<input 
										type="range" 
										id="maxDifficulty"
										min="1" 
										max="15" 
										value={formState.maxDifficulty}
										oninput={(e) => { 
											const newMax = parseInt(e.currentTarget.value);
											formState.maxDifficulty = newMax;
											// Ensure min is not greater than max
											if (formState.minDifficulty > newMax) {
												formState.minDifficulty = newMax;
											}
											setConfiguration(formState);
										}}
										class="flex-1"
									/>
									<span class="w-8 text-center font-bold text-blue-600">{formState.maxDifficulty}</span>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</section>
</div>
