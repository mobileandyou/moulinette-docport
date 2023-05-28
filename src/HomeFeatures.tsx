import { ThemeIcon, Text, Title, Container, SimpleGrid, createStyles, rem } from '@mantine/core';
import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock } from '@tabler/icons-react';

export const MOCKDATA = [
    {
        icon: IconGauge,
        title: 'Performances',
        description:
            'En se basant uniquement sur des technologies modernes nous pouvons vous offrir des résultats optimaux',
    },
    {
        icon: IconUser,
        title: 'Vie privée',
        description:
            'Seules les informations nécessaires sont collectées et les dossier sont supprimés après leur utilisation ou expiration',
    },
    {
        icon: IconCookie,
        title: 'Aucun intermédiaire',
        description:
            'Nous ne faisons appel à aucun intermédiaire, vous êtes en relation directe avec les technologies utilisées',
    },
    {
        icon: IconLock,
        title: 'Sécurité',
        description:
            'Cet enjeu est au coeur de nos préoccupations, nous mettons tout en oeuvre pour vous offrir un service sécurisé',
    },
    {
        icon: IconMessage2,
        title: 'Support 24/7 ',
        description:
            'Nous sommes à votre écoute pour répondre à vos questions et vous accompagner dans votre utilisation',
    },
];

interface FeatureProps {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon size="1.1rem" stroke={1.5} />
            </ThemeIcon>
            <Text mt="sm" mb={7} weight={600}>
                {title}
            </Text>
            <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }}>
                {description}
            </Text>
        </div>
    );
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        marginTop: `calc(${theme.spacing.xl} * 2)`,
        marginBottom: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('sm')]: {
            marginTop: rem(60),
            marginBottom: rem(50),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        marginBottom: theme.spacing.md,
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(28),
            textAlign: 'left',
        },
    },

    description: {
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            textAlign: 'left',
        },
    },
}));

interface FeaturesGridProps {
    data?: FeatureProps[];
}

export function HomeFeatures({  data = MOCKDATA }: FeaturesGridProps) {
    const { classes } = useStyles();
    const features = data.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <SimpleGrid
                mt={0}
                cols={3}
                spacing={50}
                breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: 'xl' },
                    { maxWidth: 755, cols: 1, spacing: 'xl' },
                ]}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}