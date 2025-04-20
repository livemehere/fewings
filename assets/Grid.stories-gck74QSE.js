import{j as e}from"./jsx-runtime-CLpGMVip.js";import{D as r,J as n}from"./index-0-iVU5nl.js";import"./index-BAAwwy_G.js";import"./index-Cd0j_pUr.js";import"./index-aiH20kqd.js";const p={title:"react/components/Grid",component:r,parameters:{layout:"centered",docs:{description:{component:"Declarative grid layout component implemented with css `flex`."}}},tags:["autodocs"],args:{gap:12,rowGap:12,colGap:12},argTypes:{gap:{control:{type:"number"}},rowGap:{control:{type:"number"}},colGap:{control:{type:"number"}},children:{description:"Content inside the grid",control:!1},className:{control:!1},style:{control:!1}}},t={render:a=>e.jsxs(r,{...a,style:{width:800},children:[e.jsx(r.Row,{children:e.jsx(r.Col,{children:e.jsx(n,{height:150,children:"Content 1"})})}),e.jsxs(r.Row,{children:[e.jsx(r.Col,{children:e.jsx(n,{height:100,children:"Content 2"})}),e.jsx(r.Col,{children:e.jsx(n,{height:100,children:"Content 3"})}),e.jsx(r.Col,{children:e.jsx(n,{height:100,children:"Content 4"})})]})]})};var o,i,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => {
    return <Grid {...args} style={{
      width: 800
    }}>
        <Grid.Row>
          <Grid.Col>
            <DummyArea height={150}>Content 1</DummyArea>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <DummyArea height={100}>Content 2</DummyArea>
          </Grid.Col>
          <Grid.Col>
            <DummyArea height={100}>Content 3</DummyArea>
          </Grid.Col>
          <Grid.Col>
            <DummyArea height={100}>Content 4</DummyArea>
          </Grid.Col>
        </Grid.Row>
      </Grid>;
  }
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const u=["Default"];export{t as Default,u as __namedExportsOrder,p as default};
