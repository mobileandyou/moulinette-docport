import {useEffect, useState} from 'react';
import {
    ActionIcon,
    Anchor,
    Avatar,
    Box,
    Burger,
    Container,
    Divider,
    Drawer,
    Group,
    rem,
    ScrollArea,
    Text
} from '@mantine/core';
import {IconInfoCircle, IconLock} from '@tabler/icons-react';
import {useNavigate} from "react-router-dom";
import classes from "./MyHeader.module.css";
import {useDisclosure} from "@mantine/hooks";

interface HeaderMiddleProps {
    links: {
        link: string;
        label: string
    }[];
}

export function MyHeader({links}: HeaderMiddleProps) {
    const [active, setActive] = useState(links[0].link);
    const navigation = useNavigate();
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={(event) => {
                event.preventDefault();
                navigation(link.link);
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    useEffect(() => {
        setActive("/" + window.location.pathname?.split('/')[1] || links[0].link);
    }, [links]);


    const [infoBanner, setInfoBanner] = useState(true);

    // display info banner for 5 seconds upon load
    useEffect(() => {
        setTimeout(() => {
            setInfoBanner(false);
        }, 5000);
    }, []);

    return (<>
        <header className={classes.header}>
            <Container>
                <Group grow className={classes.inner} justify={"space-between"}>

                    <Group gap={5} visibleFrom={"lg"} justify={"start"}>
                        {items}
                    </Group>

                    <Group gap={5} className={classes.logo}>
                        <Anchor style={{textDecoration: "none", color: "black"}} onClick={() => navigation("/")}>
                            <Group align={"center"} gap={10} wrap={"nowrap"}>
                                <Avatar src={"https://moulinette.eu/img/apple-touch-icon.png"} size={"sm"}
                                        radius={"sm"}/>
                                <Text size={"xl"} fw={"bolder"}>DocPort</Text>
                            </Group>
                        </Anchor>
                    </Group>

                    <Group gap={0} wrap="nowrap" justify={"end"}>
                        <ActionIcon onClick={() => setInfoBanner(!infoBanner)} variant={"subtle"} c={"gray"}
                                    visibleFrom={"lg"}>
                            <IconInfoCircle size="1.1rem" stroke={1.5}/>
                        </ActionIcon>
                        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="lg"/>
                    </Group>


                </Group>
            </Container>
            {infoBanner && <Box className={classes.infoBanner}>
                <Text size={"xs"} ta={"center"} fw={"bold"}>
                    Pour plus de sécurité dans l'envoi de vos documents, assurez-vous de naviguer sur le site officiel
                    de DocPort :&nbsp;
                    <IconLock size={10}/> <u>docport.moulinette.eu</u>
                </Text>
            </Box>}
        </header>

        <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Menu"
            hiddenFrom="lg"
            zIndex={1000000}
        >
            <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">

                {items}

                <Divider my="sm"/>

                <Text size={"xs"} ta={"center"} fw={"bold"} px={"xl"} py={"md"}>
                    Pour plus de sécurité dans l'envoi de vos documents, assurez-vous de naviguer sur le site officiel
                    de DocPort :&nbsp;
                    <IconLock size={10}/> <u>docport.moulinette.eu</u>
                </Text>
            </ScrollArea>

        </Drawer>

    </>);
}