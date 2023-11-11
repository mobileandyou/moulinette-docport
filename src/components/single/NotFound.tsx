import {Button, Container, Group, Image, SimpleGrid, Text, TextInput, Title,} from '@mantine/core';
import image from './404.svg';
import {IconLockOpen} from "@tabler/icons-react";
import {useState} from "react";
import classes from "./NotFound.module.css";

export function NotFound() {
    const [value, setValue] = useState('');

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={{base: 40, sm: 80}} cols={{base: 1, sm: 2}}>
                <Image src={image} className={classes.mobileImage}/>
                <div>
                    <Title className={classes.title}>Dossier inconnu</Title>
                    <Text c="dimmed" size="lg">
                        Le dossier DocPort que vous essayez d'atteindre n'existe pas, a été utilisé ou a expiré.
                        Veuillez vérifier l'URL ou contacter le propriétaire du dossier.
                    </Text>
                    <Group wrap={"nowrap"} align={"center"} mt="xl">
                        <TextInput
                            size="md"
                            className={classes.control}
                            placeholder="ID du dossier"
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                        />
                        <Button variant="outline" size="md" className={classes.control}
                                onClick={() => window.location.replace("/" + value)}>
                            <IconLockOpen/>
                        </Button>
                    </Group>

                </div>
                <Image src={image} className={classes.desktopImage}/>
            </SimpleGrid>
        </Container>
    );
}