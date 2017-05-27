<?php 
define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
	  $searchval=$_POST['searchstr'];
	  $inputval=$_POST['inputval'];
	  $where='';
	
		 
	    $html='';
			 $html.='<div class="live-research no-select scrollbar1" id="scrollbar1"><div class="scrollbar"><div class="track"><div class="thumb"></div></div></div><div class="live-content no-select viewport" > <div class="live-item no-select fashion-store overview"> ';
	   
	  
	  
	  
      $rs=array();
	  $productstr='';
	  $g=0;
	  if(!empty($inputval)){
	    
       
		 $productID=array();
		 
         $query="select * from ".$GLOBALS['ecs']->table('salestone')." where title like '%".$inputval."%' or address like '%".
		  $row =$GLOBALS['db']->getAll($query);

		 $counts=count($row);

		    $rs['s']=$inputval;
		 if($counts>0){
		 
		    for($i=0;$i<$counts;$i++){
			
			$productID[$i]=$row[$i]['id'];
			
			}
		 
		 }
		 
		 
		  if(!empty($searchval)){
	  
	     $searcharr=explode(",",$searchval);
		 $searchstr=implode(",",$searcharr);

	     $where.="type in (".$searchstr.")";
			 
		 
		 }
		


		  if(!empty($where)){	
       $query  = "select * from ".$GLOBALS['ecs']->table('salestone')." where type in(".$searchstr.") order by resort asc";		  
		  $result =$GLOBALS['db']->getAll($query);
		  }else{
		  $result=array();
		  }
		  $slen=count($result); 
		  if($slen>0){
		  
		  $ids=0;
		   $search_id=array();
		  for($t=0;$t<$slen;$t++){
		  
		         if (in_array($result[$t]["id"], $productID)) {
                                $search_id[$ids] = $result[$t]["id"];
                                $ids++;
                            }
							
		  
		  }
		  
		  }else{
		  
		   $search_id=$productID;
		  }
		 $relen=count($search_id);
		 
		  foreach($search_id as $val){
		     $g++;
		 // 	$pinfo=$pmodel->where("id=".$val)->find();
		 $pinfo  ="select * from ".$GLOBALS['ecs']->table('salestone')." where id=".$val;		  
		  $results = $GLOBALS['db']->getRow($pinfo);
		  print_r($results);
			$html.='<div class="live-info"  onclick="item(this)" x="'.$results['xsize'].'" y="'.$results['ysize'].'"> 
        <div class="live-name">'.$results['title'].'</div>
        <div class="live-address">地址：<span class="address">'.$results['address'].'</span></div>  
		<div class="live-address">电话：<span class="phone">'.$results['phone'].'</span></div>  
		<div class="live-address">传真：<span class="fax">'.$results['fax'].'</span></div>  
		<div class="live-address">全国客服服务热线：<span class="hotline">'.$results['onlinephone'].'</span></div>  
        </div>';
		  }
		  
		}else{

	  
	  if(!empty($searchval)){
	  
	     $searcharr=explode(",",$searchval);
		 $searchstr=implode(",",$searcharr);

	    $where.="attr_id in (".$searchstr.")";
			 
		 
		 }
		


		  if(!empty($where)){		
		   $query  = "select * from  ".$GLOBALS['ecs']->table('salestone')." where type in(".$searchstr.") order by resort asc";		  
		  $result = $GLOBALS['db']->getAll($query);
		  }else{
		  $result=array();
		  }
		   $relen=count($result);
		  
		  
		  for($i=0;$i<$relen;$i++){
		       $g++;
            	 $pinfo  ="select * from ".$GLOBALS['ecs']->table('salestone')." where id=".$result[$i]['id'];		  
		  $results = $GLOBALS['db']->getRow($pinfo);   
		
			$html.='<div class="live-info" onclick="item(this)" x="'.$results['xsize'].'" y="'.$results['ysize'].'"> 
        <div class="live-name">'.$results['title'].'</div>
        <div class="live-address">地址：<span class="address">'.$results['address'].'</span></div>  
		<div class="live-address">电话：<span class="phone">'.$results['phone'].'</span></div>  
		<div class="live-address">传真：<span class="fax">'.$results['fax'].'</span></div>  
		<div class="live-address">全国客服服务热线：<span class="hotline">'.$results['onlinephone'].'</span></div>  
        </div>';
			
		  
		  }
		  
		  }
		  
          $html.='</div></div></div>';
		  
		  $rs['result']=$html;
	
		 $rs['count']=$relen;
		 
		 $rs['keyword']=trim($inputval);
		 
		 echo json_encode($rs);

?>