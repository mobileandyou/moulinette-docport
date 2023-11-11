import {Box, Button, Divider, FileInput, Group, Stack, Table, Text, ThemeIcon} from "@mantine/core";
import {
    IconDownload,
    IconFiles,
    IconFileUpload,
    IconHash,
    IconLock,
    IconSend,
    IconUpload,
    IconX
} from "@tabler/icons-react";
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
            loading: true,
            color: "red"
        })
        fetch("http://localhost:8090/tool/docport/" + id, {
            method: 'PUT',
            body: formData,
            redirect: 'follow'
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        setData(json);
                        setFiles([]);
                    });
                    updateNotification({
                        id: "loading",
                        icon: <IconSend size={18}/>,
                        title: "Téléportation terminée",
                        loading: false,
                        message: "Vos fichiers sont ajoutés à votre dossier",
                        autoClose: 5000,
                        color: "red"
                    })
                } else {
                    // get json
                    response.json().then(json => {
                        updateNotification({
                            id: "loading",
                            icon: <IconX size={18}/>,
                            title: "Téléportation échouée",
                            loading: false,
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
            <Stack gap={0} align={"center"} p={"md"}>
                <ThemeIcon variant="white" size="xl" color="red">
                    <IconFileUpload size={45}/>
                </ThemeIcon>

                <Text pb={5} size="xl"
                      fw={900}
                      c={"red"}>Téléportation</Text>
                <Text fw={"bold"} size={"md"} maw={"55%"} ta={"center"} lh={1.4}>Cette page vous permet de transmettre des documents de manière sécurisée à {data?.requester ?? "l'entité qui vous les demande"}.</Text>
                <Group gap={5} align={"center"}  c={"dimmed"}>
                    <IconHash size={14}/>
                    <Text pt={5} size={"xs"} fw={"bold"}>{data?.id}</Text>
                </Group>
            </Stack>

            <Stack align={"center"} mt={5} gap={30}>
                <FileInput
                    multiple
                    required
                    accept={data?.limits?.allowedMimes?.join(", ")}
                    leftSection={<IconUpload size={15}/>}
                    value={files}
                    placeholder={"Sélectionnez vos fichiers"}
                    onChange={(files) => setFiles(files)}
                />


                    <Button variant={"filled"} color={"red"} onClick={() => upload()}
                            leftSection={<IconSend size={15}/>}>Envoyer</Button>

                    <Text size={"xs"} c={"dimmed"} ta={"center"} maw={"55%"}>
                       Ce dossier est limité à {data?.limits?.maxFiles} fichier{data?.limits?.maxFiles > 1 ? 's' :''} et {data?.limits?.maxTotalSize / 1024 / 1024} Mo ({data?.limits?.maxFileSize  / 1024 / 1024} Mo par fichier). Seuls les fichiers de types {data?.limits?.allowedMimes?.join(", ")} sont autorisés. Les fichiers seront conservés jusqu'au {new Date(data?.expiration).toLocaleString("fr")}. En envoyant vos fichiers, vous acceptez les conditions d'utilisation de DocPort.
                    </Text>

            </Stack>

            <Divider
                w={"100%"}
                my="xs"
                mt={"xl"}
                variant="dashed"
                labelPosition="center"
                label={
                    <>
                        <IconFiles size={12} />
                        <Box ml={5}>Fichiers déjà importés</Box>
                    </>
                }
            />

            <Table maw={500} verticalSpacing="sm" mt={5} striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nom</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data?.files.length === 0 && <Table.Tr>
                        <Table.Td colSpan={2}><Text size={"sm"}>Aucun fichier</Text></Table.Td>
                    </Table.Tr>}
                    {data?.files.map((file: any) => (
                        <Table.Tr>
                            <Table.Td><Text size={"sm"}>{file.name}</Text></Table.Td>
                            <Table.Td>{file.url ?
                                <Button size={"xs"} color={"red"} variant={"outline"} onClick={() => window.open(file.url)} leftSection={<IconDownload size={10}/>}>
                                    Télécharger
                                </Button>
                                : <Group wrap={"nowrap"} gap={5}><IconLock size={12}/><Text
                                size={"sm"}>Connexion nécessaire</Text></Group>}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );

}