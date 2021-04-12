import React from 'react';
import { Button, Box } from 'rebass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { GameMode } from 'src/util/game';
import { useSettings } from 'src/hooks/settings';

export const SettingsButton: React.FC<{}> = props => {
    const settings = useSettings();
    return (
        <>
            <Box>
                <Button
                    variant='small'
                    onClick={settings.open}
                >
                    <FontAwesomeIcon icon={faCog} />
                </Button>
            </Box>
        </>
    );
};

interface HeaderOptionsProps {
    setFontSize: (fontSize: number) => void;
    setLanguage: (lang: string) => void;
    language: string;
    onToggleMode: () => void;
    mode: GameMode;
}
