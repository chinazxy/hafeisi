<!-- $Id: article_info.htm 16780 2009-11-09 09:28:30Z sxc_shop $ -->
<?php echo $this->fetch('pageheader.htm'); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'../js/utils.js,selectzone.js,validator.js')); ?>
  <script type="text/javascript" src="../js/calendar.php?lang=<?php echo $this->_var['cfg_lang']; ?>"></script>
<link href="../js/calendar/calendar.css" rel="stylesheet" type="text/css" />

<script>

function addImg(obj)

{

var src = obj.parentNode.parentNode;

var idx = rowindex(src);

var tbl = document.getElementById('gallery-table');

var row = tbl.insertRow(idx + 1);

var cell = row.insertCell(-1);

cell.innerHTML = src.cells[0].innerHTML.replace(/(.*)(addImg)(.*)(\[)(\+)/i, "$1removeImg$3$4-");

}

function removeImg(obj)

{

var row = rowindex(obj.parentNode.parentNode);

var tbl = document.getElementById('order_add');

tbl.deleteRow(row);

}


function addImg1(obj)

{

var src = obj.parentNode.parentNode;

var idx = rowindex(src);

var tbl = document.getElementById('gallery-table1');

var row = tbl.insertRow(idx + 1);

var cell = row.insertCell(-1);

cell.innerHTML = src.cells[0].innerHTML.replace(/(.*)(addImg1)(.*)(\[)(\+)/i, "$1removeImg1$3$4-");

}

/**

* 删除图片上传

*/


function removeImg1(obj)

{

var row = rowindex(obj.parentNode.parentNode);

var tbl = document.getElementById('gallery-table1');

tbl.deleteRow(row);

}

</script>
<!-- start goods form -->
<div class="tab-div">
  <div id="tabbar-div">
    <p>
      <span class="tab-front" id="general-tab"><?php echo $this->_var['lang']['tab_general']; ?></span>
	  <span class="tab-back" id="gallery-tab">图片相册</span>
	  <span class="tab-back" id="detail-tab"><?php echo $this->_var['lang']['tab_content']; ?></span>
    </p>
  </div>

  <div id="tabbody-div">
    <form  action="article.php" method="post" enctype="multipart/form-data" name="theForm">
    <table width="90%" id="general-table">
      <tr>
        <td class="narrow-label"><?php echo $this->_var['lang']['title']; ?></td>
        <td><input type="text" name="title" size ="60" maxlength="80" value="<?php echo htmlspecialchars($this->_var['article']['title']); ?>" /><?php echo $this->_var['lang']['require_field']; ?></td>
      </tr> 
	  
	       <tr>
        <td class="narrow-label">文章标题(英)</td>
        <td><input type="text" name="entitle" size ="60" maxlength="80" value="<?php echo htmlspecialchars($this->_var['article']['entitle']); ?>" /><?php echo $this->_var['lang']['require_field']; ?></td>
      </tr> 
     <tr style="display:none;">
        <td class="narrow-label">文章标签(多个之间以","号相隔)</td>
        <td><input type="text" name="keywords" maxlength="60" value="<?php echo htmlspecialchars($this->_var['article']['keywords']); ?>" /></td>
      </tr>	  
      <!-- <?php if ($this->_var['article']['cat_id'] >= 0): ?> -->
      <tr>
        <td class="narrow-label"><?php echo $this->_var['lang']['cat']; ?> </td>
        <td>
          <select name="article_cat" onchange="catChanged()">
            <option value="0"><?php echo $this->_var['lang']['select_plz']; ?></option>
            <?php echo $this->_var['cat_select']; ?>
          </select>
         <?php echo $this->_var['lang']['require_field']; ?></td>
      </tr>
      <!-- <?php else: ?> -->
      <input type="hidden" name="article_cat" value="-1" />
      <!-- <?php endif; ?> -->
      <?php if ($this->_var['article']['cat_id'] >= 0): ?>
    <!--  <tr>
        <td class="narrow-label">头部帮助栏显示</td>
        <td><input type="radio" name="article_type" value="0" <?php if ($this->_var['article']['article_type'] == 0): ?>checked<?php endif; ?>>不显示
      <input type="radio" name="article_type" value="1" <?php if ($this->_var['article']['article_type'] == 1): ?>checked<?php endif; ?>>显示
        <?php echo $this->_var['lang']['require_field']; ?>        </td>
      </tr>-->
      <tr>
        <td class="narrow-label"><?php echo $this->_var['lang']['is_open']; ?></td>
        <td>
        <input type="radio" name="is_open" value="1" <?php if ($this->_var['article']['is_open'] == 1): ?>checked<?php endif; ?>> <?php echo $this->_var['lang']['isopen']; ?>
      <input type="radio" name="is_open" value="0" <?php if ($this->_var['article']['is_open'] == 0): ?>checked<?php endif; ?>> <?php echo $this->_var['lang']['isclose']; ?><?php echo $this->_var['lang']['require_field']; ?>        </td>
      </tr>
      <?php else: ?>
      <tr style="display:none">
      <td colspan="2"><input type="hidden" name="article_type" value="0" /><input type="hidden" name="is_open" value="1" /></td>
      </tr>
      <?php endif; ?>
	  
	   <!--   <tr>
        <td class="narrow-label">首页显示</td>
        <td>
        <input type="radio" name="is_show" value="1" <?php if ($this->_var['article']['is_show'] == 1): ?>checked<?php endif; ?>> 显示
      <input type="radio" name="is_show" value="0" <?php if ($this->_var['article']['is_show'] == 0): ?>checked<?php endif; ?>> 不显示     (注:该选项只对在首页有模块的文章有效果)</td>
	
      </tr>-->
      <tr>
        <td class="narrow-label"><?php echo $this->_var['lang']['author']; ?></td>
        <td><input type="text" name="author" maxlength="60" value="<?php echo htmlspecialchars($this->_var['article']['author']); ?>" /></td>
      </tr>
      <tr>
        <td class="narrow-label">URL地址</td>
        <td><input type="text" name="author_email" maxlength="60" value="<?php echo htmlspecialchars($this->_var['article']['author_email']); ?>" /></td>
      </tr>
	  
	       <tr>
        <td class="narrow-label">发布时间</td>
        <td>  <input name="fp_time" type="text" id="fp_time" size="22" value='<?php echo $this->_var['article']['fp_time']; ?>' readonly="readonly" /><input name="selbtn1" type="button" id="selbtn1" onclick="return showCalendar('fp_time', '%Y-%m-%d', false, false, 'selbtn1');" value="<?php echo $this->_var['lang']['btn_select']; ?>" class="button"/></td>
      </tr>
	  
	        <tr>
        <td class="narrow-label">排序</td>
       <td><input type="text" name="resort" maxlength="60" value="<?php echo $this->_var['article']['resort']; ?>" /></td>
      </tr>
 
      <tr>
        <td class="narrow-label"><?php echo $this->_var['lang']['lable_description']; ?></td>
        <td><textarea name="description" id="description" cols="40" rows="5"><?php echo htmlspecialchars($this->_var['article']['description']); ?></textarea></td>
      </tr>
	<tr>
        <td class="narrow-label">网页描述(英)</td>
        <td><textarea name="endescription" id="endescription" cols="40" rows="5"><?php echo htmlspecialchars($this->_var['article']['endescription']); ?></textarea></td>
      </tr>
  
	 

<tr>
    </table>
<table width="90%" id="gallery-table" align="center" style="display:none">
 <tr><td>封面图片</td></tr>
 <tr><td><input type="file" name="file"><font color="red"><br/>（注:如果文章分类选择的是新闻的分类里的视频封面图片，则上传图片大小 :宽:580px 高:280px）<br/>
 （注:如果文章分类选择的是新闻的分类里的第一张封面图片，则上传图片大小 :宽:280px 高:280px）<br/>
  （注:如果文章分类选择的是新闻的分类里的其余封面图片，则上传图片大小 :宽:380px 高:244px）<br/>
 </font></td></tr>
  <?php if ($this->_var['article']['file_ulr_m']): ?>
    <tr>
        
      <td>
             
              <div id="gallery_plot_<?php echo $this->_var['article']['article_id']; ?>" style="float:left; text-align:center; border: 1px solid #DADADA; margin: 4px; padding:2px;">
                <a href="javascript:;" onclick="if (confirm('{您确定要删除图片吗?}')) dropPlotImg('<?php echo $this->_var['article']['article_id']; ?>')">[-]</a><br />
				<input type="hidden" value="<?php echo $this->_var['article']['file_url']; ?>" name="file_url" >
					<input type="hidden" value="<?php echo $this->_var['article']['file_ulr_m']; ?>" name="file_ulr_m" >
						<input type="hidden" value="<?php echo $this->_var['article']['file_url_t']; ?>" name="file_url_t" >
                <a href="article.php?act=show_image&img_url=<?php echo $this->_var['article']['file_url']; ?>" target="_blank">
                <img src="../<?php if ($this->_var['article']['file_ulr_m']): ?><?php echo $this->_var['article']['file_ulr_m']; ?><?php else: ?><?php echo $this->_var['article']['file_ulr_m']; ?><?php endif; ?>" <?php if ($this->_var['thumb_width'] != 0): ?>width="<?php echo $this->_var['thumb_width']; ?>"<?php endif; ?> <?php if ($this->_var['thumb_height'] != 0): ?>height="<?php echo $this->_var['thumb_height']; ?>"<?php endif; ?> border="0" />
                </a><br />
              </div>
            
            </td>
       
   </tr>
   <?php endif; ?>
   
    <tr><td>新闻内页图片</td></tr>
 <tr><td><input type="file" name="file_index_plot"><font color="red">（新闻内页图片）</font></td></tr>
  <?php if ($this->_var['article']['index_plot']): ?>
    <tr>
        
      <td>
             
                <div id="gallery_index_plot_<?php echo $this->_var['article']['article_id']; ?>" style="float:left; text-align:center; border: 1px solid #DADADA; margin: 4px; padding:2px;">
                <a href="javascript:;" onclick="if (confirm('{您确定要删除图片吗?}')) dropIndexPlotImg('<?php echo $this->_var['article']['article_id']; ?>')">[-]</a><br />
				<input type="hidden" value="<?php echo $this->_var['article']['index_plot']; ?>" name="hid_index_plot" >
			
                <a href="article.php?act=show_image&img_url=<?php echo $this->_var['article']['index_plot']; ?>" target="_blank">
                <img src="../<?php if ($this->_var['article']['index_plot']): ?><?php echo $this->_var['article']['index_plot']; ?><?php else: ?><?php echo $this->_var['article']['index_plot']; ?><?php endif; ?>" <?php if ($this->_var['thumb_width'] != 0): ?>width="<?php echo $this->_var['thumb_width']; ?>"<?php endif; ?> <?php if ($this->_var['thumb_height'] != 0): ?>height="<?php echo $this->_var['thumb_height']; ?>"<?php endif; ?> border="0" />
                </a><br />
              </div>
            
            </td>
       
   </tr>
   <?php endif; ?>
 
      <tr style="display:none;">
            <td>
              <?php $_from = $this->_var['img_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('i', 'img');if (count($_from)):
    foreach ($_from AS $this->_var['i'] => $this->_var['img']):
?>
              <div id="gallery_<?php echo $this->_var['img']['id']; ?>" style="float:left; text-align:center; border: 1px solid #DADADA; margin: 4px; padding:2px;">
                <a href="javascript:;" onclick="if (confirm('{您确定要删除图片吗?}')) dropImg('<?php echo $this->_var['img']['id']; ?>')">[-]</a><br />
                <a href="article.php?act=show_image&img_url=<?php echo $this->_var['img']['thump_o']; ?>" target="_blank">
                <img src="../<?php if ($this->_var['img']['thump_t']): ?><?php echo $this->_var['img']['thump_t']; ?><?php else: ?><?php echo $this->_var['img']['thump_m']; ?><?php endif; ?>" <?php if ($this->_var['thumb_width'] != 0): ?>width="<?php echo $this->_var['thumb_width']; ?>"<?php endif; ?> <?php if ($this->_var['thumb_height'] != 0): ?>height="<?php echo $this->_var['thumb_height']; ?>"<?php endif; ?> border="0" />
                </a><br />
                标题<input type="text" value="<?php echo htmlspecialchars($this->_var['img']['title']); ?>" size="10" name="old_img_desc[<?php echo $this->_var['img']['id']; ?>]" />
				 排序<input type="text" value="<?php echo $this->_var['img']['resort']; ?>" size="5" name="old_img_desc[<?php echo $this->_var['img']['id']; ?>]" />
              </div>
              <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            </td>
          </tr>
          <tr style="display:none;"><td>相册图片</td></tr>
<tr style="display:none;">

<td>

<a href="javascript:;" onclick="addImg(this)" >[+]</a>
标题 <input type="text" size="10" name="img_title[]" />
排序 <input type="text" size="5" name="img_sort[]" />
<input type="file" name="img_url[]" class="button" />
</td>

</tr>

</table>
	<tr>
    <table width="90%" id="detail-table" style="display:none">
      <td>描述（中）:<?php echo $this->_var['FCKeditor']; ?></td>
    </table>
	</tr>
    <table width="90%" id="detail-table" style="display:none">
     <tr><td>描述（英）<?php echo $this->_var['encontent']; ?></td></tr>
    </table>
    <table width="90%" id="goods-table" style="display:none">
      <!-- 商品搜索 -->
      <tr>
      <td colspan="5">
        <img src="images/icon_search.gif" width="26" height="22" border="0" alt="SEARCH" />
        <!-- 分类 -->
        <select name="cat_id"><option value="0"><?php echo $this->_var['lang']['all_category']; ?></caption><?php echo $this->_var['goods_cat_list']; ?></select>
        <!-- 品牌 -->
        <select name="brand_id"><option value="0"><?php echo $this->_var['lang']['all_brand']; ?></caption><?php echo $this->html_options(array('options'=>$this->_var['brand_list'])); ?></select>
        <!-- 关键字 -->
        <input type="text" name="keyword" size="30" />
        <input type="button" value="<?php echo $this->_var['lang']['button_search']; ?>" onclick="searchGoods()" class="button" />
      <td>
      </tr>
      <!-- 商品列表 -->
      <tr>
        <th><?php echo $this->_var['lang']['all_goods']; ?></th>
        <th><?php echo $this->_var['lang']['handler']; ?></th>
        <th><?php echo $this->_var['lang']['send_bouns_goods']; ?></th>
      </tr>
      <tr>
        <td width="45%" align="center">
          <select name="source_select" size="20" style="width:90%" ondblclick="sz.addItem(false, 'add_link_goods', articleId)" multiple="true">
          </select>
        </td>
        <td align="center">
          <p><input type="button" value="&gt;&gt;" onclick="sz.addItem(true, 'add_link_goods', articleId)" class="button" /></p>
          <p><input type="button" value="&gt;" onclick="sz.addItem(false, 'add_link_goods', articleId)" class="button" /></p>
          <p><input type="button" value="&lt;" onclick="sz.dropItem(false, 'drop_link_goods', articleId)" class="button" /></p>
          <p><input type="button" value="&lt;&lt;" onclick="sz.dropItem(true, 'drop_link_goods', articleId)" class="button" /></p>
        </td>
        <td width="45%" align="center">
          <select name="target_select" multiple="true" size="20" style="width:90%" ondblclick="sz.dropItem(false, 'drop_link_goods', articleId)">
            <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');if (count($_from)):
    foreach ($_from AS $this->_var['goods']):
?>
            <option value="<?php echo $this->_var['goods']['goods_id']; ?>"><?php echo $this->_var['goods']['goods_name']; ?></option>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
          </select>
        </td>
      </tr>
	  

	  
	  
    </table>
    <div class="button-div">
      <input type="hidden" name="act" value="<?php echo $this->_var['form_action']; ?>" />
      <input type="hidden" name="old_title" value="<?php echo $this->_var['article']['title']; ?>"/>
      <input type="hidden" name="id" value="<?php echo $this->_var['article']['article_id']; ?>" />
      <input type="submit" value="<?php echo $this->_var['lang']['button_submit']; ?>" class="button"  />
      <input type="reset" value="<?php echo $this->_var['lang']['button_reset']; ?>" class="button" />
    </div>
    </form>
  </div>

</div>
<!-- end goods form -->
<script language="JavaScript">

var articleId = <?php echo empty($this->_var['article']['article_id']) ? '0' : $this->_var['article']['article_id']; ?>;
var elements  = document.forms['theForm'].elements;
var sz        = new SelectZone(1, elements['source_select'], elements['target_select'], '');


onload = function()
{
  // 开始检查订单
  startCheckOrder();
}

function validate()
{
  var validator = new Validator('theForm');
  validator.required('title', no_title);

<?php if ($this->_var['article']['cat_id'] >= 0): ?>
  validator.isNullOption('article_cat',no_cat);
<?php endif; ?>


  return validator.passed();
}

document.getElementById("tabbar-div").onmouseover = function(e)
{
    var obj = Utils.srcElement(e);

    if (obj.className == "tab-back")
    {
        obj.className = "tab-hover";
    }
}

document.getElementById("tabbar-div").onmouseout = function(e)
{
    var obj = Utils.srcElement(e);

    if (obj.className == "tab-hover")
    {
        obj.className = "tab-back";
    }
}

document.getElementById("tabbar-div").onclick = function(e)
{
    var obj = Utils.srcElement(e);

    if (obj.className == "tab-front")
    {
        return;
    }
    else
    {
        objTable = obj.id.substring(0, obj.id.lastIndexOf("-")) + "-table";

        var tables = document.getElementsByTagName("table");
        var spans  = document.getElementsByTagName("span");

        for (i = 0; i < tables.length; i++)
        {
            if (tables[i].id == objTable)
            {
                tables[i].style.display = (Browser.isIE) ? "block" : "table";
            }
            else
            {
                tables[i].style.display = "none";
            }
        }
        for (i = 0; spans.length; i++)
        {
            if (spans[i].className == "tab-front")
            {
                spans[i].className = "tab-back";
                obj.className = "tab-front";
                break;
            }
        }
    }
}

function showNotice(objId)
{
    var obj = document.getElementById(objId);

    if (obj)
    {
        if (obj.style.display != "block")
        {
            obj.style.display = "block";
        }
        else
        {
            obj.style.display = "none";
        }
    }
}

function searchGoods()
{
    var elements  = document.forms['theForm'].elements;
    var filters   = new Object;

    filters.cat_id = elements['cat_id'].value;
    filters.brand_id = elements['brand_id'].value;
    filters.keyword = Utils.trim(elements['keyword'].value);

    sz.loadOptions('get_goods_list', filters);
}


/**
 * 选取上级分类时判断选定的分类是不是底层分类
 */
function catChanged()
{
  var obj = document.forms['theForm'].elements['article_cat'];

  cat_type = obj.options[obj.selectedIndex].getAttribute('cat_type');
  if (cat_type == undefined)
  {
    cat_type = 1;
  }

  if ((obj.selectedIndex > 0) && (cat_type == 2 || cat_type == 4))
  {
    alert(not_allow_add);
    obj.selectedIndex = 0;
    return false;
  }

  return true;
}


  /**
   * 删除图片
   */
  function dropImg(imgId)
  {
    Ajax.call('article.php?is_ajax=1&act=drop_image', "img_id="+imgId, dropImgResponse, "GET", "JSON");
  }

  function dropImgResponse(result)
  {
      if (result.error == 0)
      {
          document.getElementById('gallery_' + result.content).style.display = 'none';
      }
  }
  
    function dropPlotImg(imgId)
  {
    Ajax.call('article.php?is_ajax=1&act=drop_plot_image', "img_id="+imgId, dropPlotImgResponse, "GET", "JSON");
  }

  function dropPlotImgResponse(result)
  {
      if (result.error == 0)
      {
          document.getElementById('gallery_plot_' + result.content).style.display = 'none';
      }
  }
  
  
     function dropIndexPlotImg(imgId)
  {
    Ajax.call('article.php?is_ajax=1&act=drop_index_plot_image', "img_id="+imgId, dropIndexPlotImgResponse, "GET", "JSON");
  }

  function dropIndexPlotImgResponse(result)
  {
      if (result.error == 0)
      {
          document.getElementById('gallery_index_plot_' + result.content).style.display = 'none';
      }
  }

</script>
<?php echo $this->fetch('pagefooter.htm'); ?>