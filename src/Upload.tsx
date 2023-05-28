import {Button, FileInput, Group, Stack, Table, Text} from "@mantine/core";
import {IconFileUpload, IconLock, IconSend, IconUpload, IconX} from "@tabler/icons-react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {showNotification, updateNotification} from "@mantine/notifications";

interface UploadProps {
    data?: any;
    setData(data: any): void;
    getDocPort(): void;
}

export default function Upload({data, setData}: UploadProps) {

    const [files, setFiles] = useState<File[]>([]);
    const {id} = useParams();

    async function upload() {
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        showNotification({
            id: "loading",
            icon: <IconSend size={18}/>,
            title: "Téléportation en cours",
            message: "Vos fichiers sont en cours de traitement",
            autoClose: 5000,
            loading: true,
            color: "red"
        })
        fetch("https://api.moulinette.eu/utils/docport/" + id, {
            method: 'PUT',
            body: formData,
            redirect: 'follow'
        })
            .then(response => {
                if (response.ok) {
                    updateNotification({
                        id: "loading",
                        icon: <IconSend size={18}/>,
                        title: "Téléportation terminée",
                        message: "Vos fichiers sont ajoutés à votre dossier",
                        autoClose: 5000,
                        color: "red"
                    })
                    response.json().then(json => {
                        setData(json);
                    });
                } else {
                    // get json
                    response.json().then(json => {
                        updateNotification({
                            id: "loading",
                            icon: <IconX size={18}/>,
                            title: "Téléportation échouée",
                            message: json.message || "Une erreur est survenue",
                            autoClose: 5000,
                            color: "red"
                        })
                    });
                }
            })
            .catch(error => alert(error));

    }
    return (
        <>
            <Stack spacing={0} align={"center"} p={"sm"}>
            <IconFileUpload/>
            <Text pt={5} weight={"bolder"} size={"xl"}>Téléportation</Text>
            <Text weight={"bold"} size={"sm"}>{data?.id}</Text>
            </Stack>

            <Group position={"center"} mt={5} spacing={10}>
            <FileInput
                multiple
                required
                accept="image/*,video/*,audio/*,application/pdf"
                icon={<IconUpload size={15}/>}
                placeholder={"Sélectionnez vos fichiers"}
                onChange={(files) => setFiles(files)}
                />
            </Group>

            <Group position={"center"} mt={5} spacing={10}>
                <Button variant={"light"} color={"red"} onClick={() => upload()} leftIcon={<IconSend size={15}/>}>Envoyer</Button>
            </Group>

            <Table maw={500} verticalSpacing="sm" mt={5} striped highlightOnHover>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>URL</th>
                </tr>
                </thead>
                <tbody>
                {data?.files.length === 0 && <tr><td colSpan={2}><Text size={"sm"}>Aucun fichier</Text></td></tr>}
                {data?.files.map((file: any) => (
                    <tr>
                        <td><Text size={"sm"}>{file.name}</Text></td>
                        <td>{file.url ?? <Group noWrap spacing={5}><IconLock size={12}/><Text
                            size={"sm"}>Connexion nécessaire</Text></Group>}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );

}