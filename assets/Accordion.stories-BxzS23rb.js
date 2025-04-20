import{j as e}from"./jsx-runtime-CLpGMVip.js";import{s as o,J as r,N as a}from"./index-0-iVU5nl.js";import"./index-BAAwwy_G.js";import"./index-Cd0j_pUr.js";import"./index-aiH20kqd.js";const g={title:"react/components/Accordion",parameters:{layout:"centered",docs:{description:{component:"The Accordion component is a container that allows users to expand and collapse sections of content."}}},tags:["autodocs"],args:{initialOpen:!1,open:void 0},argTypes:{onChangeOpen:{control:!1},open:{type:"boolean"},initialOpen:{type:"boolean"}}},n={render:c=>e.jsxs("div",{style:{minWidth:400,height:800},children:[e.jsxs(o.Root,{...c,children:[e.jsx(o.Trigger,{children:e.jsx(r,{height:80,style:{cursor:"pointer"},children:"Accordion.Trigger"})}),e.jsx(o.Panel,{children:e.jsx(r,{height:200,children:"Accordion.Panel"})})]}),e.jsx(a,{y:20}),e.jsx(r,{height:80,children:"Other Content"})]})};var t,i,s;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => <div style={{
    minWidth: 400,
    height: 800
  }}>
      <Accordion.Root {...args}>
        <Accordion.Trigger>
          <DummyArea height={80} style={{
          cursor: "pointer"
        }}>
            Accordion.Trigger
          </DummyArea>
        </Accordion.Trigger>
        <Accordion.Panel>
          <DummyArea height={200}>Accordion.Panel</DummyArea>
        </Accordion.Panel>
      </Accordion.Root>
      <Space y={20} />
      <DummyArea height={80}>Other Content</DummyArea>
    </div>
}`,...(s=(i=n.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const A=["Basic"];export{n as Basic,A as __namedExportsOrder,g as default};
