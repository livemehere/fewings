import{j as e}from"./jsx-runtime-CLpGMVip.js";import{P as t,J as r}from"./index-0-iVU5nl.js";import"./index-BAAwwy_G.js";import"./index-Cd0j_pUr.js";import"./index-aiH20kqd.js";const v={title:"react/components/Popover",parameters:{layout:"centered",docs:{description:{component:"The Popover component is a wrapper for the Popover.Trigger and Popover.Panel components. It manages the open state and provides context to its children."}}},tags:["autodocs"],args:{closeOnClickOutSide:!0,type:"click",initialOpen:!1,disabled:!1,anchor:"bottom-center",portal:!0,fitOnTriggerWidth:!1},argTypes:{closeOnClickOutSide:{control:"boolean"},type:{control:"select",options:["click","hover"]},anchor:{control:"select",options:["top-left","top-right","top-center","bottom-left","bottom-right","bottom-center","left-center","left-top","left-bottom","right-center","right-top","right-bottom"]},initialOpen:{control:"boolean"},disabled:{control:"boolean"}}},o={render:({closeOnClickOutSide:l,type:s,initialOpen:c,disabled:p,anchor:d,portal:h,fitOnTriggerWidth:g})=>e.jsxs(t.Root,{closeOnClickOutSide:l,type:s,initialOpen:c,disabled:p,children:[e.jsx(t.Trigger,{children:e.jsx(r,{width:150,height:80,style:{cursor:"pointer"},children:"Popover.Trigger"})}),e.jsx(t.Panel,{anchor:d,fitOnTriggerWidth:g,portal:h,children:e.jsx(r,{width:200,height:200,children:"Popover.Panel"})})]})};var n,i,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: ({
    closeOnClickOutSide,
    type,
    initialOpen,
    disabled,
    anchor,
    portal,
    fitOnTriggerWidth
  }) => <Popover.Root closeOnClickOutSide={closeOnClickOutSide} type={type} initialOpen={initialOpen} disabled={disabled}>
      <Popover.Trigger>
        <DummyArea width={150} height={80} style={{
        cursor: "pointer"
      }}>
          Popover.Trigger
        </DummyArea>
      </Popover.Trigger>
      <Popover.Panel anchor={anchor} fitOnTriggerWidth={fitOnTriggerWidth} portal={portal}>
        <DummyArea width={200} height={200}>
          Popover.Panel
        </DummyArea>
      </Popover.Panel>
    </Popover.Root>
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const b=["Basic"];export{o as Basic,b as __namedExportsOrder,v as default};
