(()=>{var t={326:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,s,o,i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==r.g?r.g:"undefined"!=typeof self?self:{},a={},l={exports:{}};s=i,o=function(){function t(e,r,n){return this.id=++t.highestId,this.name=e,this.symbols=r,this.postprocess=n,this}function e(t,e,r,n){this.rule=t,this.dot=e,this.reference=r,this.data=[],this.wantedBy=n,this.isComplete=this.dot===t.symbols.length}function r(t,e){this.grammar=t,this.index=e,this.states=[],this.wants={},this.scannable=[],this.completed={}}function n(t,e){this.rules=t,this.start=e||this.rules[0].name;var r=this.byName={};this.rules.forEach((function(t){r.hasOwnProperty(t.name)||(r[t.name]=[]),r[t.name].push(t)}))}function s(){this.reset("")}function o(t,e,o){if(t instanceof n){var i=t;o=e}else i=n.fromCompiled(t,e);for(var a in this.grammar=i,this.options={keepHistory:!1,lexer:i.lexer||new s},o||{})this.options[a]=o[a];this.lexer=this.options.lexer,this.lexerState=void 0;var l=new r(i,0);this.table=[l],l.wants[i.start]=[],l.predict(i.start),l.process(),this.current=0}function i(t){var e=typeof t;if("string"===e)return t;if("object"===e){if(t.literal)return JSON.stringify(t.literal);if(t instanceof RegExp)return t.toString();if(t.type)return"%"+t.type;if(t.test)return"<"+String(t.test)+">";throw new Error("Unknown symbol type: "+t)}}return t.highestId=0,t.prototype.toString=function(t){var e=void 0===t?this.symbols.map(i).join(" "):this.symbols.slice(0,t).map(i).join(" ")+" ● "+this.symbols.slice(t).map(i).join(" ");return this.name+" → "+e},e.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},e.prototype.nextState=function(t){var r=new e(this.rule,this.dot+1,this.reference,this.wantedBy);return r.left=this,r.right=t,r.isComplete&&(r.data=r.build(),r.right=void 0),r},e.prototype.build=function(){var t=[],e=this;do{t.push(e.right.data),e=e.left}while(e.left);return t.reverse(),t},e.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,o.fail))},r.prototype.process=function(t){for(var e=this.states,r=this.wants,n=this.completed,s=0;s<e.length;s++){var i=e[s];if(i.isComplete){if(i.finish(),i.data!==o.fail){for(var a=i.wantedBy,l=a.length;l--;){var h=a[l];this.complete(h,i)}if(i.reference===this.index){var u=i.rule.name;(this.completed[u]=this.completed[u]||[]).push(i)}}}else{if("string"!=typeof(u=i.rule.symbols[i.dot])){this.scannable.push(i);continue}if(r[u]){if(r[u].push(i),n.hasOwnProperty(u)){var c=n[u];for(l=0;l<c.length;l++){var p=c[l];this.complete(i,p)}}}else r[u]=[i],this.predict(u)}}},r.prototype.predict=function(t){for(var r=this.grammar.byName[t]||[],n=0;n<r.length;n++){var s=r[n],o=this.wants[t],i=new e(s,0,this.index,o);this.states.push(i)}},r.prototype.complete=function(t,e){var r=t.nextState(e);this.states.push(r)},n.fromCompiled=function(e,r){var s=e.Lexer;e.ParserStart&&(r=e.ParserStart,e=e.ParserRules);var o=new n(e=e.map((function(e){return new t(e.name,e.symbols,e.postprocess)})),r);return o.lexer=s,o},s.prototype.reset=function(t,e){this.buffer=t,this.index=0,this.line=e?e.line:1,this.lastLineBreak=e?-e.col:0},s.prototype.next=function(){if(this.index<this.buffer.length){var t=this.buffer[this.index++];return"\n"===t&&(this.line+=1,this.lastLineBreak=this.index),{value:t}}},s.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},s.prototype.formatError=function(t,e){var r=this.buffer;if("string"==typeof r){var n=r.split("\n").slice(Math.max(0,this.line-5),this.line);r.indexOf("\n",this.index);var s=this.index-this.lastLineBreak,o=String(this.line).length;return e+=" at line "+this.line+" col "+s+":\n\n",e+=n.map((function(t,e){return i(this.line-n.length+e+1,o)+" "+t}),this).join("\n"),e+"\n"+i("",o+s)+"^\n"}return e+" at index "+(this.index-1);function i(t,e){var r=String(t);return Array(e-r.length+1).join(" ")+r}},o.fail={},o.prototype.feed=function(t){var e,n=this.lexer;for(n.reset(t,this.lexerState);;){try{if(!(e=n.next()))break}catch(t){var o=new r(this.grammar,this.current+1);throw this.table.push(o),(l=new Error(this.reportLexerError(t))).offset=this.current,l.token=t.token,l}var i=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var a=this.current+1;o=new r(this.grammar,a),this.table.push(o);for(var l,h=void 0!==e.text?e.text:e.value,u=n.constructor===s?e.value:e,c=i.scannable,p=c.length;p--;){var f=c[p],d=f.rule.symbols[f.dot];if(d.test?d.test(u):d.type?d.type===e.type:d.literal===h){var y=f.nextState({data:u,token:e,isToken:!0,reference:a-1});o.states.push(y)}}if(o.process(),0===o.states.length)throw(l=new Error(this.reportError(e))).offset=this.current,l.token=e,l;this.options.keepHistory&&(i.lexerState=n.save()),this.current++}return i&&(this.lexerState=n.save()),this.results=this.finish(),this},o.prototype.reportLexerError=function(t){var e,r,n=t.token;return n?(e="input "+JSON.stringify(n.text[0])+" (lexer error)",r=this.lexer.formatError(n,"Syntax error")):(e="input (lexer error)",r=t.message),this.reportErrorCommon(r,e)},o.prototype.reportError=function(t){var e=(t.type?t.type+" token: ":"")+JSON.stringify(void 0!==t.value?t.value:t),r=this.lexer.formatError(t,"Syntax error");return this.reportErrorCommon(r,e)},o.prototype.reportErrorCommon=function(t,e){var r=[];r.push(t);var n=this.table.length-2,s=this.table[n],o=s.states.filter((function(t){var e=t.rule.symbols[t.dot];return e&&"string"!=typeof e}));return 0===o.length?(r.push("Unexpected "+e+". I did not expect any more input. Here is the state of my parse table:\n"),this.displayStateStack(s.states,r)):(r.push("Unexpected "+e+". Instead, I was expecting to see one of the following:\n"),o.map((function(t){return this.buildFirstStateStack(t,[])||[t]}),this).forEach((function(t){var e=t[0],n=e.rule.symbols[e.dot],s=this.getSymbolDisplay(n);r.push("A "+s+" based on:"),this.displayStateStack(t,r)}),this)),r.push(""),r.join("\n")},o.prototype.displayStateStack=function(t,e){for(var r,n=0,s=0;s<t.length;s++){var o=t[s],i=o.rule.toString(o.dot);i===r?n++:(n>0&&e.push("    ^ "+n+" more lines identical to this"),n=0,e.push("    "+i)),r=i}},o.prototype.getSymbolDisplay=function(t){return function(t){var e=typeof t;if("string"===e)return t;if("object"===e){if(t.literal)return JSON.stringify(t.literal);if(t instanceof RegExp)return"character matching "+t;if(t.type)return t.type+" token";if(t.test)return"token matching "+String(t.test);throw new Error("Unknown symbol type: "+t)}}(t)},o.prototype.buildFirstStateStack=function(t,e){if(-1!==e.indexOf(t))return null;if(0===t.wantedBy.length)return[t];var r=t.wantedBy[0],n=[t].concat(e),s=this.buildFirstStateStack(r,n);return null===s?null:[t].concat(s)},o.prototype.save=function(){var t=this.table[this.current];return t.lexerState=this.lexerState,t},o.prototype.restore=function(t){var e=t.index;this.current=e,this.table[e]=t,this.table.splice(e+1),this.lexerState=t.lexerState,this.results=this.finish()},o.prototype.rewind=function(t){if(!this.options.keepHistory)throw new Error("set option `keepHistory` to enable rewinding");this.restore(this.table[t])},o.prototype.finish=function(){var t=[],e=this.grammar.start;return this.table[this.table.length-1].states.forEach((function(r){r.rule.name===e&&r.dot===r.rule.symbols.length&&0===r.reference&&r.data!==o.fail&&t.push(r)})),t.map((function(t){return t.data}))},{Parser:o,Grammar:n,Rule:t}},(n=l).exports?n.exports=o():s.nearley=o();var h,u=l.exports,c={exports:{}},p={exports:{}};h=p,function(t,e){h.exports?h.exports=e():t.moo=e()}(i,(function(){var t=Object.prototype.hasOwnProperty,e=Object.prototype.toString,r="boolean"==typeof(new RegExp).sticky;function n(t){return t&&"[object RegExp]"===e.call(t)}function s(t){return t&&"object"==typeof t&&!n(t)&&!Array.isArray(t)}function o(t){return"("+t+")"}function i(t){return t.length?"(?:"+t.map((function(t){return"(?:"+t+")"})).join("|")+")":"(?!)"}function a(t){if("string"==typeof t)return"(?:"+t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")+")";if(n(t)){if(t.ignoreCase)throw new Error("RegExp /i flag not allowed");if(t.global)throw new Error("RegExp /g flag is implied");if(t.sticky)throw new Error("RegExp /y flag is implied");if(t.multiline)throw new Error("RegExp /m flag is implied");return t.source}throw new Error("Not a pattern: "+t)}function l(e,r){if(s(r)||(r={match:r}),r.include)throw new Error("Matching rules cannot also include states");var o={defaultType:e,lineBreaks:!!r.error||!!r.fallback,pop:!1,next:null,push:null,error:!1,fallback:!1,value:null,type:null,shouldThrow:!1};for(var i in r)t.call(r,i)&&(o[i]=r[i]);if("string"==typeof o.type&&e!==o.type)throw new Error("Type transform cannot be a string (type '"+o.type+"' for token '"+e+"')");var a=o.match;return o.match=Array.isArray(a)?a:a?[a]:[],o.match.sort((function(t,e){return n(t)&&n(e)?0:n(e)?-1:n(t)?1:e.length-t.length})),o}function h(t){return Array.isArray(t)?function(t){for(var e=[],r=0;r<t.length;r++){var n=t[r];if(n.include)for(var s=[].concat(n.include),o=0;o<s.length;o++)e.push({include:s[o]});else{if(!n.type)throw new Error("Rule has no type: "+JSON.stringify(n));e.push(l(n.type,n))}}return e}(t):function(t){for(var e=Object.getOwnPropertyNames(t),r=[],n=0;n<e.length;n++){var o=e[n],i=t[o],a=[].concat(i);if("include"!==o){var h=[];a.forEach((function(t){s(t)?(h.length&&r.push(l(o,h)),r.push(l(o,t)),h=[]):h.push(t)})),h.length&&r.push(l(o,h))}else for(var u=0;u<a.length;u++)r.push({include:a[u]})}return r}(t)}var u=l("error",{lineBreaks:!0,shouldThrow:!0});function c(t,e){for(var s=null,l=Object.create(null),h=!0,c=null,p=[],f=[],d=0;d<t.length;d++)t[d].fallback&&(h=!1);for(d=0;d<t.length;d++){var y=t[d];if(y.include)throw new Error("Inheritance is not allowed in stateless lexers");if(y.error||y.fallback){if(s)throw!y.fallback==!s.fallback?new Error("Multiple "+(y.fallback?"fallback":"error")+" rules not allowed (for token '"+y.defaultType+"')"):new Error("fallback and error are mutually exclusive (for token '"+y.defaultType+"')");s=y}var m=y.match.slice();if(h)for(;m.length&&"string"==typeof m[0]&&1===m[0].length;)l[m.shift().charCodeAt(0)]=y;if(y.pop||y.push||y.next){if(!e)throw new Error("State-switching options are not allowed in stateless lexers (for token '"+y.defaultType+"')");if(y.fallback)throw new Error("State-switching options are not allowed on fallback tokens (for token '"+y.defaultType+"')")}if(0!==m.length){h=!1,p.push(y);for(var b=0;b<m.length;b++){var v=m[b];if(n(v))if(null===c)c=v.unicode;else if(c!==v.unicode&&!1===y.fallback)throw new Error("If one rule is /u then all must be")}var g=i(m.map(a)),x=new RegExp(g);if(x.test(""))throw new Error("RegExp matches empty string: "+x);if(new RegExp("|"+g).exec("").length-1>0)throw new Error("RegExp has capture groups: "+x+"\nUse (?: … ) instead");if(!y.lineBreaks&&x.test("\n"))throw new Error("Rule should declare lineBreaks: "+x);f.push(o(g))}}var w=s&&s.fallback,$=r&&!w?"ym":"gm",k=r||w?"":"|";return!0===c&&($+="u"),{regexp:new RegExp(i(f)+k,$),groups:p,fast:l,error:s||u}}function p(t,e,r){var n=t&&(t.push||t.next);if(n&&!r[n])throw new Error("Missing state '"+n+"' (in token '"+t.defaultType+"' of state '"+e+"')");if(t&&t.pop&&1!=+t.pop)throw new Error("pop must be 1 (in token '"+t.defaultType+"' of state '"+e+"')")}var f=function(t,e){this.startState=e,this.states=t,this.buffer="",this.stack=[],this.reset()};f.prototype.reset=function(t,e){return this.buffer=t||"",this.index=0,this.line=e?e.line:1,this.col=e?e.col:1,this.queuedToken=e?e.queuedToken:null,this.queuedThrow=e?e.queuedThrow:null,this.setState(e?e.state:this.startState),this.stack=e&&e.stack?e.stack.slice():[],this},f.prototype.save=function(){return{line:this.line,col:this.col,state:this.state,stack:this.stack.slice(),queuedToken:this.queuedToken,queuedThrow:this.queuedThrow}},f.prototype.setState=function(t){if(t&&this.state!==t){this.state=t;var e=this.states[t];this.groups=e.groups,this.error=e.error,this.re=e.regexp,this.fast=e.fast}},f.prototype.popState=function(){this.setState(this.stack.pop())},f.prototype.pushState=function(t){this.stack.push(this.state),this.setState(t)};var d=r?function(t,e){return t.exec(e)}:function(t,e){var r=t.exec(e);return 0===r[0].length?null:r};function y(){return this.value}if(f.prototype._getGroup=function(t){for(var e=this.groups.length,r=0;r<e;r++)if(void 0!==t[r+1])return this.groups[r];throw new Error("Cannot find token type for matched text")},f.prototype.next=function(){var t=this.index;if(this.queuedGroup){var e=this._token(this.queuedGroup,this.queuedText,t);return this.queuedGroup=null,this.queuedText="",e}var r=this.buffer;if(t!==r.length){if(i=this.fast[r.charCodeAt(t)])return this._token(i,r.charAt(t),t);var n=this.re;n.lastIndex=t;var s=d(n,r),o=this.error;if(null==s)return this._token(o,r.slice(t,r.length),t);var i=this._getGroup(s),a=s[0];return o.fallback&&s.index!==t?(this.queuedGroup=i,this.queuedText=a,this._token(o,r.slice(t,s.index),t)):this._token(i,a,t)}},f.prototype._token=function(t,e,r){var n=0;if(t.lineBreaks){var s=/\n/g,o=1;if("\n"===e)n=1;else for(;s.exec(e);)n++,o=s.lastIndex}var i={type:"function"==typeof t.type&&t.type(e)||t.defaultType,value:"function"==typeof t.value?t.value(e):e,text:e,toString:y,offset:r,lineBreaks:n,line:this.line,col:this.col},a=e.length;if(this.index+=a,this.line+=n,0!==n?this.col=a-o+1:this.col+=a,t.shouldThrow)throw new Error(this.formatError(i,"invalid syntax"));return t.pop?this.popState():t.push?this.pushState(t.push):t.next&&this.setState(t.next),i},"undefined"!=typeof Symbol&&Symbol.iterator){var m=function(t){this.lexer=t};m.prototype.next=function(){var t=this.lexer.next();return{value:t,done:!t}},m.prototype[Symbol.iterator]=function(){return this},f.prototype[Symbol.iterator]=function(){return new m(this)}}return f.prototype.formatError=function(t,e){if(null==t){var r=this.buffer.slice(this.index);t={text:r,offset:this.index,lineBreaks:-1===r.indexOf("\n")?0:1,line:this.line,col:this.col}}var n=Math.max(0,t.offset-t.col+1),s=t.lineBreaks?t.text.indexOf("\n"):t.text.length,o=this.buffer.substring(n,t.offset+s);return e+=" at line "+t.line+" col "+t.col+":\n\n",(e+="  "+o+"\n")+"  "+Array(t.col).join(" ")+"^"},f.prototype.clone=function(){return new f(this.states,this.state)},f.prototype.has=function(t){return!0},{compile:function(t){var e=c(h(t));return new f({start:e},"start")},states:function(t,e){var r=t.$all?h(t.$all):[];delete t.$all;var n=Object.getOwnPropertyNames(t);e||(e=n[0]);for(var s=Object.create(null),o=0;o<n.length;o++)s[g=n[o]]=h(t[g]).concat(r);for(o=0;o<n.length;o++)for(var i=s[g=n[o]],a=Object.create(null),l=0;l<i.length;l++){var u=i[l];if(u.include){var d=[l,1];if(u.include!==g&&!a[u.include]){a[u.include]=!0;var y=s[u.include];if(!y)throw new Error("Cannot include nonexistent state '"+u.include+"' (in state '"+g+"')");for(var m=0;m<y.length;m++){var b=y[m];-1===i.indexOf(b)&&d.push(b)}}i.splice.apply(i,d),l--}}var v=Object.create(null);for(o=0;o<n.length;o++){var g;v[g=n[o]]=c(s[g],!0)}for(o=0;o<n.length;o++){var x=n[o],w=v[x],$=w.groups;for(l=0;l<$.length;l++)p($[l],x,v);var k=Object.getOwnPropertyNames(w.fast);for(l=0;l<k.length;l++)p(w.fast[k[l]],x,v)}return new f(v,e)},error:Object.freeze({error:!0}),fallback:Object.freeze({fallback:!0}),keywords:function(t){for(var e=Object.create(null),r=Object.create(null),n=Object.getOwnPropertyNames(t),s=0;s<n.length;s++){var o=n[s],i=t[o];(Array.isArray(i)?i:[i]).forEach((function(t){if((r[t.length]=r[t.length]||[]).push(t),"string"!=typeof t)throw new Error("keyword must be string (in keyword '"+o+"')");e[t]=o}))}function a(t){return JSON.stringify(t)}var l="";for(var h in l+="switch (value.length) {\n",r){var u=r[h];l+="case "+h+":\n",l+="switch (value) {\n",u.forEach((function(t){var r=e[t];l+="case "+a(t)+": return "+a(r)+"\n"})),l+="}\n"}return l+="}\n",Function("value",l)}}})),function(t){!function(){let e=p.exports.compile({title:{match:/(?:{title:.*?}|{t:.*?})/,value:t=>t.slice(1,-1).split(":")[1].trim()},subtitle:{match:/(?:{subtitle:.*?}|{st:.*?})/,value:t=>t.slice(1,-1).split(":")[1].trim()},artist:{match:/{artist:.*?}/,value:t=>t.slice(1,-1).split(":")[1].trim()},chord:{match:/\[.+?\]/,value:t=>t.slice(1,-1)},nl:{match:/[\n\r]/,lineBreaks:!0},soc:/(?:{soc}|{start_of_chorus})/,eoc:/(?:{eoc}|{end_of_chorus})/,text:/[^[\n]+/});var r={Lexer:e,ParserRules:[{name:"chordpro",symbols:["header","content"],postprocess:function(t){var e={type:"chordpro",header:[],content:[]};return e.header=t[0],e.content=t[1],e}},{name:"header$ebnf$1",symbols:[]},{name:"header$ebnf$1",symbols:["header$ebnf$1",e.has("nl")?{type:"nl"}:nl],postprocess:function(t){return t[0].concat([t[1]])}},{name:"header",symbols:["title","subtitle","artist","header$ebnf$1"],postprocess:function(t){return{type:"header",title:t[0],subtitle:t[1],artist:t[2]}}},{name:"title",symbols:[]},{name:"title",symbols:[e.has("title")?{type:"title"}:title,e.has("nl")?{type:"nl"}:nl],postprocess:function(t){return t[0].value}},{name:"subtitle",symbols:[]},{name:"subtitle",symbols:[e.has("subtitle")?{type:"subtitle"}:subtitle,e.has("nl")?{type:"nl"}:nl],postprocess:function(t){return t[0].value}},{name:"artist",symbols:[]},{name:"artist",symbols:[e.has("artist")?{type:"artist"}:artist,e.has("nl")?{type:"nl"}:nl],postprocess:function(t){return t[0].value}},{name:"content$ebnf$1",symbols:[]},{name:"content$ebnf$1$subexpression$1",symbols:["verse"]},{name:"content$ebnf$1$subexpression$1",symbols:["chorus"]},{name:"content$ebnf$1",symbols:["content$ebnf$1","content$ebnf$1$subexpression$1"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"content",symbols:["content$ebnf$1"],postprocess:function(t){var e={type:"content",parts:[]};for(let r=0;r<t[0].length;r++)e.parts.push(t[0][r][0]);return e}},{name:"verse$ebnf$1",symbols:["line"]},{name:"verse$ebnf$1",symbols:["verse$ebnf$1","line"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"verse$ebnf$2",symbols:[e.has("nl")?{type:"nl"}:nl]},{name:"verse$ebnf$2",symbols:["verse$ebnf$2",e.has("nl")?{type:"nl"}:nl],postprocess:function(t){return t[0].concat([t[1]])}},{name:"verse",symbols:["verse$ebnf$1","verse$ebnf$2"],postprocess:function(t){var e={type:"verse",lines:[]};for(let r=0;r<t[0].length;r++)e.lines.push(t[0][r]);return e}},{name:"chorus$ebnf$1",symbols:["line"]},{name:"chorus$ebnf$1",symbols:["chorus$ebnf$1","line"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"chorus$ebnf$2",symbols:[e.has("nl")?{type:"nl"}:nl]},{name:"chorus$ebnf$2",symbols:["chorus$ebnf$2",e.has("nl")?{type:"nl"}:nl],postprocess:function(t){return t[0].concat([t[1]])}},{name:"chorus",symbols:[e.has("soc")?{type:"soc"}:soc,e.has("nl")?{type:"nl"}:nl,"chorus$ebnf$1",e.has("eoc")?{type:"eoc"}:eoc,"chorus$ebnf$2"],postprocess:function(t){var e={type:"chorus",lines:[]};for(let r=0;r<t[2].length;r++)e.lines.push(t[2][r]);return e}},{name:"line$ebnf$1$subexpression$1",symbols:[e.has("chord")?{type:"chord"}:chord]},{name:"line$ebnf$1$subexpression$1",symbols:[e.has("text")?{type:"text"}:text]},{name:"line$ebnf$1",symbols:["line$ebnf$1$subexpression$1"]},{name:"line$ebnf$1$subexpression$2",symbols:[e.has("chord")?{type:"chord"}:chord]},{name:"line$ebnf$1$subexpression$2",symbols:[e.has("text")?{type:"text"}:text]},{name:"line$ebnf$1",symbols:["line$ebnf$1","line$ebnf$1$subexpression$2"],postprocess:function(t){return t[0].concat([t[1]])}},{name:"line",symbols:["line$ebnf$1",e.has("nl")?{type:"nl"}:nl],postprocess:function(t){var e={type:"row",children:[]};for(let r=0;r<t[0].length;r++){let n=t[0][r][0];e.children.push({type:n.type,value:n.value})}return e}}],ParserStart:"chordpro"};t.exports=r}()}(c);var f=c.exports,d=function(t){if(t.__esModule)return t;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(t).forEach((function(r){var n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:function(){return t[r]}})})),e}(Object.freeze({__proto__:null,parse:function(t){const e=new u.Parser(u.Grammar.fromCompiled(f));return e.feed(t+"\n"),e.results[0]}})),y={process_row:function(t){let e="",r="";for(let n=0;n<t.children.length;n++){const s=t.children[n],o=Math.max(s.chord.length,s.text.length);e+=s.chord+" ".repeat(o-s.chord.length),r+=s.text+" ".repeat(o-s.text.length)}let n="";return e.length>0&&(n+=e+"\n"),n+r},process_verse:function(t){var e="";for(let r=0;r<t.children.length;r++){const n=t.children[r];n instanceof chordpro.NodeRow&&(e+=processRow(n)+"\n")}return e},process_song:function(t){var e="";t.title&&(e+=`Title: ${t.title}\n`),t.subTitle&&(e+=`Subtitle: ${t.subTitle}\n`),t.artist&&(e+=`Artist: ${t.artist}\n`),e+="\n";for(let r=0;r<t.body.length;r++){let n=t.body[r];n instanceof chordpro.NodeVerse&&(e+=process_verse(n))}return e}},m={};function b(t){let e=[],r=[],n=null;for(let s=0;s<t.children.length;s++){let o=t.children[s];"chord"===o.type?(e.push(o.value),n=o.value):"text"===o.type&&(null===n&&e.push(""),r.push(o.value),n=null)}let s='<table class="jschordpro-row">';return e.filter((t=>""!==t)).length>0&&(s+='<tr class="jschordpro-row-chords">',s+=e.map((t=>`<td class="jschordpro-chord">${t}</td>`)).join("\n"),s+="</tr>"),s+='<tr class="jschordpro-row-lyrics">',s+=r.map((t=>`<td class="jschordpro-lyrics">${t.replaceAll(" ","&nbsp;")}</td>`)).join("\n"),s+="</tr>",s+="</table>",s}function v(t){let e=`<div class="jschordpro-${t.type}">`;for(let r=0;r<t.lines.length;r++){let n=t.lines[r];"row"==n.type&&(e+=b(n))}return e+="</div>",e}m.process_song=function(t){var e='<div class="jschordpro-song">';if("chordpro"===t.type&&(e+='<div class="jschordpro-header">',t.header.title.length>0&&(e+=`<h1>${t.header.title}</h1>`),t.header.subtitle.length>0&&(e+=`<h2>${t.header.subtitle}</h2>`),t.header.artist.length>0&&(e+=`<h2>${t.header.artist}</h2>`),e+="</div>","content"===t.content.type)){e+='<div class="jschordpro-content">';for(let r=0;r<t.content.parts.length;r++)e+=v(t.content.parts[r]);e+="</div>"}return e+"</div>"};const g=d,x=y,w=m;var $=a.parse=g.parse,k=a.to_ascii=x.process_song,E=a.to_html=w.process_song;e.default=a,e.parse=$,e.to_ascii=k,e.to_html=E}},e={};function r(n){var s=e[n];if(void 0!==s)return s.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{const t=r(326);new QRCode(document.getElementById("qrcode"),{text:window.location.href,width:128,height:128,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});const e=document.getElementById("cp");if(e){const r=e.textContent;let n=t.parse(r+"\n"),s=t.to_html(n);document.getElementById("cp-output").innerHTML=s}const n=document.getElementById("scroll"),s=document.getElementById("scrollSpeed"),o=document.getElementById("scrollSpeedValue");s&&s.addEventListener("input",(function(){o.textContent=s.value})),n&&n.addEventListener("click",(function(t){t.preventDefault();const e=n.dataset.delay;let r=10;s&&(r=2*(5+(120-parseInt(s.value))/110*55)),n.style.animation="pulsate 1000ms linear infinite",setTimeout((()=>{n.style.animation="",function(t){const e=1e3*t,r=window.scrollY,n=document.body.scrollHeight-window.innerHeight-r;let s=null,o=!0;window.addEventListener("wheel",(function(){o=!1})),requestAnimationFrame((function t(i){if(!o)return;null===s&&(s=i);const a=i-s,l=Math.min(a/e,1);window.scrollTo(0,r+n*l),a<e&&requestAnimationFrame(t)}))}(r)}),e?parseInt(e):0)}))})()})();