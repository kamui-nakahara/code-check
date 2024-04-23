import {useEffect,useState} from "react";
import {Switch} from "@mui/material";
import AceEditor,{IMarker} from 'react-ace';
import 'brace/mode/c_cpp';
import 'brace/theme/xcode';
import "ace-builds/src-noconflict/theme-terminal";
import 'brace/keybinding/vim'

const markers: IMarker[] = [
  {
    startRow: 3,
    startCol: 1,
    endRow: 4,
    endCol: 1,
    className: 'c_cpp-editor',
    type: 'text',
    inFront: true,
  },
];

function Code(props:any){
  const [textValue,setTextValue]=props.textValue;
  const [vim,setVim]=useState<boolean>(false);
  const handleChange = (value: string) => {
    setTextValue(value);
  };
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",fontSize:"15px",height:"25px",border:"solid gray",marginBottom:"10px"}}><p style={{width:"50px"}}>{(vim) ? "vim" : "normal"}</p><Switch onChange={()=>{setVim(!vim)}}/></div>
      <AceEditor
        mode="c_cpp"
	keyboardHandler={(vim) ? "vim" : ""}
        theme={(props.lightmode) ? "xcode" : "terminal"}
        onChange={handleChange}
        width="100%"
        name="ace-editor"
        editorProps={{ $blockScrolling: false }}
        value={textValue}
        showGutter={true}
        highlightActiveLine={true}
        showPrintMargin={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{
          width: '100%',
          height: '300px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
        markers={markers}
      />
    </div>
  );
}
export default Code;
