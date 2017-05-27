$(function(){ 
    if ($(".hideyear").length > 0)
    {
	  
        years();
        months();
        change_date();
    }
    $('#year').change(function(){
        change_date(1,1);
    });
    $('#month').change(function(){      
        change_date(1,1);
    });
	
	
	$(".save").click(function(){
	  
      $(".submitForm").trigger("click");
	 
	});
    
});
//获取时间年
function years() {
    var len = 72;
    var selObj = $("#year");
    var selIndex = len - 1;
    //获取今年是那一年
    var Cyear=new Date().getFullYear();
    var newOpt;
    var Objtext;
    var Objvalue;
    var Objselect=false;
    var options;
	
    var hideyear=$(".hideyear").val().split("-");
    //获取隐藏域里的日期 年
    var Ys=hideyear[0];
    
    for (var i=len; i>=0; --i) {
        Objtext =  Cyear -len+ i;
        Objvalue = Cyear - len + i;
        if (selObj.length != len){
            if(Ys==Objvalue)
            {
                options+="<option value='"+Ys+"' selected>"+Ys+"</option>";
            }
            else{
                options+="<option value='"+Objvalue+"'>"+Objtext+"</option>";
            }
            if(Ys==""){
                if(Objvalue=="1988"){
                    options+="<option value='"+Objvalue+"' selected>"+Objtext+"</option>";
                } else{
                    options+="<option value='"+Objvalue+"'>"+Objtext+"</option>";
                }
            }
           
        }
    }
    $("#year").append(options);
}

//获取时间月
function months(active){
    var month = $("#month");
    var monthval=0;
    var monthtext=0;
    var optionmonth=0;
    var hideyear=$(".hideyear").val().split("-");
    //获取隐藏域里的日期 月
    var Mo=hideyear[1];
    month.length = 0;
    for (var i = 1; i <= 12; i++) {
        if(i<10){
            monthval='0'+i;
            monthtext='0'+i;
		
            if(Mo==monthtext){
                optionmonth+="<option value='"+Mo+"' selected>"+Mo+"</option>";
            }else{
                optionmonth+="<option value='"+monthval+"' >"+monthtext+"</option>";
            }
        }else
        {
            monthval=i;
            monthtext=i;
            if(Mo==monthtext){
                optionmonth+="<option value='"+Mo+"' selected>"+Mo+"</option>";
            }else{
                optionmonth+="<option value='"+monthval+"' >"+monthtext+"</option>";
            }
           
      
        }
    }
    $("#month").append(optionmonth);
}

//获取时间日
function change_date(clear,active){
    var year = $("#year");
    var month = $("#month");
    var day = $("#date");
    var days=0;
    var clear=clear;
    day.length=0;
    var dayval=0;
    var daytext=0;
    var options=0;
    var hideyear=$(".hideyear").val().split("-");
    //获取隐藏域里的日期 日
    var Da=hideyear[2];
    if(clear==1){
        // day.removeChild("option");
        $("#date option").remove();
    }
    var vYear = parseInt(year.val());
    if(month.val()=="08"){
        vMonth=8;
    }else if(month.val()=="09"){
        vMonth=9;
    }else{
        var vMonth = parseInt(month.val());
    }
   
    if((vYear%4==0 && vYear%100!=0)||(vYear%100==0&&vYear%400==0)){
        if(vMonth==2)
        {
            days=29;
        }
    }else
    {
    
        if(vMonth==2)
        {
            days=28;
        }
       
    }
    if(vMonth==1|| vMonth==3 || vMonth==5 || vMonth==7 || vMonth==8|| vMonth==10 || vMonth==12)
    {
        days=31;
    }
    if(vMonth==4 || vMonth==6 || vMonth==9 || vMonth==11)

    {
        days=30;
    }
    for(var i=1;i<=days;i++)
    {
        if(day.length!=days){
            if(i<10)
            {
                daytext="0"+i;
                dayval="0"+i;
				
                if(Da==i){
				    if(active===1){
					 options+="<option value='"+Da+"' >"+Da+"</option>";
					}else{
                    options+="<option value='"+Da+"' selected>"+Da+"</option>";
					}
                }else{
                    options+="<option value='"+dayval+"' >"+daytext+"</option>";
                }
     
            }else
            {
                daytext=i;
                dayval=i;
                if(Da==i){
				  if(active===1){
                    options+="<option value='"+Da+"'>"+Da+"</option>";
					}else{
					
					    options+="<option value='"+Da+"' selected>"+Da+"</option>";
					}
                }else{
                    options+="<option value='"+dayval+"' >"+daytext+"</option>";
                }
            }
        }
    }
    //alert(days);
    $("#date").append(options);
//setTimeOut($("#date").append(options),500);
    
}