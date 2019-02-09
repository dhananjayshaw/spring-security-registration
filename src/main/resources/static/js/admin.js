$( document ).ready(function() {
	$('#paginatedTable').DataTable( {
        "processing": true,
        "serverSide": true,
        "pageLength": 2,
        "ajax": {
            "url": "/Person/datatable",
            "data": function ( data ) {
			 //process data before sent to server.
         }},
        "columns": [
                    { "data": "id","title" : "ID"  },
                    { "data": "firstName", "title" : "FirstName"},
                    { "data": "lastName", "title" : "LastName"}
                ]    
	});
	
	$('#paginatedTable').dataTable().fnSetFilteringEnterPress();
});