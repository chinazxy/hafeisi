<?php echo $this->smarty_insert_scripts(array('files'=>'transport.js,utils.js')); ?>



			<div class="g_nqbox1" id="ECS_ORDERTOTAL">
				<div class="g_ndiv">
					<span class="text_l f_xiaoji">合计 : </span>
					<span class="text_r f_jiage"><?php echo $this->_var['total']['market_price_formated']; ?></span>
				</div>
				<div class="g_ndiv">
					<span class="text_l f_xiaoji">运费 : </span>
					<span class="text_r f_jiage"><?php echo $this->_var['total']['shipping_fee_formated']; ?></span>
				</div>
				
				         <?php if ($this->_var['total']['tax'] > 0): ?>
				  <div class="g_ndiv">
				      <span class="text_l f_xiaoji"><?php echo $this->_var['lang']['tax']; ?></span>
				      <span class="text_r span2 monery f_jiage"><?php echo $this->_var['total']['tax_formated']; ?></span>
				   
				   </div>

      <?php endif; ?>
	  
	  	  <?php if ($this->_var['total']['pay_fee'] > 0): ?>
						  
						  	   <div class="g_ndiv">
				      <span class="text_l f_xiaoji"><?php echo $this->_var['lang']['pay_fee']; ?></span>
				      <span class="text_r span2 monery f_jiage">+<?php echo $this->_var['total']['pay_fee_formated']; ?></span>
				   
				   </div>
							
                      <?php endif; ?>
				<div class="g_ndiv">
					<span class="text_l red f_xiaoji">优惠劵抵扣:</span>
					
					<?php if ($this->_var['total']['bonus'] > 0): ?><span class="text_r red f_jiage">-<?php echo $this->_var['total']['bonus_formated']; ?></span>
					    <?php else: ?>
						<span class="text_r red f_jiage">-¥0.00</span>
					   <?php endif; ?>
					 
				</div>
	
			  <div class="g_ndiv jiesuan_box_right2">
					<span class="text_l jiesuan_box_right2_1 f_xiaoji">总计:</span>
					 <span class="text_r span2 f_jiage"><?php echo $this->_var['total']['amount_formated']; ?></span> 
				</div>
			</div>	 



 			