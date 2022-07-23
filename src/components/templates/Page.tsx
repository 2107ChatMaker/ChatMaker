//react import
import { ReactNode } from 'react';
//components
import Background from '@components/Background';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper';
import NavBar from '@components/NavBar';

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
