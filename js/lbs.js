//定义鼠标拖动对象
drag=function (a,o){
     var d=document;if(!a)a=window.event;
        if(!a.pageX)a.pageX=a.clientX;
        if(!a.pageY)a.pageY=a.clientY;
     var x=a.pageX,y=a.pageY;
     if(o.setCapture)
         o.setCapture();
     else if(window.captureEvents)
         window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
     var backData = {x : o.style.top, y : o.style.left};
     d.onmousemove=function(a){
         if(!a)a=window.event;
         if(!a.pageX)a.pageX=a.clientX;
         if(!a.pageY)a.pageY=a.clientY;
         var tx=a.pageX-x+parseInt(o.style.left),ty=a.pageY-y+parseInt(o.style.top);
         o.style.left=tx+"px";
         o.style.top=ty+"px";
            x=a.pageX;
            y=a.pageY;
     };
     d.onmouseup=function(a){
         if(!a)a=window.event;
         if(o.releaseCapture)
             o.releaseCapture();
         else if(window.captureEvents)
             window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
         d.onmousemove=null;
         d.onmouseup=null;
         if(!a.pageX)a.pageX=a.clientX;
         if(!a.pageY)a.pageY=a.clientY;
         if(!document.body.pageWidth)document.body.pageWidth=document.body.clientWidth;
         if(!document.body.pageHeight)document.body.pageHeight=document.body.clientHeight;
         if(a.pageX < 1 || a.pageY < 1 || a.pageX > document.body.pageWidth || a.pageY > document.body.pageHeight){
             o.style.left = backData.y;
             o.style.top = backData.x;
         }
     };
} 