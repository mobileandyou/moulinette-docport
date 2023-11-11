import {Accordion, Container, Grid, Image, Title} from '@mantine/core';
import image from './faq.svg';
import classes from "./HomeFAQ.module.css";


export function HomeFAQ() {
    return (
        <div className={classes.wrapper}>
            <Container size="lg">
                <Grid id="faq-grid" gutter={50}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image src={image} alt="Foire aux Questions"/>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={2} ta="left" className={classes.title}>
                            Questions fréquentes
                        </Title>

                        <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                            <Accordion.Item className={classes.item} value="what">
                                <Accordion.Control>À quoi sert DocPort ?</Accordion.Control>
                                <Accordion.Panel>Ce service permet de téléverser des documents dans un dossier partagé
                                    qui sera réutilisé par le service Moulinette. Cela facilite grandement par exemple
                                    la prise de photos et son transfert sur le poste fixe du
                                    technicien.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-creates">
                                <Accordion.Control>Qui peut créer un dossier ?</Accordion.Control>
                                <Accordion.Panel>Seul un utilisateur autorisé de Moulinette est en capacité de créer un
                                    dossier.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-writes">
                                <Accordion.Control>Qui peut ajouter des documents dans un dossier ?</Accordion.Control>
                                <Accordion.Panel>Toute personne en possession du lien du dossier peut ajouter des
                                    documents.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-reads">
                                <Accordion.Control>Qui peut accéder aux documents d'un dossier ?</Accordion.Control>
                                <Accordion.Panel>Seul un utilisateur autorisé de Moulinette est en capacité de consulter
                                    les documents d'un dossier.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="limitations">
                                <Accordion.Control>
                                    Quelles sont les limitations ?
                                </Accordion.Control>
                                <Accordion.Panel>Les limites sont fixées par le créateur du DocPort en question.</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
}