// This will give you 20 items: '/api/listings/?featuredlistings=1&pagesize=20'
// This will give you the 2nd set of 10 items: '/api/listings/?featuredlistings=1&pagesize=10&pagenumber=2'

(function( $ ) {

$.fn.addListings = function(options){
    var myHTML = "",
    template = "";
	var defaults = {
		listingCount: 25,
		pageNumber: 1,
		after: function(){}
	}

	var settings = $.extend({}, defaults, options );

	$.ajax({
      type: 'GET',
      // url: '/api/listings/?featuredlistings=1&pagesize=' + listingCount + '&pagenumber=' + pageNumber + '',
      url: 'data.json',
      contentType: 'text/plain',
      crossDomain: true,
      context: $(this)
      })
	.done(function(data) {
        var arrData = $.map(data[0], function(el) { return el; });
        for(i=0; i<arrData.length; i++){
	            var template = "<div class=\"listing\">" +
	          "<img src=\"" + arrData[i].IDXPhotoRef + "\"/>" +
	          "<div class=\"address\">" + arrData[i].Address + "</div>" +
	          "<div class=\"beds\"> Beds:" + arrData[i].BedRooms + "</div>" +
	          "<div class=\"baths\">Baths:" + arrData[i].BathRooms + "</div>" +
	          "<div class=\"price\">Price: $" + arrData[i].PriceFormatted + 
	          "</div></div>";
	          myHTML += (template);
	  		}
	  		
        return this.append(myHTML);

      })
	.always(function(){
      	settings.after();
      });

};

}( jQuery ));