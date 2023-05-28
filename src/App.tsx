import {AppShell, MantineProvider,} from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import {MyHeader} from "./MyHeader";

import {Outlet, useParams} from "react-router-dom";
import {MyFooter} from "./MyFooter";

export default function App() {
    const {id} = useParams();
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS
                         theme={{
                             primaryColor: 'red',
                         }}
        >
            <Notifications/>
            <AppShell
                navbarOffsetBreakpoint="md"
                fixed
                footer={<MyFooter/>}
                header={<MyHeader links={
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
                }/>}
            >
                <Outlet/>
            </AppShell>
        </MantineProvider>
    );
}