import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {Fab} from "@mui/material";

function LightModeSwitch(props:any){
  const [lightmode,setLightmode]=props.settings.lightmode;
  return (
    <Fab id="settings-icons" onClick={()=>{setLightmode(!lightmode)}}>
      {(lightmode)? <LightModeIcon fontSize="large"/> : <DarkModeIcon fontSize="large"/>}
    </Fab>
  );
}

export default LightModeSwitch;
