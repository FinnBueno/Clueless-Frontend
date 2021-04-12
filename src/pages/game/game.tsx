import React from 'react';
import { useAuth } from 'src/firebase';
import { Flex, Button } from 'rebass';
import firebase from 'firebase';
import { Card } from './card';
import { GameHeader } from './header';
import { WinnerDialog } from './winner';
import { useSettings } from 'src/hooks/settings';

export const GAP_SPACE = 3;

export const Game: React.FC<{}> = () => {
	const { game, revealWord } = useAuth();
	const { fontSize, mode } = useSettings();

	if (!game) {
		return (<p>No game found.</p>);
	}

	const words = Object.values(game?.words || {});
	return (
		<Flex flexDirection='column' height='100%'>
			<WinnerDialog game={game} />
			<Flex variant='square' flexDirection='column' p='3px'>
				{/* Header */}
				<GameHeader
					game={game}
				/>
				{/* Board */}
				<Flex variant='board'>
					{words.map(
						word => (
							<Card
								key={word.index}
								{...word}
								fontSize={fontSize}
								gridSize={Math.sqrt(game.words.length)}
								mode={mode}
								onClick={revealWord}
							/>
						)
					)}
				</Flex>
				<Flex justifyContent='flex-end' px='0' pt='2' pb='2'>
					<Button variant='small' onClick={() => firebase.auth().signOut()}>
						Leave game
					</Button>
				</Flex>
				
			</Flex>
		</Flex>
	);
};
