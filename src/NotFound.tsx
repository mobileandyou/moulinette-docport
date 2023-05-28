import {
    createStyles,
    Image,
    Container,
    Title,
    Text,
    Button,
    SimpleGrid,
    rem, Group, TextInput,
} from '@mantine/core';
import image from './404.svg';
import {IconLockAccess, IconLockOpen, IconSearch} from "@tabler/icons-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    title: {
        fontWeight: 900,
        fontSize: rem(34),
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));

export function NotFound() {
    const { classes } = useStyles();
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
                <Image src={image} className={classes.mobileImage} />
                <div>
                    <Title className={classes.title}>Dossier inconnu</Title>
                    <Text color="dimmed" size="lg">
                        Le dossier DocPort que vous essayez d'atteindre n'existe pas, a été utilisé ou a expiré. Veuillez vérifier l'URL ou contacter le propriétaire du dossier.
                    </Text>
                    <Group noWrap align={"center"} mt="xl">
                        <TextInput
                            size="md"
                            className={classes.control}
                            placeholder="ID du dossier"
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            />
                        <Button variant="outline" size="md"  className={classes.control} onClick={() => window.open("/" + value)}>
                            <IconLockOpen/>
                        </Button>
                    </Group>

                </div>
                <Image src={image} className={classes.desktopImage} />
            </SimpleGrid>
        </Container>
    );
}