function updateTick(data) {
	// console.log(data.body);

	if (typeof updateHoldingTick !== "undefined") {
		// safe to use the function
		updateHoldingTick(data);
	}

	if (typeof updatePositionTick !== "undefined") {
		// safe to use the function
		updatePositionTick(data);
	}

	var template = "";
	// $("#insturment_quotes").html("");
	if (data != undefined) {
		var datBody = JSON.parse(data.body);
		// for (var i = 0; i < datBody.length; i++) {
		var tobj = datBody; // [i];

		$('.live_price_' + tobj.instrumentToken).html(tobj.lastTradePrice);
		$('.live_change_' + tobj.instrumentToken).html(tobj.formatedChange);

		if (tobj != undefined) {
			template = getTemplate(tobj);
			var isOpen = $("#ins_depth_" + tobj.instrumentToken).attr(
					"data-show");

			$("#instrument_live_" + tobj.instrumentToken).replaceWith(template);

			if (isOpen == "1") {
				$("#ins_depth_" + tobj.instrumentToken).show();
				$("#ins_depth_" + tobj.instrumentToken).attr("data-show", 1);
			} else {

				$("#ins_depth_" + tobj.instrumentToken).hide();
				$("#ins_depth_" + tobj.instrumentToken).attr("data-show", 0);
			}

			$("#ins_json_" + tobj.instrumentToken).val(tobj.jsonString);
			// }
			bindInsControls();
		}
	}
}

function bindInsControls() {

	$('.ins_buy_btn').unbind('click').on('click', function(e) {

		var ins_id = $(this).attr("data-id");

		$('.order_froms_per_account').each(function() {

			$(this).show();
			updateOrderBox(ins_id, "Buy", $(this).attr('id'));
			showBuyBox($(this).attr('id'));

		});

	});

	$('.ins_sell_btn').unbind('click').on('click', function(e) {

		var ins_id = $(this).attr("data-id");

		$('.order_froms_per_account').each(function() {
			$(this).show();
			updateOrderBox(ins_id, "Sell", $(this).attr('id'));
			showSellBox($(this).attr('id'));
		});
	});

	$('.ins_depth_btn').unbind('click').on('click', function(e) {
		var ins_id = $(this).attr("data-id");
		var depth_id = '#ins_depth_' + ins_id;

		$(depth_id).toggle(300);

		if ($(depth_id).is(":hidden")) {

			$(depth_id).attr("data-show", 0);

		} else {
			$(depth_id).attr("data-show", 1);
		}

	});

	$('.ins_del_btn')
			.unbind('click')
			.on(
					'click',
					function(e) {
						var ins_id = $(this).attr("data-id");

						$('#instrument_live' + ins_id).remove();

						$
								.post(
										'/instruments/remove/' + ins_id,
										function(data) {
											console.log(ins_id
													+ " remove from list "
													+ JSON.stringify(data));

											var template = "";
											$("#insturment_quotes_box")
													.html("");
											for (var i = 0; i < data.length; i++) {
												var tobj = data[i];
												var lastTradePrice = tobj.quote != null ? tobj.quote.lastTradePrice
														: '';
												template = getTemplate(tobj,
														lastTradePrice);
												$("#insturment_quotes_box")
														.append($(template));

											}

											for (var i = 0; i < data.length; i++) {
												var tobj = data[i];
												$(
														"#ins_json_"
																+ tobj.instrumentToken)
														.val(tobj.jsonString);
											}

											bindInsControls();

										});

					});

}

bindInsControls();

$('.instrument_live_box').slimScroll({
	height : '560px'
});

function getTemplate(tobj) {

	if(tobj.instrumentToken == 265) return;
	if(tobj.instrumentToken == 256265) return;
	
	var temp = "<li class=\"row ins_padding\"  id=\"instrument_live_"
			+ tobj.instrumentToken + "\">" + "<input type=\"hidden\" value=\""
			+ tobj.instrumentToken + "\" id=\"ins_tradingSymbol_"
			+ tobj.instrumentToken + "\" >" + "<input type=\"hidden\" value=\""
			+ tobj.exchangeName + "\" id=\"ins_exchange_"
			+ tobj.instrumentToken + "\" >"
			+ "<input type=\"hidden\" id=\"ins_json_" + tobj.instrumentToken
			+ "\" >"

			+
			/*
			 * "<a href=\"#\" class=\"instrument_quotes\" >" + "<span class=\"
			 * text-" + tobj.txtClass + "\" >" + tobj.instrumentName + " " +
			 * tobj.exchangeName + "</span>" + " <span class=\" pull-right
			 * text-" + tobj.txtClass + "\" >" + "<span class=\" text-muted\" >" +
			 * tobj.formatedChange + "</span>" + " <i class=\"pad fa fa-angle-" +
			 * tobj.trendClass + "\" ></i>" + tobj.lastTradePrice + "</span>" + "</a>"
			 */
			getInsQuotes(tobj) + getInsControls(tobj) +

			"<div class=\"instrument_quotes_depth\" id=\"ins_depth_"
			+ tobj.instrumentToken + "\" style=\"display: none;\" >"
			+ "<div class=\"col-md-6 no-padding border-right\">"
			+ getBuyTable(tobj) + "</div>"
			+ "<div class=\"col-md-6 no-padding\">" + getSellTable(tobj)
			+ "</div>" + "<div class=\"col-md-12 no-padding\">" + getOHLC(tobj)
			+ "</div>" + "</div>"

			+ "</li>";

	return temp;

}

function getInsQuotes(tobj) {

	return "<div class=\"instrument_quotes\">"
			+ "<div class=\"no-padding col-sm-8 text-"
			+ tobj.txtClass
			+ "\">"
			+ tobj.instrumentName
			+ " "
			+ tobj.exchangeName
			+ " </div>"
			+ "<div class=\"text-right no-padding col-sm-4 text-"
			+ tobj.txtClass
			+ "\">"
			+ "<div class=\"col-sm-4 text-muted text-right no-padding\">"
			+ tobj.formatedChange
			+ "</div>"
			+ "<div class=\"col-sm-1\">"
			+ "<i class=\"fa fa-angle-"
			+ tobj.trendClass
			+ "\"></i>"
			+ "</div>"
			+ "<div class=\"no-padding col-sm-5 text-right \">"
			+ tobj.lastTradePrice + "</div>" + "</div>" + "</div>";

}

function getInsControls(tobj) {

	return "<div class=\"insturment-controls\">"
			+ "<a class=\"btn margin-r-5 btn-dropbox text-bold ins_buy_btn\" data-id=\""
			+ tobj.instrumentToken
			+ "\">B</a>"
			+ "<a class=\"btn margin-r-5 btn-danger text-bold ins_sell_btn\" data-id=\""
			+ tobj.instrumentToken
			+ "\">S</a>"
			+ "<a class=\"btn margin-r-5 btn-default ins_depth_btn\" data-id=\""
			+ tobj.instrumentToken + "\"><i class=\"fa fa-bars\"></i></a>"
			+ "<a class=\"btn margin-r-5 btn-default\" onClick=\"loadHistory('"
			+ tobj.instrumentToken + "',this);"
			+ "\" target=\"_blank\" ><i class=\"fa fa-line-chart\"></i></a>"
			+ "<a class=\"btn margin-r-5 btn-default ins_del_btn\" data-id=\""
			+ tobj.instrumentToken + "\"><i class=\"fa fa-trash\"></i></a>"
			+ "</div>";

}

function getBuyTable(tobj) {

	return "<table class=\"table no-margin  text-sm text-primary\">"
			+ "<thead>" + "<tr>" + "<th>BID</th>" + "<th>ORDERS</th>"
			+ "<th>QTY.</th>" + "</tr>" + "</thead>" + "<tbody>"
			+ getTableRows(tobj.marketDepth != null ? tobj.marketDepth.buy : 0) + "</tbody>" + "<tfoot>"
			+ "<tr>" + "	<td colspan=\"1\">Total</td>"
			+ "	<td colspan=\"2\" class=\"text-right\">"
			+ tobj.totalBuyQuantity + "</td>" + "</tr>" + "</tfoot>"
			+ "</table>";

}

function getSellTable(tobj) {

	return "<table class=\"table no-margin  text-sm text-fuchsia\">"
			+ "<thead>" + "<tr>" + "<th>OFFER</th>" + "<th>ORDERS</th>"
			+ "<th>QTY.</th>" + "</tr>" + "</thead>" + "<tbody>"
			+ getTableRows(tobj.marketDepth != null ? tobj.marketDepth.sell :0 ) + "</tbody>" + "<tfoot>"
			+ "<tr>" + "	<td colspan=\"1\">Total</td>"
			+ "	<td colspan=\"2\" class=\"text-right\">"
			+ tobj.totalSellQuantity + "</td>" + "</tr>" + "</tfoot>"
			+ "</table>";

}

function getTableRows(tobj) {

	var temp = "";
	if (tobj != undefined) {
		for (var i = 0; i < tobj.length; i++) {
			var t = tobj[i];
			temp += "<tr>" + "	<td>" + t.price + "</td>" + "	<td>" + t.orders
					+ "</td>" + "	<td>" + t.quantity + "</td>" + "</tr>";
		}
	}

	return temp;
}

function getOHLC(tobj) {

	return "<table class=\"table no-margin text-sm\">" + "<tbody>" + "<tr>"
			+ "<td>Open</td>"
			+ "<td colspan=\"2\" class=\"text-right border-right\">"
			+ tobj.formatedOpenPrice
			+ "</td>"
			+ "<td>High</td>"
			+ "<td colspan=\"2\" class=\"text-right\">"
			+ tobj.formatedHighPrice
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td>Low</td>"
			+ "<td colspan=\"2\" class=\"text-right border-right\">"
			+ tobj.formatedLowPrice
			+ "</td>"
			+ "<td>Close</td>"
			+ "<td colspan=\"2\" class=\"text-right\">"
			+ tobj.formatedClosePrice
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td>Volume</td>"
			+ "<td colspan=\"2\" class=\"text-right border-right\">"
			+ tobj.volumeTradedToday
			+ "</td>"
			+ "<td>Avg. Price</td>"
			+ "<td colspan=\"2\" class=\"text-right\">"
			+ tobj.averagePrice
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td>LTQ</td>"
			+ "<td class=\"text-right border-right\" colspan=\"2\">"
			+ tobj.lastTradedQuantity
			+ "</td>"
			+ "<td>Expiry</td>"
			+ "<td class=\"text-right\" colspan=\"2\">"
			+ tobj.expiry
			+ "</td>"
			+ "</tr>" + "</tbody>" + "</table>";

}

function loadView(viewName, ele) {

	if (viewName != "/balance") {
		window.history
				.pushState(viewName, viewName.replace("//", ""), viewName);
	}

	var selectedAccount = $('#accountSelect').val();
	var accountsView = [];
	var minHeight = $('.loading_div').parent().height();

	if (minHeight <= 250)
		minHeight = 250;

	$('.loading_div').height(minHeight).show();

	console.log("Loading View " + viewName + "/" + selectedAccount);
	$.post(viewName + "/" + selectedAccount)
			.done(function(data) {

				$("#main_view_" + selectedAccount).html(data);
				$('.loading_div').height(0);
				$('.loading_div').hide();
			})
			.fail(
					function(xhr, status, error) {

						$("#main_view_" + selectedAccount)
								.html("<p class='text-danger'>Server Error : Either Market Closed or Account not authorized </p> ");
						$('.loading_div').height(0);
						$('.loading_div').hide();
			});

	$(".navbar-nav").find("li.active").removeClass("active");

	if (ele != null || ele != undefined) {
		$(ele).parent().addClass("active");
	}
	// $(ele).preventDeafult();
}

function loadHistory(instrument, ele) {

	var oneOfDivs = "";
	$(".connected_accounts_input").each(function(e) {

		$("#main_view_" + $(this).val()).html("");
		oneOfDivs = $("#main_view_" + $(this).val());
		// accountsView.push($(this).val());

	});

	$.post('/historical/' + instrument, function(data) {
		oneOfDivs.html(data);
	});

	$(".navbar-nav").find("li.active").removeClass("active");
	$(ele).parent().addClass("active");

}

function loadPositionView(viewName, ele) {

	var isSelectedN = $(".btn-ordertype-toggle").hasClass('active');

	loadView(viewName + "/" + isSelectedN, ele);
	$("#position_menu").addClass("active");
	window.history
			.pushState("/positions", viewName.replace("//", ""), viewName);
}

$(document).ready(function(e) {

	var pathArray = window.location.pathname.split('/');

	var viewPath = pathArray[0].replace("#", "");

	/*
	 * $('#accountSelect').select2({
	 * 
	 * allowClear: false, selectOnBlur:false, createSearchChoice: false,
	 * dropdownAutoWidth : true, width: '100%' }).show();
	 */

	console.log("Init Loading View " + viewPath);

	if (viewPath == "")
		viewPath = "/balance"
	loadView(viewPath);

	var is_demo_radio_val = $("#isdemo_radio").val();

	if (is_demo_radio_val == 0) {

		$(".demo_lbl").removeClass("active");
		$(".live_lbl").addClass("active");
		$("#status").show();

	} else {

		$(".demo_lbl").addClass("active");
		$(".live_lbl").removeClass("active");
		$("#status").show();
	}

	/*
	 * var isSelectedOrderType = $("#isSelectedOrderType").val(); var
	 * typeOrderButton = $(".btn-ordertype-toggle");
	 * 
	 * if(isSelectedOrderType == true){ typeOrderButton.click(); }
	 * $("#isSelectedOrderType_div").show();
	 */

});

// iCheck for checkbox and radio inputs
$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
	checkboxClass : 'icheckbox_minimal-blue',
	radioClass : 'iradio_minimal-blue'
})

$('#order_bx_close').on('click', function(e) {

	$('#order_box').hide('slow');

});

$(".btn-ordertype-toggle").click(function(e) {

	var accountId = $(this).attr('data-account');
	var isSelectedN = $(this).hasClass('active') == true ? false : true;
	var url = "/accounts/ordertype/" + accountId + "/" + isSelectedN;

	$.post(url, function(data) {

		toastr.options.closeButton = true;
		// Display a success toast, with a title

		toastr.info('Your Order type has been changed');

		if ($("#position_menu").hasClass('active')) {

			loadPositionView("/positions", null);
		}

	});

});

function updatePositionTick(data) {
	// console.log(data.body);

	var datBody = JSON.parse(data.body);

	var tobj = datBody; // [i];
	var lastPrice = tobj.lastTradePrice;
	var elements = $('.pos_live_price_' + tobj.instrumentToken);

	// ele.html(lastPrice);
	elements.each(function() {

		var ele = $(this);
		var index = ele.attr('data-index');
		var posAccount = ele.attr('data-account-id');
		var positionTable = window["positionTable_" + posAccount];
		var posTotalClass = "pos_total_" + posAccount;
		var buyQty = $('.pos_buy_qty_' + tobj.instrumentToken).val();
		var buyPrice = $('.pos_buy_price_' + tobj.instrumentToken).val();
		var sellQty = $('.pos_sell_qty_' + tobj.instrumentToken).val();
		var sellPrice = $('.pos_sell_price_' + tobj.instrumentToken).val();
		var lastPnl = $('.pos_pnl_' + tobj.instrumentToken).val();
		var pnlelement = $('.pos_pl_' + tobj.instrumentToken);

		// only buy
		if (buyQty == 0 || isNaN(buyQty) || buyQty == "") {

			pnl = sellQty * sellPrice - sellQty * lastPrice;
		}

		// only sell
		if (sellQty == 0 || isNaN(sellQty) || sellQty == "") {

			pnl = buyQty * buyPrice - buyQty * lastPrice;
		}

		// both buy & sell
		if (buyQty > 0 && sellQty > 0) {

			var remainingQty = buyQty - sellQty;

			pnl = buyQty * buyPrice
					- (sellQty * sellPrice + remainingQty * lastPrice);

		} else if (buyQty == sellQty) {

			return;
		}

		pnl = pnl * -1;

		if (positionTable != undefined) {

			var temp = positionTable.row(index).data();
			temp[5] = Number(pnl).toFixed(2);
			temp[6] = Number(
					((lastPrice - tobj.openPrice) / tobj.openPrice) * 100)
					.toFixed(2);

			positionTable.row(index).data(temp).invalidate();

			var total = 0;
			positionTable.rows().every(function(rowIdx, tableLoop, rowLoop) {
				var data = this.data();
				// ... do something with data(), or this.node(), etc
				var price = data[5].replace('₹', '') * 1;
				total += price;

			});

			positionTable.draw();

			$('.' + posTotalClass).html(total.toFixed(2));

			if (total >= 0) {
				$('.' + posTotalClass).addClass('text-green');
				$('.' + posTotalClass).removeClass('text-red');
			} else {

				$('.' + posTotalClass).addClass('text-red');
				$('.' + posTotalClass).removeClass('text-green');
			}

			if (temp[5] >= 0) {

				pnlelement.addClass('text-green');
				pnlelement.removeClass('text-red');

			} else {

				pnlelement.addClass('text-red');
				pnlelement.removeClass('text-green');
			}

		}

	});
	/*
	 * var temp = daypositionTable.row(index).data(); var qty = temp[2]; var
	 * buyPrice = temp[3]; temp[4] = lastPrice; temp[5] = (lastPrice - buyPrice) *
	 * qty; temp[6] = ((lastPrice - buyPrice) / buyPrice)*100;
	 * daypositionTable.row(index).data(temp).invalidate();
	 */
}

function updateHoldingTick(data) {
	// console.log(data.body);

	var datBody = JSON.parse(data.body);

	var tobj = datBody; // [i];

	var elements = $('.hol_live_price_' + tobj.instrumentToken);

	elements
			.each(function() {

				var ele = $(this);
				var index = ele.attr('data-index');
				var holdingAccount = ele.attr('data-account-id');
				var holdingTable = window["holdingTable_" + holdingAccount];

				if (holdingTable != undefined) {

					var temp = holdingTable.row(index).data();
					var qty = temp[1];
					var buyPrice = temp[2].replace('₹', '');
					if (temp != undefined) {
						temp[4] = Number(tobj.lastTradePrice).toFixed(2);
						temp[5] = Number(
								((tobj.lastTradePrice - buyPrice) * qty))
								.toFixed(2);
						temp[6] = Number(
								((tobj.lastTradePrice - buyPrice) / buyPrice) * 100)
								.toFixed(2)
								+ "%";
						temp[7] = Number(
								((tobj.lastTradePrice - tobj.openPrice) / tobj.openPrice) * 100)
								.toFixed(2)
								+ "%";
						holdingTable.row(index).data(temp).invalidate();
					}

				}

			});

}

setInterval(function() {
	$.get("/heartbeat", null, function(data) {

	});
}, 1000 * 60 * 10);
