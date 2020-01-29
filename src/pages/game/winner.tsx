import React from 'react';
import firebase from 'firebase';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Flex, Heading } from 'rebass';
import { Game, getColorFromTeam, teamNumberToName } from '../../util/game';

export const WinnerDialog: React.FC<{ game: Game }> = (props) => {
    return (
        <>
            <Rodal
                visible={props.game.metainfo.endedAt}
                onClose={() => firebase.auth().signOut()}
                width='calc(100% - 54px)'
                height='200px'
                measure=''
                customStyles={{
                    maxWidth: '400px',
                    backgroundColor: 'rgb(75, 207, 207)'
                }}
                closeOnEsc={true}
                showCloseButton={false}
                animation='slideUp'
            >
                <Flex flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                    <Heading textAlign='center' variant='1' color={getColorFromTeam(props.game.metainfo.winningTeam)} style={{
                        borderRadius: '4px'
                    }}>
                        Team {teamNumberToName(props.game.metainfo.winningTeam)} wins!
                    </Heading>
                </Flex>
            </Rodal>
        </>
    );
}
