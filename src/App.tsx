import "@mantine/core/styles.css";
import {AppShell, MantineProvider} from "@mantine/core";
import {theme} from "./theme";
import {Outlet, useParams,} from "react-router-dom";
import '@mantine/notifications/styles.css';
import {Notifications} from "@mantine/notifications";
import {MyHeader} from "./components/shell/MyHeader.tsx";
import {MyFooter} from "./components/shell/MyFooter.tsx";

export default function App() {
    const {id} = useParams();

    return (
        <MantineProvider theme={theme}>
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
                                label: "Accueil",
                            },
                            {
                                link: "/" + id,
                                label: "Mon dossier"
                            }
                        ]
                    }/>
                </AppShell.Header>


                <AppShell.Main>
                    <Outlet/>
                    <MyFooter/>
                </AppShell.Main>

            </AppShell>

        </MantineProvider>
    );
}
