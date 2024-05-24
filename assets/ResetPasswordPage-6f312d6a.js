import{u as y,f as v,e as S,r as a,j as s,P as k,Q as C,H as R}from"./index-38c1ddd3.js";import{C as E,P as T}from"./Page-1e681b8d.js";import{A as $}from"./AdvantagesSection-a13cc1fc.js";import{u as W,o as q}from"./yup-056fe93d.js";import{c as A,a as _,d as B,I as h,b as w}from"./index.esm-43e5979a.js";import"./iconBase-96e5076d.js";const F="_laptop_16y8n_2",I="_picture_16y8n_10",V="_loader_16y8n_1",P={laptop:F,picture:I,"visually-hidden":"_visually-hidden_16y8n_1","close-modal-btn":"_close-modal-btn_16y8n_1",loader:V},H="_wrapper_1g28m_1",Z="_form_1g28m_12",z="_title_1g28m_19",D="_label_1g28m_31",O="_input_1g28m_40",Q="_submitButton_1g28m_72",G="_inputWrapper_1g28m_92",J="_icon_1g28m_97",K="_error_1g28m_107",L="_loader_1g28m_1",e={wrapper:H,form:Z,title:z,label:D,input:O,submitButton:Q,inputWrapper:G,icon:J,error:K,"visually-hidden":"_visually-hidden_1g28m_1","close-modal-btn":"_close-modal-btn_1g28m_1",loader:L},M=A().shape({newPass:_().matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password must be at least 8 characters long, contain at least one uppercase letter, and at least one digit").required("Please, enter new password").min(8,"Password is too short - should be 8 chars minimum."),repeatPass:_().oneOf([B("newPass")],"Passwords must match").required("Please, repeat new password")}),U=()=>{const r=y(),{resetToken:n}=v(),o=S(),[p,m]=a.useState(null),[i,x]=a.useState(!1),[l,f]=a.useState(!1),g=()=>{x(!i)},j=()=>{f(!l)},{register:d,handleSubmit:b,formState:{errors:t}}=W({resolver:q(M)}),N=async u=>{const{newPass:c}=u;(await r(k({newPass:c,resetToken:n}))).meta.requestStatus==="fulfilled"&&o("/signin")};return a.useEffect(()=>{(async()=>{try{(await r(C(n))).meta.requestStatus==="fulfilled"?m(!0):m(!1)}catch{return}})()},[r,n]),a.useEffect(()=>{p===!1&&o("/not-found-page")},[o,p]),s.jsxs("div",{className:e.wrapper,children:[s.jsx("h2",{className:e.title,children:"Change the password "}),s.jsxs("form",{className:e.form,onSubmit:b(N),children:[s.jsx("label",{className:e.label,htmlFor:"newPass",children:"Enter new password:"}),t.newPass&&s.jsxs("span",{className:e.error,children:[t.newPass.message," "]}),s.jsxs("div",{className:e.inputWrapper,children:[s.jsx("input",{...d("newPass"),className:e.input,type:i?"text":"password",name:"newPass",id:"newPass"}),s.jsx("div",{className:e.icon,onClick:g,children:i?s.jsx(h,{}):s.jsx(w,{})})]}),s.jsx("label",{className:e.label,htmlFor:"repeatPass",children:"Repeat new password:"}),t.repeatPass&&s.jsxs("span",{className:e.error,children:[t.repeatPass.message," "]}),s.jsxs("div",{className:e.inputWrapper,children:[s.jsx("input",{...d("repeatPass"),className:e.input,type:l?"text":"password",name:"repeatPass",id:"repeatPass"}),s.jsx("div",{className:e.icon,onClick:j,children:l?s.jsx(h,{}):s.jsx(w,{})})]}),s.jsx("button",{className:e.submitButton,type:"submit",children:"Change"})]})]})};function ns(){return s.jsxs(E,{children:[s.jsx(R,{children:s.jsx("title",{children:"Password reset"})}),s.jsx(T,{children:s.jsxs("div",{className:P.laptop,children:[s.jsx(U,{}),s.jsx("div",{className:P.picture,children:s.jsx($,{})})]})})]})}export{ns as default};
