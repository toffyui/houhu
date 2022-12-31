import {
  Button,
  Center,
  Container,
  HStack,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { adverbs, verbs } from "../config/reason";
import { randomNumber } from "../utils/randomNumber";

const Flip = dynamic(() => import("../components/Flip"), { ssr: false });

const Home: NextPage = () => {
  const [selectedAdverb, setSelectedAdverb] = useState<string>("　　　　　　");
  const [selectedVerb, setSelectedVerb] = useState<string>("　　　　　　　");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const snsUrl = (type: "TWITTER" | "FACEBOOK") => {
    const hash = `#抱負ツクール`;
    const shareText = `私は${selectedAdverb}${selectedVerb}ことを2023年の抱負にします！`;
    const shareUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/share/${adverbs.findIndex((_) => _ === selectedAdverb)}-${verbs.findIndex(
      (_) => _ === selectedVerb
    )}`;
    switch (type) {
      case "TWITTER":
        return (
          `https://twitter.com/intent/tweet?url=${shareUrl}&text=` +
          encodeURIComponent(shareText + `\n` + hash)
        );
      case "FACEBOOK":
        return `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareText}\n${hash}`;
    }
  };
  const findNextIndex = (array: readonly string[], selected: string) => {
    return randomNumber(0, array.length - 1);
  };

  const onSelectHandler = () => {
    setIsLoading(true);
    const stopTimer = randomNumber(1000, 2000);
    const adverbInterval = setInterval(() => {
      setSelectedAdverb((old) => adverbs[findNextIndex(adverbs, old)]);
    }, 100);
    const verbInterval = setInterval(() => {
      setSelectedVerb((old) => verbs[findNextIndex(verbs, old)]);
    }, 100);
    setTimeout(() => {
      clearInterval(adverbInterval);
    }, stopTimer * 1.1);
    setTimeout(() => {
      clearInterval(verbInterval);
      setIsLoading(false);
    }, stopTimer * 1.2);
  };

  return (
    <>
      <Head>
        <title>抱負ツクール</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta name="description" content="2023年の抱負が決まらないあなたに" />
        <meta property="og:title" content="サボりたい" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="2023年の抱負が決まらないあなたに"
        />
        <meta property="og:site_name" content="サボりたい" />
        <link rel="icon" href="/favicon.jpg" />
        <meta name="twitter:site" content="@yui_active" />
        <meta name="twitter:creator" content="@yui_active" />
        <meta
          property="og:image"
          key="ogImage"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/OGP.jpg`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/OGP.jpg`}
        />
      </Head>
      <Center
        w="full"
        minH="100vh"
        bgColor="orange.100"
        bgImage="url('/background.svg')"
        bgRepeat="repeat"
        backgroundSize={{ base: "80%", md: "90%" }}
      >
        <Container
          p={{ base: 4, lg: 8 }}
          bgColor="orange.100"
          minH={{ base: "80vh", md: "100vh" }}
          boxShadow="base"
          position="relative"
        >
          <Image
            src="/header.svg"
            w="full"
            mb={{ base: 4, lg: 8 }}
            alt="header"
          />
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            my={{ base: 2, lg: 4 }}
            fontWeight="bold"
            color="gray.900"
          >
            わたしは
          </Text>
          <Flip text={selectedAdverb} />
          <Flip text={selectedVerb} />
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            my={{ base: 2, lg: 4 }}
            fontWeight="bold"
            color="gray.900"
          >
            ことを2023年の抱負にします
          </Text>
          <HStack flexDirection={{ base: "column", md: "row" }}>
            <Button
              onClick={onSelectHandler}
              colorScheme="whatsapp"
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              isLoading={isLoading}
              loadingText="考え中.."
              spinnerPlacement="start"
              w={{ base: "full", md: "50%" }}
              mb={{ base: 2, md: 0 }}
              mr={{ base: 0, md: 2 }}
            >
              抱負を考える
            </Button>
            {selectedVerb.trim() && !isLoading && (
              <HStack
                w={{ base: "full", md: "50%" }}
                m={{ base: "0!important" }}
              >
                <Button
                  colorScheme="twitter"
                  leftIcon={<FaTwitter />}
                  onClick={() => window.open(snsUrl("TWITTER"), "_blank")}
                  w={{ base: "full", md: "50%" }}
                >
                  ツイート
                </Button>
                <Button
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={() => window.open(snsUrl("FACEBOOK"), "_blank")}
                  w={{ base: "full", md: "50%" }}
                >
                  シェア
                </Button>
              </HStack>
            )}
          </HStack>
          <Text fontSize="base" color="gray.900" position="absolute" bottom={8}>
            &copy; {new Date().getFullYear()}{" "}
            <Link href="https://twitter.com/yui_active">yui</Link> All rights
            reserved.
          </Text>
        </Container>
      </Center>
    </>
  );
};

export default Home;
