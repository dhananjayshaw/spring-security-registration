var stompClient = null;

function connectWS() {
    var socket = new SockJS('/zerodhastock-websocket');
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, function(frame) {
        // setConnected(true);
//        console.log('Connected: ' + frame);
        
        $('.connected_accounts_input').each(function(i, obj) {
        	     	
        	stompClient.subscribe('/orderstatus/update/'+$(this).val(), function(data) {

                //console.log("Order Updates ::" + data.body);
                var datBody = JSON.parse(data.body);
                
                toastr.options.closeButton = true;
                // Display a success toast, with a title

                toastr.info('Your order ' + datBody.orderId + ' Status : ' +
                    datBody.status, 'Order Update');
                
                var tableRw = "<tr>" +
								"<td class='notify_items' >"+datBody.accountId+"</td>" + 
								"<td>"+datBody.orderTimestamp+"</td>" +
								"<td>"+datBody.orderType+"</td>" +
								"<td>"+datBody.tradingSymbol+"</td>" +
								"<td>"+datBody.quantity+"</td>" +
								"<td>"+datBody.averagePrice+"</td>" +								
								"<td>"+datBody.status+"</td>" +
							"</tr>";
                
                $("#order_notification_row").prepend(tableRw);
                $(".order_notification_count").html($('.notify_items').length);
      		    $(".order_notification_header").html("You have " + $('.notify_items').length + " notifications");

            });           
        	
        	
        });
        
        
       
        subscribeToTick();
        
        //stompClient.subscribe('/tick/live', updateTick);

    });

}

function subscribeToTick() {

	 $('.subscribeInstrument').each(function(i, obj) {
     	
     	stompClient.subscribe('/tick/live/'+ $(obj).val(), updateTick);
         //test
     });

}


function disconnectWS() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    // setConnected(false);
    console.log("Disconnected");
}

connectWS();

function getOrerNotifications(){
	
	
	 $.post('/orders/notifications', function(data) {
		  //console.log(data);
		  
		  // .order_notification_count , .order_notification_header , .order_notification
		  
		  
		  $('.order_notification').html(data);		  
		  $(".order_notification_count").html($('.notify_items').length);
		  $(".order_notification_header").html("You have " + $('.notify_items').length + " notifications");
		   
		   
		  /*  <li><!-- start notification -->
                      <a href="#">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
		    
		   */
		 
		  
		  
		  
	 });
	 
	
}

getOrerNotifications();
//setInterval(getOrerNotifications, 120*1000);

function clearNotificationCount(){
	
	$(".order_notification_count").html("");
	
}


