import Background from '@components/Background';
import NavBar from '@components/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper';
import { ReactNode } from 'react';

interface Props {
    headTitle?: string;
    headContent?: string;
    headName?: string;
    children?: ReactNode;
}

export default function Page(props: Props) {
    return (
        <>
            <Background>
                <NextHead 
                    title={props.headTitle}
                    content={props.headContent}
                    name={props.headName}
                />
                <ContentWrapper>
                    {props.children}
                </ContentWrapper>
            </Background>
            <NavBar />
        </>
    );
}