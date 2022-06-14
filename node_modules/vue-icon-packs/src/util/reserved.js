// https://github.com/vuejs/vue/blob/0603ff695d2f41286239298210113cbe2b209e28/src/platforms/web/util/element.js
// https://github.com/vuejs/vue/blob/dev/LICENSE
const isHTMLTag = function(name) {
  let list =
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot';
  let lowerName = name.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase();
  });
  return list.split(',').indexOf(lowerName) > -1;
};

const isSVG = function(name) {
  let list =
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view';
  let lowerName = name.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase();
  });
  return list.split(',').indexOf(lowerName) > -1;
};

module.exports = (name) => {
  return isSVG(name) || isHTMLTag(name);
};
