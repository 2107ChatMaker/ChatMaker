import Page from '@templates/Page';
import CreatePrompt from '@components/CreatePromptForm/CreatePromptForm';

export default function AddPrompt() {
    return (
        <Page
            headTitle = "Add Prompt"
            headName = "Add Prompt"
            headContent = "Add a new prompt"
        >
            <CreatePrompt/>          
        </Page>
    );
}