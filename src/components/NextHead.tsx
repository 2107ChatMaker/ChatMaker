//react import
import Head from "next/head";

interface NextHeadProps {
    title?: string;
    name?: string;
    content?: string;
}

export default function NextHead({title, name, content}: NextHeadProps) {
    return (
        <Head>
            <title>{`ChatMaker ${title?"- " + title: ""}`}</title>
            <meta name={name} content={content} />
            <link rel="icon" href="/resources/Logo.svg" />
        </Head>
    );
}