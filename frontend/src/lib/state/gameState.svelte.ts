interface InvaderSpace {
    activeCards: string[];
    faceDownCards: string[];
}

interface GameState {
    // State set before during configuration
    activeExpansions: string[];
    isUsingBlightCard: boolean;
    isUsingEvents: boolean;
    isUsingAdversaries: boolean;
    isUsingScenarios: boolean;
    numberOfSpirits: number;
    leadingAdversary: string;
    supportingAdversary: string;
    leadingAdversaryLevel: number;
    supportingAdversaryLevel: number;

    // State established during setup
    blightCard: string[];
    eventDeck: string[];
    fearDeck: string[];
    invaderDeck: string[];
   
    // State that changes during the game
    turn: number;
    nextInvaderCardIndex: number;
    nextEventCardIndex: number;
    nextFearCardIndex: number;
    generatedFear: number;
    blightDiscard: string[];
    eventDiscard: string[];
    fearDiscard: string[];
    invaderDiscard: string[];
    invaderRow: InvaderSpace[];
    isBlightedIsland: boolean;
    blightOnCard: number;
    terrorLevel: number;
}

const initialState: GameState = {
    activeExpansions: [],
    isUsingBlightCard: false,
    isUsingEvents: false,
    isUsingAdversaries: false,
    isUsingScenarios: false,
    numberOfSpirits: 0,
    leadingAdversary: "",
    supportingAdversary: "",
    leadingAdversaryLevel: 0,
    supportingAdversaryLevel: 0,
    blightCard: [],
    invaderDeck: [],
    eventDeck: [],
    fearDeck: [],
    turn: 0,
    nextInvaderCardIndex: 0,
    nextEventCardIndex: 0,
    nextFearCardIndex: 0,
    generatedFear: 0,
    eventDiscard: [],
    fearDiscard: [],
    invaderDiscard: [],
    invaderRow: [],
    isBlightedIsland: false,
    blightOnCard: 0,
    blightDiscard: [],
    terrorLevel: 0
};

// Create the store with $state
export const GameState = $state(structuredClone(initialState));

// Methods to update the state
export function setConfiguration(config: Partial<GameState>) {
    Object.assign(GameState, config);
}

export function updateGameState(updates: Partial<GameState>) {
    Object.assign(GameState, updates);
}

export function resetGameState() {
    Object.assign(GameState, structuredClone(initialState));
}