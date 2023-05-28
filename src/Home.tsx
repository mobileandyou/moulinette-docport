import {Box, Container, createStyles, Group, Text} from "@mantine/core";
import {HomeHero} from "./HomeHero";
import {HomeFeatures} from "./HomeFeatures";
import {HomeFAQ} from "./HomeFAQ";

export default function Home() {

    return (
        <Container size={10000}>
            <HomeHero/>
            <HomeFeatures/>
            <HomeFAQ/>
        </Container>
    )
}