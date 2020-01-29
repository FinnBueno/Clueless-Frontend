import React from 'react';
import firebase from 'firebase';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Flex, Heading, Text } from 'rebass';
import { CreateForm } from './form';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';

const createGame = (password: string) => {
    const getFreePin = firebase.functions().httpsCallable('getFreePin');

    trackPromise(
        getFreePin()
            .then(async result => {
                await firebase.app().auth().createUserWithEmailAndPassword(`${result.data.pin}@email.test`, password);
            })
            .catch(
                () => toast(`An error occurred while creating a new pin!`, { type: 'error' })
            ),
        'fetch-game'
    );
}

export const CreateGame: React.FC<CreateGameProps> = (props) => {
    return (
        <Rodal
            visible={props.isOpen}
            onClose={props.onClose}
            width='calc(100% - 54px)'
            height='200px'
            measure=''
            customStyles={{
                maxWidth: '350px',
                backgroundColor: '#4eb4a6'
            }}
            closeOnEsc={true}
            showCloseButton={false}
            animation='slideUp'
        >
            <Flex flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
                <Heading variant='3' color='white'>
                    Create new game
                </Heading>
                <Text variant='text' color='white'>
                    Please enter a password for your game.
                </Text>
                <CreateForm onSubmit={createGame} />
            </Flex>
        </Rodal>
    );
}



interface CreateGameProps {
    isOpen: boolean;
    onClose: () => void;
}
