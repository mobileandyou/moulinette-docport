import {
    Avatar,
    Box,
    Button, Center,
    Divider,
    FileInput,
    Group,
    Image,
    Popover,
    Stack,
    Table,
    Text,
    ThemeIcon
} from "@mantine/core";
import {
    IconDownload,
    IconFiles,
    IconFileUpload,
    IconHash,
    IconLock,
    IconQrcode,
    IconSend,
    IconUpload,
    IconX
} from "@tabler/icons-react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {showNotification, updateNotification} from "@mantine/notifications";
import {useTranslation} from "react-i18next";
import {modals} from '@mantine/modals';
import {useMediaQuery} from "@mantine/hooks";

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

    async function upload() {
        const formData = new FormData();

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
                        message: t("docport.upload.success.message"),
                        autoClose: 5000,
                        color: "red"
                    })
                } else {
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
                        }
                    });
                }
            })
            .catch(error => alert(error));

    }


    const [popoverImg, setPopoverImg] = useState<string>("");

    // close after 10 seconds
    setTimeout(() => setPopover(false), 10000);

    // is large enough
    const largeEnough = useMediaQuery("(min-width: 550px)");
    function transformFileUrl(url: string) {
        //return url.replace("https://api.moulinette.eu", "http://localhost:8090");
        return url;
    }

    const [popover, setPopover] = useState(largeEnough);
    
    return (
        <>
            <Stack gap={0} align={"center"} p={"md"}>
                <ThemeIcon variant="white" size="xl" color="red">
                    <IconFileUpload size={45}/>
                </ThemeIcon>

                <Text pb={5} size="xl"
                      fw={900}
                      c={"red"}>{t("docport.title")}</Text>
                <Text fw={"bold"} size={"md"} maw={largeEnough ? "55%" : "100%"} ta={"center"}
                      lh={1.4}>{t("docport.description")}&nbsp;{data?.requester ?? t("docport.default_requester")}.</Text>
                <Group gap={5} align={"center"} c={"dimmed"}>
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
                    placeholder={t("docport.files.placeholder")}
                    onChange={(files) => setFiles(files)}
                />


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

            <Table maw={500} verticalSpacing="sm" mt={5} striped highlightOnHover>
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
                                <Group align={"center"} gap={10}>
                                    <Popover opened={popoverImg === file?.name} withArrow shadow={"xl"}>
                                        <Popover.Dropdown>
                                            <Center>
                                                {["png", "gif", "jpg", "jpeg"].includes(file?.name?.split(".").pop()) ?
                                                    <Image src={transformFileUrl(file.url)} radius={"sm"} maw={400}/> :
                                                    ["pdf"].includes(file?.name?.split(".").pop()) ?
                                                    <iframe src={transformFileUrl(file.url)} width={"100%"} height={"100%"} frameBorder={"0"}/>
                                                        : <Text size={"xs"} c={"dimmed"}>{t("docport.file_not_previewable")}</Text>
                                                }
                                            </Center>
                                        </Popover.Dropdown>
                                        <Popover.Target>
                                            {["png", "gif", "jpg", "jpeg"].includes(file?.name?.split(".").pop()) ?<Avatar size={"sm"} radius={"sm"} onMouseEnter={() => setPopoverImg(file?.name)} onMouseLeave={() => setPopoverImg("")}
                                    src={transformFileUrl(file.url)}/>:
                                                <Avatar size={"sm"} radius={"sm"} onMouseEnter={() => setPopoverImg(file?.name)} onMouseLeave={() => setPopoverImg("")}><IconFiles size={15}/></Avatar>}
                                        </Popover.Target>
                                    </Popover>
                                <Text size={"sm"}>{file.name}</Text>
                                </Group>
                            </Table.Td>
                            <Table.Td>{transformFileUrl(file.url) ?
                                <Button size={"xs"} color={"red"} variant={"outline"}
                                        onClick={() => window.open(transformFileUrl(file.url))} leftSection={<IconDownload size={10}/>}>
                                    {t("general.download")}
                                </Button>
                                : <Group wrap={"nowrap"} gap={5} justify={"end"} pr={"sm"}><IconLock size={12}/><Text
                                    size={"sm"}>{t("docport.login_required")}</Text></Group>}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
    );

}