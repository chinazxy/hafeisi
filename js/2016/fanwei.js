$(function(){
	
	
	$(".fanbtn").click(function(){
		    if($(this).hasClass("on")){
				
				 return false;
			}
		    var code=$(".fanweima").val();

			var captcha=$(".code").val();
			
			if(code.Trim()==""){
				
				$(".errmsg").html("请输入防伪码！").show();
				$(".fanweima").focus();
				hideMsg();
				return false;
			}
			
		    if(captcha.Trim()==""){
				
				$(".errmsg").html("请输入验证码！").show();
					$(".code").focus();
						hideMsg();
				return false;
			}
			
			
			$.ajax({
                type: 'POST',
                url: 'fanwei.php',
				
                data:{
				    code:code,
					captcha:captcha,
					token:token,					
					timestamp:timestamp,
					act:"query"
					
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				      $(".f-load").show();
					  $(".fanbtn").addClass("on");
                },
                success: function(data){
				$(".fanbtn").removeClass("on");
				  $(".f-load").hide();
				  $(".errmsg").hide();
			       switch(data.err){
				    case "captcha_emp":
				    $(".errmsg").html("请输入验证码！").show();
					hideMsg();
					$(".code").focus();   
					 break;
					   case "captcha_err":
				    $(".errmsg").html("验证码错误！").show();
					hideMsg();
					$(".code").focus();   
					 break;
					 
					   case "code_err":
				       $(".errmsg").html("请输入防伪码！").show();
					   hideMsg();
					   $(".fanweima").focus();   
					 break; 
					
					  case "ver_err":
				       $(".errmsg").html("非法提交！").show();
					   hideMsg();
					     
					   break; 
					    case "ok":
				       $(".errmsg").html("非法提交！").show();
					   hideMsg();
					     
					   break; 
					   
					   
					   case "sucess":
					       $(".f-tis").removeClass("emsg");
					       $(".f-tis").empty().html("防伪码查询正确——即您所购买的产品为韩菲诗的正牌产品，请您放心使用此产品");
						   $(".f-bj").fadeIn();
					   break;
				    case "has_check":
					       $(".f-tis").addClass("emsg");
					       $(".f-tis").empty().html("防伪码查询重复——即同一防伪码被多次查询，请确认首次防伪码查询是否本人所为，若非本人所为，可能为假冒产品");
						   $(".f-bj").fadeIn();
					   break;   
					   
					    case "fail":
					     $(".f-tis").addClass("emsg");
					       $(".f-tis").empty().html("防伪码查询错误——即防伪码查询不存在，您所购买的产品未经韩菲诗防伪查询中心，但并不确定该产品为假冒产品");
						   $(".f-bj").fadeIn();
					   break;
				     default:
						   $(".f-tis").addClass("emsg");
					       $(".f-tis").empty().html("系统错误，请刷新后重试");
						   $(".f-bj").fadeIn();	 
				   
				   
				   }
                  
		
                }
            });
		   
	});
	
	
	$(".f-cha").click(function(){
		
		  $(".f-bj").fadeOut();
		
	});
	
	function hideMsg(){
		
		
		 setTimeout(function(){
			 
			$(".errmsg").html(" ").hide(); 
		 },2000);
		
	}
	
 
	
	
	
	
});

String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}