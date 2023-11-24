import {
    Alert,
    Anchor,
    Avatar,
    Box,
    Button,
    Center,
    Code,
    Divider,
    Group,
    Image,
    Popover,
    Stack,
    Table,
    Text,
    ThemeIcon
} from "@mantine/core";
import {
    IconCloudUpload,
    IconDownload,
    IconFiles,
    IconFileUpload,
    IconHash,
    IconLock,
    IconQrcode,
    IconSend, IconTrash,
    IconX
} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {showNotification, updateNotification} from "@mantine/notifications";
import {useTranslation} from "react-i18next";
import {modals} from '@mantine/modals';
import {useMediaQuery} from "@mantine/hooks";
import {Dropzone} from "@mantine/dropzone";

interface UploadProps {
    data?: any;

    setData(data: any): void;

    getDocPort(): void;
}

export function EnrichErrorMessage(message: string, inserts: string[]) {
    // if message contains one or more of {} then it's a translation key
    // fill it with the inserts in order
    if (message.includes("{}")) {
        let i = 0;
        return message.replace(/{}/g, () => inserts[i++]);
    } else {
        return message;
    }
}

export default function Teleport({data, setData}: UploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const {id} = useParams();
    const {t} = useTranslation();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    // is large enough
    const largeEnough = useMediaQuery("(min-width: 550px)");
    const [error, setError] = useState<string | undefined>(undefined);

    function handleDrop(files: File[]) {
        setFiles(files);
    }

    async function upload() {
        const formData = new FormData();
        setLoading(true);
        setError(undefined)

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        showNotification({
            id: "loading",
            icon: <IconSend size={18}/>,
            title: t("docport.upload.started.title"),
            message: t("docport.upload.started.description"),
            loading: true,
            color: "red"
        })
        fetch("https://api.moulinette.eu/tool/docport/" + id, {
            method: 'PUT',
            body: formData,
            redirect: 'follow'
        })
            .then(response => {
                setLoading(false);
                if (response.ok) {
                    response.json().then(json => {
                        setData(json);
                        setFiles([]);
                    });
                    updateNotification({
                        id: "loading",
                        icon: <IconSend size={18}/>,
                        title: t("docport.upload.success.title"),
                        loading: false,
                        message: t("docport.upload.success.description"),
                        autoClose: 5000,
                        color: "red"
                    })
                    setSuccess(true);
                } else {
                    setSuccess(false);
                    // get json
                    response.json().then(json => {
                        if (json?.code) {
                            updateNotification({
                                id: "loading",
                                icon: <IconX size={18}/>,
                                title: t(json.code + ".title"),
                                loading: false,
                                message: EnrichErrorMessage(t(json.code + ".description"), json?.inserts || []),
                                autoClose: 5000,
                                color: "red"
                            })
                            setError(EnrichErrorMessage(t(json.code + ".description"), json?.inserts || []) || t("api.error.generic.description"));
                        } else {
                            updateNotification({
                                id: "loading",
                                icon: <IconX size={18}/>,
                                title: t("api.error.generic.title"),
                                loading: false,
                                message: json.message || t("api.error.generic.description"),
                                autoClose: 5000,
                                color: "red"
                            })

                            setError(json.message || t("api.error.generic.description"));
                        }
                    });
                }
            })
            .catch(error => {
                alert(error)
                setSuccess(false);
                setLoading(false);
            });

    }


    const [popoverImg, setPopoverImg] = useState<string>("");

    // close after 10 seconds
    setTimeout(() => {
        setPopover(false);
        console.log("closed popover")
    }, 10000);
    function transformFileUrl(url: string) {
        //return url.replace("https://api.moulinette.eu", "http://localhost:8090");
        return url;
    }

    const [popover, setPopover] = useState(false);

    useEffect(() => {
        if(largeEnough) setPopover(true);
    }, [largeEnough]);

    useEffect(() => {
        setFiles([]);
        setSuccess(false);
        setLoading(false);
    }, [success]);

    function previewFile(file: any) {
        switch (file?.name?.split(".").pop()) {
            case "png":
            case "gif":
            case "jpg":
            case "jpeg":
                return <Image src={transformFileUrl(file.url)} radius={"sm"} mah={400}/>;
            case "pdf":
                return <iframe src={transformFileUrl(file.url)} width={"100%"}
                               height={"400px"} frameBorder={"0"}/>
            case "mp4":
            case "mov":
                return <video height={"400px"} controls>
                    <source src={transformFileUrl(file.url)} type="video/mp4"/>
                    {t("docport.file_not_previewable")}
                </video>;
            default:
                return <Text size={"xs"}
                             c={"dimmed"}>{t("docport.file_not_previewable")}</Text>;
        }
    }

    return (
        <>
            <Stack gap={0} align={"center"} p={"md"}>
                <ThemeIcon variant="white" size="xl" color="red">
                    <IconCloudUpload size={45}/>
                </ThemeIcon>

                <Text pb={5} size="xl"
                      fw={900}
                      c={"red"}>{t("docport.title")}</Text>
                <Text fw={"bold"} size={"md"} maw={largeEnough ? "55%" : "100%"} ta={"center"}
                      lh={1.4}>{t("docport.description")}&nbsp;{data?.requester ?? t("docport.default_requester")}.</Text>
                <Group gap={3} align={"start"} c={"dimmed"} pt={5}>
                    <IconHash size={13}/>
                    <Text size={"xs"} fw={"bold"}>{data?.id}</Text>
                </Group>

                {data?.comment && <Stack gap={5} justify={"center"} align={"center"} pt={"xl"} ta={"center"}
                                         maw={largeEnough ? "55%" : "100%"}>
                    <Code fw={"bold"}>{data?.comment}</Code>
                </Stack>}
            </Stack>

            <Stack align={"center"} gap={30}>
                {/*<FileInput
                    multiple
                    required
                    accept={data?.limits?.allowedMimes?.join(", ")}
                    leftSection={<IconUpload size={15}/>}
                    value={files}
                    miw={largeEnough ? "250" : "70%"}
                    placeholder={t("docport.files.placeholder")}
                    onChange={(files) => setFiles(files)}
                />*/}

                {error && <Alert c="red" icon={<IconX/>} w={"100%"} title={error} onClick={() => setError(undefined)}/>}

                <Dropzone
                    loading={loading}
                    onDrop={handleDrop}
                    maxSize={data?.limits?.maxFileSize}
                    accept={data?.limits?.allowedMimes}
                    w={"100%"}
                >
                    <Group justify="center" p="xl" gap={0}
                           style={{minHeight: 150, width: "100%", pointerEvents: 'none'}}>
                        {files ? (
                            <Stack gap={5} align={"center"}>
                                <IconFileUpload size={40}/>
                                <Text size="md" pt={10} inline>
                                    {files?.length === 0 ? <b>{t("docport.files.placeholder")}</b> :
                                        <b>{files?.map((file: any) => file?.name).join(", ")} </b>}
                                </Text>
                                <Text size="xs" c="dimmed" ta={"center"} inline mt={7}>
                                    {t("docport.files.placeholder_long")}
                                </Text>
                            </Stack>) : (
                            <Stack gap={5} align={"center"}>
                                <IconFileUpload size={40}/>
                                <Text size="md" pt={20} inline>
                                    <b>{id}</b>
                                </Text>
                                <Text size="xs" c="dimmed" ta={"center"} inline mt={7}>
                                    Déposez une image de <b>{id}</b> ou cliquez ici pour en
                                    sélectionner une...
                                </Text>
                            </Stack>
                        )}
                    </Group>

                </Dropzone>

                <Group gap={"sm"}>
                    <Button variant={"filled"} color={"red"} onClick={() => upload()}
                            leftSection={<IconSend size={15}/>}>{t("docport.files.submit")}</Button>
                    <Popover opened={popover} withArrow shadow={"xl"}>
                        <Popover.Dropdown>
                            <Text size={"xs"}>{t("docport.qrcode.popover")}</Text>
                        </Popover.Dropdown>
                        <Popover.Target>
                            <Button variant={"outline"} color={"dark"} onClick={() => {
                                setPopover(false)
                                modals.open({
                                    title: t("docport.qrcode.title"),
                                    centered: true,
                                    padding: "md",
                                    children: (<Stack gap={"md"} align={"center"} p={"md"}>
                                        <img src={"data:image/png;base64," + data?.qrCode}/>
                                        <Text size={"xs"} ta={"center"} c={"dimmed"}>
                                            {t("docport.qrcode.description")}
                                        </Text>
                                    </Stack>)
                                })
                            }} onMouseEnter={() => setPopover(true)} onMouseLeave={() => setPopover(false)}><IconQrcode
                                size={15}/></Button>
                        </Popover.Target>
                    </Popover>
                </Group>

                <Text size={"xs"} c={"dimmed"} ta={"center"} maw={largeEnough ? "55%" : "100%"}>
                    {t("docport.disclaimer.part_1")} {data?.limits?.maxFiles} {t("general.file")}{data?.limits?.maxFiles > 1 ? 's' : ''} {t("docport.disclaimer.part_2")} {data?.limits?.maxTotalSize / 1024 / 1024} {t("general.megabyte")} ({data?.limits?.maxFileSize / 1024 / 1024} {t("general.megabyte")} {t("docport.disclaimer.part_3")}). {t("docport.disclaimer.part_4")} {data?.limits?.allowedMimes?.join(", ")} {t("docport.disclaimer.part_5")}. {t("docport.disclaimer.part_6")} {new Date(data?.expiration).toLocaleString("fr")}. {t("docport.disclaimer.part_7")}.
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
                        <IconFiles size={12}/>
                        <Box ml={5}>{t("docport.files_already_imported")}</Box>
                    </>
                }
            />

            <Table maw={700} verticalSpacing="sm" mt={5} striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>{t("general.name")}</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data?.files.length === 0 && <Table.Tr>
                        <Table.Td colSpan={2}><Text size={"sm"}>{t("docport.no_file")}</Text></Table.Td>
                    </Table.Tr>}
                    {data?.files.map((file: any) => (
                        <Table.Tr key={file?.name}>
                            <Table.Td>
                                <Group align={"center"} gap={10} wrap={"nowrap"}>
                                    <Popover opened={popoverImg === file?.name && file.url} withArrow shadow={"xl"}>
                                        <Popover.Dropdown onMouseLeave={() => setPopoverImg("")}>
                                            <Center>
                                                {previewFile(file)}
                                            </Center>
                                            <Anchor onClick={() => setPopoverImg("")} style={{textDecoration: "none"}}>
                                                <Group gap={5} align={"center"} justify={"center"} c={"dark"} pt={"sm"}>
                                                    <IconX size={10}/>
                                                    <Text size={"xs"} fw={"bold"}>{t("general.close")}</Text>
                                                </Group>
                                            </Anchor>
                                        </Popover.Dropdown>
                                        <Popover.Target>
                                            <Avatar size={"sm"} radius={"sm"}
                                                    onMouseEnter={() => setPopoverImg(file?.name)}
                                                    src={transformFileUrl(file.url)}><IconFiles
                                                size={15}/></Avatar>
                                        </Popover.Target>
                                    </Popover>
                                    <Text size={"sm"} visibleFrom={"sm"}>{file.name}</Text>
                                    <Text size={"sm"}
                                          hiddenFrom={"sm"}>{file.name?.substring(0, 10) + "..." + file.name?.substring(file.name?.length - 10, file.name?.length)}</Text>
                                </Group>
                            </Table.Td>
                            <Table.Td>{transformFileUrl(file.url) ?
                                <><Button size={"xs"} color={"red"} variant={"outline"} visibleFrom={"xs"}
                                          onClick={() => window.open(transformFileUrl(file.url))}
                                          leftSection={<IconDownload size={10}/>}>
                                    {t("general.download")}
                                </Button>
                                    <Button size={"xs"} color={"red"} variant={"outline"} hiddenFrom={"xs"}
                                            onClick={() => window.open(transformFileUrl(file.url))}>
                                        <IconDownload size={10}/>
                                    </Button></>

                                : <Group wrap={"nowrap"} gap={5} justify={"end"} pr={"sm"}>
                                    {file?.name == "EXPIRED" ? (<><IconTrash size={12}/><Text size={"xs"}>{t("docport.file_expired")}</Text></>) :
                                        <><IconLock size={12}/><Text size={"sm"}>{t("docport.login_required")}</Text></>
                                    }
                                    </Group>}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );

}