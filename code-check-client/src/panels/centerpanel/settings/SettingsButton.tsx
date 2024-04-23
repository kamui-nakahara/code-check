import SettingsIcon from "@mui/icons-material/Settings";
import ReplayIcon from '@mui/icons-material/Replay';
import {Fab} from "@mui/material";
import "./SettingsButton.css";
import SettingsPanel from "./SettingsPanel";

function SettingsButton(props:any){
  const handleSettingsButtonMouseEnter=()=>{
    let settingsIcon=document.getElementsByClassName("settings-icon");
    let settingsPanel=document.getElementsByClassName("settings-panel");
    settingsIcon[0].id="settings-icon-rotate";
    settingsPanel[0].id="settings-panel-extend";
    setTimeout(()=>{
      if (settingsIcon[0].id==="settings-icon-rotate"){
	settingsIcon[0].id="";
      }
    },500);
  };
  const handleSettingsButtonMouseLeave=()=>{
    let settingsIcon=document.getElementsByClassName("settings-icon");
    let settingsPanel=document.getElementsByClassName("settings-panel");
    settingsIcon[0].id="settings-icon-rotate-reverse";
    settingsPanel[0].id="settings-panel-extend-reverse";
    setTimeout(()=>{
      if (settingsIcon[0].id==="settings-icon-rotate-reverse"){
	settingsIcon[0].id="";
	settingsPanel[0].id="";
      }
    },500);
  };
  return (
    <div id="settings-button"
	 onMouseLeave={handleSettingsButtonMouseLeave}
	 onMouseEnter={handleSettingsButtonMouseEnter}>
      <SettingsPanel settings={props.settings} connect={props.connect} socket={props.socket} buffer={props.buffer}/>
      <Fab color="info">
	<SettingsIcon className="settings-icon" fontSize="large"/>
      </Fab>
    </div>
  );
}

export default SettingsButton;
