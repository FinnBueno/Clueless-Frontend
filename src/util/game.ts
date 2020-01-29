export const TEAM_RED = 0;
export const TEAM_BLUE = 1;

export enum GameMode {
    PLAYER_MODE,
    MASTER_MODE,
}
export interface TeamWord {
    word: string;
    team?: number;
    isRevealed: boolean;
    index: string;
}

export interface Game {
    metainfo: {
        startedAt: number;
        lastUpdate: number;
        endedAt: number;
        winningTeam: number;
    },
    pin: string;
    words: TeamWord[];
}

export const teamNumberToName = (i: number) => i === TEAM_RED ? 'Red' : 'Blue';

export const calculateRemainingWords = (team: number, game: Game) => game.words.filter(word => word.team === team && !word.isRevealed).length;

export const getOtherMode = (mode: GameMode) => mode === GameMode.PLAYER_MODE ? GameMode.MASTER_MODE : GameMode.PLAYER_MODE;

export const getColorByCardState = (word: TeamWord) => {
    if (word.isRevealed) {
        return getColorFromTeam(word.team);
    }
    return 'card.primary';
}

export const getColorFromTeam = (team?: number) => {
    if (team === TEAM_RED) {
        return 'teamRed';
    } else if (team === TEAM_BLUE) {
        return 'teamBlue';
    } else {
        return 'noTeam';
    }
}