import CreatePrompt from '@components/CreatePromptForm/CreatePromptForm';
import Page from '@templates/Page';

export default function AddPrompt() {
    return (
        <Page
            headTitle = "Add Prompt"
            headContent= "add prompt page"
            headName= "add prompt"
        >
            <CreatePrompt/>
        </Page>  
    );
}