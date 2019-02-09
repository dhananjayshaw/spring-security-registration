



$('.order_bx_close').unbind('click').on('click', function() {
	
	var account = $(this).attr('data-account');
	
	var boxId = "#order_box_" + account;
	
	$(boxId).hide();
	
	
});

function showBuyBox(formId) {

	$('#order_box_holder').show('slow');
    var bg_header_div = $('#'+formId).find('.box .box-header');
    bg_header_div.addClass('bg-blue').removeClass('bg-orange');
    $('#'+formId).find('.order_bx_buy').show();
    $('#'+formId).find('.order_bx_sell').hide();
    
    $('#'+formId).find('.order_box_type').val(1);

}

function showSellBox(formId) {

	$('#order_box_holder').show('slow');
    var bg_header_div =$('#'+formId).find('.box .box-header');
    bg_header_div.addClass('bg-orange').removeClass('bg-blue');

    $('#'+formId).find('.order_bx_sell').show();
    $('#'+formId).find('.order_bx_buy').hide();
    $('#'+formId).find('.order_box_type').val(0);

}

function updateOrderBox(ins_id, type, formId) {

    var exchange = $("#ins_exchange_" + ins_id).val();

    $('#'+formId).find('.order_tradingSymbol').val(ins_id);
    $('#'+formId).find('.order_exchange').val(exchange);

    if (exchange == "NFO") {
    	$('#'+formId).find('.order_dis_qty').hide();
    } else {
    	$('#'+formId).find('.order_dis_qty').show();
    }

    var str = $("#ins_json_" + ins_id).val();
    var jstr = str; // .replace(/\\"/g, '"');
    //console.log(jstr);
    var quoteObj = JSON.parse(jstr);

    //console.log(quoteObj.instrumentName);

    $('#'+formId).find('.order_title').html(
        type + " " + quoteObj.instrumentName + " x ");

    var qty = -1;
    if (quoteObj != undefined) {

    	$('#'+formId).find('.order_price').val(quoteObj.lastTradePrice);
    	$('#'+formId).find('.order_price_txt').html(quoteObj.lastTradePrice);
    	$('#'+formId).find('.order_price_exch_txt').html("<span class='live_price_"+ins_id+"'>"+quoteObj.lastTradePrice +"</span>"
            + " on " +
            $("#ins_exchange_" + ins_id).val());
    	
    	qty = quoteObj.loatQty; 	
    	
       
    }

    if (qty == 0 || isNaN(qty) || qty == -1)
        qty = 1;
    $('#'+formId).find('.order_qty_txt').html(Math.floor(qty));
    $('#'+formId).find('.order_qty').val(Math.floor(qty));
    $('#'+formId).find('.order_qty').attr("step",Math.floor(qty));
    $('#'+formId).find('.order_qty').attr("min",Math.floor(qty));

}


$('.order_qty').on('input', function(e) {

	var account = $(this).attr('data-account');
	$('#order_box_'+account).find(".order_qty_txt").html($(this).val());
	var qty = $(this).val();	
	if($(this).parents('.default_true').length){	
	//if default	
		$(".connected_accounts_input").each(function(e){
			 			
				 if(account != $(this).val()){
					 
					 $('#order_box_'+$(this).val()).find(".order_qty_txt").html(qty);
					 $('#order_box_'+$(this).val()).find(".order_qty").val(qty);
				 }
			
		});
	}
});

$('.order_price').on('input', function(e) {
	
	var account = $(this).attr('data-account');

	$('#order_box_'+account).find(".order_price_txt").html($(this).val());
	var price = $(this).val();	
	if($(this).parents('.default_true').length){	
	//if default	
		$(".connected_accounts_input").each(function(e){
			 			
				 if(account != $(this).val()){
					 
					 $('#order_box_'+$(this).val()).find(".order_price_txt").html(price);
					 $('#order_box_'+$(this).val()).find(".order_price").val(price);
				 }
			
		});
	}
});

$('.order_target_price').on('input', function(e) {
	
	var account = $(this).attr('data-account');

	//$('#order_box_'+account).find(".order_price_txt").html($(this).val());
	var price = $(this).val();	
	if($(this).parents('.default_true').length){	
	//if default	
		$(".connected_accounts_input").each(function(e){
			 			
				 if(account != $(this).val()){
					 
					// $('#order_box_'+$(this).val()).find(".order_price_txt").html(price);
					 $('#order_box_'+$(this).val()).find(".order_target_price").val(price);
				 }
			
		});
	}
});


$('.variety_radio').on('ifClicked', function() {

    // $(this).val(e.target.checked == true);
    var selectedRadio = $(this).val();
    var account = $(this).attr('data-account');

    //console.log("Selected Radio " + selectedRadio);
    if (selectedRadio == "bo") {

    	$('#order_box_'+account).find(".bo_row").show();
    } else {
    	$('#order_box_'+account).find(".bo_row").hide();
    }
    
        
	if($(this).parents('.default_true').length){	
	//if default	
		$(".connected_accounts_input").each(function(e){
			 			
				 if(account != $(this).val()){
					 	$('#order_box_'+$(this).val()).find(".variety_radio").each(function(ele){
					 		
					 		$(this).prop("checked",false);
					 		$(this).iCheck('update');
					 		
					 	});
						$('#order_box_'+$(this).val()).find(".variety_radio[value='"+selectedRadio+"']").prop("checked",true);
						$('#order_box_'+$(this).val()).find(".variety_radio[value='"+selectedRadio+"']").iCheck('update');
					 	//console.log("Selected Radio " + selectedRadio);
					    if (selectedRadio == "bo") {					    	
					    	
					    	$('#order_box_'+$(this).val()).find(".bo_row").show();
					    	
					    } else {
					    	$('#order_box_'+$(this).val()).find(".bo_row").hide();
					    	
					    }
					    
				 }
			
		});
	}
    
    
    

});

$('.validity_radio').on('ifClicked', function() {

    // $(this).val(e.target.checked == true);
    var selectedRadio = $(this).val();
    var account = $(this).attr('data-account');
   
        
	if($(this).parents('.default_true').length){	
	//if default	
		$(".connected_accounts_input").each(function(e){
			 			
				 if(account != $(this).val()){
					 	$('#order_box_'+$(this).val()).find(".validity_radio").each(function(ele){
					 		
					 		$(this).prop("checked",false);
					 		$(this).iCheck('update');
					 		
					 	});
						$('#order_box_'+$(this).val()).find(".validity_radio[value='"+selectedRadio+"']").prop("checked",true);
						$('#order_box_'+$(this).val()).find(".validity_radio[value='"+selectedRadio+"']").iCheck('update');					 	
					    
				 }
			
		});
	}
    
    
    

});



$('.product_radio').on('ifClicked', function() {

    // $(this).val(e.target.checked == true);
    var selectedRadio = $(this).val();
    var account = $(this).attr('data-account');
   
        
	if($(this).parents('.default_true').length){	
	//if default	
		$(".connected_accounts_input").each(function(e){
			 			
				 if(account != $(this).val()){
					 	$('#order_box_'+$(this).val()).find(".product_radio").each(function(ele){
					 		
					 		$(this).prop("checked",false);
					 		$(this).iCheck('update');
					 		
					 	});
						$('#order_box_'+$(this).val()).find(".product_radio[value='"+selectedRadio+"']").prop("checked",true);
						$('#order_box_'+$(this).val()).find(".product_radio[value='"+selectedRadio+"']").iCheck('update');					 	
					    
				 }
			
		});
	}
    
    
    

});



$('.reverse_order_type_switch > label input').unbind('click').on('click', function() {
	
	var account = $(this).attr('data-account');
		
	if( $(this).is(':checked')){
	
		$('#order_box_'+account).find('.order_box_type_reverse').val(0);
		console.log("reversed to 0");
	}else{
		
		$('#order_box_'+account).find('.order_box_type_reverse').val(1);
		console.log("reversed to 1");
	}
	
});

$('.order_type_switch > label input').unbind('click').on('click', function() {
	
	var account = $(this).attr('data-account');
	var orderType =$('#order_box_'+account).find('.order_box_type').val();
	
	if(orderType == 1){
		//buy
		showSellBox('order_box_'+account);
		
	}else{
		
		showBuyBox('order_box_'+account);
	}
	
});

$('.ordertype_radio').on('ifClicked', function() {

    // $(this).val(e.target.checked == true);
    var selectedRadio = $(this).val();
    var account = $(this).attr('data-account');
    console.log("Selected Radio " + selectedRadio + ' ' + account);

    var price = $('#order_box_'+account).find(".order_price");
    var trigger_price = $('#order_box_'+account).find(".order_trigger_price");
    var discloseQty = $('#order_box_'+account).find(".order_dis_qty");

    var ex = $('#order_box_'+account).find(".order_exchange").val();

    switch (selectedRadio) {

        case "MARKET":

            price.prop('disabled', true);
            trigger_price.prop('disabled', true);

            break;
        case "LIMIT":

            price.prop('disabled', false);
            trigger_price.prop('disabled', true);

            break;
        case "SL":
            price.prop('disabled', false);
            trigger_price.prop('disabled', false);

            break;
        case "SL-M":
            price.prop('disabled', true);
            trigger_price.prop('disabled', false);

            break;

    }

});


$(".orderAjaxForm").submit(function(e) {

    var url = $(this).attr("action"); // the script where you handle the form input.
	var formData =$(this).serializeObject();
    //console.log(formData);
    var variety = $(this).find("input[name='variety']").val();
    //console.log(JSON.stringify(formData));
    //isdemo_radio
    //var isDemoEnabled = $("input[name='isdemo_radio']").val();    
    
    
    var account = $(this).attr('data-account');
    var orderType =$('#order_box_'+account).find('.order_box_type').val();	
    var order_box_type_reverse =$('#order_box_'+account).find('.order_box_type_reverse').val();	
	if(orderType == 1){
		
		formData.transactionType = 'BUY';
	}else{		
		formData.transactionType = 'SELL';
	}
	
	formData.price = $('#order_box_'+account).find('.order_price').val();
    	
	  //$('#order_box').hide('slow');
      $('#order_box_'+account).hide();
      
    $.ajax({
           type: "POST",
           url: url +'/' + variety+ '/'+ order_box_type_reverse,
           dataType: "json",
           contentType: "application/json;charset=utf-8",
           data: JSON.stringify(formData), // serializes the form's elements.
           success: function(data)
           {
               //alert(data); // show response from the php script.
        	   //location.reload();
               
             
               toastr.options.closeButton = true;
            	// Display a success toast, with a title
               toastr.success('Your order have been placed !', 'Order Success');

           },
           error: function(){
        	  
        	   toastr.options.closeButton = true;
            	// Display a success toast, with a title
               toastr.error('Not able to place order', 'Order Failed');
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});



$(".default_sell_true").click(function(e){
	
	var defaultAccount= $(this).attr("data-account");
	
	 $(".connected_accounts_input").each(function(e){
		 
		 if(defaultAccount != $(this).val()){
		 
			 if($("#order_box_"+ $(this).val()+":visible").length == 1){
				 var orderBox = $("#order_box_"+ $(this).val());
			 	 
				 if(orderBox.find('.order_bx_buy:visible').length == 1){
					 
					 orderBox.find('.order_bx_buy').click();
				 }				 
				 if(orderBox.find('.order_bx_sell:visible').length == 1){
					 
					 orderBox.find('.order_bx_sell').click();
				 }			 
			 }
			 
		 }
		 
		 
	 });
	
	//e.preventDefault();
});


$(".default_buy_true").click(function(e){
	
	var defaultAccount= $(this).attr("data-account");
	
	 $(".connected_accounts_input").each(function(e){
		 
		 if(defaultAccount != $(this).val()){
		 
			 if($("#order_box_"+ $(this).val()+":visible").length == 1){
				 var orderBox = $("#order_box_"+ $(this).val());
			 	 
				 if(orderBox.find('.order_bx_buy:visible').length == 1){
					 
					 orderBox.find('.order_bx_buy').click();
				 }				 
				 if(orderBox.find('.order_bx_sell:visible').length == 1){
					 
					 orderBox.find('.order_bx_sell').click();
				 }			 
			 }
			 
		 }
		 
		 
	 });
});

function loadOrderBox(type,ele){
	
	var symbol = $(ele).attr('data-symbol');
	
	
	  $.post('/quote/' + symbol, function(data) {
		  
          console.log(symbol + " data for symbol " + JSON.stringify(data));
	
				if(type == 'buy'){		
					console.log('buying...' + symbol);
					
					  //var ins_id = $(this).attr("data-id");
			
				        $('.order_froms_per_account').each(function () {
				            
				        	$(this).show();
				        	updateOrderBoxByOption(data, "Buy",$(this).attr('id'));
				        	showBuyBox($(this).attr('id'));
				        	
				        });
				        
				        
				}else if(type == 'sell'){
					
					console.log('selling...' + symbol);
					
					 // var ins_id = $(this).attr("data-id");
				       
				        $('.order_froms_per_account').each(function () {
				        	$(this).show();
				        	updateOrderBoxByOption(data, "Sell",$(this).attr('id'));
				        	showSellBox($(this).attr('id'));
				        });
						
				}
	
	  });
	
}


function updateOrderBoxByOption(jstr, type, formId) {

	var quoteObj = jstr;
	 
    var exchange = quoteObj.exchange;

    $('#'+formId).find('.order_tradingSymbol').val(quoteObj.instrumentToken);
    $('#'+formId).find('.order_exchange').val(exchange);

    if (exchange == "NFO") {
    	$('#'+formId).find('.order_dis_qty').hide();
    } else {
    	$('#'+formId).find('.order_dis_qty').show();
    }
   
   

    //console.log(quoteObj.instrumentName);

    $('#'+formId).find('.order_title').html(
        type + " " + quoteObj.instrumentName + " x ");

    var qty = -1;
    if (quoteObj != undefined) {

    	$('#'+formId).find('.order_price').val(quoteObj.lastTradePrice);
    	$('#'+formId).find('.order_price_txt').html(quoteObj.lastTradePrice);
    	$('#'+formId).find('.order_price_exch_txt').html("<span class='live_price_"+quoteObj.instrumentToken+"'>"+quoteObj.lastTradePrice +"</span>"
            + " on " +
            $("#ins_exchange_" + quoteObj.instrumentToken).val());
    	
    	qty = quoteObj.loatQty; 	
    	
       
    }

    if (qty == 0 || isNaN(qty) || qty == -1)
        qty = 1;
    $('#'+formId).find('.order_qty_txt').html(Math.floor(qty));
    $('#'+formId).find('.order_qty').val(Math.floor(qty));
    $('#'+formId).find('.order_qty').attr("step",Math.floor(qty));
    $('#'+formId).find('.order_qty').attr("min",Math.floor(qty));

}