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
import { adverbs, subjects, verbs } from "../config/reason";
import { randomNumber } from "../utils/randomNumber";

const Flip = dynamic(() => import("../components/Flip"), { ssr: false });

const Home: NextPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("　　　");
  const [selectedAdverb, setSelectedAdverb] = useState<string>("　　　　　　");
  const [selectedVerb, setSelectedVerb] = useState<string>("　　　　　　　");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const snsUrl = (type: "TWITTER" | "FACEBOOK") => {
    const hash = `#サボりたい`;
    const shareText = `${selectedSubject}${selectedAdverb}${selectedVerb}ので休みます`;
    const shareUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/share/${subjects.findIndex(
      (_) => _ === selectedSubject
    )}-${adverbs.findIndex((_) => _ === selectedAdverb)}-${verbs.findIndex(
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
    const selectedIndex = array.findIndex((_) => _ === selected);
    if (selectedIndex === -1) return randomNumber(0, array.length - 1);
    if (selectedIndex < array.length - 1) return selectedIndex + 1;
    return 0;
  };

  const onSelectHandler = () => {
    setIsLoading(true);
    const stopTimer = randomNumber(1000, 2000);
    const subjectInterval = setInterval(() => {
      setSelectedSubject((old) => subjects[findNextIndex(subjects, old)]);
    }, 100);
    const adverbInterval = setInterval(() => {
      setSelectedAdverb((old) => adverbs[findNextIndex(adverbs, old)]);
    }, 100);
    const verbInterval = setInterval(() => {
      setSelectedVerb((old) => verbs[findNextIndex(verbs, old)]);
    }, 100);
    setTimeout(() => {
      clearInterval(subjectInterval);
    }, stopTimer);
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
        <title>サボりたい</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL} />
        <meta
          name="description"
          content="絶対にサボってやるという強い意志をお持ちのあなたに"
        />
        <meta property="og:title" content="サボりたい" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="絶対にサボってやるという強い意志をお持ちのあなたに"
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
        bgColor="gray.200"
        bgImage="url('/background.svg')"
        bgRepeat="repeat"
        backgroundSize={{ base: "80%", md: "100%" }}
      >
        <Container
          p={{ base: 4, lg: 8 }}
          bgColor="gray.200"
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
          <Flip text={selectedSubject} />
          <Flip text={selectedAdverb} />
          <Flip text={selectedVerb} />
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            my={{ base: 2, lg: 4 }}
            fontWeight="bold"
            color="gray.700"
          >
            ので休みます
          </Text>
          <HStack>
            <Button
              onClick={onSelectHandler}
              colorScheme="teal"
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              isLoading={isLoading}
              loadingText="考え中.."
              spinnerPlacement="start"
              w="50%"
            >
              サボる理由を考える
            </Button>
            {selectedVerb.trim() && !isLoading && (
              <HStack>
                <Button
                  colorScheme="twitter"
                  leftIcon={<FaTwitter />}
                  onClick={() => window.open(snsUrl("TWITTER"), "_blank")}
                  w="50%"
                >
                  ツイート
                </Button>
                <Button
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  onClick={() => window.open(snsUrl("FACEBOOK"), "_blank")}
                  w="50%"
                >
                  シェア
                </Button>
              </HStack>
            )}
          </HStack>
          <Text fontSize="base" color="gray.800" position="absolute" bottom={8}>
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
