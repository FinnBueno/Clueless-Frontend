import React from 'react';
import { Flex, Text } from 'rebass';
import { getColorByCardState, getColorFromTeam, GameMode, TeamWord } from 'src/util/game';

export const Card: React.FC<CardProps> = (props) => (
    <Flex flex='1 1 20%'>
        <Flex variant='card' bg={props.mode === GameMode.MASTER_MODE ? getColorFromTeam(props.team) : getColorByCardState(props)}>
            <Flex
                height='100%'
                width='100%'
                justifyContent='center'
                alignItems='center'
                onClick={() => props.mode === GameMode.PLAYER_MODE && props.onClick(props.index)}
            >
                <Text
                    as='p'
                    p='4px'
                    variant='card-text'
                >
                    {props.word}
                </Text>
            </Flex>
        </Flex>
    </Flex>
);

interface CardProps extends TeamWord {
    mode: GameMode;
    onClick: (index: string) => void;
}
