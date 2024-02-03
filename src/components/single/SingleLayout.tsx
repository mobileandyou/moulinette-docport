import {useNavigate, useParams} from "react-router-dom";
import {Container, Loader, Stack, Text} from "@mantine/core";
import {NotFound} from "./NotFound";
import {useEffect, useState} from "react";
import Teleport from "./Teleport.tsx";
import classes from "./Single.module.css";
import {useTranslation} from "react-i18next";
import {NoCaseProvided} from "./NoCaseProvided.tsx";

export default function SingleLayout() {

    const {id} = useParams();
    const [error, setError] = useState<string | undefined>(undefined);
    const [docPort, setDocPort] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    const [realId, setRealId] = useState<string | undefined>(id);
    const navigate = useNavigate();

    async function getDocPort(silent?: boolean) {
        if (!silent) setLoading(true);
        if (realId === "undefined" || realId === undefined) {
            setError("");
            setLoading(false);
            return;
        }
        fetch("https://api.moulinette.eu/tool/docport/" + realId,
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
                    // edit id in url
                    setRealId(data.id);
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
        setError(undefined);
        getDocPort();
        // replace id in url
        navigate("/" + realId, {replace: true})

        // every 5 seconds
        const interval = setInterval(() => {
            getDocPort(true);
        }, 5000);

        return () => clearInterval(interval);
    }, [realId]);

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
                        realId === "undefined" ? <NoCaseProvided setRealId={setRealId}/> : error ? <NotFound setRealId={setRealId}/> :
                            <Teleport data={docPort} setData={setDocPort} getDocPort={getDocPort}/>
                    )
                }

                {error && <Text size={"xs"} c={"dimmed"}>{error}</Text>}
            </Stack>
        </Container>
    )
}