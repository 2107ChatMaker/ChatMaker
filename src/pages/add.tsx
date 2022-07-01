
import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import CreatePrompt from '@components/CreatePromptForm/CreatePromptForm';

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
                <CreatePrompt/>
            </ContentWrapper>
        </Background>
    );
}