import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';

export default function Profile() {
    
    return (
        <Background>
            <NextHead
                name="Profile"
                content="Profile page"
                title="Profile"
            />
            <NavBar/>
            <ContentWrapper>
                <h1>Profile</h1>
                <p>This is Profile page</p>
            </ContentWrapper>
        </Background>
    );
}