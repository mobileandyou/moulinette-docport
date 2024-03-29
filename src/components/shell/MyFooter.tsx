import {Center, Container, Divider, Select, Text} from '@mantine/core';

import classes from "./MyFooter.module.css";
import {useTranslation} from "react-i18next";

export function MyFooter() {

    const {i18n,t} = useTranslation();

    const changeLanguageBasedOnValue = (value: string | null) => {
        if (value === "Français") {
            i18n.changeLanguage("fr");
        } else if (value === "English") {
            i18n.changeLanguage("en");
        } else if (value === "Deutsch") {
            i18n.changeLanguage("de");
        } else if(value === "Dutch") {
            i18n.changeLanguage("nl");
        } else if(value === "Italiano") {
            i18n.changeLanguage("it");
        } else if(value === "Español") {
            i18n.changeLanguage("es");
        }
    }

    const mapCurrentLanguageToValue = () => {
        const langTwoChars = i18n.language?.split("-")[0];
        if (langTwoChars === "fr") {
            return "Français";
        } else if (langTwoChars === "en") {
            return "English";
        } else if (langTwoChars === "de") {
            return "Deutsch";
        } else if(langTwoChars === "nl") {
            return "Dutch";
        } else if(langTwoChars=== "it") {
            return "Italiano";
        } else if(langTwoChars === "es") {
            return "Español";
        }
    }

    return (
        <footer className={classes.footer}>
            <Divider/>
            <Container className={classes.afterFooter}>
                <Center><Select
                    checkIconPosition="left"
                    data={['Français', 'English', 'Deutsch', 'Dutch', 'Italiano', 'Español']}
                    maw={100}
                    pb={10}
                    size={"xs"}
                    onChange={(value) => {
                        changeLanguageBasedOnValue(value);
                    }}
                    placeholder="Pick language"
                    value={mapCurrentLanguageToValue()}
                    defaultValue={mapCurrentLanguageToValue()}
                /></Center>
                <Text c="dimmed" size="sm">
                    © {new Date().getFullYear()} Astrepid — {t("footer.copy")}
                </Text>
            </Container>
        </footer>
    );
}