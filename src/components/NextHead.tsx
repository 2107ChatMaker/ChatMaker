//next import
import Head from "next/head";


interface NextHeadProps {
    title?: string;
    content?: string;
}

export default function NextHead({title, content}: NextHeadProps) {
    return (
        <Head>
            <title>{`ChatMaker ${title?"- " + title  + "- chat maker vercel app": ""}`}</title>
            <meta name="description" content={content} />
            <meta name="keywords" content="
                chat maker, ChatMaker, create prompt, create response, Chat Maker, chatmaker, rate user response"
            />
            <meta name="google-site-verification" content="CwW2xEuw2kIqpQCO04CkuiC31zrjkwSxB2D95YOqd08" />
            <link rel="icon" href="/resources/Logo.svg" />
            <link rel="apple-touch-icon" href="/resources/Logo.svg"/>
        </Head>
    );
}