import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import ExplorePrompt from '@components/ExplorePrompts/explorePrompts';

export default function ExplorePrompts() {
    return (
        <Background>
            <NextHead
                name="explore Prompt"
                content="explore prompt page"
                title="explore prompt"
            />
            <NavBar/>
            <ContentWrapper>
                <ExplorePrompt/>
            </ContentWrapper>
        </Background>
    );
}