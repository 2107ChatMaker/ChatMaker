import { useState } from 'react';
import Background from '@components/Background/Background';
import ResponseDiv from '@components/Page/responseDiv/ResponseDiv';
import AddResponseHeader from '@components/Page/addResponse/AddResponseHeader';
import NavBar from '@components/NavBar/NavBar';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import styles from '@components/Page/addResponse/AddResponseHeader.module.sass'
export default function Test() {
    const [name, setName] = useState('Phillip');
    let promptID = "123"

    //let responses = ResponseController.getResponsesByID(promptID)
    return (
        <>
            {/* <Background>
                <NavBar />
                <ContentWrapper>
                <AddResponseHeader prompt="Your grandmother offers you a cup of tea" />
                <div className={styles.responseContainer}>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                <ResponseDiv>"This is my response!"</ResponseDiv>
                </div>
                </ContentWrapper>
            </Background> */}
        </>
    );
}