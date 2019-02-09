
var engine = new Bloodhound({
    remote: {
        url: '/common/instruments?q=QUERY',
        wildcard: 'QUERY',
    },

    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace
});
engine.initialize();

$("#stock-search-input")
    .typeahead({
        hint: true,
        highlight: true,
        minLength: 2,

    }, {
        source: engine.ttAdapter(),
        // This will be appended to "tt-dataset-" to form the class
        // name of the suggestion menu.
        name: 'instrumentList',
        // the key from the array we want to display
        // (name,id,email,etc...)
        templates: {
            empty: ['<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'],
            header: ['<div class="list-group search-results-dropdown">'],
            suggestion: function(data) {
                //console.log("Templated :" + data);
                return '<a href="#" class="list-group-item">' +
                    data.tradingSymbol + "  <span class='pull-right text-sm'> " + data.exchange + '<span> </a>';
            },
            footer: function(data) {
                // return Handlebars.compile("<b>Searched for
                // {{data.query}} </b>")
                return '<div>Found Results :<strong>' +
                    data.suggestions.length +
                    '</strong></div>';
            }
        },

    })
    .on(
        'typeahead:selected typeahead:autocompleted',
        function(e, datum) {
            //console.log('event');
            $('#stock-search-input').typeahead('val', '');
            //console.log("Selected Token :: " + datum.instrument_token);

            if($("#ins_json_" + datum.instrument_token).length > 0){
            	  
            	toastr.options.closeButton = true;
             	// Display a success toast, with a title
                toastr.info('Alerady added to the list', 'Info');
                
            	return;
            }
            
            $
                .post(
                    '/instruments/add/' + datum.instrumentToken,
                    function(data) {
                        subscribeToTick(datum.instrumentToken);
                        //console.log(datum.instrumentToken +
                          //  " added to list " +
                           // JSON.stringify(data));

                        var template = "";
                        $("#insturment_quotes_box").html("");
                        for (var i = 0; i < data.length; i++) {
                            var tobj = data[i];
                            var lastPrice = tobj.quote != null ? tobj.quote.lastPrice :
                                '';
                            template = getTemplate(tobj,
                                lastPrice);
                            $("#insturment_quotes_box").append(
                                $(template));
                        }
                        for (var i = 0; i < data.length; i++) {
                            var tobj = data[i];
                            $(
                                    "#ins_json_" +
                                    tobj.instrumentToken)
                                .val(tobj.jsonString);
                        }
                        bindInsControls();

                    });

   });
