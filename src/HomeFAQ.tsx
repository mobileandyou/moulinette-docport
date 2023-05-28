import { createStyles, Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import image from './faq.svg';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    },

    title: {
        marginBottom: theme.spacing.md,
        paddingLeft: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    item: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    },
}));

export function HomeFAQ() {
    const { classes } = useStyles();
    return (
        <div className={classes.wrapper}>
            <Container size="lg">
                <Grid id="faq-grid" gutter={50}>
                    <Col span={12} md={6}>
                        <Image src={image} alt="Foire aux Questions" />
                    </Col>
                    <Col span={12} md={6}>
                        <Title order={2} ta="left" className={classes.title}>
                            Questions fréquentes
                        </Title>

                        <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                            <Accordion.Item className={classes.item} value="what">
                                <Accordion.Control>À quoi sert DocPort ?</Accordion.Control>
                                <Accordion.Panel>Ce service permet de téléverser des documents dans un dossier partagé qui sera réutilisé par le service Moulinette. Cela facilite grandement par exemple la prise de photos et son transfert sur le poste fixe du technicien.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-creates">
                                <Accordion.Control>Qui peut créer un dossier ?</Accordion.Control>
                                <Accordion.Panel>Seul un utilisateur autorisé de Moulinette est en capacité de créer un dossier.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-writes">
                                <Accordion.Control>Qui peut ajouter des documents dans un dossier ?</Accordion.Control>
                                <Accordion.Panel>Toute personne en possession du lien du dossier peut ajouter des documents.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-reads">
                                <Accordion.Control>Qui peut accéder aux documents d'un dossier ?</Accordion.Control>
                                <Accordion.Panel>Seul un utilisateur autorisé de Moulinette est en capacité de consulter les documents d'un dossier.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="limitations">
                                <Accordion.Control>
                                    Quelles sont les limitations ?
                                </Accordion.Control>
                                <Accordion.Panel>Aujourd'hui, un dossier peut contenir jusqu'à 5 documents de 15 Mo chacun maximum.</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Grid>
            </Container>
        </div>
    );
}