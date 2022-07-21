//react import
import { ReactNode } from "react";
//components
import Background from "@components/Background";
import NextHead  from "@components/NextHead";
import Card from "@components/Card";


interface Props {
    headTitle?: string;
    headContent?: string;
    headName?: string;
    children?: ReactNode;
}

const cardStyle = {
    width: "80%", 
    height: "calc(100vh - 150px)", 
    display: "flex", 
    justifyContent: "center", 
    margin: "auto",
    marginTop: "2rem"
};

export default function VerficationTemplate({children, headTitle, headContent, headName}: Props) {
    return (
        <Background>
            <NextHead 
                title={headTitle}
                content={headContent}
                name={headName}
            />
            <div style={cardStyle}>
                <Card variant="dark">
                    {children}
                </Card>
            </div>
        </Background>
    );
};