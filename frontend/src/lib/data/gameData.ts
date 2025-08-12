// Static game data that doesn't change during runtime

export const availableExpansions = [
	'Branch & Claw',
	'Jagged Earth',
	'Feather & Flame',
	'Horizons of Spirit Island',
	'Nature Incarnate'
] as const;

export const availableAdversaries = [
	'Random',
	'Brandenburg-Prussia',
	'England',
	'Sweden',
	'France',
	'Habsburg',
	'Russia',
	'Scotland'
] as const;

// Expansion abbreviations for display
export const expansionAbbreviations: Record<string, string> = {
	'Branch & Claw': 'B&C',
	'Jagged Earth': 'JE',
	'Horizons of Spirit Island': 'H',
	'Feather & Flame': 'F&F',
	'Nature Incarnate': 'NI'
};

export type Expansion = typeof availableExpansions[number];
export type Adversary = typeof availableAdversaries[number];
