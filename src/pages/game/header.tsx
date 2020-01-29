import React from 'react';
import { Flex, Text, Button } from 'rebass';
import { calculateRemainingWords, TEAM_RED, TEAM_BLUE, GameMode, Game } from '../../util/game';

const modeToText = (mode: GameMode) => mode === GameMode.PLAYER_MODE ? 'Player Mode' : 'Master Mode';

export const GameHeader: React.FC<GameHeaderProps> = (props) => {
    const redScore = calculateRemainingWords(TEAM_RED, props.game);
    const blueScore = calculateRemainingWords(TEAM_BLUE, props.game);
    return (
        <Flex
            width='100%'
            justifyContent='space-between'
            alignItems='center'
            py='3'
        >
            <Flex flexDirection='column'>
                <Flex variant='scoreboard'>
                    <Text variant='score' color='teamRed'>
                        {redScore}
                    </Text>
                    <Text variant='score'>
                        &nbsp;-&nbsp;
                    </Text>
                    <Text variant='score' color='teamBlue'>
                        {blueScore}
                    </Text>
                </Flex>
            </Flex>
            <Flex>
                <Text color='white' variant='score'>{props.game.pin}</Text>
            </Flex>
            <Flex flexDirection='column'>
                <Text variant='card-text' textAlign='right' mb='1'>{modeToText(props.mode)}</Text>
                <Button variant='small' onClick={props.onToggleMode}>
                    <Text>Switch Mode</Text>
                </Button>
            </Flex>
        </Flex>
    );
}

interface GameHeaderProps {
    mode: GameMode;
    onToggleMode: () => void;
    game: Game;
}
