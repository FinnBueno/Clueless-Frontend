import React from 'react';
import { Flex, Text } from 'rebass';
import { calculateRemainingWords, Game } from 'src/util/game';
import { SettingsButton } from './settings';

export const GameHeader: React.FC<{ game: Game }> = (props) => {
	const scores = props.game.teams.map(team => calculateRemainingWords(team, props.game));
	return (
		<Flex
			width='100%'
			justifyContent='space-between'
			alignItems='center'
			py='3'
		>
			{/* Scores */}
			<Flex flexDirection='column'>
				<Flex variant='scoreboard'>
					{scores.map((score, index) => {
						const team = props.game.teams[index];
						return (
							<React.Fragment key={team.name}>
								<Text variant='score' color={team.color}>
									{score}
								</Text>
								{index < scores.length - 1 && (
									<Text variant='score'>
                                        &nbsp;-&nbsp;
									</Text>
								)}
							</React.Fragment>
						);
					})}
				</Flex>
			</Flex>
			{/* Pin */}
			<Flex>
				<Text color='white' variant='score'>{props.game.pin}</Text>
			</Flex>
			{/* Settings */}
			<SettingsButton />
		</Flex>
	);
};
