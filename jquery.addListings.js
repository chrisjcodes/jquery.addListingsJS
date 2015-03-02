// This will give you 20 items: '/api/listings/?featuredlistings=1&pagesize=20'
// This will give you the 2nd set of 10 items: '/api/listings/?featuredlistings=1&pagesize=10&pagenumber=2'

(function( $ ) {

$.fn.addListings = function(options){
	var defaults = {
		listingCount: 25,
		pageNumber: 1,
		customTemp: "<div class='listing'>\
		<img src='${IDXPhotoRef}'/>\
		<div class='address'>${Address}</div>\
		<div class='beds'> Beds: ${BedRooms}</div>\
		<div class='baths'>Baths: ${BathRooms}</div>\
		<div class='price'>Price: $${PriceFormatted}</div>\
		</div>",
		after: function(){}
	}

	var settings = $.extend({}, defaults, options );

	$.ajax({
      type: 'GET',
      // url: '/api/listings/?featuredlistings=1&pagesize=' + settings.listingCount + '&pagenumber=' + settings.pageNumber + '',
      url:'data.json',
      contentType: 'text/plain',
      crossDomain: true,
      context: $(this)
      })
	.done(function(data) {
		$.template("customTemp", settings.customTemp);
        var arrData = $.map(data[0], function(el) { return el; });
        for(i=0; i<arrData.length; i++){
	        $.tmpl("customTemp", arrData[i]).appendTo(this);
	  	}

      })
	.always(function(){
      	settings.after();
      });

console.log(this);
return this;

};
}( jQuery ));

