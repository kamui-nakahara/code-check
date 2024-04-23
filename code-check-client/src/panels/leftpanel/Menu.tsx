import {useState} from "react";
import {List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse} from "@mui/material";
import {ChevronRight as ChevronRightIcon,
	ExpandMore as ExpandMoreIcon,
	Check as CheckIcon} from "@mui/icons-material";

function Menu(props:any){
  const [open,setOpen]=useState<boolean>(true);
  return (
    <div>
      <ListItem button onClick={()=>{setOpen(!open)}}>
	<ListItemText primary={
	    <p style={{margin:0}}>
	      {props.label}
	      {(props.clearedData[props.label]!==undefined && Object.keys(props.titles).filter((item)=>item).length===Object.keys(props.clearedData[props.label]).length)?<CheckIcon fontSize="small" color="success"/>:null}
	    </p>
	  }
		      style={{borderBottom:(props.label===props.value[0])?"solid":"solid rgba(0,0,0,0)"}}/>
	{open ? <ExpandMoreIcon/> : <ChevronRightIcon/>}
      </ListItem>
      {props.titles.map((title:any)=><Item open={open} title={title} label={props.label} value={props.value} clearedData={props.clearedData}/>)}
    </div>
  );
}

function Item(props:any){
  const [label,setLabel,title,setTitle]=props.value;
  const handleContent=()=>{
    setLabel(props.label);
    setTitle(props.title);
  };
  return (
    <Collapse in={props.open} timeout="auto" unmountOnExit style={{marginLeft:"20px"}}>
      <List component="div" disablePadding>
	<ListItem button onClick={handleContent}>
	  <ListItemText primary={
	      <p style={{margin:0}}>
		{props.title}
		{(props.clearedData[props.label]!==undefined && props.clearedData[props.label][props.title]!==undefined && props.clearedData[props.label][props.title].clear)?<CheckIcon fontSize="small" color="success"/>:null}
	      </p>
	    } style={{borderBottom:(props.title===title)?"solid gray":"solid rgba(0,0,0,0)"}}/>
	</ListItem>
      </List>
    </Collapse>
  );
}

export default Menu;
