<!-- $Id -->
<?php echo $this->fetch('pageheader.htm'); ?>
<div class="main-div">
    <form name="theForm" method="post" action="" enctype="multipart/form-data">
        <table cellspacing="1" cellpadding="3" width="100%">
            <tr>
                <td class="label"><?php echo $this->_var['lang']['05_fangwei']; ?>：</td>
                <td width="40%">
                    <input type="file" name="fangwei">
                </td>
                <td>
                    <input type="hidden" name="uploadFangwei" value="1">
                    <input class="button" type="submit" value="提交">
                </td>
            </tr>
            <tr>

            </tr>
        </table>
    </form>
</div>


<?php echo $this->fetch('pagefooter.htm'); ?>