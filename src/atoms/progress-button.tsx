import React from 'react';
import { ButtonProps, Button } from 'rebass';
import { LoadingIndicator } from './loading-indicator';

export const ProgressButton: React.FC<ProgressButtonProps> = (props) => (
    <Button {...props}>
        <LoadingIndicator scope={props.scope}>
            {props.children}
        </LoadingIndicator>
    </Button>
);

interface ProgressButtonProps extends ButtonProps {
    scope: string;
}
