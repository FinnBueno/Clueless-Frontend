import { theme as baseTheme } from '@rebass/preset';
import { createGlobalStyle } from 'styled-components';
import { GAP_SPACE } from 'src/pages/game/game';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,600,900|Open+Sans&display=swap');
    html, body {
        background-color: #0DBBBB;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #root {
        height: 100%;
    }
    button {
        box-shadow: 0px 4px 9px 0px rgba(0,0,0,0.25);
        outline: none;
    }
`;

const customTheme = {
    colors: {
        background: '#0DBBBB',
        primary: '#03425b',
        secondary: '#0e91ab',
        heading: '#E6E6E6',
        error: '#FF5050',
        teamRed: '#f54242',
        teamBlue: '#4287f5',
        noTeam: '#AFAFAF',
        card: {
            primary: '#d0caa9',
            secondary: '#bfb98f',
        }
    },
    fonts: {
        body: 'Montserrat, sans-serif',
        heading: 'Montserrat, sans-serif',
    },
    text: {
        text: {
            fontFamily: 'body',
            fontWeight: 500,
            color: 'heading',
        },
        'card-text': {
            variant: 'text.text',
            color: 'black',
            wordBreak: 'break-all',
            textAlign: 'center',
        },
        score: {
            variant: 'text.text',
            color: 'black',
            fontWeight: 600,
            fontSize: '30px',
        },
        error: {
            variant: 'text.text',
            color: 'error',
            fontWeight: 600,
        },
        1: {
            fontFamily: 'heading',
            fontWeight: 900,
            color: 'heading',
            fontSize: '44px',
        },
        2: {
            variant: 'text.2',
            fontSize: '26px',
        }
    },
    buttons: {
        primary: {
            color: 'white',
            fontFamily: 'body',
            fontSize: '26px',
            fontWeight: 600,
            paddingX: '25px',
            outline: 'none',
            cursor: 'pointer',
            transform: 'translateY(0px)',
            transition: '.15s linear',
            '&:hover': {
                transform: 'translateY(4px)'
            }
        },
        secondary: {
            variant: 'buttons.primary',
            fontSize: '16px',
            paddingX: '12px',
            bg: 'secondary',
            fontWeight: 400,
        }
    },
    forms: {
        input: {
            bg: 'white',
            borderRadius: '4px',
            borderWidth: '0',
            fontSize: '28px',
            fontWeight: 500,
            paddingY: '6px',
            width: '225px',
            textAlign: 'center',
            outline: 'none',
            fontFamily: 'body',
            '&[type=number]::-webkit-inner-spin-button': {
                margin: '0px',
                '-webkit-appearance': 'none',
            },
            '&[type=number]::-webkit-outer-spin-button': {
                margin: '0px',
                '-webkit-appearance': 'none',
            }
        }
    },
    variants: {
        board: {
            mx: '-3px',
            height: '100%',
            flexWrap: 'wrap',
        },
        card: {
            padding: '2',
            mx: `${GAP_SPACE}px`,
            mt: `${GAP_SPACE}px`,
            width: '100%',
            height: `calc(100% - ${GAP_SPACE * 2}px)`,
            borderRadius: '4px',
            boxShadow: '0px 4px 9px 0px rgba(0,0,0,0.25);',
            bg: 'card.primary',
            '& p': {
                bg: 'card.secondary',
                width: '130px',
                borderRadius: '4px'
            }
        },
        scoreboard: {
            bg: 'white',
            flexShrink: 0,
            px: 2,
            borderRadius: '4px',
        },
        square: {
            width: '100vh',
            maxWidth: '100vw',
            marginX: 'auto',
            height: '100%'
        },
    }
};

export const theme = {
    ...baseTheme,
    ...customTheme
};
