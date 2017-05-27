<!-- $Id: sale_list.htm 15848 2009-04-24 07:07:13Z liubo $ -->
<?php if ($this->_var['full_page']): ?>
<?php echo $this->fetch('pageheader.htm'); ?>
<script type="text/javascript" src="../js/calendar.php?lang=<?php echo $this->_var['cfg_lang']; ?>"></script>
<link href="../js/calendar/calendar.css" rel="stylesheet" type="text/css" />
<?php echo $this->smarty_insert_scripts(array('files'=>'../js/utils.js,listtable.js,../js/jquery-1.6.0.min.js')); ?>

<form method="POST" action="" name="listForm">
    <div class="list-div" id="listDiv">
        <?php endif; ?>
        <table width="100%" cellspacing="1" cellpadding="3">
            <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>电话</th>
                <th>省</th>
                <th>城市</th>
                <th>区/县</th>
                <th>备注</th>
                <th>提交时间</th>
                <th>操作备注</th>
                <th>操作</th>
            </tr>
            <?php $_from = $this->_var['ads_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'list');if (count($_from)):
    foreach ($_from AS $this->_var['list']):
?>
            <tr align="center">
                <td align="center"><?php echo $this->_var['list']['Id']; ?></td>
                <td align="center"><?php echo $this->_var['list']['name']; ?></td>
                <td align="center"><?php echo $this->_var['list']['mobile']; ?></td>
                <td align="center"><?php echo $this->_var['list']['cn_pro']; ?></td>
                <td align="center"><?php echo $this->_var['list']['cn_city']; ?></td>
                <td align="center"><?php echo $this->_var['list']['cn_dis']; ?></td>
                <td align="center"><?php echo $this->_var['list']['remark']; ?></td>
                <td><?php echo $this->_var['list']['addtime']; ?></td>
                <td align="center" id="<?php echo $this->_var['list']['Id']; ?>"><?php echo $this->_var['list']['deal']; ?></td>
                <td align="center" ><span>
<a onclick="deal(<?php echo $this->_var['list']['Id']; ?>)" title="<?php echo $this->_var['lang']['edit']; ?>"><img src="images/icon_edit.gif" border="0" height="16" width="16" /></a>
      <a href="javascript:void(0);" onclick="remove(<?php echo $this->_var['list']['Id']; ?>)" title="<?php echo $this->_var['lang']['remove']; ?>"><img src="images/icon_drop.gif" border="0" height="16" width="16" /></a></span>
                </td>
            </tr>
            <?php endforeach; else: ?>
            <tr><td class="no-records" colspan="10"><?php echo $this->_var['lang']['no_records']; ?></td></tr>
            <?php endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </table>
        <table id="page-table" cellspacing="0">
            <tr>
                <td>&nbsp;</td>
                <td align="right" nowrap="true">
                    <?php echo $this->fetch('page.htm'); ?>
                </td>
            </tr>
        </table>
        <?php if ($this->_var['full_page']): ?>
    </div>
</form>

<script type="Text/Javascript" language="JavaScript">
    listTable.recordCount = <?php echo $this->_var['record_count']; ?>;
    listTable.pageCount = <?php echo $this->_var['page_count']; ?>;
    <?php $_from = $this->_var['filter']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
    listTable.filter.<?php echo $this->_var['key']; ?> = '<?php echo $this->_var['item']; ?>';
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    

            onload = function()
    {
        // 开始检查订单
        startCheckOrder();
        getDownUrl();
    }

    function deal(id){
        //alert($('#'+id).html());
        var c = prompt('处理');
        $.ajax({
            url : 'gwzs.php',
            type : 'post',
            dataType : 'text',
            data : {id : id , act : 'deal' , deal : c},
            success : function (data,e){
                $('#'+id).html(data);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },

        })

    }
    function remove(id){
        if (confirm('确定删除此记录？')){
            $.ajax({
                url : 'gwzs.php',
                type : 'post',
                dataType : 'text',
                data : {id : id , act : 'remove'},
                success : function (data,e){
                    if (data == 1) {
                        $('#' + id).parent().remove();
                    }else{
                        alert('系统错误，删除失败')
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                },

            })
        }
    }

    function getList()
    {
        var frm =  document.forms['TimeInterval'];
        listTable.filter['start_date'] = frm.elements['start_date'].value;
        listTable.filter['end_date'] = frm.elements['end_date'].value;
        listTable.filter['page'] = 1;
        listTable.loadList();
        getDownUrl();
    }

    function getDownUrl()
    {
        var aTags = document.getElementsByTagName('A');
        for (var i = 0; i < aTags.length; i++)
        {
            if (aTags[i].href.indexOf('download') >= 0)
            {
                if (listTable.filter['start_date'] == "")
                {
                    var frm =  document.forms['TimeInterval'];
                    listTable.filter['start_date'] = frm.elements['start_date'].value;
                    listTable.filter['end_date'] = frm.elements['end_date'].value;
                }
                aTags[i].href = "technology.php?act=download&start_date=" + listTable.filter['start_date'] + "&end_date=" + listTable.filter['end_date'];
            }
        }
    }
    //-->
</script>

<?php echo $this->fetch('pagefooter.htm'); ?>
<?php endif; ?>