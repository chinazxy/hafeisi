$(function(){

	$('.inp.marr').change(function(){
		var id = $(this).val();
		if (id == 0){
			$('#city').html('<option value="0">市</option>');
			$('.innp').html('<option value="0">县</option>');
		}
		$.ajax({
			url : '/getCity.php',
			type : 'post',
			dataType : 'json',
			data : {id : id},
			success : function(data,e){

				var html = '';
				var dis_html = '';
				$.each(data , function(index,item){

					if (index == 'city'){
						$.each(item , function(i,k){

							var region_id = data[index][i].region_id;
							var region_name = data[index][i].region_name;
							html += '<option value="'+region_id+'">'+region_name+'</option>';
						})
					}else{
						$.each(item , function(i,k){
							var dis_region_id = data[index][i].region_id;
							var dis_region_name = data[index][i].region_name;
							dis_html += '<option value="'+dis_region_id+'">'+dis_region_name+'</option>';
						})
					}



				});
				$('#city').html(html);
				$('.innp').html(dis_html);
			},
			error : function (){

			}
		})
	});

	$('#city').change(function(){
		var city_id = $(this).val();
		$.ajax({
			url : '/getDis.php',
			type : 'post',
			dataType : 'json',
			data : {id : city_id},
			success : function(data,e){
				var htm = '';
				$.each(data , function(index,item){
					var region_id_1 = data[index].region_id;
					var region_name_1 = data[index].region_name;
					htm += '<option value="'+region_id_1+'">'+region_name_1+'</option>';

				});
				$('.innp').html(htm);
			},
			error : function (){

			}
		})
	})

	$('.but').click(function() {
		var name = $('input[name="name"]').val();
		var mobile = $('input[name="mobile"]').val();
		var pro = $('.inp.marr').val();
		var city = $('#city').val();
		var dis = $('.innp').val();
		var remark = $('.tex').val();
		if (name == "") {
			alert('姓名不能为空');
			$('input[name="name"]').focus();
		} else if (mobile == "") {
			alert('电话号码不能为空');
			$('input[name="mobile"]').focus();
		} else if (!checkIsTel(mobile)) {
			alert("手机号码格式不正确！");
			$('input[name="mobile"]').focus();
		} else if (pro == 0) {
			alert('请选择省份');
			$('inp.marr').focus();
		} else if(city == 0){
			alert('请选择城市');
			$('#city').focus();
		} else if (dis == 0){
			alert('请选择区/县');
			$('innp').focus();
		} else{
			$.ajax({
				url : 'gwzs.php',
				dataType : 'json',
				type : 'post',
				data : {name : name, mobile : mobile, pro : pro, city : city, dis : dis, remark : remark},
				success : function(data,e){

					if (data.res == 1){
						alert(data.msg);
					}else{
						alert(data.msg);
					}
				},
				error : function(e){
					alert('系统出错，请重新提交申请！');
				}
			})
		}
	})

	function checkIsTel(s) {
		var patrn = /^1\d{10}$/;
		if (!patrn.exec(s)) return false
		return true
	}
});