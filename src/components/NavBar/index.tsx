//material UI
import useMediaQuery from '@mui/material/useMediaQuery';

//components
import BottomNavBar from './BottomNavBar';
import SideNavBar from './SideNavBar';

export default function NavBar() {
   
    //screen size state
    const isMobile = useMediaQuery('(max-width: 768px)');

    //get respective navbar base on screen size
    if (isMobile) {
        return <BottomNavBar/>;
    }

    return <SideNavBar/>;
}