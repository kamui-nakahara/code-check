import "./RightPanel.css";
import {Paper,List,ListItem,ListItemText,Button,Fab} from "@mui/material";
import {useRef,useEffect} from "react";

function RightPanel(props:any){
  const [setData,clearedData,setClearedData,content]=props.clearedData;
  const [setLabel,setTitle]=props.value;
  const totalRef=useRef<any>(null);
  const email=props.email;
  const wrongsStyle={
    padding:"0 10px",
    backgroundColor:"gray",
    borderRadius:"30px",
    alignItems:"center",
    display:"flex"
  };
  const sum=(list:any)=>{
    var v:number=0;
    for (var i=0;i < list.length;i++){
      v+=list[i];
    }
    return v;
  };
  const total=(dict:any)=>{
    return sum(Object.keys(dict).map((items)=>Object.keys(dict[items]).length));
  };
  useEffect(()=>{
    totalRef.current=total(content);
  },[]);
  return (
    <div className="rightpanel">
      <Paper id="rightpanel" elevation={5}>
	<p style={{marginLeft:"24px"}}>現在の進捗</p>
	<ProgressBar color="blue" value={Math.floor(sum(Object.keys(clearedData).map((items)=>Object.keys(clearedData[items]).filter((i)=>clearedData[items][i].clear).length))*100/totalRef.current)}/>
	<p style={{marginLeft:"24px",marginBottom:0,marginTop:"50px"}}>間違えた問題</p>
	<List>
	  {
	    Object.keys(clearedData).map((labels)=>(
	      Object.keys(clearedData[labels]).filter((titles)=>clearedData[labels][titles].wrongs).map((titles)=>(
		<div style={{display:"flex",alignItems:"center"}}>
		  <ListItem button onClick={()=>{setLabel(labels);setTitle(titles)}} style={{width:"80%"}}>
		    <ListItemText primary={
			<p style={{display:"flex",alignItems:"center",height:"30px",overflow:"hidden",margin:0}}>
			  <div style={wrongsStyle}>
			    <p style={{margin:"0 auto"}}>{clearedData[labels][titles].wrongs}</p>
			  </div>
			  {titles}
			</p>
		      }/>
		  </ListItem>
		  <Button style={{borderRadius:"20px",border:"solid red",height:"40px",color:"red"}} size="small" onClick={()=>{
		    let _clearedData=JSON.parse(JSON.stringify(clearedData));
		    _clearedData[labels][titles].wrongs=0;
		    setClearedData(_clearedData);
		    setData(email,_clearedData);
		  }}><p style={{margin:0,fontSize:"13px"}}>削除</p></Button>
		</div>
	      ))
	    ))
	  }
	</List>
	<div style={{textAlign:"center",marginTop:"50px"}}><Button variant="outlined" onClick={()=>{setData(email,{});setClearedData({})}}>進捗の削除</Button></div>
      </Paper>
    </div>
  );
}

function ProgressBar(props:any){
  return (
    <div style={{height:"10px",width:"calc(100% - 48px)",marginLeft:"24px"}}>
      <div style={{width:"100%",height:"100%",border:"solid 0.1px",borderRadius:"10px"}}>
	<div style={{backgroundColor:props.color,width:`${props.value}%`,height:"100%",borderBottomLeftRadius:"10px",borderTopLeftRadius:"10px"}}/>
      </div>
    </div>
  );
}

export default RightPanel;
