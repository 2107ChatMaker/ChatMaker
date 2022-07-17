import { paths } from '@constants/paths';

//get tab name base on the route/link
export default function GetTabName(link: string) {
    switch (link) {
        case paths.profile: 
            return "Profile";
        case paths.explore:
            return "Explore";
        case paths.rate:
            return "Rate";
        case paths.login:
            return "Login";
        default:
            return "Explore";
    } 
}