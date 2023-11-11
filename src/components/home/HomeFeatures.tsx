import {Container, SimpleGrid, Text, ThemeIcon} from '@mantine/core';
import {IconCookie, IconGauge, IconLock, IconMessage2, IconSpy, IconUser} from '@tabler/icons-react';
import classes from "./HomeFeatures.module.css"

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
        icon: IconSpy,
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

export function Feature({icon: Icon, title, description}: FeatureProps) {
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon size="1.1rem" stroke={1.5}/>
            </ThemeIcon>
            <Text mt="sm" mb={7} fw={600}>
                {title}
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
                {description}
            </Text>
        </div>
    );
}

export function HomeFeatures() {
    const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index}/>);

    return (
        <Container className={classes.wrapper}>
            <SimpleGrid
                mt={0}
                cols={{xl: 3, md: 2, sm: 1}}
                spacing={50}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}