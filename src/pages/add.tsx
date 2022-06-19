import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';

export default function AddPrompt() {
    return (
        <Background>
            <NextHead
                name="Add Prompt"
                content="add prompt page"
                title="add prompt"
            />
            <NavBar/>
            <ContentWrapper>
                <h1>Add prompt</h1>
                <p>This page is used for adding a new prompt</p>
            </ContentWrapper>
        </Background>
    );
}