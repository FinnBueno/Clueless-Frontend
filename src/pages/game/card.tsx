import React from 'react';
import { Flex, Text } from 'rebass';
import { getColorByCardState, getColorFromTeam, GameMode, TeamWord } from 'src/util/game';

export const Card: React.FC<CardProps> = props => (
	<Flex flex={`1 1 ${100 / props.gridSize}%`}>
		<Flex
			variant='card'
			bg={props.mode === GameMode.MASTER
				? getColorFromTeam(props.team)
				: getColorByCardState(props)
			}
		>
			<Flex
				height='100%'
				width='100%'
				justifyContent='center'
				alignItems='center'
				onClick={() => props.mode === GameMode.PLAYER && props.onClick(props.index)}
			>
				{props.mode === GameMode.PLAYER && (
					<Text
						as='p'
						p='4px'
						variant='card-text'
						fontSize={`${props.fontSize}px`}
					>
						{props.word}
					</Text>
				)}
			</Flex>
		</Flex>
	</Flex>
);

interface CardProps extends TeamWord {
	mode: GameMode;
	gridSize: number;
	onClick: (index: string) => void;
	fontSize: number;
}
