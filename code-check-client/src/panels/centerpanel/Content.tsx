import Code from "./Code";
import {useState,useEffect} from "react";
import {LoadingButton} from "@mui/lab";

function Content(props:any){
  const [setData,clearedData,setClearedData]=props.clearedData;
  const [textValue,setTextValue]=useState<string>("");
  const [output,setOutput]=useState<string>("　");
  const [loading,setLoading]=useState<boolean>(false);
  const [correct,setCorrect]=useState<number>(2);
  const [loaded,setLoaded]=useState<boolean>(false);
  const email=props.email;
  const [socketRef,[socketBuffer,setSocketBuffer]]=props.socket;
  useEffect(()=>{
    setTextValue("");
    setCorrect(2);
    setOutput("　");
    setLoading(false);
  },[props.label,props.title]);
  useEffect(()=>{
    if (loaded){
      setSocketBuffer("");
      setLoading(false);
      if (props.data?.compile_error){
	setOutput(props.data?.compile_error);
      }else if (props.data?.output){
	setOutput(props.data?.output);
      }else{
	setOutput("　");
      }
      setCorrect(Number(props.data?.correct));
      let data_copy=JSON.parse(JSON.stringify(clearedData));
      if (clearedData[props.label]===undefined){
	data_copy[props.label]={}
	data_copy[props.label][props.title]={clear:false,wrongs:0};
      }else{
	if (clearedData[props.label][props.title]===undefined){
	  data_copy[props.label][props.title]={clear:false,wrongs:0};
	}
      }
      if (props.data?.correct){
	data_copy[props.label][props.title].clear=true;
      }else{
	data_copy[props.label][props.title].wrongs++;
      }
      setData(email,data_copy);
      setClearedData(data_copy);
    }else{
      setLoaded(true);
    }
  },[props.data]);
  const send=()=>{
    setLoading(true);
    const buffer=JSON.stringify({
      name:email,
      label:props.label,
      title:props.title,
      src:textValue.replaceAll("¥","\\")
    });
    setSocketBuffer(buffer);
    if (socketRef.current?.readyState!==1){
      return;
    }
    socketRef.current?.send(buffer);
  };
  return (
    <div style={{height:"95%"}}>
      <div id="content-title"><h2>{props.title}</h2></div>
      <div id="content-block">
	<pre id="content-text">
	  {
	    props.text?.split("\n``").map((text:any)=>
	      (text[0]==="`") ? <p id={(text[1]==="^")?"content-label":"code-block"}><div>{text.slice(2,text.length)}</div></p> : <p>{text}</p>
	    )
	  }
	</pre>
	<Code textValue={[textValue,setTextValue]} lightmode={props.lightmode}/>
	<div style={{width:"100%",textAlign:"center"}}><LoadingButton variant="contained" style={{width:"30%",marginTop:"24px"}} loading={loading} onClick={send}>送信</LoadingButton></div>
	<div style={{alignItems:"center",height:"10px",display:"flex",marginTop:"20px"}}>
	  <p style={{width:"100px",paddingLeft:"30px",margin:0}}>出力</p>
	  <div style={{display:"flex",width:"calc(100% - 130px)",paddingRight:"70px"}}>
	    <h3 style={{textAlign:"right",width:"50%"}}>結果:</h3>
	    <h3 style={{textAlign:"left",width:"50%",color:["red","green","black"][correct]}}>{["不正解","正解　","　　　"][correct]}</h3>
	  </div>
	</div>
	<pre><p id="code-block" style={{overflow:"scroll",height:"200px"}}><div>{output}</div></p></pre>
      </div>
    </div>
  );
}

export default Content;
