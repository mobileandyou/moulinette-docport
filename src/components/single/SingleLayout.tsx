import {useParams} from "react-router-dom";
import {Container, Loader, Stack, Text} from "@mantine/core";
import {NotFound} from "./NotFound";
import {useEffect, useState} from "react";
import Teleport from "./Teleport.tsx";
import classes from "./Single.module.css";
import {useTranslation} from "react-i18next";

export default function SingleLayout() {

    const {id} = useParams();
    const [error, setError] = useState<string | undefined>(undefined);
    const [docPort, setDocPort] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    async function getDocPort(silent?: boolean) {
        if (!silent) setLoading(true);
        if (id === "undefined" || id === undefined) {
            setError("");
            setLoading(false);
            return;
        }
        fetch("https://api.moulinette.eu/tool/docport/" + id,
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}},
        )
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    if(data?.code) {
                        setError(t(data.code + ".description"));
                    } else {
                        setError(data.message);
                    }
                } else {
                    setDocPort(data);
                }
                setLoading(false);
            })
            .catch(() => {
                setError(t("api.error.generic.description"));
                setLoading(false);
            })
    }

    useEffect(() => {
        getDocPort();

        // every 5 seconds
        const interval = setInterval(() => {
            getDocPort(true);
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    // if query contains ?token= set localstorage token
    useEffect(() => {
        if(window.location.search.includes("token")) {
            localStorage.setItem("token", window.location.search.split("=")[1]);
            // remove token from url
            window.history.replaceState({}, document.title, window.location.pathname);
            getDocPort();
        }
    }, []);

    return (
        <Container p={0} className={classes.root}>
            <Stack align={"center"}>
                {loading ? <Loader color={"red"} size={"md"}/> :
                    (
                        id === "undefined" || error ? <NotFound/> :
                            <Teleport data={docPort} setData={setDocPort} getDocPort={getDocPort}/>
                    )
                }

                {error && <Text size={"xs"} c={"dimmed"}>{error}</Text>}
            </Stack>
        </Container>
    )
}