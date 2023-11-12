import {Container, SimpleGrid, Text, ThemeIcon} from '@mantine/core';
import {IconGauge, IconLock, IconMessage2, IconSpy, IconUser} from '@tabler/icons-react';
import classes from "./HomeFeatures.module.css"
import {useTranslation} from "react-i18next";


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
    const {t} = useTranslation();

    const MOCKDATA = [
        {
            icon: IconGauge,
            title: t("home.features.feature1.title"),
            description: t("home.features.feature1.description"),
        },
        {
            icon: IconUser,
            title: t("home.features.feature2.title"),
            description: t("home.features.feature2.description"),
        },
        {
            icon: IconSpy,
            title: t("home.features.feature3.title"),
            description: t("home.features.feature3.description"),
        },
        {
            icon: IconLock,
            title: t("home.features.feature4.title"),
            description: t("home.features.feature4.description"),
        },
        {
            icon: IconMessage2,
            title: t("home.features.feature5.title"),
            description: t("home.features.feature5.description"),
        },
    ];

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