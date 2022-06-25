import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import Page from '@templates/Page';

export default function Rating() {
    return (
        <Page
            headTitle = "Add Prompt"
            headName = "Add Prompt"
            headContent = "Add a new prompt"
        >
            <div>
                <h1>Rate responses</h1>
                <p>This is rate response page</p>
            </div>            
        </Page>
    );
}

