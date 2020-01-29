import React, { useState } from 'react';
import { Box, Flex, Button, Heading } from 'rebass';
import { CreateGame } from '../create';
import { LoginForm } from './form';
import firebase from 'firebase';

export const Login: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <>
            <CreateGame isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            <Flex height='100%' alignItems='center' justifyContent='space-between' flexDirection='column'>
                <Box />
                <Flex flexDirection='column' alignItems='center'>
                    <Box p={3}>
                        <Heading textAlign='center' variant='1'>Let's play clueless!</Heading>
                    </Box>
                    <Box p={3}>
                        <LoginForm onSubmit={async (pin, password) => await firebase.auth().signInWithEmailAndPassword(`${pin}@email.test`, password)} />
                    </Box>
                </Flex>
                <Box pb={4}>
                    <Button variant='secondary' onClick={() => setModalOpen(true)}>
                        Or start your own game!
                    </Button>
                </Box>
            </Flex>
        </>
    )
}
