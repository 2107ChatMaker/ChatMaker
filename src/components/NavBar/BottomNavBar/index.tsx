//react imports
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMemo, useState, SyntheticEvent } from 'react';
//material UI
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Paper } from '@mui/material';
//utilities
import GetTabName from '@utils/navigation/GetTabName';
import getTabLinkAndIcon from '@utils/navigation/GetTabLinkAndIcon';


const navStyle = {
    width: '100%',
    height: '5rem',
    backgroundColor: "#2B3344",
    '& .Mui-selected': {
      "& > *": {
        color: "#1C98EC"
      }
    }
};

const itemStyle = {
  color:"white",
  "& > *" : {
    marginTop: "0.35rem"
  },
};

export default function BottomNavBar() {
  const router = useRouter();
  const [value, setValue] = useState(()=>GetTabName(router.asPath));
  const {data: session} = useSession();

  //handle tabs change
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(getTabLinkAndIcon(newValue).href);
  };

  const tabs = useMemo(()=>{
    if (session && session.user) {
      return ['Rate', 'Explore', 'Profile'];
    } 
    return ['Rate', 'Explore', 'Login'];
  }, [session]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation sx={navStyle} value={value} onChange={handleChange} showLabels={true}>
        { tabs.map((name, index) => {
            const {icon} = getTabLinkAndIcon(name);
            return <BottomNavigationAction 
                      key={index} 
                      label={name} 
                      sx={itemStyle} 
                      icon={icon}
                      value={name}
                    />;
          }
         )}
      </BottomNavigation>
    </Paper>
  );
}
