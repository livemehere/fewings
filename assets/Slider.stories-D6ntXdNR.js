import{j as e}from"./jsx-runtime-CLpGMVip.js";import{k as n,J as o,H as s}from"./index-0-iVU5nl.js";import{r as u}from"./index-BAAwwy_G.js";import"./index-Cd0j_pUr.js";import"./index-aiH20kqd.js";const x={title:"react/components/Slider",parameters:{layout:"centered",docs:{description:{component:"The Slider component is a customizable range slider that allows users to select a value from a specified range. It can be styled and configured for various use cases."}}},tags:["autodocs"],args:{min:0,max:100,step:1},argTypes:{}},r={render:c=>{const[h,m]=u.useState(0);return e.jsxs(n.Root,{...c,value:h,setValue:m,dir:"horizontal",children:[e.jsx(n.Track,{children:({value:a,ratio:t})=>e.jsxs(o,{height:20,style:{width:500,position:"relative"},children:[e.jsx(s,{top:0,left:0,style:{width:"100%",height:"100%"},children:e.jsx("div",{style:{width:`${t*100}%`,background:"rgba(0, 0, 0, 0.4)",height:"100%"}})}),e.jsxs(s,{top:"50%",left:"50%",style:{transform:"translate(-50%, -50%)"},children:[a,"(",t,")"]})]})}),e.jsx(n.Thumb,{children:({value:a,ratio:t})=>e.jsx(o,{width:20,height:20,style:{borderRadius:"50%",position:"relative",cursor:"grab",transform:"translateX(-50%)"},children:e.jsxs(s,{top:"110%",children:[a,"(",t,")"]})})})]})}};var i,l,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => {
    const [v, setV] = useState(0);
    return <Slider.Root {...args} value={v} setValue={setV} dir="horizontal">
        <Slider.Track>
          {({
          value,
          ratio
        }) => <DummyArea height={20} style={{
          width: 500,
          position: "relative"
        }}>
              <Float top={0} left={0} style={{
            width: "100%",
            height: "100%"
          }}>
                <div style={{
              width: \`\${ratio * 100}%\`,
              background: "rgba(0, 0, 0, 0.4)",
              height: "100%"
            }}></div>
              </Float>
              <Float top={"50%"} left={"50%"} style={{
            transform: "translate(-50%, -50%)"
          }}>
                {value}({ratio})
              </Float>
            </DummyArea>}
        </Slider.Track>
        <Slider.Thumb>
          {({
          value,
          ratio
        }) => <DummyArea width={20} height={20} style={{
          borderRadius: "50%",
          position: "relative",
          cursor: "grab",
          transform: "translateX(-50%)"
        }}>
              <Float top={"110%"}>
                {value}({ratio})
              </Float>
            </DummyArea>}
        </Slider.Thumb>
      </Slider.Root>;
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const b=["Basic"];export{r as Basic,b as __namedExportsOrder,x as default};
