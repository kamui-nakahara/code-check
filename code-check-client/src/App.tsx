import React,{useEffect,useState} from 'react';
import {ThemeProvider,createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {getAuth} from "firebase/auth";
import {getFirestore,doc,setDoc,getDoc} from "firebase/firestore";

import LeftPanel from "./panels/leftpanel/LeftPanel";
import CenterPanel from "./panels/centerpanel/CenterPanel";
import RightPanel from "./panels/rightpanel/RightPanel";
import Login from "./login/Login";

import app from "./InitFirebase";
import './App.css';
import c from "./content.json";

interface text{
  [key:string]:string
}

interface labels{
  [key:string]:text
}

const content:labels=c;

function App(){
  const auth=getAuth(app);
  const db=getFirestore(app);
  const setData=async (email:string,data:any)=>{
    await setDoc(doc(db,"users",email),data);
  };
  const [clearedData,setClearedData]=useState<any>({});
  const getData=async (email:string)=>{
    await getDoc(doc(db,"users",email)).then((dataDocument)=>{
      setClearedData(dataDocument.data());
    });
  };
  const [email,setEmail]=useState<string>("");
  const [lightmode,setLightmode]=useState<boolean>(true);
  const [label,setLabel]=useState<string>(Object.keys(content)[0]);
  const [title,setTitle]=useState<string>(Object.keys(content[Object.keys(content)[0]])[0]);
  useEffect(()=>{
    document.title="C言語";
  },[]);
  return (
    <ThemeProvider theme={createTheme({palette:{mode:(lightmode ? "light" : "dark")}})}>
      <CssBaseline />
      {(email)?
	<div className="App">
	  <LeftPanel title={[title,setTitle]}
		     label={[label,setLabel]}
		     content={content}
		     clearedData={clearedData}
		     value={[label,setLabel,title,setTitle]}/>
	  <CenterPanel settings={{lightmode:[lightmode,setLightmode]}}
		       content={content}
		       title={title}
		       label={label}
		       data={[setData,clearedData,setClearedData]}
		       email={email}/>
	  <RightPanel clearedData={[setData,clearedData,setClearedData,content]}
		      value={[setLabel,setTitle]}
		      email={email}/>
	</div>:
      <Login setEmail={setEmail}
	     data={[setData,getData,setClearedData]}
	     auth={auth}/>}
    </ThemeProvider>
  );
}

export default App;
