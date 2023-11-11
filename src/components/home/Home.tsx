import {Container} from "@mantine/core";
import {HomeHero} from "./HomeHero.tsx";
import {HomeFeatures} from "./HomeFeatures.tsx";
import {HomeFAQ} from "./HomeFAQ.tsx";


export default function Home() {

    return (
        <Container size={10000}>
            <HomeHero/>
            <HomeFeatures/>
            <HomeFAQ/>

        </Container>
    )
}