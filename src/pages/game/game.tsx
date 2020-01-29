import React, { useState } from 'react';
import { useAuth } from 'src/firebase';
import { Flex, Button } from 'rebass';
import { Card } from './card';
import { GameHeader } from './header';
import { GameMode, getOtherMode } from 'src/util/game';
import { WinnerDialog } from './winner';
import firebase from 'firebase';

export const GAP_SPACE = 3;

export const Game: React.FC<GameProps> = () => {
    const { game, revealWord } = useAuth();
    const [mode, setMode] = useState(GameMode.PLAYER_MODE);

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
                    mode={mode}
                    onToggleMode={() => setMode(getOtherMode(mode))}
                    game={game}
                />
                {/* Board */}
                <Flex variant='board'>
                    {words.map(word => <Card key={word.index} {...word} mode={mode} onClick={revealWord} />)}
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

interface GameProps {
}
