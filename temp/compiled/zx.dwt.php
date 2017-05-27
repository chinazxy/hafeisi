<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="BOLON v1.0.3" />
	<meta name="Generator" content="BOLON v1.0.3" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="text/html; charset=iso-8859-1" http-equiv="content-type">
	<meta content="webkit" name="renderer">
	<meta name="viewport" content=" initial-scale=1.0, minimum-scale = 1, maximum-scale = 1" />
	<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
	<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
	<title>韩菲诗 - 新闻页</title>
	<link type="text/css" rel="stylesheet" href="themes/default/css/2016/css.css" />
	<link type="text/css" rel="stylesheet" href="themes/default/css/2016/auto.css" />
	<link type="text/css" rel="stylesheet" href="js/2016/video-js.css" />
	<link type="text/css" rel="stylesheet" href="js/2016/BigVideo/css/bigvideo.css" />
	
	<link type="text/css" rel="stylesheet" href="themes/default/css/css.css" />

	<script src="js/2016/jquery-1.11.1.min.js"></script>
	<script src="js/2016/w.js"></script>
	<script type="text/javascript" src="js/2016/jquery-1.9.0.min.js"></script>
	
	</script>
	<script type="text/javascript" src="js/2016/jquery-easing-1.3.js"></script>
	<script type="text/javascript" src="js/2016/jquery-picture-min.js"></script>
	<script type="text/javascript" src="js/2016/common.js"></script>
	<script src="js/2016/video.js"></script>
	<script src="js/2016/BigVideo/lib/bigvideo.js"></script>
	<script type="text/javascript" src="js/2016/news.js"></script>


</head>
<body onload="newinit();">

<div class="gpage clearfix">
	<div class="gb clearfix">
		<?php echo $this->fetch('library/header.lbi'); ?>
		<div class="dapa clearfix">
			<div class="daze"></div>
			<div class="gz_contain">
		<?php if ($this->_var['is_video'] == "true"): ?>

	 <div class="gz_img  bg_img newsbg" data-media="<?php echo $this->_var['listtop']['bgs']; ?>" data-img="<?php echo $this->_var['listtop']['bg']; ?>">
	
		 <div class="gz_w">
			<div class="gz_line"></div>
			<div class="gz_t"><?php echo $this->_var['listtop']['cat_name']; ?></div>
			<div class="gz_t1"><?php echo $this->_var['listtop']['cat_desc']; ?></div>
		</div>	
	 </div>
	 <?php else: ?>
	 <div class="gz_img bg_img newsbg"  data-media="<?php echo $this->_var['listtop']['bgs']; ?>" data-img="<?php echo $this->_var['listtop']['bg']; ?>">
		   <div class="loadding">
		   </div>
		<?php if ($this->_var['states'] == 0): ?>
		      <img class="bgimg" src="<?php echo $this->_var['listtop']['bg']; ?>" style="visibility:hidden;" />
			<?php else: ?>
			  <img class="bgimg" src="<?php echo $this->_var['listtop']['bgs']; ?>" style="visibility:hidden;"  />
			<?php endif; ?>
		<div class="gz_w">
			<div class="gz_line"></div>
			<div class="gz_t"><?php echo $this->_var['listtop']['cat_name']; ?></div>
			<div class="gz_t1"><?php echo $this->_var['listtop']['cat_desc']; ?></div>
		</div>	
	 </div>
	 
  <?php endif; ?>

	</div>
			<div class="gz_m select clearfix">
				<div class="gz_con opof clearfix">
					<div class="gz_box lalala clearfix">
						<div class="gz_le">

									<div class="gz_box1 vid_bg ">
										<div class="news_bg gz_box1s">
											<img src="themes/default/images/img/xinwen1.jpg" alt="hafeisi">
										</div>


									</div>


									<div class="gz_box2 mar news_bg" data-img="data/img/xinwen.jpg">
										<div class="loadding">
										</div>
										<a href="category.php" target="_blank">


										</a>
									</div>


						</div>

						<?php $_from = $this->_var['zxlist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('k', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['k'] => $this->_var['vo']):
?>
						<?php if (( $this->_var['k'] + 1 ) % 3 != 0): ?>
					 <div class="gz_box4 ">
						<div class="gz_bimg"><a href="<?php if ($this->_var['vo']['author_email'] == ''): ?>zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?> <?php else: ?> <?php echo $this->_var['vo']['author_email']; ?> <?php endif; ?>" target="_blank"><img src="<?php echo $this->_var['vo']['file_url']; ?>"/></a></div>
						<div class="gz_bt">
							<a href="zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?>" target="_blank">
								<div class="gz_bt1"><?php echo $this->_var['vo']['addtime']; ?>.<?php echo $this->_var['vo']['month']; ?></div>
								<div class="gz_bt2"><?php echo $this->_var['vo']['title']; ?> </div>
							</a>
						</div>
					</div>
					<?php else: ?>
					<div class="gz_box4 mar">
						<div class="gz_bimg "><a href="<?php if ($this->_var['vo']['author_email'] == ''): ?>zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?> <?php else: ?> <?php echo $this->_var['vo']['author_email']; ?> <?php endif; ?>" target="_blank"><img src="<?php echo $this->_var['vo']['file_url']; ?>"/></a></div>
						<div class="gz_bt">
							<a href="zx_detail.php?id=<?php echo $this->_var['vo']['article_id']; ?>" target="_blank">
								<div class="gz_bt1"><?php echo $this->_var['vo']['addtime']; ?>.<?php echo $this->_var['vo']['month']; ?></div>
								<div class="gz_bt2"><?php echo $this->_var['vo']['title']; ?> </div>
							</a>
						</div>
					</div>
					<?php endif; ?>
					
					
					
					
					<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>






					</div>
				</div>

			</div>
			<?php echo $this->fetch('library/page_footer.lbi'); ?>


		</div>
	</div>

</div>

</body>
</html>