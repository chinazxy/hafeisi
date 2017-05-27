<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="text/html; charset=iso-8859-1" http-equiv="content-type">
<meta content="webkit" name="renderer">
<meta name="viewport" content=" initial-scale=1.0, minimum-scale = 1, maximum-scale = 1" />
<title>BOLON</title>
    		 <link rel="icon" href="favicon.ico" type="image/x-icon"/>
         <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/> 
<link type="text/css" rel="stylesheet" href="css/css.css" />
<link type="text/css" rel="stylesheet" href="css/auto.css" />
<link type="text/css" rel="stylesheet" href="js/video-js.css" />
 <script type="text/javascript" src="js/transport.js"></script>
 <script type="text/javascript" src="js/utils.js"></script> 
 <script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>

  <script type="text/javascript" src="js/jquery-easing-1.3.js"></script>
  <script type="text/javascript" src="js/jquery-picture-min.js"></script>
  <script type="text/javascript" src="js/video.js"></script>
   <script type="text/javascript" src="js/jquery.flexslider-min.js"></script>
   <script type="text/javascript" src="js/common.js"></script>  

      <script src="js/skrollr.min.js"></script>
	<?php

$user_agent = $_SERVER['HTTP_USER_AGENT'];
$mobile_browser = Array(
"mqqbrowser", //手机QQ浏览器
"opera mobi", //手机opera
"juc","iuc",//uc浏览器
"fennec","ios","applewebKit/420","applewebkit/525","applewebkit/532","ipad","iphone","ipaq","ipod",
"iemobile", "windows ce",//windows phone
"240x320","480x640","acer","android","anywhereyougo.com","asus","audio","blackberry","blazer","coolpad" ,"dopod", "etouch", "hitachi","htc","huawei", "jbrowser", "lenovo","lg","lg-","lge-","lge", "mobi","moto","nokia","phone","samsung","sony","symbian","tablet","tianyu","wap","xda","xde","zte"
);
$is_mobile = 0;
foreach ($mobile_browser as $device) {
if (stristr($user_agent, $device)) {
$is_mobile = 1;
break;
}
}
$mobilestate="true";
?>

<script type="text/javascript" >


var cssstate="<?php echo $mobilestate;?>";
</script>   
	 <script type="text/javascript" src="js/index.js"></script>
    <script>
	    videojs.options.flash.swf = "js/video-js.swf";
	  $(function(){
	    $('figure, picture').picture();


	  });

  </script>
</head>
<body onload="showLoadding();">

<div class="gpage clearfix">
<div class="gb clearfix">
		<div class="pageWidth clearfix">
  <div id="hiddenTopLayer" class="open" style="height: 374px;">
    <div class="hiddenTopLayerDescription" style="width: 322px;">
      <h2 class="layerTitle">MY BOLON</h2>
      <div class="topLayerDescriptionContent">
        <div id="registration-toolbar-cnt">
          <div class="reg-subtitle">Immediately fill out the details of membership information enjoy exclusive privileges.</div>
          <div class="reg-descr">Registered users exclusive service:</div>
          <ol>
            <li>View personal information through my account.</li>
            <li>Save your favorite products with favorites</li>
            <li>Complete shopping process more quickly</li>
          </ol>
          <a class="registrationLink" href="zhuche.php">Registered</a></div>
      </div>
    </div>
    <div class="hiddenTopLayerContent logincontent">
      <div class="clearfix" id="login-toolbar-cnt">
        <h2>MY BOLON</h2>
        <div class="login-subtitle">Enter your email address and password to log in to my account</div>
        <span class="error serverSideError hidden">Please check your email and password if you are in the right, and whether it is in the country of the registry.</span>
        <form novalidate data-form-type="loginHeader" method="post" id="frmLogin" name="frmLogin" data-ecpack-handledby="custom">
          <input type="hidden" value="1" name="login">
          <input type="hidden" value="" name="cartToken">
          <input type="hidden" value="" name="cartId">
          <div class="fieldRow clearfix" id="emailWrapper">
            <div class="fieldValue">
              <div class="inputWrapper">
                <input type="email" autocapitalize="off" placeholder="Email" maxlength="120" id="email" data-required="true" data-input-type="email" name="email">
              </div>
            </div>
          </div>
          <div class="fieldRow clearfix" id="passwordWrapper">
            <div class="fieldValue">
              <div class="inputWrapper">
                <input type="password" placeholder="Password" minlength="6" maxlength="15" id="password" data-required="true" data-input-type="password" name="password">
                <a href="javaScript:void(0);" class="forgetPass">You forgot your password?</a></div>
            </div>
          </div>
          <div class="clearfix">
            <div class="fieldRow" id="rememberMeContainer">
              <div class="fieldValue">
                <div class="inputWrapper">
                  <div class="i-checkbox">
                    <input type="checkbox" class="checkbox inline" tabindex="3" name="rememberme" id="rememberme">
                    <span class="i-checkbox-inside"></span></div>
                  <label for="rememberme" class="rememberMe">Next time, please remember me.</label>
                </div>
              </div>
            </div>
            <div class="buttonsRow clearfix">
              <button id="buttonSubmit">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
	
	    <div class="hiddenTopLayerContent loginforget" style="display:none;">
      <div class="clearfix" id="login-toolbar-cnt">
		<div class="forget-cnt"> 
		<h2>Have you forgotten your password?</h2>
		Please enter the email address used in my account, and you will receive an email containing a link to the change password
		</div>
       <div class="fieldRow">
		    <div class="fieldLabel">
		        <label for="Email">E-mail*</label>
		     </div>
		    <div class="fieldValue">
	            <input type="text" value="" name="Email" id="Email" >
	           <span data-valmsg-replace="true" data-valmsg-for="Email" class="field-validation-valid"></span>
		    </div>
		</div>
       <div class="buttonsRow">
			        <button class="btnCancels" id="buttonBackLogin">BACK</button>
			        <button id="buttonSubmit">Send</button>
		</div>
        
      
      </div>
    </div>
    <div class="closeIcon"><span class="closeImg"><!----></span></div>
  </div>
</div>
	<div class="gh ie">
		<div class="ghd ">
			<div class="s_d menu_off"><img  date-src="images/s_d.png" src="images/s_d.svg" class="svg_class" /></div>
			<div class="s_b">Bag</div>
			<div class="s_s s_off"><img  date-src="images/sou.png" src="images/sou.svg" class="svg_class"/></div>
			<div class="logo"><a target="_blank" href="#"><img style="position:relative;top:50%; margin-top:-62px;"  date-src="images/logo.jpg" src="images/logo.svg" class="svg_class"/></a></div>
			<div class="gdh">
				<ul>
					<li class="pad2"><img  date-src="images/gw.png" src="images/gw.svg" class="svg_class"  /><span>0</span></li>
					<li class="signIn"><a  href="javaScript:void(0);">Sign In</a></li>
				
				</ul>
			</div>
		</div>
		<div class="s_nav" style="height:0px;overflow:hidden;">
			<div class="s_nbox">
				<input type="text" class="s_in search" value="Search..." placeholder="Search..."/>
				<div class="ss">Search</div>	
			</div>
		</div>
	</div>
	<div class="gh1 ie" >
		<div class="ghd1 ">
			<div class="gdh1">
				<ul>
						<li class="pad1"><a target="_blank" href="index.php">HOME</a></li>
					<li><a target="_blank" href="prod.php">MAN</a></li>
					<li><a target="_blank" href="prodn.php">WOMAN</a></li>
					<li><a target="_blank" href="prod.php">KIDS</a></li>
					<li><a target="_blank" href="brand.php">BRAND</a></li>
					<li><a target="_blank" href="zx.php">NEWS</a></li>
				</ul>
			</div>
			<div class="gsou">
				<input type="text" class="gs_in search" value="Search..."  placeholder="Search..."/>
				<div class="gs_img"><img date-src="images/sou.png" src="images/sou.svg" class="svg_class"/></div>
			</div>
		</div>
	</div>
	<div class="shou_head menu_div">
	<ul>
     <li><a href="index.php">HOME</a></li>
     <li><a href="prod.php">MAN</a></li>
     <li><a href="prodn.php">WOMAN</a></li>
     <li><a href="prod.php">KIDS</a></li>
	       <li><a href="brand.php">BRAND</a></li>
	 <li><a href="zx.php">NEWS</a></li>
	 <li class="mybolon"><a href="javaScript:void(0);">MY BOLON</a>
     	<div class="shou_dengbox">
		<div class="shou_bao clearfix">
     	<div class="shou_deng">Member Login</div>
        <div class="shou_deng_title2">I have an account already</div>
        <div class="shou_deng_b">
        <div class="shou_deng_title3">UserName<exp>*</exp></div>
        <input type="text" placeholder="BOLON Account" class="shou_deng_in mp_account">
        </div>
        <div class="shou_deng_b">
        <div class="shou_deng_title3">Password<exp>*</exp></div>
        <input type="password" placeholder="Password" class="shou_deng_in mp_password">
        </div>
        <div class="deng_left_t3"><a href="user.php?act=get_password">Forgot password?</a></div>
		 <div class="miao_mima1_ts1 login_mp_ti"></div>
        <div class="deng_anniu deng_mp_lu"><a href="javaScript:void(0);">Login</a></div>
        <div class="shou_deng_title2">I have not registered any account.</div>
        <div class="deng_left_t4">Create a personal account for more exclusive privileges and rich experience.</div>
        <div class="deng_anniu2"><a href="user.php?act=register">Create my BOLON account</a></div>
		</div>
        </div>
     </li>
    </ul>
</div>
<div class="dapa clearfix">
	<div class="daze"></div>
		<div class="glun" >
		<div class="glunabsoult" >
		 <div class="loadding">
		           </div>
		</div>
		<div class="glunfixed"  >
	           
			         <div class="glt">
						
						<div class="worddiv">
						<div class="gt" style="display:block">SUNGLASSES</div>
							<div class="gt">OPTICAL FRAMES</div>
							<div class="gt">LOOKBOOK FRAMES</div>
					  </div>
				   <!-- <div class="gt1" style="display:none;">
					<i class="now_n" style="margin-left:0px;">01</i>/<i class="count_n" style="margin-left:0px;"></i>&nbsp;&nbsp;
					</div>-->
					</div>
			<div class="gt1" style="display:none;">

		    </div>
			<div class="divslide">
		<ul  class="slides"  style="position:relative;">
			<li data-src="images/lun.jpg" id="intro">
			<div class="g_jw">Anne Hathaway1</div>
				<!--<a target="_blank" href="#">
					<img data-src="images/lun.jpg" src="" style="visibility:hidden;" />
			
				</a>-->
			</li>
	        <li data-src="images/33.jpg" id="intro">
			<div class="g_jw">Anne Hathaway2</div>
				<!--<a target="_blank" href="#">
					<img  src="" style="visibility:hidden;" />
				</a>-->
			</li>	
  <li data-src="images/lb3.jpg" id="intro">
  <div class="g_jw">Anne Hathaway3</div>
				<!--<a target="_blank" href="#">
					<img  src="" style="visibility:hidden;" />
				</a>-->
			</li>	
				
		</ul>
				</div>
				</div>
	</div>
	<div class="gfl clearfix"  style="position:relative;">
		<div class="gf">
			<div class="gfb">
				<div class="t1 my_font1">SunGlasses</div>
				<div class="t2 my_font2">
					<span><a target="_blank" href="#">Man</a><span>|</span></span>
					<span><a target="_blank" href="#">Woman</a><span>|</span></span>
					<span><a target="_blank" href="#">Kids</a><span>|</span></span>
					<span><a target="_blank" href="#">Besign</a><span></span></span>
				</div>
				<div class="t3 limgs glass">
				  <div class="loadding">
		           </div>
				<a target="_blank" href="#">
				 
					
           	<img src="images/wg.png" data-src="images/wg.png"  style="visibility:hidden;" />
            
              </figure>
			
				</a></div>
			</div>
			<div class="gfb">
				<div class="t1 my_font1">Optical frames</div>
				<div class="t2 my_font2">
					<span><a target="_blank" href="#">Man</a><span>|</span></span>
					<span><a target="_blank" href="#">Woman</a></span>
				</div>
				<div class="t3 limgs glass">
				
				<a target="_blank" href="#">
				  <div class="loadding">
		           </div>
				
           	<img src="images/mg.png" data-src="images/mg.png"  style="visibility:hidden;" />
              
              </figure>
				</a></div>
			</div>
		</div>
	</div>
	<div class="gs">
		<div class="gsb bg_img"   data-media="images/22.jpg" data-img="images/f1.jpg">
		   <div class="loadding">
		   </div>
			<a target="_blank" href="#">
	<?php if($is_mobile==0){?>
		
			     <img class="bgimg" src="images/f1.jpg"  style="visibility:hidden;" />
           
			  <?php }else{?>
			     <img class="bgimg" src="images/22.jpg"   style="visibility:hidden;" />
			  <?php }?>
			    
       
			<div class="glt">
				<div class="gline"></div>
				<div class="gt3">LOOKBOOK</div>
				<div class="gt2">2016.01.12</div>
			</div>
			</a>
		</div>
		<div class="gsb limgs col">
		<div class="video_img bg_img"   data-media="images/23.jpg" data-img="images/f2.jpg">
			<?php if($is_mobile==0){?>
		
			     <img class="bgimg"  src="images/f2.jpg"  style="visibility:hidden;" />
           
			  <?php }else{?>
			     <img class="bgimg"  src="images/23.jpg"   style="visibility:hidden;" />
			  <?php }?>
		</div>
		 <div class="video_c">
			     
				  <video id="example_video_1" style="width:1px;height:1px;" class="video-js vjs-default-skin" controls preload="none" poster="" data-setup="{}">

		<source src="http://117.25.143.44:88/video/gongyi.mp4" type='video/mp4' />
		    <source src="http://117.25.143.44:88/video/gongyi.webm" type='video/webm' />
		    <source src="http://117.25.143.44:88/video/gongyi.ogv" type='video/ogg' />
	    <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track>
    <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track>
   
       </video>
	   	   </div>
			<div class="icon  vid_bg">
				<i></i>
				<div class="vid_bg_v cs"><img date-src="images/yuan.png" src="images/yuan.svg" class="svg_class video_ico"/></div>
				<div class="vid_bg_v dis hp"><img date-src="images/yuan2.png" src="images/yuan2.svg" class="svg_class video_ico"/></div>
			</div>
		</div>
		<div class="gs_t bg_img" data-media="images/24.jpg" data-img="images/f3.jpg">
		 
			<?php if($is_mobile==0){?>
	           <img class="bgimg" src="images/f3.jpg"  style="visibility:hidden;" />
			  <?php }else{?>
			      <img  class="bgimg"  src="images/24.jpg"   style="visibility:hidden;" />
			  <?php }?>
	        <div class="loadding">
		    </div>
			<div class="gs_tb">
				<div class="gs_t1 my_font1">FIND A RETAIL STORE</div>
				<div class="gs_t2 my_font2">SHADOVVS celebrates a new trajectory for American artist & designer Matt W. Moore. During a 2 month stay in
Oakland, CA, and a 2 week residency within 886 Geary Gallery</div>
				<div class="gs_t3 my_font2"><a target="_blank" href="#">MORE</a></div>
			</div>
		</div>
		
		<div class="gs_tj  clearfix" >
		 
			<?php if($is_mobile==0){?>
			<div class="pcimg bg_img"   data-media="images/25.jpg" data-img="images/y1.jpg"> 
			     <div class="loadding">
		    </div>
			<img  class="bgimg" src="images/25.jpg"  style="visibility:hidden;" />
			
			</div>
			
				  <div class="container">
				 
			  <div id="glasses-main" class="viewcontain">
			  <div class="row">
			 
              </div> 
			  </div> 
			  </div>
			  <?php }else{?>
			  <div class="pcimg bg_img" data-media="images/25.jpg" data-img="images/y1.jpg">
			       <div class="loadding">
		    </div>
			   <img class="bgimg" src="images/y1.jpg"   style="visibility:hidden;" />
			   </div>
			  <?php }?>
		
			
			<div class="gs_tb2">
				<div class="gs_ty">DESUFB</div>
				<div class="gs_ty1 my_font2">There are no shortcuts to quality, so innovative designs, luxurious materials and old world craftsmanship are only the beginning. We manufacture in some of the world’s oldest and most respected factories dedicated exclusively to producing eyewear.</div>			
			</div>
		</div>
	</div>
		<div class="gfoot clearfix">
		<div class="gfoot_w clearfix">
			<div class="gfoot_w1">
				<div class="foot_t my_font1">Information<div class="triangle seke"></div></div>
				<div class="mb_foot_contain">
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">About Tyrannosaurus</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Career Development</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">News and Events</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Frequently Asked Questions</a></div>
				</div>
			</div>
			<div class="gfoot_w1 ">
				<div class="foot_t my_font1">Shopping<div class="triangle seke"></div></div>
					<div class="mb_foot_contain">
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Shopping Process</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Member Overview</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Common Problem</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Returns</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Contacts Customer Service</a></div>
				</div>
			</div>
			<div class="gfoot_w1 ">
				<div class="foot_t my_font1">Customer Service<div class="triangle seke"></div></div>
					<div class="mb_foot_contain">
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Satisfaction Survey</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Career Development</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Vip Service</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Online Complaint</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Online Warranty</a></div>
				</div>
			</div>
			<div class="gfoot_w1">
				<div class="foot_t my_font1">Related Links<div class="triangle seke"></div></div>
					<div class="mb_foot_contain">
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Find a store</a></div>
				<div class="foot_t2 my_font2"><a target="_blank" href="faq.php">Authenticity Verification</a></div>
				</div>
			</div>
			<div class="gfoot_w2">
				<div class="foot_t my_font1">Electronic Journals</div>
				<div class="foot_t2 my_font2"><a target="_blank" href="#">By subscibing BOLON online electronic journals. understand our latest products.exclusive events and trend information.</a></div>	
				<input type="text" class="foot_t3 my_font2"/>
				<input type="button" class="foot_t4 my_font2" value="Submit"/>
			</div>
		</div>
	</div>
	<!--<div class="gfootmb clearfix">
	<div class="jtck"><img  date-src="images/xx.png" src="images/xx.svg" class="svg_class" /></div>
	<div class="colsed"><img  date-src="images/xr.png" src="images/xr.svg" class="svg_class" /></div>
	
		<div class="gfoot_wmb clearfix">
			<div class="gfoot_wmb1">
				<div class="foot_tmb my_fontmb1"><span class="foot_fontmb">Information</span><div class="triangle seke"></div></div>
				<div class="foot_contain">
				<div class="foot_div">
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">About Tyrannosaurus</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Career Development</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">News and Events</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="faq.php">Frequently Asked Questions</a></div>
				</div>
				</div>
			</div>
			<div class="gfoot_wmb1">
				<div class="foot_tmb my_fontmb1"><span class="foot_fontmb">Shopping</span><div class="triangle seke"></div></div>
					<div class="foot_contain">
						<div class="foot_div">
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Shopping Process</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Member Overview</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Common Problem</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Returns</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Contacts Customer Service</a></div>
				</div>
				</div>
			</div>
			<div class="gfoot_wmb1">
				<div class="foot_tmb my_fontmb1"><span class="foot_fontmb">Customer Service</span><div class="triangle seke"></div></div>
					<div class="foot_contain">
						<div class="foot_div">
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Satisfaction Survey</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Career Development</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Vip Service</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Online Complaint</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Online Warranty</a></div>
				</div>
				</div>
			</div>
			<div class="gfoot_wmb1">
				<div class="foot_tmb my_fontmb1"><span class="foot_fontmb">Related Links</span><div class="triangle seke"></div></div>
				<div class="foot_contain">
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Find a store</a></div>
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">Authenticity Verification</a></div>
					</div>
			</div>
			<div class="gfoot_wmb1">
				<div class="foot_tmb my_fontmb1"><span class="foot_fontmb">Electronic Journals</span></div>
					<div class="foot_contain">
						<div class="foot_div">
				<div class="foot_tmb2 my_font2"><a target="_blank" href="#">By subscibing BOLON online electronic journals. understand our latest products.exclusive events and trend information.</a></div>	
				<input type="text" class="foot_t3 my_font2"/>
				<input type="button" class="foot_t4 my_font2" value="Submit"/>
				</div>
				</div>
			</div>
		</div>
	</div>-->
	</div>
</div>
<div class="cbbfixed"  style="bottom: 10px;">
<a href="javascript:void(0);" class="cbbtn cweixin"><span class="yy-icon yy-weixin"><img  date-src="images/erwm.png" src="images/erwm.svg" class="svg_class" /></span><div></div></a>
<a href="javascript:void(0);" class="cbbtn cweixin fan_top"><span class="yy-icon yy-gt"><img  date-src="images/xs.png" src="images/xs.svg" class="svg_class" /></span></a></div>
</div>

</body>
</html>