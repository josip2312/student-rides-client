(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["NewPassword"],{"0129":function(r,t,e){"use strict";var a=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("div",{attrs:{id:"form"}},[e("form",{staticClass:"form",class:r.className},[r.title?e("div",{staticClass:"form-group"},[e("h3",{staticClass:"heading-3"},[r._v(r._s(r.title))])]):r._e(),r._t("form-content"),e("div",{staticClass:"form-down"},[r._t("form-down")],2)],2),e("TheError")],1)},s=[],n=e("c6f5"),o={name:"FormWrapper",components:{TheError:n["a"]},props:{title:{type:String},className:{type:String}}},i=o,l=(e("74cf"),e("2877")),u=Object(l["a"])(i,a,s,!1,null,"dbf12b84",null);t["a"]=u.exports},"0554":function(r,t,e){"use strict";var a=e("8a90"),s=e.n(a);s.a},"36e2":function(r,t,e){"use strict";e.r(t);var a=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("ValidationObserver",{attrs:{slim:""},scopedSlots:r._u([{key:"default",fn:function(t){var a=t.handleSubmit;return[e("FormWrapper",{attrs:{title:"Unesite novu lozinku"},nativeOn:{submit:function(t){t.preventDefault(),a((function(){return r.resetPassword({password:r.password.value,id:r.id})}))}},scopedSlots:r._u([{key:"form-content",fn:function(){return[e("div",{staticClass:"form-group"},[e("FormInput",{attrs:{label:r.password.label,vid:r.password.vid,type:r.password.type,name:r.password.name,id:r.password.id,rules:"required|min:6"},model:{value:r.password.value,callback:function(t){r.$set(r.password,"value",t)},expression:"password.value"}})],1),e("div",{staticClass:"form-group"},[e("FormInput",{attrs:{label:r.confirmPassword.label,rules:"required|confirmed:confirmation",type:r.confirmPassword.type,name:r.confirmPassword.name,id:r.confirmPassword.id},model:{value:r.confirmPassword.value,callback:function(t){r.$set(r.confirmPassword,"value",t)},expression:"confirmPassword.value"}})],1)]},proxy:!0},{key:"form-down",fn:function(){return[e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn",attrs:{type:"submit"}},[r._v(" Promijeni lozinku ")])])]},proxy:!0}],null,!0)}),e("TheError")]}}])})},s=[],n=e("5530"),o=e("c6f5"),i=e("0129"),l=e("b34f"),u=e("7bb1"),c=e("2f62"),d={components:{TheError:o["a"],ValidationObserver:u["a"],FormWrapper:i["a"],FormInput:l["a"]},data:function(){return{id:this.$route.params.id,password:{label:"Lozinka",type:"password",value:null,rules:{required:!0,min:6},name:"password",id:"password",vid:"confirmation"},confirmPassword:{label:"Potvrdi lozinku",type:"password",value:null,rules:{confirmed:{confirmation:!0}},name:"confirmPassword",id:"confirmPassword"}}},methods:Object(n["a"])({},Object(c["b"])(["resetPassword"]))},p=d,f=e("2877"),m=Object(f["a"])(p,a,s,!1,null,null,null);t["default"]=m.exports},"4a73":function(r,t,e){},"74cf":function(r,t,e){"use strict";var a=e("4a73"),s=e.n(a);s.a},"7f89":function(r,t,e){"use strict";var a=e("9ebd"),s=e.n(a);s.a},"8a90":function(r,t,e){},"9ebd":function(r,t,e){},b34f:function(r,t,e){"use strict";var a=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("ValidationProvider",{attrs:{rules:r.rules,name:r.name,vid:r.vid},scopedSlots:r._u([{key:"default",fn:function(t){return[e("label",{attrs:{for:r.id}},[r._v(r._s(r.label))]),e("input",{staticClass:"input",class:t.classes,attrs:{type:r.type,id:r.id,placeholder:r.placeholder,autocomplete:"on"},domProps:{value:r.value},on:{input:function(t){return r.$emit("input",t.target.value)}}}),e("p",[r._v(r._s(t.errors[0]))])]}}])})},s=[],n=e("7bb1"),o={inheritAttrs:!0,name:"FormInput",components:{ValidationProvider:n["b"]},data:function(){return{googleKey:"AIzaSyCwB0fUQDB8t-YzmxsbCNRg3m6l3OU6UoQ",currentValue:""}},props:{type:{type:String,default:"text",required:!0},value:{type:String,default:""},label:{type:String,required:!0},name:{type:String,default:""},id:{type:String},placeholder:{type:String},rules:{type:[String,Object],default:""},vid:{type:String,default:void 0},googleInput:{type:Boolean}}},i=o,l=(e("0554"),e("2877")),u=Object(l["a"])(i,a,s,!1,null,"7104a1bc",null);t["a"]=u.exports},c6f5:function(r,t,e){"use strict";var a=function(){var r=this,t=r.$createElement,a=r._self._c||t;return a("transition",{attrs:{name:"fade",mode:"out-in"}},[r.isError?a("div",{staticClass:"error"},[a("img",{attrs:{src:e("4ab2"),alt:""},on:{click:r.clearError}}),a("span",[r._v(" "+r._s(r.getErrorMessage.error)+" ")])]):r._e()])},s=[],n=e("5530"),o=e("2f62"),i={name:"Error",computed:Object(n["a"])({},Object(o["c"])(["getErrorMessage","isError"])),methods:{clearError:function(){this.$store.commit("CLEAR_ERROR")}}},l=i,u=(e("7f89"),e("2877")),c=Object(u["a"])(l,a,s,!1,null,"0769fabc",null);t["a"]=c.exports}}]);
//# sourceMappingURL=NewPassword.f18473fe.js.map