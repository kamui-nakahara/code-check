import {Fab} from "@mui/material";
import {Replay as ReplayIcon} from "@mui/icons-material";

function ReloadButton(props:any){
  const [buffer,setBuffer]=props.buffer;
  const connect=()=>{
    props.connect();
    props.socket.current?.addEventListener("open",()=>{
      if (buffer!==""){
	props.socket.current?.send(buffer);
	setBuffer("");
      }
    });
  };
  return (
    <Fab id="settings-icons" color={(props.socket.current?.readyState===1)?"default":"error"}>
      <ReplayIcon fontSize="large" onClick={connect}/>
    </Fab>
  );
}

export default ReloadButton;
