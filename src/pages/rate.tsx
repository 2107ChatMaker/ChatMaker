import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';

export default function Rating() {
    return (
        <Background>
            <NextHead
                name="Rate responses"
                content="Rate responses"
                title="Rate responses"
            />
            <NavBar/>
            <ContentWrapper>
                <h1>Rate responses</h1>
                <p>This is rate response page</p>
            </ContentWrapper>
        </Background>
    );
}