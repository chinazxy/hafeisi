$(function(){
var name="";


var substate=true;
$(".reset").click(function(){

$(".zhixun").attr("checked",false);
$(".zhixun").eq(0).attr("checked",true);

$(".sex").attr("checked",false);
$(".sex").eq(0).attr("checked",true);
$(".name").val("");
$(".email").val("");
$(".telephone").val("");
$(".msgtitle").val("");
$(".ques_content").val("");


});


var selProvince=0;
function checkP(){

 selProvince=$("#selProvince").val();
 
 if(selProvince<=0){
     $("#selProvince").focus();
 
   return false;
 
 }
  // $(".area_true").show();
	 //  $(".area_false").hide();
  return true;

}

var selCity=0;
function checkC(){

 selCity=$("#selCities").val();
 
 if(selCity<=0){
  
$("#selCities").focus();
     // $(".area_true").hide();
	//   $(".area_false").html("请选择收货人所在的城市！").show();
   return false;
 
 }
 //  $(".area_true").show();
	 //  $(".area_false").hide();
  return true;

}



$(".submit").click(function(){


var channels=$('input[name="channels"]:checked').val();

var user_id=$(".user_id").val();




 name=$(".name").val();
 if(name.Trim()===""){
 
   alert("姓名不能为空!");
   
 $(".name").focus();
   
   return false;
 
 }



var sex=$('input[name="sex"]:checked').val();

      if(!checkP()){
     alert("请选你所在的省份!");
     return false;
   }
   
   
      if(!checkC()){
     alert("请选你所在的城市!");
     return false;
   }

var telephone="";


telephone=$(".telephone").val();
if(telephone.Trim()===""){
   alert("联系号码不能为空!");
   
     $(".telephone").focus();
   
   return false;

}else{

  var _reg =/^1[3-8]+\d{9}$/;
    
	
  
   if (_reg.test($(".telephone").val().Trim())) {
    
    }else{
	
	   
        alert("联系号码格式不正确!");
		 $(".telephone").focus();
		  return false;
	}

}


   


var age=$(".age").val();
var enter_web =$('input[name="enter_web"]:checked').val();

var design=$('input[name="design"]:checked').val();
var hard=$('input[name="hard"]:checked').val();
var choice=$('input[name="choice"]:checked').val();
var made=$('input[name="made"]:checked').val();
var advice=$('input[name="advice"]:checked').val();
var important=$('input[name="important"]:checked').val();
var dislike=$('input[name="dislike"]:checked').val();
var intolerability=$('input[name="intolerability"]:checked').val();
var refer=$('input[name="refer"]:checked').val();
var funtions='';
$("input[name='function']:checkbox").each(function(){ 
                if($(this).attr("checked")){
                    funtions += $(this).val()+","
                }
});
 
 
var change='';

$("input[name='change']:checkbox").each(function(){ 
                if($(this).attr("checked")){
                    change += $(this).val()+","
                }
});

var material='';

$("input[name='material']:checkbox").each(function(){ 
                if($(this).attr("checked")){
                    material += $(this).val()+","
                }
});

var improve="";
$("input[name='improve']:checkbox").each(function(){ 
                if($(this).attr("checked")){
                    improve += $(this).val()+","
                }
});

var pledge="";
$("input[name='pledge']:checkbox").each(function(){ 
                if($(this).attr("checked")){
                    pledge += $(this).val()+","
                }
});

var service=$('input[name="service"]:checked').val();

var quality=$('input[name="quality"]:checked').val();
var cost=$('input[name="cost"]:checked').val();
var design_satisfaction=$('input[name="design_satisfaction"]:checked').val();
var comfortable=$('input[name="comfortable"]:checked').val();
var m_service=$('input[name="m_service"]:checked').val();
var l_service=$('input[name="l_service"]:checked').val();

var content=$(".ques_content").val();

var comments=$(".comments").val();

if(substate){

  $.ajax({
                type: 'POST',
                url: 'question.php',
                data:{
				    channels:channels,
					user_id:user_id,
				    name:name,
					sex:sex,
                    age:age,
					province:selProvince,
					city:selCity,
					telephone:telephone,
					enter_web:enter_web,
					design:design,
					hard:hard,
					choice:choice,
					made:made,
					advice:advice,
					important:important,
					dislike:dislike,
					intolerability:intolerability,
					refer:refer,
					funtions:funtions,
					change:change,
					material:material,
					improve:improve,
					pledge:pledge,
					service:service,
					quality:quality,
					cost:cost,
					design_satisfaction:design_satisfaction,
					comfortable:comfortable,
					m_service:m_service,
					l_service:l_service,
					content:content,
					comments:comments,
					act:"submit_info"
                },
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
				    $(".tijiao_false").hide();
                    $(".tijiao_true").html("数据提交中，请稍等...").show();
                },
                success: function(data){
				
                     switch(data.err){
					 
					   
                        case "name_empty":
						  $(".tijiao_false").html("姓名不能为空!").show();
                         $(".tijiao_true").html("").hide();
						 substate=true;
            
                         break; 
                        case "province_empty":
						  $(".tijiao_false").html("您所在的省份不能为空!").show();
                         $(".tijiao_true").html("").hide();
                    substate=true;
						  break;
					    case "city_empty":
							  $(".tijiao_false").html("您所在的城市不能为空!").show();
                         $(".tijiao_true").html("").hide();
			            substate=true;
                         break; 
						 
						 case "telephone_empty":
						 		  $(".tijiao_false").html("联系电话不能为空!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 	 case "tel_format":
							 	  $(".tijiao_false").html("联系电话格式有误!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 		 	 case "submit_false":
							 	  $(".tijiao_false").html("您已提交过，请不要重复提交!").show();
                         $(".tijiao_true").html("").hide();
					 substate=true;
						 break;
						 
						 	 	 case "save_ok":
								    $(".tijiao_false").hide();
                    $(".tijiao_true").html("数据提交成功!").show();
						  substate=false;
						 break;
						 
						 			 	 	 case "save_fail":
								    $(".tijiao_false").hide();
                        $(".tijiao_true").html("数据提交失败!").show();
						  substate=false;
						 break;
				
						   
                        default:
						alert("系统错误，刷新后重试！");
						 substate=true;
					
    
			  
                    }
		
                }
            });


   }else{
   
    	  $(".tijiao_false").html("您已提交过，请不要重复提交!").show();
                         $(".tijiao_true").html("").hide();
   }



});






});