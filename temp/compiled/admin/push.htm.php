<!-- $Id: user_info.htm 16854 2009-12-07 06:20:09Z sxc_shop $ -->
<?php echo $this->fetch('pageheader.htm'); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'../js/utils.js,listtable.js')); ?>
  <?php echo $this->smarty_insert_scripts(array('files'=>'../js/utils.js,../js/region.js,../js/shopping_flow.js')); ?>
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
cell.innerHTML = src.cells[0].innerHTML.replace(/(.*)(addOrder)(.*)(\[)(\添加)/i, "$1removeImg$3$4移除");


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

function deletImg(id){

  if(confirm("您确定要删除该图片吗?")){
  
    location.href="push.php?act=deleteimg&id="+id;
  
  }
 

}




function vi_show(obj){
    if(obj.value==0){
	  dc('vi_url1').style.visibility='collapse';
	  dc('vi_url2').style.visibility='collapse';
	  dc('vi_url3').style.visibility='collapse';

	}else{

	    dc('vi_url3').style.visibility='visible';
		dc('vi_url1').style.visibility='visible';
		dc('vi_url2').style.visibility='visible';

	}
}
function dc(id){
    return document.getElementById(id);
}



function deletItem(id){

  if(confirm("您确定要删除该图片吗?")){
     Ajax.call('push.php', 'id=' + id+'&act=deleteitem', removeItem, 'POST', 'JSON');
    //location.href="home.php?act=deleteimg&id="+id;
  
  }
 

}

function removeItem(result){

    if(result.err==0){
	
	  alert("删除失败!");
	
	}else{
	
	 if(result.id>0){
	
	 	 var obj=document.getElementById("item_"+result.id);
	
	   var row = rowindex(obj);

var tbl = document.getElementById('gallery-table');

tbl.deleteRow(row);
	 }

	}


}
</script>
<div class="main-div">
<form action="push.php" method="post" name="theForm" enctype="multipart/form-data">
  <table width="100%">
    <tr>
      <td  class="label">
       中文标题：</td>
      <td>
        <input type="text" name="title" value="<?php echo $this->_var['ads']['title']; ?>" size="35" />
 
      </td>
    </tr>

	
	    <tr>
      <td  class="label">
       英文标题：</td>
      <td>
        <input type="text" name="entitle" value="<?php echo $this->_var['ads']['entitle']; ?>" size="35" />
 
      </td>
    </tr>
   <tr>
      <td  class="label">导航分类：</td>
	  <td>
	  <table  id="gallery-table">
  
    <tr>
      <td><a href="javascript:;" style="color:blue;" onclick="addOrder(this)">[添加]</a><br/>导航：(中)：<input type="text" name="cat_name[]" value="<?php echo $this->_var['ads']['cat_name']; ?>" size="20" /> 导航：(英)：<input type="text" name="cat_enname[]" value="<?php echo $this->_var['ads']['cat_enname']; ?>" size="20" />跳转链接：<input type="text" name="link[]" value="<?php echo $this->_var['ads']['link']; ?>" size="20" />显示顺序：<input type="text" name="resort[]" value="<?php echo $this->_var['ads']['link']; ?>" size="5" /></td>
    </tr>

  <?php $_from = $this->_var['navlist']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vo');if (count($_from)):
    foreach ($_from AS $this->_var['vo']):
?>	 
  <tr id="item_<?php echo $this->_var['vo']['id']; ?>">
      <td> <a href="javascript:;" onclick="deletItem(<?php echo $this->_var['vo']['id']; ?>,this)" style="color:red">删除</a><input type="hidden" value="<?php echo $this->_var['vo']['id']; ?>" name="e_ids[]"/><br/>导航：(中)：<input type="text" name="e_cat_name[]" value="<?php echo $this->_var['vo']['cat_name']; ?>" size="20" /> 导航：(英)：<input type="text" name="e_cat_enname[]" value="<?php echo $this->_var['vo']['cat_enname']; ?>" size="20" />跳转链接：<input type="text" name="e_link[]" value="<?php echo $this->_var['vo']['link']; ?>" size="20" />显示顺序：<input type="text" name="e_resort[]" value="<?php echo $this->_var['vo']['resort']; ?>" size="5" /></td>
    </tr>
 <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

     </table>
	     </td>
    </tr>

    <tr style="display:none">
      <td  class="label">中文描述：</td>
      <td>
        <input type="text" name="descript" value="<?php echo $this->_var['ads']['descript']; ?>" size="35" />
      </td>
    </tr>
	
	    <tr style="display:none">
      <td  class="label" >英文描述：</td>
      <td>
        <input type="text" name="endescript" value="<?php echo $this->_var['ads']['endescript']; ?>" size="35" />
      </td>
    </tr>
	
	    <tr style="display:none">
      <td  class="label">链接地址：</td>
      <td>
        <input type="text" name="url" value="<?php echo $this->_var['ads']['url']; ?>" size="35" />
      </td>
    </tr>
	
		
	    <tr>
      <td  class="label">排序：</td>
      <td>
        <input type="text" name="resort" value="<?php echo $this->_var['ads']['resort']; ?>" size="35" />
      </td>
    </tr>
	  	  <tr>
	  <td  class="label">是否显示：</td>
      <td>
 	  <?php if ($this->_var['action'] == "add"): ?>
	         <select name="isshow">
	    <option value="1" selected >显示</option>
		 <option value="0">不显示</option>
	   </select>
	  <?php else: ?>
	         <select name="isshow">
	    <option value="1" <?php if ($this->_var['ads']['isshow'] == 1): ?> selected <?php endif; ?>>显示</option>
		 <option value="0" <?php if ($this->_var['ads']['isshow'] == 0): ?> selected <?php endif; ?>>不显示</option>
	   </select>
	  <?php endif; ?>
      </td>
	  </tr> 

	
	
    <tr>
	 
      <td  class="label">背景图片：</td>
      <td>
        <input type="file" name="file" size="35" /><span style="color:#FF0000">宽590*高240</span>
		<?php if ($this->_var['ads']['images'] != ''): ?>
		   <img src="../<?php echo $this->_var['ads']['thump_o']; ?>" /><input type="hidden" value="<?php echo $this->_var['ads']['images']; ?>" name="org_img" /> <input type="hidden" value="<?php echo $this->_var['ads']['thump_o']; ?>" name="thump_img" /> <input type="button" value="删除图片" onclick="deletImg(<?php echo $this->_var['ads']['id']; ?>)" > 
		<?php endif; ?>
		
      </td>
    </tr>

	  <tr style="display:none">
	 
      <td  class="label">手机图：</td>
      <td>
        <input type="file" name="img2" size="35" />
		<?php if ($this->_var['ads']['thump_s'] != ''): ?>
		   <img src="../<?php echo $this->_var['ads']['thump_s']; ?>" /> <input type="hidden" value="<?php echo $this->_var['ads']['thump_s']; ?>" name="img2" /> <input type="hidden" value="<?php echo $this->_var['ads']['thump_s']; ?>" name="img2" /> <input type="button" value="删除图片" onclick="deletImg2(<?php echo $this->_var['ads']['id']; ?>)" > 
		<?php endif; ?>
      </td>
    </tr>
	
	  <tr style="display:none">
	 
      <td  class="label">手机小图：</td>
      <td>
        <input type="file" name="img3" size="35" />
		<?php if ($this->_var['ads']['thump_sx'] != ''): ?>
		   <img src="../<?php echo $this->_var['ads']['thump_sx']; ?>" /> <input type="hidden" value="<?php echo $this->_var['ads']['thump_sx']; ?>" name="img3" /> <input type="hidden" value="<?php echo $this->_var['ads']['thump_sx']; ?>" name="img3" />  <input type="button" value="删除图片" onclick="deletImg3(<?php echo $this->_var['ads']['id']; ?>)" > 
		<?php endif; ?>
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
