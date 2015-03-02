# jquery.addListingsJS
jQuery plugin to allow Homes.com Studio designers to inject listings from the API into an element on a client's site

## Basic Usage
Include the following files in the **scripts** to use the addListings plugin. You need to update the customer ID in the path to the site youre working on. This also requires jQuery but it is already being loaded from the development dependancies


```
"/CustomData/CUSTOMERID/js/jquery.tmpl.min.js",
"/CustomData/CUSTOMERID/js/jquery.addListings.js"
```

Then to initiate all the following script:


```
$(document).ready(function(){
	$("#listings").addListings();
});
```

## Options
The default options are as follows:


```
$("#listings").addListings({
	listingCount: 25, //int
	pageNumber: 1, //int
	customTemp: "<div class='listing'><img src='${IDXPhotoRef}'/><div class='address'>${Address}</div><div class='beds'> Beds: ${BedRooms}</div><div class='baths'>Baths: ${BathRooms}</div><div class='price'>Price: $${PriceFormatted}</div></div>", //string
	after: function(){} //function
});
```

### listingCount
This allows you to set the number of listings returned per page

### pageNumber
This allows you to set which page of listings were calling. So if we had 24 listings and we set listingCount to 12, setting pageNumber to 2 would return listings 13-24.

### customTemp
This allows you to tell the plugin which pieces of data to return and how to mark them up. We are using the jQuery tmpl engine for this so to call a piece of data you use the name from JSON and wrap it as so *(This is CASE SENSITIVE)*:

```
${Address}
```

For example if you wanted to get back only the zip code from the API for each listing you would write it as follows


```
$("#listings").addListings({
	customTemp: "<div class='zip'>${Zip}</div>", //string
});
```
Its important to note that you must use single quotes inside the template such as **class='zip'** or escape any double quotes **class=\"zip\"**


I will provide a sample JSON file with all the available data you can call

### after
This is a call back function that allows you to run any code on the data that is returned. For example if you wanted to put the listings into BXSlider

```
$("#listings").addListings({
	after: function(){
	$(this).bxSlider();
}
});
```

This *has* to be done this way because the items dont exist in the DOM until after the plugin runs.