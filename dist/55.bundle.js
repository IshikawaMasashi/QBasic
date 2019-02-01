(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{597:function(e,t,n){"use strict";n.r(t);var r,i,o,a,u,s,c,d,f,l,g,h,p,m,v,_=function(){function e(e){var t=this;this._defaults=e,this._worker=null,this._idleCheckInterval=setInterval(function(){return t._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return t._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){this._worker&&(Date.now()-this._lastUsedTime>12e4&&this._stopWorker())},e.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/html/htmlWorker",createData:{languageSettings:this._defaults.options,languageId:this._defaults.languageId},label:this._defaults.languageId}),this._client=this._worker.getProxy()),this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t=this,n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return this._getClient().then(function(t){e=t}).then(function(e){return t._worker.withSyncedResources(n)}).then(function(t){return e})},e}();!function(e){e.create=function(e,t){return{line:e,character:t}},e.is=function(e){var t=e;return q.objectLiteral(t)&&q.number(t.line)&&q.number(t.character)}}(r||(r={})),function(e){e.create=function(e,t,n,i){if(q.number(e)&&q.number(t)&&q.number(n)&&q.number(i))return{start:r.create(e,t),end:r.create(n,i)};if(r.is(e)&&r.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+i+"]")},e.is=function(e){var t=e;return q.objectLiteral(t)&&r.is(t.start)&&r.is(t.end)}}(i||(i={})),function(e){e.create=function(e,t){return{uri:e,range:t}},e.is=function(e){var t=e;return q.defined(t)&&i.is(t.range)&&(q.string(t.uri)||q.undefined(t.uri))}}(o||(o={})),function(e){e.create=function(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}},e.is=function(e){var t=e;return q.number(t.red)&&q.number(t.green)&&q.number(t.blue)&&q.number(t.alpha)}}(a||(a={})),function(e){e.create=function(e,t){return{range:e,color:t}},e.is=function(e){var t=e;return i.is(t.range)&&a.is(t.color)}}(u||(u={})),function(e){e.create=function(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}},e.is=function(e){var t=e;return q.string(t.label)&&(q.undefined(t.textEdit)||p.is(t))&&(q.undefined(t.additionalTextEdits)||q.typedArray(t.additionalTextEdits,p.is))}}(s||(s={})),function(e){e.Comment="comment",e.Imports="imports",e.Region="region"}(c||(c={})),function(e){e.create=function(e,t,n,r,i){var o={startLine:e,endLine:t};return q.defined(n)&&(o.startCharacter=n),q.defined(r)&&(o.endCharacter=r),q.defined(i)&&(o.kind=i),o},e.is=function(e){var t=e;return q.number(t.startLine)&&q.number(t.startLine)&&(q.undefined(t.startCharacter)||q.number(t.startCharacter))&&(q.undefined(t.endCharacter)||q.number(t.endCharacter))&&(q.undefined(t.kind)||q.string(t.kind))}}(d||(d={})),function(e){e.create=function(e,t){return{location:e,message:t}},e.is=function(e){var t=e;return q.defined(t)&&o.is(t.location)&&q.string(t.message)}}(f||(f={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(l||(l={})),function(e){e.create=function(e,t,n,r,i,o){var a={range:e,message:t};return q.defined(n)&&(a.severity=n),q.defined(r)&&(a.code=r),q.defined(i)&&(a.source=i),q.defined(o)&&(a.relatedInformation=o),a},e.is=function(e){var t=e;return q.defined(t)&&i.is(t.range)&&q.string(t.message)&&(q.number(t.severity)||q.undefined(t.severity))&&(q.number(t.code)||q.string(t.code)||q.undefined(t.code))&&(q.string(t.source)||q.undefined(t.source))&&(q.undefined(t.relatedInformation)||q.typedArray(t.relatedInformation,f.is))}}(g||(g={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return q.defined(n)&&n.length>0&&(i.arguments=n),i},e.is=function(e){var t=e;return q.defined(t)&&q.string(t.title)&&q.string(t.command)}}(h||(h={})),function(e){e.replace=function(e,t){return{range:e,newText:t}},e.insert=function(e,t){return{range:{start:e,end:e},newText:t}},e.del=function(e){return{range:e,newText:""}},e.is=function(e){var t=e;return q.objectLiteral(t)&&q.string(t.newText)&&i.is(t.range)}}(p||(p={})),function(e){e.create=function(e,t){return{textDocument:e,edits:t}},e.is=function(e){var t=e;return q.defined(t)&&y.is(t.textDocument)&&Array.isArray(t.edits)}}(m||(m={})),function(e){e.is=function(e){var t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||q.typedArray(t.documentChanges,m.is))}}(v||(v={}));var b,y,k,w,x,C,E,I,T,S,M,R,P,A,F,L,O,j=function(){function e(e){this.edits=e}return e.prototype.insert=function(e,t){this.edits.push(p.insert(e,t))},e.prototype.replace=function(e,t){this.edits.push(p.replace(e,t))},e.prototype.delete=function(e){this.edits.push(p.del(e))},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e}();!function(){function e(e){var t=this;this._textEditChanges=Object.create(null),e&&(this._workspaceEdit=e,e.documentChanges?e.documentChanges.forEach(function(e){var n=new j(e.edits);t._textEditChanges[e.textDocument.uri]=n}):e.changes&&Object.keys(e.changes).forEach(function(n){var r=new j(e.changes[n]);t._textEditChanges[n]=r}))}Object.defineProperty(e.prototype,"edit",{get:function(){return this._workspaceEdit},enumerable:!0,configurable:!0}),e.prototype.getTextEditChange=function(e){if(y.is(e)){if(this._workspaceEdit||(this._workspaceEdit={documentChanges:[]}),!this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for versioned document changes.");var t=e;if(!(r=this._textEditChanges[t.uri])){var n={textDocument:t,edits:i=[]};this._workspaceEdit.documentChanges.push(n),r=new j(i),this._textEditChanges[t.uri]=r}return r}if(this._workspaceEdit||(this._workspaceEdit={changes:Object.create(null)}),!this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");var r;if(!(r=this._textEditChanges[e])){var i=[];this._workspaceEdit.changes[e]=i,r=new j(i),this._textEditChanges[e]=r}return r}}();!function(e){e.create=function(e){return{uri:e}},e.is=function(e){var t=e;return q.defined(t)&&q.string(t.uri)}}(b||(b={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){var t=e;return q.defined(t)&&q.string(t.uri)&&q.number(t.version)}}(y||(y={})),function(e){e.create=function(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}},e.is=function(e){var t=e;return q.defined(t)&&q.string(t.uri)&&q.string(t.languageId)&&q.number(t.version)&&q.string(t.text)}}(k||(k={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(w||(w={})),function(e){e.is=function(t){var n=t;return n===e.PlainText||n===e.Markdown}}(w||(w={})),function(e){e.is=function(e){var t=e;return q.objectLiteral(e)&&w.is(t.kind)&&q.string(t.value)}}(x||(x={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(C||(C={})),function(e){e.PlainText=1,e.Snippet=2}(E||(E={})),function(e){e.create=function(e){return{label:e}}}(I||(I={})),function(e){e.create=function(e,t){return{items:e||[],isIncomplete:!!t}}}(T||(T={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},e.is=function(e){var t=e;return q.string(t)||q.objectLiteral(t)&&q.string(t.language)&&q.string(t.value)}}(S||(S={})),function(e){e.is=function(e){var t=e;return q.objectLiteral(t)&&(x.is(t.contents)||S.is(t.contents)||q.typedArray(t.contents,S.is))&&(void 0===e.range||i.is(e.range))}}(M||(M={})),function(e){e.create=function(e,t){return t?{label:e,documentation:t}:{label:e}}}(R||(R={})),function(e){e.create=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return q.defined(t)&&(i.documentation=t),q.defined(n)?i.parameters=n:i.parameters=[],i}}(P||(P={})),function(e){e.Text=1,e.Read=2,e.Write=3}(A||(A={})),function(e){e.create=function(e,t){var n={range:e};return q.number(t)&&(n.kind=t),n}}(F||(F={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(L||(L={})),function(e){e.create=function(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}}(O||(O={}));var D,W,V,K,N,H=function(){return function(){}}();!function(e){e.create=function(e,t,n,r,i,o){var a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},e.is=function(e){var t=e;return t&&q.string(t.name)&&q.string(t.detail)&&q.number(t.kind)&&i.is(t.range)&&i.is(t.selectionRange)&&(void 0===t.deprecated||q.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))}}(H||(H={})),function(e){e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports"}(D||(D={})),function(e){e.create=function(e,t){var n={diagnostics:e};return null!=t&&(n.only=t),n},e.is=function(e){var t=e;return q.defined(t)&&q.typedArray(t.diagnostics,g.is)&&(void 0===t.only||q.typedArray(t.only,q.string))}}(W||(W={})),function(e){e.create=function(e,t,n){var r={title:e};return h.is(t)?r.command=t:r.edit=t,void 0!==n&&(r.kind=n),r},e.is=function(e){var t=e;return t&&q.string(t.title)&&(void 0===t.diagnostics||q.typedArray(t.diagnostics,g.is))&&(void 0===t.kind||q.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||h.is(t.command))&&(void 0===t.edit||v.is(t.edit))}}(V||(V={})),function(e){e.create=function(e,t){var n={range:e};return q.defined(t)&&(n.data=t),n},e.is=function(e){var t=e;return q.defined(t)&&i.is(t.range)&&(q.undefined(t.command)||h.is(t.command))}}(K||(K={})),function(e){e.create=function(e,t){return{tabSize:e,insertSpaces:t}},e.is=function(e){var t=e;return q.defined(t)&&q.number(t.tabSize)&&q.boolean(t.insertSpaces)}}(N||(N={}));var U=function(){return function(){}}();!function(e){e.create=function(e,t,n){return{range:e,target:t,data:n}},e.is=function(e){var t=e;return q.defined(t)&&i.is(t.range)&&(q.undefined(t.target)||q.string(t.target))}}(U||(U={}));var z,J;!function(e){e.create=function(e,t,n,r){return new B(e,t,n,r)},e.is=function(e){var t=e;return!!(q.defined(t)&&q.string(t.uri)&&(q.undefined(t.languageId)||q.string(t.languageId))&&q.number(t.lineCount)&&q.func(t.getText)&&q.func(t.positionAt)&&q.func(t.offsetAt))},e.applyEdits=function(e,t){for(var n=e.getText(),r=function e(t,n){if(t.length<=1)return t;var r=t.length/2|0,i=t.slice(0,r),o=t.slice(r);e(i,n),e(o,n);for(var a=0,u=0,s=0;a<i.length&&u<o.length;){var c=n(i[a],o[u]);t[s++]=c<=0?i[a++]:o[u++]}for(;a<i.length;)t[s++]=i[a++];for(;u<o.length;)t[s++]=o[u++];return t}(t,function(e,t){var n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n}),i=n.length,o=r.length-1;o>=0;o--){var a=r[o],u=e.offsetAt(a.range.start),s=e.offsetAt(a.range.end);if(!(s<=i))throw new Error("Ovelapping edit");n=n.substring(0,u)+a.newText+n.substring(s,n.length),i=u}return n}}(z||(z={})),function(e){e.Manual=1,e.AfterDelay=2,e.FocusOut=3}(J||(J={}));var q,B=function(){function e(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=null}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!0,configurable:!0}),e.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},e.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=null},e.prototype.getLineOffsets=function(){if(null===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,i=t.length;if(0===i)return r.create(0,e);for(;n<i;){var o=Math.floor((n+i)/2);t[o]>e?i=o:n=o+1}var a=n-1;return r.create(a,e-t[a])},e.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!0,configurable:!0}),e}();!function(e){var t=Object.prototype.toString;e.defined=function(e){return void 0!==e},e.undefined=function(e){return void 0===e},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===t.call(e)},e.number=function(e){return"[object Number]"===t.call(e)},e.func=function(e){return"[object Function]"===t.call(e)},e.objectLiteral=function(e){return null!==e&&"object"==typeof e},e.typedArray=function(e,t){return Array.isArray(e)&&e.every(t)}}(q||(q={}));var Q=monaco.Range,$=function(){function e(e,t,n){var r=this;this._languageId=e,this._worker=t,this._disposables=[],this._listener=Object.create(null);var i=function(e){var t,n=e.getModeId();n===r._languageId&&(r._listener[e.uri.toString()]=e.onDidChangeContent(function(){clearTimeout(t),t=setTimeout(function(){return r._doValidate(e.uri,n)},500)}),r._doValidate(e.uri,n))},o=function(e){monaco.editor.setModelMarkers(e,r._languageId,[]);var t=e.uri.toString(),n=r._listener[t];n&&(n.dispose(),delete r._listener[t])};this._disposables.push(monaco.editor.onDidCreateModel(i)),this._disposables.push(monaco.editor.onWillDisposeModel(function(e){o(e)})),this._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){o(e.model),i(e.model)})),this._disposables.push(n.onDidChange(function(e){monaco.editor.getModels().forEach(function(e){e.getModeId()===r._languageId&&(o(e),i(e))})})),this._disposables.push({dispose:function(){for(var e in r._listener)r._listener[e].dispose()}}),monaco.editor.getModels().forEach(i)}return e.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},e.prototype._doValidate=function(e,t){this._worker(e).then(function(n){return n.doValidation(e.toString()).then(function(n){var r=n.map(function(e){return n="number"==typeof(t=e).code?String(t.code):t.code,{severity:function(e){switch(e){case l.Error:return monaco.MarkerSeverity.Error;case l.Warning:return monaco.MarkerSeverity.Warning;case l.Information:return monaco.MarkerSeverity.Info;case l.Hint:return monaco.MarkerSeverity.Hint;default:return monaco.MarkerSeverity.Info}}(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source};var t,n});monaco.editor.setModelMarkers(monaco.editor.getModel(e),t,r)})}).then(void 0,function(e){console.error(e)})},e}();function G(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function X(e){if(e)return new Q(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function Y(e){if(e)return{range:X(e.range),text:e.newText}}var Z=function(){function e(e){this._worker=e}return Object.defineProperty(e.prototype,"triggerCharacters",{get:function(){return[".",":","<",'"',"=","/"]},enumerable:!0,configurable:!0}),e.prototype.provideCompletionItems=function(e,t,n,r){e.getWordUntilPosition(t);var i=e.uri;return this._worker(i).then(function(e){return e.doComplete(i.toString(),G(t))}).then(function(e){if(e){var t=e.items.map(function(e){var t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,kind:function(e){var t=monaco.languages.CompletionItemKind;switch(e){case C.Text:return t.Text;case C.Method:return t.Method;case C.Function:return t.Function;case C.Constructor:return t.Constructor;case C.Field:return t.Field;case C.Variable:return t.Variable;case C.Class:return t.Class;case C.Interface:return t.Interface;case C.Module:return t.Module;case C.Property:return t.Property;case C.Unit:return t.Unit;case C.Value:return t.Value;case C.Enum:return t.Enum;case C.Keyword:return t.Keyword;case C.Snippet:return t.Snippet;case C.Color:return t.Color;case C.File:return t.File;case C.Reference:return t.Reference}return t.Property}(e.kind)};return e.textEdit&&(t.range=X(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(Y)),e.insertTextFormat===E.Snippet&&(t.insertTextRules=monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet),t});return{isIncomplete:e.isIncomplete,suggestions:t}}})},e}();var ee=function(){function e(e){this._worker=e}return e.prototype.provideDocumentHighlights=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.findDocumentHighlights(r.toString(),G(t))}).then(function(e){if(e)return e.map(function(e){return{range:X(e.range),kind:function(e){var t=monaco.languages.DocumentHighlightKind;switch(e){case A.Read:return t.Read;case A.Write:return t.Write;case A.Text:return t.Text}return t.Text}(e.kind)}})})},e}(),te=function(){function e(e){this._worker=e}return e.prototype.provideLinks=function(e,t){var n=e.uri;return this._worker(n).then(function(e){return e.findDocumentLinks(n.toString())}).then(function(e){if(e)return e.map(function(e){return{range:X(e.range),url:e.target}})})},e}();function ne(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var re=function(){function e(e){this._worker=e}return e.prototype.provideDocumentFormattingEdits=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.format(r.toString(),null,ne(t)).then(function(e){if(e&&0!==e.length)return e.map(Y)})})},e}(),ie=function(){function e(e){this._worker=e}return e.prototype.provideDocumentRangeFormattingEdits=function(e,t,n,r){var i=e.uri;return this._worker(i).then(function(e){return e.format(i.toString(),function(e){if(e)return{start:G(e.getStartPosition()),end:G(e.getEndPosition())}}(t),ne(n)).then(function(e){if(e&&0!==e.length)return e.map(Y)})})},e}(),oe=function(){function e(e){this._worker=e}return e.prototype.provideFoldingRanges=function(e,t,n){var r=e.uri;return this._worker(r).then(function(e){return e.provideFoldingRanges(r.toString(),t)}).then(function(e){if(e)return e.map(function(e){var t={start:e.startLine+1,end:e.endLine+1};return void 0!==e.kind&&(t.kind=function(e){switch(e){case c.Comment:return monaco.languages.FoldingRangeKind.Comment;case c.Imports:return monaco.languages.FoldingRangeKind.Imports;case c.Region:return monaco.languages.FoldingRangeKind.Region}return}(e.kind)),t})})},e}();function ae(e){var t=new _(e),n=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return t.getLanguageServiceWorker.apply(t,e)},r=e.languageId;monaco.languages.registerCompletionItemProvider(r,new Z(n)),monaco.languages.registerDocumentHighlightProvider(r,new ee(n)),monaco.languages.registerLinkProvider(r,new te(n)),monaco.languages.registerFoldingRangeProvider(r,new oe(n)),"html"===r&&(monaco.languages.registerDocumentFormattingEditProvider(r,new re(n)),monaco.languages.registerDocumentRangeFormattingEditProvider(r,new ie(n)),new $(r,n,e))}n.d(t,"setupMode",function(){return ae})}}]);
//# sourceMappingURL=55.bundle.js.map