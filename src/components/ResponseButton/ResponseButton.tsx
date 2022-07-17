//style of the general button
import style from './ResponseButton.module.sass';
//MUI imports for the icons in the buttons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ReactNode } from 'react';

interface Props {
    style: string,
    children?: ReactNode
};

export default function ResponseButton(props: Props) {
    //positive rating
    if (props.style == "thumbsUp") {
        return(
            <button className={style.responseBtn}><ThumbUpOutlinedIcon fontSize='medium'/></button>
        )
    }
    //negative rating
    else if (props.style == "thumbsDown") {
        return(
            <button className={style.responseBtn}><ThumbDownOutlinedIcon fontSize='medium'/></button>
        )
    }
    //skip item
    else if (props.style == "skip") {
        return(
            <button className={style.responseBtn}><SkipNextOutlinedIcon fontSize='large'/></button>
        )
    }
    //alternative skip
    else if (props.style == "ff") {
        return(
            <button className={style.responseBtn}><FastForwardOutlinedIcon fontSize='large'/></button>
        )
    }
    //alternative positive rating
    else if (props.style == "check") {
        return(
            <button className={style.responseBtn}><CheckOutlinedIcon fontSize='large'/></button>
        )
    }
    //alternative negative rating
    else if (props.style == "close") {
        return(
            <button className={style.responseBtn}><CloseOutlinedIcon fontSize='large'/></button>
        )
    }
    //add button to possibly add a prompt
    else if (props.style == "add") {
        return(
            <button className={style.responseBtn}><AddOutlinedIcon fontSize='large'/></button>
        )
    }
    //if the style isn't declared, we can add whatever we want to the middle of the button
    else {
        return(
            <button className={style.responseBtn}>{props.children}</button>
        )
    }
};