import {useParams} from "react-router-dom";
import {Container, Loader, Stack, Text} from "@mantine/core";
import {NotFound} from "./NotFound";
import {useEffect, useState} from "react";
import Upload from "./Upload";
import classes from "./Single.module.css";

export default function Single() {

    const {id} = useParams();
    const [error, setError] = useState<string | undefined>(undefined);
    const [docPort, setDocPort] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    async function getDocPort(silent?: boolean) {
        if (!silent) setLoading(true);
        if (id === "undefined" || id === undefined) {
            setError("Vous devez spécifier un identifiant de dossier");
            setLoading(false);
            return;
        }
        fetch("http://localhost:8090/tool/docport/" + id,
            {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}},
        )
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setDocPort(data);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Le serveur n'est pas disponible");
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

    return (
        <Container p={0} className={classes.root}>
            <Stack align={"center"}>
                {loading ? <Loader color={"red"} size={"md"}/> :
                    (
                        id === "undefined" || error ? <NotFound/> :
                            <Upload data={docPort} setData={setDocPort} getDocPort={getDocPort}/>
                    )
                }

                {error && <Text size={"xs"} c={"dimmed"}>{error}</Text>}
            </Stack>
        </Container>
    )
}