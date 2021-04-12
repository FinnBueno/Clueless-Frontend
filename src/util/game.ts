export enum GameMode {
	PLAYER,
	MASTER,
}

export interface TeamWord {
	word: string;
	team?: Team;
	isRevealed: boolean;
	index: string;
}

export interface Team {
	color: string;
	name: string;
	pin: string;
}

export interface Game {
	metainfo: {
		startedAt: number;
		lastUpdate: number;
		endedAt: number;
		winningTeam: Team;
	};
	teams: Team[];
	pin: string;
	words: TeamWord[];
}

export const calculateRemainingWords = (team: Team, game: Game) => game.words.filter(
	word => word.team === team && !word.isRevealed
).length;

export const getOtherMode = (mode: GameMode) => (mode === GameMode.PLAYER
	? GameMode.MASTER
	: GameMode.PLAYER
);

export const getColorFromTeam = (team?: Team) => (team ? team.color : 'noTeam');

export const getColorByCardState = (word: TeamWord) => {
	if (word.isRevealed) {
		return getColorFromTeam(word.team);
	}
	return 'card.primary';
};
