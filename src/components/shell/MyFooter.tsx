import {Container, Text} from '@mantine/core';

import classes from "./MyFooter.module.css";

export function MyFooter() {

    return (
        <footer>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © {new Date().getFullYear()} Astrepid — Tous droits réservés
                </Text>
            </Container>
        </footer>
    );
}