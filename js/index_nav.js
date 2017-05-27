

$(function() {

if($.browser.msie) {

 $('#link_css').attr('href','themes/default/css/wide.css')
}
else if($.browser.safari)
{
$('#link_css').remove();
}
else if($.browser.mozilla)
{

$('#link_css').remove();
}
else if($.browser.opera) {
$('#link_css').remove();
}
else {
$('#link_css').remove();
} 


   
     			$(".showpic").hover(
function(){
  $(this).find(".pic1").hide();
  $(this).find(".pic2").show();
}
,

function(){
   $(this).find(".pic1").show();
  $(this).find(".pic2").hide();
}

);

	var nowpage = $(".nowpage").val();
	var nowobj;
	var index = 0;
	var tobj;

	$(".nav_cn").prepend("<span></span>");
	$(".nav_cn").each(function(i) {
		var linkText = $(".nav_en").eq(i).html();
		$(this).find("span").show().html(linkText);
		if (i == nowpage) {
			//$(".abc_nav .nav_en").eq(nowpage).find("a").attr("style", "color:#bf0426");
		}
	});
	var index = 0;
	var chinaText = "";
	$(".nav_cn").hover(function() {
		index = $(".nav_cn").index(this);
		var that = this;


		$(this).find("span").stop().animate({
			marginTop: "-40"
		},
		500);

	},
	function() {
		$(this).find("span").stop().animate({
			marginTop: "0"
		},
		500);

	});
	
	
	$(".search_box input").click(function(){
	
	 if($(this).val()==="Search"){
	 
	   $(this).val('');
	 }
	
	
	});
	
	$(".search_box input").focusout(function(){

	  if($(this).val().Trim()===""){
	  
	   $(this).val('Search');
	  
	  }
	
	});
	
	$(".search_icon").click(function(){
	
	 if($(".search_box input").val()==="Search" || $(".search_box input").val().Trim()===""){
	 
	    alert('请输入要搜索的关键字');
	 }
	
	});
	
$(".b_search input").click(function(){
	
	 if($(this).val()==="邮件地址"){
	 
	   $(this).val('');
	 }
	
	
	});
	
	$(".b_search input").focusout(function(){

	  if($(this).val().Trim()===""){
	  
	   $(this).val('邮件地址');
	  
	  }
	
	});
	
	/*$(".b_submit").click(function(){
	
	 if($(".b_search input").val()==="邮件地址" || $(".b_search input").val().Trim()===""){
	 
	    alert('请输入您的邮件地址！');
	 }else{
	 
	      var _reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	   if (!_reg.test($(".b_search input").val().Trim())) {
			 
	     alert("邮件地址格试不正确！");
		 $(".email").focus();		 
	     return false;
			
		}else{
		
		
		
		}
	 
	 }
	
	}); */
	
	
	
	
function keyUp(e) { 
　　       　  var currKey=0,e=e || event;
　　      　   currKey=e.keyCode || e.which || e.charCode;
　　       　 if(currKey===13){
              
			    var searchVal=$(".search_box input").val().Trim();
				if(searchVal==="Search" || searchVal===""){
					 alert("请输入要搜索的关键字!");
				  return false;
				}else{
				
				// location.href=app+"/Search/Index/keyword/"+searchVal;
				 
				}

              }
  }
　document.onkeyup = keyUp;
	
})

String.prototype.Trim = function() {
var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
return (m == null) ? "" : m[1];
}
	






	
	
	