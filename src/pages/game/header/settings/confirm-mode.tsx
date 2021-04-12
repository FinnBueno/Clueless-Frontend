import React from 'react';
import Rodal from 'rodal';
import { Button, Flex, Heading, Text } from 'rebass';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => (
    <Rodal
        visible={props.show}
        onClose={() => props.onConfirm(false)}
        measure=''
        customStyles={{
            maxWidth: '350px',
            height: '100px',
            backgroundColor: 'rgb(75, 207, 207)',
        }}
        closeOnEsc
        showCloseButton={true}
        animation='slideUp'
    >
        <Flex height='100%' justifyContent='space-between' flexDirection='column'>
            <Flex flexDirection='column'>
                <Heading mb='2'>{props.heading}</Heading>
                <Text variant='body'>{props.body}</Text>
            </Flex>
            <Flex width='100%' justifyContent='flex-end'>
                <Button variant='small' onClick={() => props.onConfirm(true)}>
                    <Text>I'm sure</Text>
                </Button>
            </Flex>
        </Flex>
    </Rodal>
);

type ConfirmDialogProps = {
    show: boolean;
    body: string;
    heading: string;
    onConfirm: (confirmPressed?: boolean) => void;
};
