import{j as s}from"./jsx-runtime-CLpGMVip.js";import{r as f}from"./index-BAAwwy_G.js";import{J as w,N as F}from"./index-0-iVU5nl.js";import"./index-Cd0j_pUr.js";import"./index-aiH20kqd.js";const B=["B","KB","MB","GB","TB","PB","EB","ZB","YB"];function j(r,e){r.type="file",r.accept=e!=null&&e.accept?Array.isArray(e.accept)?e==null?void 0:e.accept.join(","):e.accept:"",r.multiple=(e==null?void 0:e.multiple)??!0}function O(r){return(e,l=0)=>{let n=r;const u=B.indexOf(e);for(let i=0;i<u;i++)n/=1024;return`${n.toFixed(l)}${e}`}}function S(r){const e=[];for(const l of r)e.push({origin:l,toUnit:O(l.size)});return e}async function $(r,e){if((e==null?void 0:e.multiple)===!1&&r.length>1)throw new Error("Multiple files are not allowed");if(e!=null&&e.maxFiles&&r.length>(e==null?void 0:e.maxFiles))throw new Error(`Number of files(${r.length}) exceeds the limit: ${e==null?void 0:e.maxFiles}`);for(const l of r){if(e!=null&&e.accept&&!N(l.type,e.accept))throw new Error(`File type(${l.type}) is not allowed: ${e.accept}`);if(e!=null&&e.maxBytes&&l.size>e.maxBytes)throw new Error(`File size(${l.size}bytes) exceeds the limit: ${e.maxBytes}bytes`);if(e!=null&&e.customValidator){const n=e.customValidator(l);if(n instanceof Promise){if(!await n)throw new Error(`Custom validation failed: ${l.name}`)}else if(!n)throw new Error(`Custom validation failed: ${l.name}`)}}}function N(r,e){const l=(typeof e=="string"?e.split(","):e).map(u=>u.trim().replace(/\./g,"")),n=r.split("/")[1];return l.includes(r)||l.includes(r.split("/")[0]+"/*")||l.includes(n)}function k({onChange:r,onError:e,...l}){const n=f.useRef(null),[u,i]=f.useState(!1);f.useEffect(()=>{const t=document.createElement("input");t.type="file",n.current=t},[]);const h=()=>{const t=n.current;if(!t)throw new Error("input element is not created.");return j(t,l),t},m=async t=>{if(t.length===0)throw new Error("No files selected");return await $(t,l),S(t)},a=()=>{const t=h();return new Promise((c,o)=>{t.onchange=async E=>{try{const d=E.target.files;if(!d)return o("No files selected");const x=await m(d);c(x),r==null||r(x)}catch(d){o(d),d instanceof Error&&(e==null||e(d))}finally{t.onchange=null}},t.click()})};return{select:a,register:()=>({onDragOver:t=>{t.preventDefault(),i(!0)},onDragEnter:t=>{t.preventDefault(),i(!0)},onDragLeave:t=>{t.preventDefault(),i(!1)},onDrop:async t=>{t.preventDefault(),i(!1);try{const c=t.dataTransfer.files;if(!c||c.length===0)throw new Error("No files selected");const o=await m(c);r==null||r(o)}catch(c){c instanceof Error&&(e==null||e(c))}},onClick:t=>{t.preventDefault(),a()}}),inputRef:n,isDragOver:u}}const U={title:"react/handleFile",parameters:{layout:"centered",docs:{description:{component:"Handle file input and drag-and-drop functionality."}}},args:{multiple:!0,accept:"image/*",maxBytes:10*1024*1024,maxFiles:5,customValidator:async r=>!0},tags:["autodocs"]},g={render:r=>{const[e,l]=f.useState([]),[n,u]=f.useState(null),{register:i,isDragOver:h,select:m}=k({onChange:l,onError:a=>{console.error("Error:",a),u(a.message)},...r});return s.jsxs("div",{children:[s.jsx("h1",{children:"File Input Example"}),s.jsx(w,{onClick:async()=>{const a=await m();console.log("Selected files:",a)},style:{cursor:"pointer"},height:80,children:"open programmatically"}),s.jsx(F,{y:20}),s.jsx(w,{...i(),style:{height:200,border:h?"2px dashed blue":"none"},children:"Drop or Click"}),s.jsx("div",{children:n&&s.jsxs("div",{style:{color:"red",marginTop:10},children:[s.jsx("strong",{children:"Error:"})," ",n]})}),s.jsxs("ul",{children:[e.map((a,y)=>s.jsxs("li",{children:[s.jsx("strong",{children:a.origin.name})," - ",a.toUnit("MB",2)]},y)),e.length===0&&s.jsx("li",{children:"No files uploaded."})]})]})}};var v,p,D;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => {
    const [files, setFiles] = useState<TFileWithMeta[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {
      register,
      isDragOver,
      select
    } = useHandleFile({
      onChange: setFiles,
      onError: error => {
        console.error("Error:", error);
        setError(error.message);
      },
      ...args
    });
    return <div>
        <h1>File Input Example</h1>
        <DummyArea onClick={async () => {
        const res = await select();
        console.log("Selected files:", res);
      }} style={{
        cursor: "pointer"
      }} height={80}>
          open programmatically
        </DummyArea>
        <Space y={20} />
        <DummyArea {...register()} style={{
        height: 200,
        border: isDragOver ? "2px dashed blue" : "none"
      }}>
          Drop or Click
        </DummyArea>
        <div>
          {error && <div style={{
          color: "red",
          marginTop: 10
        }}>
              <strong>Error:</strong> {error}
            </div>}
        </div>
        <ul>
          {files.map((file, index) => <li key={index}>
              <strong>{file.origin.name}</strong> - {file.toUnit("MB", 2)}
            </li>)}
          {files.length === 0 && <li>No files uploaded.</li>}
        </ul>
      </div>;
  }
}`,...(D=(p=g.parameters)==null?void 0:p.docs)==null?void 0:D.source}}};const z=["Default"];export{g as Default,z as __namedExportsOrder,U as default};
