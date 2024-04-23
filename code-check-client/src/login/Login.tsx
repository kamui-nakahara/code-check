import {Paper,Button,TextField} from "@mui/material";
import {useState,useRef} from "react";
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import "./Login.css";

function Login(props:any){
  const [setData,getData,setClearedData]=props.data;
  const [creating,setCreating]=useState<boolean>(true);
  const [emailError,setEmailError]=useState<boolean>(false);
  const [passError,setPassError]=useState<boolean>(false);
  const emailRef=useRef<any>(null);
  const passRef=useRef<any>(null);
  const emailOnChange=()=>{
    if (emailError && emailRef?.current?.value.match("^.+@.+\\..+$")!==null){
      setEmailError(false);
    }
  };
  const passOnChange=()=>{
    if (passError && passRef?.current?.value.length>=6){
      setPassError(false);
    }
  };
  const login=()=>{
    if (emailRef?.current?.value.match("^.+@.+\\..+$")===null){
      setEmailError(true);
      return;
    }
    if (passRef?.current?.value.length < 6){
      setPassError(true);
      return;
    }
    const email=emailRef?.current?.value;
    const pass=passRef?.current?.value;
    if (creating){
      createUserWithEmailAndPassword(props.auth,email,pass)
	.then((userCredential)=>{
	  props.setEmail(userCredential.user.email);
	  setData(userCredential.user.email,{});
	})
	.catch((error)=>{
	  console.log(error);
	});
    }else{
      signInWithEmailAndPassword(props.auth,email,pass)
	.then((userCredential)=>{
	  props.setEmail(userCredential.user.email);
	  getData(userCredential.user.email);
	})
	.catch((error)=>{
	  console.log(error);
	});
    }
  };
  return (
    <Paper id="login-panel" elevation={20}>
      <div id="login-panel-header"><h2>{(creating)?"アカウント作成":"ログイン"}</h2><Button onClick={login}><h3>完了</h3></Button></div>
      <div id="login-form"><h3>メールアドレス</h3><TextField inputRef={emailRef} error={emailError} onChange={emailOnChange} type="email"/></div>
      <div id="login-form"><h3>パスワード</h3><TextField inputRef={passRef} error={passError} onChange={passOnChange} type="password"/></div>
      <Button onClick={()=>{setCreating(!creating)}}>{(creating)?"ログイン":"アカウント作成"}</Button>
    </Paper>
  );
}

export default Login;
