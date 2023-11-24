import "@mantine/core/styles.css";
import {AppShell, MantineProvider} from "@mantine/core";
import {theme} from "./theme";
import {Outlet, useParams,} from "react-router-dom";
import '@mantine/notifications/styles.css';
import {Notifications} from "@mantine/notifications";
import {MyHeader} from "./components/shell/MyHeader.tsx";
import {MyFooter} from "./components/shell/MyFooter.tsx";
import {useTranslation} from "react-i18next";
import {ModalsProvider} from "@mantine/modals";
import '@mantine/dropzone/styles.css';

export default function App() {
    const {id} = useParams();
    const {t} = useTranslation();

    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
            <Notifications/>
            <AppShell
                header={{height: 56}}
                padding="md"
            >
                <AppShell.Header>
                    <MyHeader links={
                        [
                            {
                                link: "/",
                                label: t("header.home")
                            },
                            {
                                link: "/" + id,
                                label:  t("header.my_folder")
                            }
                        ]
                    }/>
                </AppShell.Header>


                <AppShell.Main>
                    <Outlet/>
                    <MyFooter/>
                </AppShell.Main>

            </AppShell>
            </ModalsProvider>
        </MantineProvider>
    );
}
