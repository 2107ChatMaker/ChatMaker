//react import
import { ReactNode } from 'react';

//components
import Background from '@components/Background';

// React component
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper';
import NavBar from '@components/NavBar';

interface Props {
    headTitle?: string;
    headContent?: string;
    children?: ReactNode;
}

export default function Page(props: Props) {
    return (
        <>
            <Background>
                <NextHead 
                    title={props.headTitle}
                    content={props.headContent}
                />
                <ContentWrapper>
                    {props.children}
                </ContentWrapper>
            </Background>
            <NavBar />
        </>
    );
}
