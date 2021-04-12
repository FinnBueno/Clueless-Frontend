import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import * as firebase from 'firebase/app';
import { calculateRemainingWords, Game, Team } from 'src/util/game';
import { trackPromise } from 'react-promise-tracker';
import { Flex } from 'rebass';
import { BeatLoader } from 'react-spinners';

interface Auth {
	game?: Game;
	revealWord: (index: string) => void;
}

const persistRevealedWord = (index: string) => {
	const revealWord = firebase.functions().httpsCallable('revealWord');
	revealWord({ index })
		.then()
		.catch(() => toast('An error occurred while revealing a word!', { type: 'error' }));
};

const endGame = (endedAt: number, winningTeam: Team) => {
	const closeGame = firebase.functions().httpsCallable('closeGame');
	closeGame({ endedAt, winningTeam })
		.then()
		.catch(() => toast('An error occurred while closing the game!', { type: 'error' }));
};

const revealWord = (updateCache: (game: Game) => void, index: string, game: Game) => {
	if (game.metainfo.endedAt) {
		// don't reveal words on games that have ended
		return;
	}
	const arrayIndex = game.words.findIndex(word => word.index === index);
	if (arrayIndex === undefined) {
		return;
	}
	const newGame = { ...game };

	newGame.words[arrayIndex].isRevealed = true;
	newGame.metainfo.lastUpdate = Date.now();
	const revealedWord = newGame.words[arrayIndex];
	persistRevealedWord(revealedWord.index);

	if (revealedWord.team !== undefined && calculateRemainingWords(revealedWord.team, game) <= 0) {
		// end the game
		newGame.metainfo.endedAt = Date.now();
		newGame.metainfo.winningTeam = revealedWord.team;
		endGame(newGame.metainfo.endedAt, newGame.metainfo.winningTeam);
	}

	updateCache(newGame);
};

export const AuthContext = React.createContext<Auth>({ game: undefined, revealWord: () => {} });

export const AuthProvider: React.FC = (props) => {
	const [game, setGame] = useState();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		firebase.app().auth().onAuthStateChanged((user) => {
			setLoaded(true);
			if (!user || !user.email) {
				// logout
				setGame(undefined);
			} else {
				// login
				const getGame = firebase.functions().httpsCallable('getGame');
				trackPromise(
					getGame().then((result) => {
						const teams = Object.keys(result.data.teams).map(
							index => ({ ...result.data.teams[index], index })
						);
						setGame({
							...result.data,
							teams,
							words: Object.keys(result.data.words).map(index => ({
								...result.data.words[index],
								team: teams.find(team => team.name === result.data.words[index].team),
								index
							})),
						});
					})
						.catch(
							() => toast('An error occurred while trying to log you into your game!', { type: 'error' })
						),
					'fetch-game'
				);
			}
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				game,
				revealWord: (index: string) => revealWord(setGame, index, game),
			}}
		>
			{!loaded ? (
				<Flex width='100%' height='100%' justifyContent='center' alignItems='center'>
					<BeatLoader size={50} loading={!loaded} color='#03425b' show />
				</Flex>
			) : props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
