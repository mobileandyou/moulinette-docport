import {Accordion, Container, Grid, Image, Title} from '@mantine/core';
import image from './faq.svg';
import classes from "./HomeFAQ.module.css";
import {useTranslation} from "react-i18next";


export function HomeFAQ() {
    const {t} = useTranslation();

    return (
        <div className={classes.wrapper}>
            <Container size="lg">
                <Grid id="faq-grid" gutter={50}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image src={image} alt="Foire aux Questions"/>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={2} ta="left" className={classes.title}>
                            {t("home.faq.title")}
                        </Title>

                        <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                            <Accordion.Item className={classes.item} value="what">
                                <Accordion.Control>{t("home.faq.questions.q1.title")}</Accordion.Control>
                                <Accordion.Panel>{t("home.faq.questions.q1.description")}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-creates">
                                <Accordion.Control>{t("home.faq.questions.q2.title")}</Accordion.Control>
                                <Accordion.Panel>{t("home.faq.questions.q2.description")}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-writes">
                                <Accordion.Control>{t("home.faq.questions.q3.title")}</Accordion.Control>
                                <Accordion.Panel>{t("home.faq.questions.q3.description")}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="who-reads">
                                <Accordion.Control>{t("home.faq.questions.q4.title")}</Accordion.Control>
                                <Accordion.Panel>{t("home.faq.questions.q4.description")}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="limitations">
                                <Accordion.Control>{t("home.faq.questions.q5.title")}</Accordion.Control>
                                <Accordion.Panel>{t("home.faq.questions.q5.description")}</Accordion.Panel>
                                <Accordion.Panel></Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
}