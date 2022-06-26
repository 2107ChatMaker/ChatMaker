import {Explore, Star, Person, AddBox, ExitToApp, Login} from '@mui/icons-material';
import { ReactElement } from 'react';
import { paths } from '@constants/paths';

interface NavLinkAndIcon {
    href: string;
    icon: ReactElement;
}

//get link and icon for nav item
export function getNavLinkAndIcon(name): NavLinkAndIcon {
    switch (name) {
        case 'Explore':
        case 'Explore prompts':
            return {
                href: paths.explore,
                icon: <Explore fontSize='large'/>
            };
        case 'Rating':
        case 'Rate responses':
            return {
                href: paths.rate,
                icon: <Star fontSize='large'/>
            };
        case 'Profile':
            return {
                href: paths.profile,
                icon: <Person fontSize='large'/>
            };
        case 'Add a prompt':
            return {
                href: paths.addPrompt,
                icon: <AddBox fontSize='large'/>
            };
        case 'Logout':
            return {
                href: paths.logout,
                icon: <ExitToApp fontSize='large'/>
            };
        case 'Login':
            return {
                href: paths.login,
                icon: <Login fontSize='large'/>
            };
        default:
            return null;
    }
}