import { createStyles, Title, Text, Button, Container, rem } from '@mantine/core';
import { Dots } from './Dots';
import {IconBooks, IconFile, IconLockAccess} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: rem(100),
        paddingBottom: rem(40),

        [theme.fn.smallerThan('sm')]: {
            paddingTop: rem(20),
            paddingBottom: rem(0),
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    dots: {
        position: 'absolute',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    dotsLeft: {
        left: 0,
        top: 0,
    },

    title: {
        textAlign: 'center',
        fontWeight: 800,
        fontSize: rem(40),
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 8],
    },

    description: {
        textAlign: 'center',

        [theme.fn.smallerThan('xs')]: {
            textAlign: 'left',
            fontSize: theme.fontSizes.md,
        },
    },

    controls: {
        marginTop: theme.spacing.lg,
        display: 'flex',
        justifyContent: 'center',

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    control: {
        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        [theme.fn.smallerThan('xs')]: {
            height: rem(42),
            fontSize: theme.fontSizes.md,

            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },
}));

export function HomeHero() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    return (
        <Container className={classes.wrapper} size={1400}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    Créez,{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        téléportez
                    </Text>...{' '}
                    c'est fait.
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" color="dimmed" className={classes.description}>
                        Il est temps de créer un workflow de partage de fichiers qui fonctionne pour vous et votre équipe, facilement et en toute sécurité.
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button className={classes.control} size="lg" variant="default" color="gray" onClick={() =>
                        window.open("mailto:julien+docport@astrepid.com")}>
                        Demander une démo
                    </Button>
                    <Button className={classes.control} color={"red.8"} size="lg" onClick={() => navigate("/undefined")}>
                        <IconBooks/>
                    </Button>
                </div>
            </div>
        </Container>
    );
}