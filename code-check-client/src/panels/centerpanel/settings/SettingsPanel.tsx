import {Paper} from "@mui/material";
import LightModeSwitch from "./LightModeSwitch";
import ReloadButton from "./ReloadButton";

function SettingsPanel(props:any){
  return (
    <Paper className="settings-panel" elevation={9}>
      <LightModeSwitch settings={props.settings}/>
      <ReloadButton connect={props.connect} socket={props.socket} buffer={props.buffer}/>
    </Paper>
  );
}

export default SettingsPanel;
