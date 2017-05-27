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
function delet(id){

  if(confirm("您确定要删除该条数据吗?")){
   
	 location.href="goods_p.php?act=delet&id="+id;
  }
}

function deletImg(din,id){

  if(confirm("您确定要删除该图片吗?")){
    if(din=='p'||din=='s'){
	/*alert('不你好');*/
    location.href="goods_p.php?act=deleteimg&id="+id;
     }else{
	/* alert('你好');*/
	 location.href="goods_p.php?act=deleteimgz&id="+id+"&din="+din;
	 }
  }
 

}


</script>
<div class="main-div">
<form action="goods_p.php" method="post" name="theForm" enctype="multipart/form-data">
  <table width="100%" id="general-table" >

	
    <tr> <td colspan="2" class="tianjia">
	<?php if ($this->_var['action'] == "add"): ?>
       <table width="90%" id="gallery-table"  align="center">
	   <caption style="text-align:left;font-size:16px">产品角度图</caption>
          <tr>
            <td style="border-bottom:1px solid #bbdde5; padding:20px 0px;">
			
              <a href="javascript:;" onclick="addOrder(this)">[+]</a>
			   标题：<input type="text" name="zj_title[]" size="20"/><br/>		  
			   显示排序：<input type="text" name="zj_resort[]" size="20" style="width:80px"/><br/>			
               电脑背景图片：<input type="file" name="zj_file[]"/><span style="color:#FF0000">PC端宽720*高365</span><br/>
			   手机背景图片：<input type="file" name="zj_file[]" /><span style="color:#FF0000">手机端宽640*高800</span><br/>
			      </td>
             </tr>
        </table>
		<?php else: ?>
	       <table  width="90%" id="gallery-table"  align="center">
		      <caption style="text-align:left;font-size:16px">品牌内页</caption>
		     <tr>
            <td  style="border-bottom:1px solid #bbdde5; padding:20px 0px;">
              <a href="javascript:;" onclick="addOrder(this)">[+]</a>
			   标题：<input type="text" name="zj_ttitle[]" size="20"/><br/>
               产品颜色对应其它角度图选择:<select name="zj_ccolor[]">
			      <?php $_from = $this->_var['spe']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vs');if (count($_from)):
    foreach ($_from AS $this->_var['vs']):
?>
				
				     <?php if ($this->_var['vs']['name'] == "颜色"): ?>
					  
					   <?php $_from = $this->_var['vs']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cs');if (count($_from)):
    foreach ($_from AS $this->_var['cs']):
?>
					   
					    <option value="<?php echo $this->_var['cs']['id']; ?>"><?php echo $this->_var['cs']['label']; ?><img src="<?php echo $this->_var['cs']['attr_thumb']; ?>" width="50px" height="50px" /></option>
					   
					   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
					 
					 <?php endif; ?>
				  
				  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
			   </select>
			   显示排序：<input type="text" name="zj_tresort[]" size="20" style="width:80px"/><br/>
               电脑背景图片:<input type="file" name="zj_tfile[]"/><span style="color:#FF0000">PC端宽720*高365</span><br/>
			   手机背景图片:<input type="file" name="zj_tfile[]" /><span style="color:#FF0000">手机端宽640*高800</span><br/>
			      </td>
             </tr>
		  <?php $_from = $this->_var['child']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ch');if (count($_from)):
    foreach ($_from AS $this->_var['ch']):
?>  
          <tr>
            <td style="border-bottom:1px solid #bbdde5; padding:20px 0px;">
			   <a href="javascript:;" onclick="delet(<?php echo $this->_var['ch']['id']; ?>)">[-]</a>
			   标题：<input type="text" name="zj_title[]" size="20" value="<?php echo $this->_var['ch']['title']; ?>"/><br/>
               产品颜色对应其它角度图选择:<select name="zj_color[]">
			      <?php $_from = $this->_var['spe']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vs');if (count($_from)):
    foreach ($_from AS $this->_var['vs']):
?>
				
				     <?php if ($this->_var['vs']['name'] == "颜色"): ?>
					  
					   <?php $_from = $this->_var['vs']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cs');if (count($_from)):
    foreach ($_from AS $this->_var['cs']):
?>
					   
					    <option value="<?php echo $this->_var['cs']['id']; ?>" <?php if ($this->_var['cs']['id'] == $this->_var['ch']['color_id']): ?> selected <?php endif; ?> ><?php echo $this->_var['cs']['label']; ?><img src="<?php echo $this->_var['cs']['attr_thumb']; ?>" width="50px" height="50px" /></option>
					   
					   <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
					 
					 <?php endif; ?>
				  
				  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
			   </select>
			   显示排序：<input type="text" name="zj_resort[]" size="20" style="width:80px" value="<?php echo $this->_var['ch']['resort']; ?>"/><br/>
               <?php if ($this->_var['ch']['child_imp_m']): ?><img src="../<?php echo $this->_var['ch']['child_imp_m']; ?>"/><input type="button" value="删除图片" onclick="deletImg('p_z',<?php echo $this->_var['ch']['id']; ?>)"/><br/><?php endif; ?>
			   电脑背景图片:<input type="file" name="zj_file[]"/><span style="color:#FF0000">PC端宽720*高365</span><br/>
			  <?php if ($this->_var['ch']['child_ims_m']): ?><img src="../<?php echo $this->_var['ch']['child_ims_m']; ?>"/><input type="button" value="删除图片" onclick="deletImg('s_z',<?php echo $this->_var['ch']['id']; ?>)"/><br/><?php endif; ?>
			   手机背景图片:<input type="file" name="zj_file[]" /><span style="color:#FF0000">手机端宽640*高800</span><br/>
			      </td>
             </tr>		
			 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </table>

		<?php endif; ?>
	</td>
</tr>
	
	

		

	
	
    <tr>
       <td class="label">&nbsp;</td>
       <td>
        <input type="submit" value="<?php echo $this->_var['lang']['button_submit']; ?>" class="button" />
        <input type="reset" value="<?php echo $this->_var['lang']['button_reset']; ?>" class="button" />
        <input type="hidden" name="act" value="<?php echo $this->_var['form_act']; ?>" />
        <input type="hidden" name="id" value="<?php echo $this->_var['ids']; ?>" />
      </td>
    </tr>
 </table>

</form>
</div>

<?php echo $this->fetch('pagefooter.htm'); ?>
