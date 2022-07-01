import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import Page from '@templates/Page';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Rating(props) {
    const {data: session, status: loading} = useSession();
    const [responseTags, setResponseTags] = useState(props.responseTags);

    return (
        <Page
            headTitle = "Add Prompt"
            headName = "Add Prompt"
            headContent = "Add a new prompt"
        >
            <div>
                <div>
                    <h1>Rate The Response</h1>
                </div>
                <div>
                    <div className='RateResponseContainer'>
                        <h2>The prompt goes here</h2>
                        <div className='RateResponseDeliniator'></div>
                        <h3>{"This is the response"}</h3>
                        <div className='RateResponseTagsContainer'>
                            <h3 className='RateResponseTagesTitle'>Tags:</h3>
                            <div className='RateResponseTagList'>
                                {
                                responseTags.map((tag: string) => {
                                    return (
                                        <div key={tag}>
                                            <div className='RateResponseTagContainer'>
                                                <h3>{tag}</h3>
                                            </div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        </div>
                        <div className='RateResponseButtonContainer'>
                            <div className='RateResponseButton'>

                            </div>
                            <div className='RateResponseButton'>

                            </div>
                            <div className='RateResponseButton'>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>            
        </Page>
    );
}

