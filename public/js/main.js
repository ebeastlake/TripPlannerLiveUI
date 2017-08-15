var map;



function initialize_gmaps() {

    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();

    for (var i = 0; i < hotels.length ; i++) {
        $('#hotel-choices').append($('<option>', {
            value: i,
            text: hotels[i].name
        }));
    }

    for(var i = 0; i < restaurants.length; i++) {
        $('#restaurant-choices').append($('<option>', {
            value: i,
            text: restaurants[i].name
        }));
        
    }

    for(var i = 0; i < activities.length; i++) {
       $('#activity-choices').append($('<option>', {
            value: i,
            text: activities[i].name
        }));
        
    }

    $('#options-panel').on('click','button', function() {
        var selected = $(this).siblings('select').find(':selected').text();
        var id = $(this).siblings('select').find(':selected').attr('value');
        var list = $(this).siblings('select').attr('id');
        var newDiv = $("<div/>").addClass("itinerary-item");
        var newButton = $("<button>").addClass("btn btn-xs btn-danger remove btn-circle").text('x');
        var newChoice = $('<span>').text(selected);
        newDiv.append(newButton);
        newDiv.append(newChoice);
        $('#list-' + list).append(newDiv);
        var place;
        console.log(list);
        console.log(id);
        if(list.includes("hotel")) {
            place = hotels[id].place.location
        }
        if(list.includes("restaurant")) {
            place = restaurants[id].place.location
        }
        if(list.includes("activity")) {
            place = activities[id].place.location  
        }
        var myLatlng = new google.maps.LatLng(place[0],place[1]);
        
        // // Add the marker to the map
         console.log(hotels[id].place.location)
        var marker = new google.maps.Marker({
            position: myLatlng,
            title: selected
        });
        // // Add the marker to the map by calling setMap()
        marker.setMap(map);
    })

    $('#itinerary').on('click','button', function() {
        var element = $(this).siblings('span').parent().remove();
    })

    $('#day-add').on('click', function() {
        var element = $(this).prev().text();
        var newValue = +element+1
        var newButton = $("<button>").addClass("btn btn-circle day-btn").text(newValue);
        $(this).before(newButton);
        console.log(element);
        console.log(newValue);
    })
    
})


