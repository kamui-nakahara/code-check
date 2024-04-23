import "./CodeTest.css";
import {useState,useEffect,useRef} from "react";
import {TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Code from "./Code";

function CodeTest(props:any){
  const [textValue,setTextValue]=useState<string>("");
  const [output,setOutput]=useState<string>("　");
  const [loading,setLoading]=useState<boolean>(false);
  const inputFieldRef=useRef<any>(null);
  const email=props.email;
  const [socketRef,[socketBuffer,setSocketBuffer]]=props.socket;
  useEffect(()=>{
    setTextValue("");
    setOutput("　");
    setLoading(false);
  },[props.label,props.title]);
  useEffect(()=>{
    setSocketBuffer("");
    setLoading(false);
    if (props.data?.compile_error){
      setOutput(props.data?.compile_error);
    }else if (props.data?.output){
      setOutput(props.data?.output);
    }else{
      setOutput("　");
    }
  },[props.data]);
  const send=()=>{
    setLoading(true);
    const buffer=JSON.stringify({
      name:email,
      label:"",
      title:"",
      input:inputFieldRef?.current?.value.replaceAll("¥","\\"),
      src:textValue.replaceAll("¥","\\")
    });
    setSocketBuffer(buffer);
    if (socketRef.current?.readyState!==1){
      return;
    }
    socketRef.current?.send(buffer);
  };
  return (
    <div id="codetest">
      <h2>コードテスト</h2>
      <div id="codetest-content">
	<div>
	  <div style={{height:"20px",overflow:"hidden",alignItems:"center"}}><p style={{margin:0}}>　入力</p></div>
	  <TextField id="codetest-input" rows="6" multiline size="small" inputRef={inputFieldRef}/>
	</div>
	<Code textValue={[textValue,setTextValue]} lightmode={props.lightmode}/>
	<LoadingButton onClick={send} color="success" style={{border:"solid",margin:"24px 35%",width:"30%"}} loading={loading}>送信</LoadingButton>
	<div>
	  <div style={{height:"20px",overflow:"hidden",alignItems:"center"}}><p style={{margin:0}}>　出力</p></div>
	  <pre><p id="code-block"><div>{output}</div></p></pre>
	</div>
      </div>
    </div>
  );
}

export default CodeTest;
