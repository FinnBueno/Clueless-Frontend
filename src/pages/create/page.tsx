import React from 'react';
import firebase from 'firebase';
import { Flex, Heading } from 'rebass';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { CreateForm } from './form';

const createGame = (password: string, teamSize: number, gridSize: number) => {
	const getFreePin = firebase.functions().httpsCallable('getFreePin');

	trackPromise(
		getFreePin()
			.then(async (result) => {
				await firebase.app().auth().createUserWithEmailAndPassword(`${result.data.pin}@email.test`, password);
				await firebase.app().auth().currentUser?.updateProfile({
					displayName: `${teamSize || 2}-${gridSize || 5}`
				});
			})
			.catch(
				() => toast('An error occurred while creating a new pin!', { type: 'error' })
			),
		'fetch-game'
	);
};

export const CreateGame: React.FC<CreateGameProps> = props => (
	<Rodal
		visible={props.isOpen}
		onClose={props.onClose}
		measure=''
		customStyles={{
			bottom: 'unset',
			top: 'unset',
			left: 'unset',
			right: 'unset',
			backgroundColor: '#4eb4a6'
		}}
		closeOnEsc
		showCloseButton={false}
		animation='slideUp'
	>
		<Flex flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
			<Heading variant='3' color='white'>
                    Create new game
			</Heading>
			<CreateForm onSubmit={createGame} />
		</Flex>
	</Rodal>
);


interface CreateGameProps {
	isOpen: boolean;
	onClose: () => void;
}
