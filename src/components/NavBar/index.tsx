import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNavBar from './BottomNavBar';
import SideNavBar from './SideNavBar';

export default function NavBar() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    if (isMobile) {
        return <BottomNavBar/>;
    }
    return <SideNavBar/>;
}