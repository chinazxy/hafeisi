<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
    <?php echo $this->fetch('library/page_header.lbi'); ?>
<title><?php echo $this->_var['page_title']; ?></title>
    		 <link rel="icon" href="favicon.ico" type="image/x-icon"/>
         <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/> 
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/css.css" />
<link type="text/css" rel="stylesheet" href="themes/default/css/2016/auto.css" />
<link type="text/css" rel="stylesheet" href="js/2016/video-js.css" />
 <?php echo $this->smarty_insert_scripts(array('files'=>'jquery-1.9.0.min.js,jquery.easing.1.3.js')); ?> 
<script type="text/javascript" src="js/2016/jquery-picture-min.js"></script>

<script type="text/javascript" src="js/2016/common.js"></script>
    <script type="text/javascript" src="js/2016/video.js"></script>
    <script type="text/javascript">
	  $(function(){

	    $('figure,picture').picture();  
		
	  });
  </script>

</head>

<body onload="showLoadding();">
<div class="gpage clearfix">
<div class="gb clearfix">
	<?php echo $this->fetch('library/header.lbi'); ?>
<div class="dapa clearfix">
	<div class="daze"></div>
	<div class="gz_contain">
	<div class="w_top">
    <div class="w_por clearfix">
	<div class="w_br"></div>
    <div class="w_potu bg_img bg_height"  data-media="<?php echo $this->_var['cat']['cat_plot']; ?>" data-img="<?php echo $this->_var['cat']['cat_plot']; ?>">
    <img title="" alt="" class="bgimg" style="border: 0px none; display: block; top: 0px;visibility:hidden;" src="<?php echo $this->_var['cat']['cat_plot']; ?>" />
    </div>
   
    <div class="w_cover"><ul class="w_ll">
	<?php $_from = $this->_var['addtypeinfo']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['vo']):
?>
    <li class="w_li"><a <?php if ($this->_var['vo']['typeinfo']['type'] == 1): ?> class="ad_image" <?php endif; ?> <?php if ($this->_var['vo']['typeinfo']['type'] == 2): ?> class="ad_video" <?php endif; ?> href="javaScript:void(0);"><span class="w_limg"><img src="<?php echo $this->_var['vo']['typeinfo']['images_t']; ?>" /></span><span class="w_th"> <?php echo $this->_var['vo']['typeinfo']['title']; ?></span> </a></li>
   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

    
    
    
    </ul>
    <div class="w_desc">
    <h1 class="w-title"><?php echo $this->_var['cat']['des_title']; ?></h1>
    <p class="w_deta"><?php echo $this->_var['cat']['cat_desc']; ?></p>
    
    
    
    </div>
      </div>  </div></div>
	<!--<div class="gz_img bg_img"   data-media="images/pr1.jpg" data-img="images/pr.jpg">

			<div class="gz_bj bg_img" data-img="images/tt.png" data-media="images/tt2.png" data-media-left="-20%">
		
			</div>
		   <div class="loadding">
		   </div>

	
		<div class="gz_w">
			<div class="gz_line"></div>
			<div class="gz_t" style="color:#000;">BOLON PRODUCT</div>
			<div class="gz_t1">48 product</div>
		</div>	
	</div>-->
	</div>
	<div class="gz_m pad clearfix">
			<div class="gz_con  <?php if ($this->_var['count'] == 0): ?> gz_emeon <?php endif; ?> clearfix">
			 <?php if ($this->_var['count'] != 0): ?>
				<div class="gp_box">
					<div class="gpr clearfix pro_til">
					<div class="gs2  js_fixedcontent clearfix">
						<div class="gp  pro_titlew">
							<div class="gpx zm" >侧面</div>
							<!--<div class="gpx">Classification</div>
							<div class="gpx">Material</div>
							<div class="gpx">Shape</div>
							<div class="gpx">Lens</div>
							<div class="gpx">Face</div>
							<div class="gpx">Colour</div>-->
							<div class="gpc pro_til_in"><?php echo $this->_var['lang']['l_filter']; ?>
							<span class="pro_til_in proon"><img date-src="themes/default/images/cs.png" src="themes/default/images/cs.svg" class="svg_class"/></span>
							<span class="pro_til_in prooff" style="display:none"><img date-src="themes/default/images/cx2.png" src="themes/default/images/cx2.svg" class="svg_class"/></span>
							</div>
						</div>
						<div class="gpk pro_til_box shaixuan <?php if ($this->_var['ismobile'] == 0): ?> <?php if ($this->_var['statea'] == 'on'): ?> shaixuan_on state <?php else: ?> shaixuan_off <?php endif; ?> <?php else: ?> shaixuan_off <?php endif; ?>" <?php if ($this->_var['ismobile'] == 0): ?>  <?php if ($this->_var['statea'] == "on"): ?> style="display:block" <?php else: ?> style="display:none" <?php endif; ?> <?php else: ?> style="display:none" <?php endif; ?> >
							<div class="gpk_box ">
								<div class="c_gb"></div>
										 <?php $_from = $this->_var['filter_attr_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attr');$this->_foreach['attribute'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['attribute']['total'] > 0):
    foreach ($_from AS $this->_var['attr']):
        $this->_foreach['attribute']['iteration']++;
?> 
				 
				          <?php if ($this->_var['attr']['filter_attr_name'] != "颜色" && $this->_var['attr']['filter_attr_name'] != "颜色筛选属性"): ?>	 
								<div class="gpk_box1">
									<div class="gpk_box1_t">
										<div class="gpk_box1_t1"><?php echo $this->_var['attr']['filter_attr_name']; ?></div>
										<div class="gpk_box1_t2" style="display:block;"><a href="<?php $_from = $this->_var['attr']['attr_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');$this->_foreach['attkey'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['attkey']['total'] > 0):
    foreach ($_from AS $this->_var['attrs']):
        $this->_foreach['attkey']['iteration']++;
?> <?php if (($this->_foreach['attkey']['iteration'] - 1) == 0): ?><?php echo $this->_var['attrs']['url']; ?><?php endif; ?><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>"><?php echo $this->_var['lang']['l_reset']; ?></a></div>
									</div>
									<div class="gpk_box1_tbox mar">
				 <?php $_from = $this->_var['attr']['attr_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');$this->_foreach['attkey'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['attkey']['total'] > 0):
    foreach ($_from AS $this->_var['attrs']):
        $this->_foreach['attkey']['iteration']++;
?>
<?php if (($this->_foreach['attkey']['iteration'] - 1) > 0): ?>
	<?php if ($this->_var['attrs']['gcount'] > 0): ?>								
										<div  attr_id="<?php echo $this->_var['attrs']['goods_id']; ?>" class="gpk_box1_tbox1  <?php if ($this->_var['attrs']['selected']): ?> select <?php endif; ?>">
											<div class="gpk_box1_yuan <?php if ($this->_var['attrs']['selected']): ?> select <?php endif; ?>"></div>
											<div class="gpk_box1_yuan_t"><a href="<?php echo $this->_var['attrs']['url']; ?>"><?php echo $this->_var['attrs']['attr_value']; ?></a></div>							
											<div class="gpk_til_close dis_no "></div>
										</div>
												<?php else: ?>
													<div  attr_id="<?php echo $this->_var['attrs']['goods_id']; ?>" class="gpk_box1_tbox1  select2">
											<div class="gpk_box1_yuan select2"></div>
											<div class="gpk_box1_yuan_t"><?php echo $this->_var['attrs']['attr_value']; ?></div>							
											<div class="gpk_til_close dis_no "></div>
										</div>
												
								 <?php endif; ?>					
					   		 <?php endif; ?>
					<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
									</div>
								</div>
                               <?php endif; ?>
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>  
			  				 <?php $_from = $this->_var['filter_attr_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attr');$this->_foreach['attribute'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['attribute']['total'] > 0):
    foreach ($_from AS $this->_var['attr']):
        $this->_foreach['attribute']['iteration']++;
?> 
				  <?php if ($this->_var['attr']['filter_attr_name'] == "颜色筛选属性"): ?>
		<div class="gpk_box1">
									<div class="gpk_box1_t">
										<div class="gpk_box1_t1"><?php echo $this->_var['lang']['l_color']; ?><span class="yanse"></span></div>
											<?php if (($this->_foreach['attribute']['iteration'] - 1) == 0): ?>
							<div class="gpk_box1_t2"><a href="javaScript:void(0);"><?php echo $this->_var['lang']['l_reset']; ?></a></div>
						<?php endif; ?>
									
									</div>
									<div class="gpk_box1_tbox">					
										<ul>
										 <?php $_from = $this->_var['attr']['attr_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'attrs');$this->_foreach['attkey'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['attkey']['total'] > 0):
    foreach ($_from AS $this->_var['attrs']):
        $this->_foreach['attkey']['iteration']++;
?>	
					  	 <?php if (($this->_foreach['attkey']['iteration'] - 1) > 0): ?>
						 <?php if ($this->_var['attrs']['gcount'] > 0): ?>
                    	<li  alt="<?php echo $this->_var['attrs']['attr_value']; ?>" title="<?php echo $this->_var['attrs']['attr_value']; ?>" class="<?php if ($this->_var['attrs']['selected']): ?>select<?php endif; ?>" ><div style="background-color:<?php echo $this->_var['attrs']['color']; ?>"><a href="<?php echo $this->_var['attrs']['url']; ?>"></a></div></li>
						<?php else: ?>
					    <li  alt="<?php echo $this->_var['attrs']['attr_value']; ?>" title="<?php echo $this->_var['attrs']['attr_value']; ?>" class="no_choice" ><div class="select2" style="background-color:<?php echo $this->_var['attrs']['color']; ?>"><a href="javaScript:void(0);"></a></div></li>
						<?php endif; ?>
							<?php endif; ?>
						
					<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>	
										</ul>
									</div>
								</div>
   <?php endif; ?>
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>  
							</div>
						</div>

						</div>
						<div class="gpw clearfix">
					<?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');$this->_foreach['brands'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['brands']['total'] > 0):
    foreach ($_from AS $this->_var['vo']):
        $this->_foreach['brands']['iteration']++;
?>
				        
						<div class="gpb <?php if (( ($this->_foreach['brands']['iteration'] - 1) + 1 ) % 3 == 0): ?>mar<?php endif; ?> <?php if (($this->_foreach['brands']['iteration'] - 1) > 11): ?>newitem<?php endif; ?>">
							<div class="pimg">
							<div class="loadding"></div>
							<ul class="gpbul glcenter">
								<?php $_from = $this->_var['vo']['colors']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vos');if (count($_from)):
    foreach ($_from AS $this->_var['vos']):
?>
								<li><a  href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>"><div class="zez"></div><img  <?php if (($this->_foreach['brands']['iteration'] - 1) > 11): ?> src="" style="visibility:hidden;"  data-src="<?php echo $this->_var['vos']['attr_left_thumb']; ?>" <?php else: ?> src="<?php echo $this->_var['vos']['attr_left_thumb']; ?>"  data-src="<?php echo $this->_var['vos']['attr_left_thumb']; ?>"<?php endif; ?>/></a></li>
							
								   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							</ul>
							<ul class="tug glleft">
									<?php $_from = $this->_var['vo']['colors']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vos');if (count($_from)):
    foreach ($_from AS $this->_var['vos']):
?>
									<li><a  href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>"><div class="zez"></div><img src="" data-src="<?php echo $this->_var['vos']['attr_thumb']; ?>" style="visibility:hidden;"/></a></li>
							
								   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							
		
							</ul>
							</div>
							<div class="dian">
							<?php $_from = $this->_var['vo']['colors']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vos');if (count($_from)):
    foreach ($_from AS $this->_var['vos']):
?>
							<span class="colo" style="background:<?php echo $this->_var['vos']['color']; ?>;"></span>
					        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
							</div>
							<div class="tb">
								<a  href="goods.php?id=<?php echo $this->_var['vo']['goods_id']; ?>">
								<div class="t1"><?php echo $this->_var['vo']['goods_name']; ?></div>
								<div class="t2"><?php if ($this->_var['vo']['no_farmart_shop_price'] == 0): ?><?php echo $this->_var['lang']['l_no_goods']; ?><?php else: ?> <?php echo $this->_var['vo']['shop_price']; ?> <?php endif; ?></div>
								</a>
							</div>
						</div>
						
            
                  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	
			
				
						</div>
					</div>
				
				
				
			
			
				</div>
				<?php else: ?>
				<div class="wan_chan"><img src="themes/default/images/jjqd.jpg"/></div>
				<?php endif; ?>
			</div>
			
	</div>
    <?php echo $this->fetch('library/page_footer.lbi'); ?>

	</div>
</div>
    <?php echo $this->fetch('library/page_botter.lbi'); ?>
</div>
   <script src="js/2016/assets/js/modernizr.js"></script>
    <script src="js/2016/hammer.js"></script>
	<script type="text/javascript" src="js/2016/prod.js"></script>
	<?php if ($this->_var['ismobile'] == 0): ?>
	<?php $_from = $this->_var['addtypeinfo']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['vo']):
?>
	<?php if ($this->_var['vo']['typeinfo']['type'] == 2): ?>
		<div class="v_tan" style="display:none;">
	<div class="v_ca"><img date-src="themes/default/images/v_ca.png" src="themes/default/images/v_ca.svg" class="svg_class"/></div>
  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="100%" height="100%"
      poster=""
      data-setup='{"autoplay":false}'>
    <source src="<?php echo $this->_var['vo']['typeinfo']['mp4']; ?>" type='video/mp4' />
    <source src="<?php echo $this->_var['vo']['typeinfo']['webm']; ?>" type='video/webm' />
    <source src="<?php echo $this->_var['vo']['typeinfo']['ogg']; ?>" type='video/ogg' />
    <track kind="captions" src="shared/example-captions.vtt" srclang="en" label="English"></track>
    <track kind="subtitles" src="shared/example-captions.vtt" srclang="en" label="English"></track>
    <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
  </video>
	</div>
	<?php endif; ?>
		<?php if ($this->_var['vo']['typeinfo']['type'] == 1): ?>
	<div class="xcd">
	<div class="close"></div>
	<div class="xcdw">
		<div class="xcdar">
			<a href="javascript:void(0);" class="prevVisual"></a>
			<a href="javascript:void(0);" class="nextVisual"></a>
			<div class="visualWrapper">
					 <div class="loadding">
		           </div>
				<div class="ximg1 bd_img" id="viewer">
				<?php $_from = $this->_var['vo']['imglist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vos');$this->_foreach['vsf'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['vsf']['total'] > 0):
    foreach ($_from AS $this->_var['vos']):
        $this->_foreach['vsf']['iteration']++;
?>
				<?php if (($this->_foreach['vsf']['iteration'] - 1) == 0): ?>
				<img style="visibility:hidden;" src="<?php echo $this->_var['vos']['images']; ?>"/>
				<?php endif; ?>
				<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
				</div>
			
			</div>
		</div>
	<div class="controls" style="display: block;">
<a class="icon-zoom-plus png-bg js-zoom-more" href="javascript:void(0);"></a>
<div class="bar"></div>
<a class="cursor" style="top: 160px;"></a>
<a class="icon-zoom-moins png-bg js-zoom-less" href="javascript:void(0);"></a>
</div>
		<div class="thumbsSlideshow">
			<div class="anythingSlider">
				<ul>
				<?php $_from = $this->_var['vo']['imglist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vos');$this->_foreach['vsf'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['vsf']['total'] > 0):
    foreach ($_from AS $this->_var['vos']):
        $this->_foreach['vsf']['iteration']++;
?>
					<li data-src="<?php echo $this->_var['vos']['images']; ?>"><a href="javascript:void(0);"><div <?php if (($this->_foreach['vsf']['iteration'] - 1) == 0): ?> class="active" <?php endif; ?>></div><img src="<?php echo $this->_var['vos']['images_t']; ?>"/></a></li>
				<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

				</ul>
			</div>
			<div class="back"></div>
			<div class="forward"></div>
		</div>
		
		
		
	</div>
</div><?php endif; ?>
	<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
	<?php endif; ?>
</body>

</html>