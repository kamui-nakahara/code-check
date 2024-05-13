import "./CenterPanel.css";
import {Paper} from "@mui/material";
import {useEffect,useRef,useState} from "react";
import SettingsButton from "./settings/SettingsButton";
import Content from "./Content";
import CodeTest from "./CodeTest";

function CenterPanel(props:any){
  const [data,setData]=useState<any>(null);
  const [socketBuffer,setSocketBuffer]=useState<string>("");
  const socketRef=useRef<WebSocket>();
  const connect=()=>{
    const websocket=new WebSocket("ws://10.19.8.2:9001");
    socketRef.current=websocket;

    const onMessage=(event:any)=>{
      setData(JSON.parse(event.data));
    };
    websocket.addEventListener("message",onMessage);
  }
  useEffect(()=>{
    connect();
  },[]);
  return (
    <div className="centerpanel">
      <Paper id="centerpanel" elevation={5}>
	{(props.label && props.title)?
	<Content text={props.content[props.label][props.title]}
		 title={props.title}
		 label={props.label}
		 lightmode={props.settings.lightmode[0]}
		 email={props.email}
		 socket={[socketRef,[socketBuffer,setSocketBuffer]]}
		 clearedData={props.data}
		 data={data}/>:
	<CodeTest lightmode={props.settings.lightmode[0]}
   		  title={props.title}
		  label={props.label}
		  email={props.email}
		  data={data}
		  socket={[socketRef,[socketBuffer,setSocketBuffer]]}/>
	}
      </Paper>
      <SettingsButton settings={props.settings} connect={connect} socket={socketRef} buffer={[socketBuffer,setSocketBuffer]}/>
    </div>
  );
}

export default CenterPanel;
