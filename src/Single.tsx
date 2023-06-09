import {useParams} from "react-router-dom";
import {Container, Group, Loader, Stack, Text} from "@mantine/core";
import {NotFound} from "./NotFound";
import {useEffect, useState} from "react";
import Upload from "./Upload";

export default function Single() {

    const {id} = useParams();
    const [error, setError] = useState(false);
    const [docPort, setDocPort] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    async function getDocPort(silent?: boolean) {
        if(!silent) setLoading(true);
        fetch("https://api.moulinette.eu/utils/docport/" + id)
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
                setError(true);
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
        <Container p={0}>
            <Stack align={"center"}>
                {loading ? <Loader color={"red"} size={"md"}/> :
                    (
                        id === "undefined" || error ? <NotFound/> : <Upload data={docPort} setData={setDocPort} getDocPort={getDocPort}/>
                    )
                }

                {error && <Text size={"xs"} color={"dimmed"}>{error}</Text>}
            </Stack>
        </Container>
    )
}