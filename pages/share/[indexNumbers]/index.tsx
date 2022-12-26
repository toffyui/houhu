import React, { useEffect } from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";

type Props = {
  indexNumbers: string;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  if (typeof context.params?.indexNumbers === "string") {
    return {
      props: {
        indexNumbers: context.params?.indexNumbers,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

const Page = ({ indexNumbers }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>サボりたい</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          property="og:url"
          content={`${baseUrl}/api/ogp?indexNumbers=${indexNumbers}`}
        />
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
          content={`${baseUrl}/api/ogp?indexNumbers=${indexNumbers}`}
        />
        <meta
          name="twitter:card"
          key="twitterCard"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          key="twitterImage"
          content={`${baseUrl}/api/ogp?indexNumbers=${indexNumbers}`}
        />
      </Head>
      <Loader />
    </>
  );
};
export default Page;
