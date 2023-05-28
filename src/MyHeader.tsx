import {useEffect, useState} from 'react';
import {
    createStyles,
    Header,
    Group,
    ActionIcon,
    Container,
    Burger,
    rem,
    Text,
    Avatar,
    Popover,
    Anchor
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {IconInfoCircle, IconLock} from '@tabler/icons-react';
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: rem(56),

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: rem(260),

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: rem(260),

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 600,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface HeaderMiddleProps {
    links: { link: string; label: string }[];
}

export function MyHeader({ links }: HeaderMiddleProps) {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();
    const navigation = useNavigate();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, { [classes.linkActive]: active === link.link })}
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

    return (
        <Header height={56} mb={120}>
            <Container className={classes.inner}>
                <Group className={classes.links} spacing={5}>
                    {items}
                </Group>

                <Anchor style={{textDecoration: "none", color: "black"}} onClick={() => navigation("/")}><Group align={"center"} spacing={10}>
                    <Avatar src={"https://moulinette.eu/img/apple-touch-icon.png"} size={"sm"}/>
                    <Text size={"xl"} fw={"bolder"}>DocPort</Text>
                </Group></Anchor>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <Popover>
                        <Popover.Target>
                            <ActionIcon size="lg">
                                <IconInfoCircle size="1.1rem" stroke={1.5} />
                            </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown maw={300}>
                            <Text size={"xs"} align={"center"}>
                                Pour plus de sécurité dans l'envoi de vos documents, assurez-vous de naviguer sur le site officiel de DocPort :
                            </Text>
                            <Text weight={"bold"} size={"xs"} align={"center"}>
                                <Group noWrap spacing={5} position={"center"} pt={5}><IconLock size={10}/> docport.moulinette.eu</Group>
                            </Text>
                        </Popover.Dropdown>
                    </Popover>

                </Group>
            </Container>
        </Header>
    );
}