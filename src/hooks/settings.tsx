import React, { useState } from 'react';
import { Button, Flex, Heading, Text } from 'rebass';
import { Input } from '@rebass/forms';
import Drawer from 'react-motion-drawer';
import Flag from 'react-flagkit';
import { ConfirmDialog } from 'src/pages/game/header/settings/confirm-mode';
import { GameMode, getOtherMode } from 'src/util/game';

const LANGUAGE_NL = "NL";
const LANGUAGE_EN = "GB";

type Settings = {
    fontSize: number;
    mode: GameMode;
    language: string;
    setFontSize: (fontSize: number) => void;
    toggleMode: () => void;
    toggleLanguage: () => void;
    open: () => void;
};

export const DEFAULT_SETTINGS: Settings = {
    fontSize: 18,
    mode: GameMode.PLAYER,
    language: LANGUAGE_NL,
    setFontSize: (_) => {},
    toggleLanguage: () => {},
    toggleMode: () => {},
    open: () => {},
};

const SettingsContext = React.createContext<Settings>(DEFAULT_SETTINGS);

const modeToText = (mode: GameMode) => (mode === GameMode.PLAYER ? 'Player Mode' : 'Master Mode');

export const SettingsProvider: React.FC<{}> = ({ children }) => {
    const [fontSize, setFontSize] = useState(DEFAULT_SETTINGS.fontSize);
    const [language, setLanguage] = useState(DEFAULT_SETTINGS.language);
    const [mode, setMode] = useState(DEFAULT_SETTINGS.mode);
    const [showModeConfirmModal, setShowModeConfirmModal] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleMode = () => {
		if (mode === GameMode.PLAYER) {
            setShowModeConfirmModal(true);
		} else {
			setMode(getOtherMode(mode))
		}
    }
    
    const toggleLanguage = () => setLanguage(language === LANGUAGE_NL ? LANGUAGE_EN : LANGUAGE_NL);

    const settings = {
        fontSize,
        mode,
        language,
        setFontSize: (fs: number) => setFontSize(fs),
        toggleLanguage,
        toggleMode,
        open: () => setDrawerOpen(true),
    };
    return (
        <SettingsContext.Provider value={settings}>
            <ConfirmDialog
                heading='Are you sure?'
                body='This will reveal all the colours of the cards!'
                show={showModeConfirmModal}
                onConfirm={success => {
                    if (success) {
                        setMode(getOtherMode(mode));
                    }
                    setShowModeConfirmModal(false);
                }}
            />
            <Drawer
                zIndex="50"
                drawerStyle={{ backgroundColor: '#0DBBBB' }}
                right
                open={isDrawerOpen}
                onChange={(open: boolean) => {
                    if (open)
                        return;
                    setDrawerOpen(false);
                } }
            >
                <Flex m='3' flexDirection='column'>
                    <Heading variant='heading-2' mb='3'>Settings</Heading>
                    <Flex flexDirection='column'>
                        <Flex justifyContent='space-between' alignItems='center' mb='3'>
                            <Text variant='card-text' textAlign='left' mb='1'>{modeToText(mode)}</Text>
                            <Button variant='small' onClick={toggleMode}>
                                <Text>Switch Mode</Text>
                            </Button>
                        </Flex>
                        <Flex justifyContent='space-between' alignItems='center' mb='3'>
                            <Text variant='card-text' mb='1'>Font size</Text>
                            <Input
                                variant='number-small'
                                type='number'
                                defaultValue={DEFAULT_SETTINGS.fontSize}
                                onChange={(e: any) => setFontSize(e.target.value)}
                            />
                        </Flex>
                        <Flex justifyContent='space-between' alignItems='center' mb='3'>
                            <Text variant='card-text' mb='1'>Language</Text>
                            <Flag
                                country={language}
                                onClick={toggleLanguage} />
                        </Flex>
                    </Flex>
                </Flex>
            </Drawer>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => React.useContext(SettingsContext);
