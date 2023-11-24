import {Button, Container, Group, Image, SimpleGrid, Text, TextInput, Title,} from '@mantine/core';
import image from './no_case.svg';
import {IconLockOpen} from "@tabler/icons-react";
import {useState} from "react";
import classes from "./NotFound.module.css";
import {useTranslation} from "react-i18next";

export function NoCaseProvided() {
    const [value, setValue] = useState('');
    const {t} = useTranslation();

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={{base: 40, sm: 80}} cols={{base: 1, sm: 2}}>
                <Image src={image} className={classes.mobileImage}/>
                <div>
                    <Title className={classes.title}>{t("docport.no_case.title")}</Title>
                    <Text c="dimmed" size="lg">
                        {t("docport.no_case.description")}
                    </Text>
                    <Group wrap={"nowrap"} align={"center"} mt="xl">
                        <TextInput
                            size="md"
                            className={classes.control}
                            placeholder="ID"
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