import React from 'react';
import firebase from 'firebase';
import { Flex, Heading } from 'rebass';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Game } from 'src/util/game';

export const WinnerDialog: React.FC<{ game: Game }> = props => (
	<>
		<Rodal
			visible={props.game.metainfo.endedAt}
			onClose={() => firebase.auth().signOut()}
			measure=''
			customStyles={{
				maxWidth: '400px',
				maxHeight: '200px',
				backgroundColor: 'rgb(75, 207, 207)',
			}}
			closeOnEsc
			showCloseButton={false}
			animation='slideUp'
		>
			<Flex flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
				{props.game.metainfo.winningTeam && (
					<Heading
						textAlign='center'
						variant='1'
						color={props.game.metainfo.winningTeam.color}
						style={{
							borderRadius: '4px'
						}}
					>
                            Team {props.game.metainfo.winningTeam.name} wins!
					</Heading>
				)}
			</Flex>
		</Rodal>
	</>
);
