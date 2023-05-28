import { createStyles, Text, Container, ActionIcon, Group, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    footer: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    logo: {
        maxWidth: rem(200),

        [theme.fn.smallerThan('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    description: {
        marginTop: rem(5),

        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xs,
            textAlign: 'center',
        },
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    groups: {
        display: 'flex',
        flexWrap: 'wrap',

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    wrapper: {
        width: rem(160),
    },

    link: {
        display: 'block',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
        fontSize: theme.fontSizes.sm,
        paddingTop: rem(3),
        paddingBottom: rem(3),

        '&:hover': {
            textDecoration: 'underline',
        },
    },

    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: `calc(${theme.spacing.xs} / 2)`,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    afterFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    }
}));

export function MyFooter() {
    const { classes } = useStyles();

    return (
        <footer className={classes.footer}>
            <Container className={classes.afterFooter}>
                <Text color="dimmed" size="sm">
                    © {new Date().getFullYear()} Astrepid — Tous droits réservés
                </Text>
            </Container>
        </footer>
    );
}