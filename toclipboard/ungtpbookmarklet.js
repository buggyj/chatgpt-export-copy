void (()=>{var I=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var L=I((fe,P)=>{"use strict";function H(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}return e}function A(e,r){return Array(r+1).join(e)}function $(e){return e.replace(/^\n*/,"")}function F(e){for(var r=e.length;r>0&&e[r-1]===`
`;)r--;return e.substring(0,r)}var U=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function N(e){return E(e,U)}var C=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function b(e){return E(e,C)}function V(e){return w(e,C)}var S=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function W(e){return E(e,S)}function _(e){return w(e,S)}function E(e,r){return r.indexOf(e.nodeName)>=0}function w(e,r){return e.getElementsByTagName&&r.some(function(t){return e.getElementsByTagName(t).length})}var o={};o.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};o.lineBreak={filter:"br",replacement:function(e,r,t){return t.br+`
`}};o.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,r,t){var n=Number(r.nodeName.charAt(1));if(t.headingStyle==="setext"&&n<3){var i=A(n===1?"=":"-",e.length);return`

`+e+`
`+i+`

`}else return`

`+A("#",n)+" "+e+`

`}};o.blockquote={filter:"blockquote",replacement:function(e){return e=e.replace(/^\n+|\n+$/g,""),e=e.replace(/^/gm,"> "),`

`+e+`

`}};o.list={filter:["ul","ol"],replacement:function(e,r){var t=r.parentNode;return t.nodeName==="LI"&&t.lastElementChild===r?`
`+e:`

`+e+`

`}};o.listItem={filter:"li",replacement:function(e,r,t){e=e.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var n=t.bulletListMarker+"   ",i=r.parentNode;if(i.nodeName==="OL"){var a=i.getAttribute("start"),s=Array.prototype.indexOf.call(i.children,r);n=(a?Number(a)+s:s+1)+".  "}return n+e+(r.nextSibling&&!/\n$/.test(e)?`
`:"")}};o.indentedCodeBlock={filter:function(e,r){return r.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,r,t){return`

    `+r.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};o.fencedCodeBlock={filter:function(e,r){return r.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,r,t){for(var n=r.firstChild.getAttribute("class")||"",i=(n.match(/language-(\S+)/)||[null,""])[1],a=r.firstChild.textContent,s=t.fence.charAt(0),u=3,l=new RegExp("^"+s+"{3,}","gm"),c;c=l.exec(a);)c[0].length>=u&&(u=c[0].length+1);var h=A(s,u);return`

`+h+i+`
`+a.replace(/\n$/,"")+`
`+h+`

`}};o.horizontalRule={filter:"hr",replacement:function(e,r,t){return`

`+t.hr+`

`}};o.inlineLink={filter:function(e,r){return r.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,r){var t=r.getAttribute("href"),n=d(r.getAttribute("title"));return n&&(n=' "'+n+'"'),"["+e+"]("+t+n+")"}};o.referenceLink={filter:function(e,r){return r.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,r,t){var n=r.getAttribute("href"),i=d(r.getAttribute("title"));i&&(i=' "'+i+'"');var a,s;switch(t.linkReferenceStyle){case"collapsed":a="["+e+"][]",s="["+e+"]: "+n+i;break;case"shortcut":a="["+e+"]",s="["+e+"]: "+n+i;break;default:var u=this.references.length+1;a="["+e+"]["+u+"]",s="["+u+"]: "+n+i}return this.references.push(s),a},references:[],append:function(e){var r="";return this.references.length&&(r=`

`+this.references.join(`
`)+`

`,this.references=[]),r}};o.emphasis={filter:["em","i"],replacement:function(e,r,t){return e.trim()?t.emDelimiter+e+t.emDelimiter:""}};o.strong={filter:["strong","b"],replacement:function(e,r,t){return e.trim()?t.strongDelimiter+e+t.strongDelimiter:""}};o.code={filter:function(e){var r=e.previousSibling||e.nextSibling,t=e.parentNode.nodeName==="PRE"&&!r;return e.nodeName==="CODE"&&!t},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var r=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",t="`",n=e.match(/`+/gm)||[];n.indexOf(t)!==-1;)t=t+"`";return t+r+e+r+t}};o.image={filter:"img",replacement:function(e,r){var t=d(r.getAttribute("alt")),n=r.getAttribute("src")||"",i=d(r.getAttribute("title")),a=i?' "'+i+'"':"";return n?"!["+t+"]("+n+a+")":""}};function d(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function O(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var r in e.rules)this.array.push(e.rules[r])}O.prototype={add:function(e,r){this.array.unshift(r)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var r;return(r=g(this.array,e,this.options))||(r=g(this._keep,e,this.options))||(r=g(this._remove,e,this.options))?r:this.defaultRule},forEach:function(e){for(var r=0;r<this.array.length;r++)e(this.array[r],r)}};function g(e,r,t){for(var n=0;n<e.length;n++){var i=e[n];if(q(i,r,t))return i}}function q(e,r,t){var n=e.filter;if(typeof n=="string"){if(n===r.nodeName.toLowerCase())return!0}else if(Array.isArray(n)){if(n.indexOf(r.nodeName.toLowerCase())>-1)return!0}else if(typeof n=="function"){if(n.call(e,r,t))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function j(e){var r=e.element,t=e.isBlock,n=e.isVoid,i=e.isPre||function(M){return M.nodeName==="PRE"};if(!(!r.firstChild||i(r))){for(var a=null,s=!1,u=null,l=k(u,r,i);l!==r;){if(l.nodeType===3||l.nodeType===4){var c=l.data.replace(/[ \r\n\t]+/g," ");if((!a||/ $/.test(a.data))&&!s&&c[0]===" "&&(c=c.substr(1)),!c){l=v(l);continue}l.data=c,a=l}else if(l.nodeType===1)t(l)||l.nodeName==="BR"?(a&&(a.data=a.data.replace(/ $/,"")),a=null,s=!1):n(l)||i(l)?(a=null,s=!0):a&&(s=!1);else{l=v(l);continue}var h=k(u,l,i);u=l,l=h}a&&(a.data=a.data.replace(/ $/,""),a.data||v(a))}}function v(e){var r=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),r}function k(e,r,t){return e&&e.parentNode===r||t(r)?r.nextSibling||r.parentNode:r.firstChild||r.nextSibling||r.parentNode}var D=typeof window<"u"?window:{};function G(){var e=D.DOMParser,r=!1;try{new e().parseFromString("","text/html")&&(r=!0)}catch(t){}return r}function X(){var e=function(){};return K()?e.prototype.parseFromString=function(r){var t=new window.ActiveXObject("htmlfile");return t.designMode="on",t.open(),t.write(r),t.close(),t}:e.prototype.parseFromString=function(r){var t=document.implementation.createHTMLDocument("");return t.open(),t.write(r),t.close(),t},e}function K(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch(r){window.ActiveXObject&&(e=!0)}return e}var Y=G()?D.DOMParser:X();function z(e,r){var t;if(typeof e=="string"){var n=Q().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");t=n.getElementById("turndown-root")}else t=e.cloneNode(!0);return j({element:t,isBlock:N,isVoid:b,isPre:r.preformattedCode?J:null}),t}var y;function Q(){return y=y||new Y,y}function J(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function Z(e,r){return e.isBlock=N(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=ee(e),e.flankingWhitespace=re(e,r),e}function ee(e){return!b(e)&&!W(e)&&/^\s*$/i.test(e.textContent)&&!V(e)&&!_(e)}function re(e,r){if(e.isBlock||r.preformattedCode&&e.isCode)return{leading:"",trailing:""};var t=te(e.textContent);return t.leadingAscii&&R("left",e,r)&&(t.leading=t.leadingNonAscii),t.trailingAscii&&R("right",e,r)&&(t.trailing=t.trailingNonAscii),{leading:t.leading,trailing:t.trailing}}function te(e){var r=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:r[1],leadingAscii:r[2],leadingNonAscii:r[3],trailing:r[4],trailingNonAscii:r[5],trailingAscii:r[6]}}function R(e,r,t){var n,i,a;return e==="left"?(n=r.previousSibling,i=/ $/):(n=r.nextSibling,i=/^ /),n&&(n.nodeType===3?a=i.test(n.nodeValue):t.preformattedCode&&n.nodeName==="CODE"?a=!1:n.nodeType===1&&!N(n)&&(a=i.test(n.textContent))),a}var ne=Array.prototype.reduce,ie=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function m(e){if(!(this instanceof m))return new m(e);var r={rules:o,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(t,n){return n.isBlock?`

`:""},keepReplacement:function(t,n){return n.isBlock?`

`+n.outerHTML+`

`:n.outerHTML},defaultReplacement:function(t,n){return n.isBlock?`

`+t+`

`:t}};this.options=H({},r,e),this.rules=new O(this.options)}m.prototype={turndown:function(e){if(!oe(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var r=B.call(this,new z(e,this.options));return ae.call(this,r)},use:function(e){if(Array.isArray(e))for(var r=0;r<e.length;r++)this.use(e[r]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,r){return this.rules.add(e,r),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return ie.reduce(function(r,t){return r.replace(t[0],t[1])},e)}};function B(e){var r=this;return ne.call(e.childNodes,function(t,n){n=new Z(n,r.options);var i="";return n.nodeType===3?i=n.isCode?n.nodeValue:r.escape(n.nodeValue):n.nodeType===1&&(i=le.call(r,n)),x(t,i)},"")}function ae(e){var r=this;return this.rules.forEach(function(t){typeof t.append=="function"&&(e=x(e,t.append(r.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function le(e){var r=this.rules.forNode(e),t=B.call(this,e),n=e.flankingWhitespace;return(n.leading||n.trailing)&&(t=t.trim()),n.leading+r.replacement(t,e,this.options)+n.trailing}function x(e,r){var t=F(e),n=$(r),i=Math.max(e.length-t.length,r.length-n.length),a=`

`.substring(0,i);return t+a+n}function oe(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}P.exports=m});var se=L(),ue=new se,p=document.body.cloneNode(!0);p.querySelectorAll("pre .text-xs").forEach(e=>{var r;return(r=e.parentNode)==null?void 0:r.removeChild(e)});p.querySelectorAll("div .text-xs.gap-1").forEach(e=>{var r;return(r=e.parentNode)==null?void 0:r.removeChild(e)});p.querySelector(".absolute.bottom-0").remove();var T=`# ${document.title}

`;p.querySelectorAll(".text-message").forEach((e,r)=>{let t=Math.trunc(r/2)+1,n=e.querySelector(".prose");n?T+=`## RESPONSE ${t}

${ue.turndown(n.innerHTML)}

`:T+=`## PROMPT ${t}

${e.querySelector("div").innerText}

`});var f=document.createElement("a");f.download=`${document.title}.md`;f.href=URL.createObjectURL(new Blob([T]));f.style.display="none";document.body.appendChild(f);f.click();})();
