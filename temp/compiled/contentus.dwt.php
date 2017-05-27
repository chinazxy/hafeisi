<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta property="qc:admins" content="417303730346274766367164506000" />
<meta property="qc:admins" content="417303730346274766367164506000" />
<meta content="text/html; charset=iso-8859-1" http-equiv="content-type">
<meta content="webkit" name="renderer">
<meta name="viewport" content=" initial-scale=1.0, minimum-scale = 1, maximum-scale = 1" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />

<title>韩菲诗-联系我们</title>
<link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />
 <script type="text/javascript" src="js/2016/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>

   <script type="text/javascript" src="js/2016/w.js"></script>

</head>

<body>
<div class="header ">
  
  <?php echo $this->fetch('library/header.lbi'); ?>
  
  <div class="nei_ye">
    
	<div class="w_tuu">

    <div style="width:100%;height:608px;" id="dituContent"></div>

	</div>
    <div class="header_center">
	 <div class="inde_shuo">
        <div class="inde_left">
          <p><span>公司名称：厦门诚享东方股份有限公司</span><span>公司地址：厦门市思明区东浦路浦南一路31号楼和35号楼</span></p>
        </div>
        <div class="inde_left sever">
          <p><span>公司电话：0592-5183960</span><span>客服热线：400-622-5215</span><span>官方邮箱：hafeisi@hafeis</span></p>
        </div>
      </div>

    </div>
  </div>
  <?php echo $this->fetch('library/page_footer.lbi'); ?>
</div>







<script type="text/javascript">
    //创建和初始化地图函数：
    function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
    }

    //创建地图函数：
    function createMap(){
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(118.135456,24.478514);//定义一个中心点坐标
        map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }

    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl(){
                        }

    //标注点数组
    var markerArr = [{title:"诚享东方",content:"我的备注",point:"118.135461|24.477363",isOpen:0,icon:{w:100,h:100,l:0,t:0,x:6,lb:5}}
		 ];
    //创建marker
    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });

			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
    //创建InfoWindow
    function createInfoWindow(i){
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon("data/img/biaobiao.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;

    }

    initMap();//创建和初始化地图
</script>
</body>
</html>
