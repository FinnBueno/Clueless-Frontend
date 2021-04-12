import React, { useState } from 'react';
import { padStart } from 'lodash';
import { Box, Flex, Button, Heading } from 'rebass';
import firebase from 'firebase';
import { trackPromise } from 'react-promise-tracker';
import { CreateGame } from 'src/pages/create';
import { LoginForm } from './form';

export const Login: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	return (
		<>
			<CreateGame isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
			<Flex height='100%' alignItems='center' justifyContent='space-between' flexDirection='column'>
				<Box />
				<Flex flexDirection='column' alignItems='center'>
					<Box p={3}>
						<Heading textAlign='center' variant='1'>Let&apos;s play clueless!</Heading>
					</Box>
					<Box p={3}>
						<LoginForm onSubmit={
							(pin, password) => trackPromise(
								firebase.auth().signInWithEmailAndPassword(`${padStart(pin, 6, '0')}@email.test`, password),
								'sign-in'
							)
						}
						/>
					</Box>
				</Flex>
				<Box pb={4}>
					<Button variant='secondary' onClick={() => setModalOpen(true)}>
                        Or start your own game!
					</Button>
				</Box>
			</Flex>
		</>
	);
};
