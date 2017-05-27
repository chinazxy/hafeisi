<!-- $Id: user_info.htm 16854 2009-12-07 06:20:09Z sxc_shop $ -->
<?php echo $this->fetch('pageheader.htm'); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'../js/utils.js,listtable.js')); ?>
 <?php echo $this->smarty_insert_scripts(array('files'=>'../js/region.js,../js/shopping_flow.js')); ?>

  <script type="text/javascript" src="../js/calendar.php?lang=<?php echo $this->_var['cfg_lang']; ?>"></script>
<link href="../js/calendar/calendar.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript">
              region.isAdmin = true;
       
            </script>
<script>
function getRandomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var str = '';
    for (i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}
function addOrder(obj)

{

var src = obj.parentNode.parentNode;

var idx = rowindex(src);

var tbl = document.getElementById('gallery-table');

var row = tbl.insertRow(idx + 1);

var cell = row.insertCell(-1);
cell.innerHTML = src.cells[0].innerHTML.replace(/(.*)(addOrder)(.*)(\[)(\+)/i, "$1removeImg$3$4-");

}


/**

* 删除图片上传

*/

function removeImg(obj)

{

var row = rowindex(obj.parentNode.parentNode);

var tbl = document.getElementById('gallery-table');

tbl.deleteRow(row);

}


function deletImg(din,id){

  if(confirm("您确定要删除该图片吗?")){
    if(din=='b'||din=='s'){

    location.href="xinwen_p.php?act=deleteimg&id="+id+"&din="+din;
     }  

}
}
function im_show(obj){
//alert("变");
    if(obj.value==1){
	  document.getElementById('small_im').style.visibility='visible';
      document.getElementById('small_imposition').style.visibility='visible';
	 
	}else{
	document.getElementById('small_im').style.visibility='collapse';
	  document.getElementById('small_imposition').style.visibility='collapse';
	}
}

</script>
<div class="main-div">
<form action="xinwen_p.php" method="post" name="theForm" enctype="multipart/form-data">
  <table width="100%" id="general-table" >
     <caption style="text-align:left;font-size:16px;padding-left:10px">新闻页</caption>

    <tr>
	
      <td  class="label">
       标题：</td>
      <td>
        <input type="text" name="title" value="<?php echo $this->_var['ads']['title']; ?>" size="35" />
        
      </td>
    </tr>
	
	    <tr>
      <td  class="label">
       描述：</td>
      <td>
	     <textarea name="content" cols="60" rows="5"><?php echo $this->_var['ads']['content']; ?></textarea><br/>

      </td>
    </tr>
	    <tr>
      <td  class="label">
       排序：</td>
      <td>
        <input type="text" name="ogv" value="<?php echo $this->_var['ads']['resort']; ?>" size="35" style="width:80px"/>
 
      </td>
	  </tr>
	    <tr>
	   <td  class="label">
       文字层位置：</td>
      <td>
	  <?php if ($this->_var['action'] == "add"): ?>
        <select name="content_position">
		<option value="0" selected>左上</option>
		<option value="1">左下</option>
		<option value="2">右上</option>
		<option value="3">右下</option>
		</select>
		 <?php else: ?>
		<select name="content_position">
		<option value="0" <?php if ($this->_var['ads']['content_position'] == 0): ?> selected <?php endif; ?>>左上</option>
		<option value="1" <?php if ($this->_var['ads']['content_position'] == 1): ?> selected <?php endif; ?>>左下</option>
		<option value="2" <?php if ($this->_var['ads']['content_position'] == 2): ?> selected  <?php endif; ?>>右上</option>
		<option value="3" <?php if ($this->_var['ads']['content_position'] == 3): ?> selected <?php endif; ?>>右下</option>
		</select>
		 <?php endif; ?>
      </td>
    </tr>
	<!--   <tr>
	   <td  class="label">
       文字层背景颜色：</td>
      <td>
	<input type="text" name="content_backcolor" value="" size="35"/>
      </td>
    </tr>-->
	    <tr>
	   <td  class="label">是否显示小图：</td>
      <td>
 	  <?php if ($this->_var['action'] == "add"): ?>
	    <select name="sim_show" onchange="im_show(this)">
	    <option value="1" selected >显示</option>
		 <option value="0">不显示</option>
	   </select>
	  <?php else: ?>
	       <select name="sim_show" onchange="im_show(this)">
	    <option value="1" <?php if ($this->_var['ads']['sim_show'] == 1): ?> selected <?php endif; ?>>显示</option>
		 <option value="0" <?php if ($this->_var['ads']['sim_show'] == 0): ?> selected <?php endif; ?>>不显示</option>
	   </select>
	  <?php endif; ?>
      </td>
	  </tr>
	  <?php if ($this->_var['action'] == "add"): ?>
	   <tr style="visibility:visible" id="small_imposition" >
	  <?php else: ?>
	 <tr <?php if ($this->_var['ads']['sim_show'] == 0): ?> style="visibility:collapse" <?php else: ?> style="visibility:visible" <?php endif; ?> id="small_imposition" >
	 <?php endif; ?>
	  <td  class="label">
       小图片位置：</td>
      <td>
	  <?php if ($this->_var['action'] == "add"): ?>
        <select name="sim_position">
		<option value="0" selected>左上</option>
		<option value="1">左下</option>
		<option value="2">右上</option>
		<option value="3">右下</option>
		</select>
		 <?php else: ?>
		 <select name="sim_position">
		<option value="0" <?php if ($this->_var['ads']['sim_position'] == 0): ?> selected <?php endif; ?>>左上</option>
		<option value="1" <?php if ($this->_var['ads']['sim_position'] == 1): ?> selected <?php endif; ?>>左下</option>
		<option value="2" <?php if ($this->_var['ads']['sim_position'] == 2): ?> selected  <?php endif; ?>>右上</option>
		<option value="3" <?php if ($this->_var['ads']['sim_position'] == 3): ?> selected <?php endif; ?>>右下</option>
		</select>
		 <?php endif; ?>
      </td>
    </tr>
	 <?php if ($this->_var['action'] == "add"): ?>
	 <tr style="visibility:visible" id="small_im">
	 <?php else: ?>
	   <tr <?php if ($this->_var['ads']['sim_show'] == 0): ?> style="visibility:collapse" <?php else: ?> style="visibility:visible" <?php endif; ?> id="small_im">
	   <?php endif; ?>
      <td  class="label">小图片：</td>
      <td>
        <input type="file" name="small_file" size="35" />
		
		<?php if ($this->_var['ads']['small_im'] != ''): ?>
		   <img src="../<?php echo $this->_var['ads']['small_im_m']; ?>" /> <!--<input type="hidden" value="<?php echo $this->_var['ads']['images']; ?>" name="hideimg" />-->  <input type="button" value="删除图片" onclick="deletImg('s',<?php echo $this->_var['ads']['id']; ?>)" >
		<?php endif; ?>
		<br/>
		<span style="color:#FF0000">图片宽320*高320</span>
		
      </td>
    </tr>
    <tr>
      <td  class="label">背景图片：</td>
      <td>
        <input type="file" name="big_file" size="35" />
		
		<?php if ($this->_var['ads']['big_im'] != ''): ?>
		   <img src="../<?php echo $this->_var['ads']['big_im_m']; ?>" /> <!--<input type="hidden" value="<?php echo $this->_var['ads']['images']; ?>" name="hideimg" /> --> <input type="button" value="删除图片" onclick="deletImg('b',<?php echo $this->_var['ads']['id']; ?>)" >
		<?php endif; ?>
		<br/>
		<span style="color:#FF0000">图片宽640*高640</span>
      </td>
    </tr>
	
	

		

	
	
    <tr>
       <td class="label">&nbsp;</td>
       <td>
        <input type="submit" value="<?php echo $this->_var['lang']['button_submit']; ?>" class="button" />
        <input type="reset" value="<?php echo $this->_var['lang']['button_reset']; ?>" class="button" />
        <input type="hidden" name="act" value="<?php echo $this->_var['form_act']; ?>" />
        <input type="hidden" name="id" value="<?php echo $this->_var['ads']['id']; ?>" />
      </td>
    </tr>
 </table>

</form>
</div>

<?php echo $this->fetch('pagefooter.htm'); ?>
