import "./LeftPanel.css";
import {Paper,List,ListItem,ListItemText} from "@mui/material";
import Menu from "./Menu";

function LeftPanel(props:any){
  const [label,setLabel,title,setTitle]=props.value;
  const handleCodeTest=()=>{
    setLabel("");
    setTitle("");
  };
  return (
    <div className="leftpanel">
      <Paper id="leftpanel" elevation={5}>
	<div style={{marginLeft:"30px"}}>
	  <p style={{fontSize:"20px"}}>問題集</p>
	  <List>
	    <ListItem button onClick={handleCodeTest}>
	      <ListItemText primary={"コードテスト"} style={{borderBottom:(label==="" && title==="")?"solid":""}}/>
	    </ListItem>
	    {Object.keys(props.content).map((l:any)=>
	      <Menu label={l} titles={Object.keys(props.content[l])} value={props.value} clearedData={props.clearedData}/>
	    )}
	  </List>
	</div>
      </Paper>
    </div>
  );
}

export default LeftPanel;
