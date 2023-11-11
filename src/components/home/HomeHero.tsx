import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots.tsx';
import {IconBooks} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import classes from "./HomeHero.module.css";

export function HomeHero() {
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
                    <Text size="lg" c="dimmed" className={classes.description}>
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