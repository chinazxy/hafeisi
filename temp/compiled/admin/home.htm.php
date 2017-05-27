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

function deletImg(id){

  if(confirm("您确定要删除该图片吗?")){

    location.href="home.php?act=deleteimg&id="+id;

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



</script>
<div class="main-div">
<form action="home.php" method="post" name="theForm" enctype="multipart/form-data">
  <table width="100%" id="general-table">
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
      <td  class="label">中文描述：</td>
      <td>
          <textarea name='descript' rows="5" cols="48" maxlength="5000"><?php echo $this->_var['ads']['descript']; ?></textarea><span style="color: #93a6b2">注：如需换行则回车即可</span>
      </td>
    </tr>

	    <tr>
      <td  class="label">英文描述：</td>
            <td>
                <textarea name='endescript' rows="5" cols="48" maxlength="5000"><?php echo $this->_var['ads']['endescript']; ?></textarea> <span style="color: #93a6b2">注：如需换行则回车即可</span>
            </td>

      </td>
    </tr>

	    <tr>
      <td  class="label">链接地址：</td>
      <td>
        <input type="text" name="url" value="<?php echo $this->_var['ads']['url']; ?>" size="35" />
      </td>
    </tr>
      <tr>
          <td  class="label">链接名称：</td>
          <td>
              <input type="text" name="linkname" value="<?php echo $this->_var['ads']['linkname']; ?>" size="35" />
          </td>
      </tr>

	    <tr>
      <td  class="label">排序：</td>
      <td>
        <input type="text" name="resort" value="<?php echo $this->_var['ads']['resort']; ?>" size="35" />
      </td>
    </tr>




    <tr>

      <td  class="label">轮播图片：</td>
      <td>
        <input type="file" name="file" size="35" />
		<?php if ($this->_var['ads']['images'] != ''): ?>
		   <img src="../<?php echo $this->_var['ads']['thump_o']; ?>" /><input type="hidden" value="<?php echo $this->_var['ads']['images']; ?>" name="org_img" /> <input type="hidden" value="<?php echo $this->_var['ads']['thump_o']; ?>" name="thump_img" /> <input type="button" value="删除图片" onclick="deletImg(<?php echo $this->_var['ads']['id']; ?>)" ><span style="color:#FF0000">宽1920*高1120</span>
		<?php endif; ?>

      </td>
    </tr>

	  <tr>

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
