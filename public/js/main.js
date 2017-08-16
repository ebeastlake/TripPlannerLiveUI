var map;
var markers = [];



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

function addMarker(title, location, currDay) {
    var marker = new google.maps.Marker({
        title: title, 
        position: location,
        map: map,
        day: currDay
    });
    markers.push(marker);
    console.log(markers);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
  }
}

function removeMarkerByName(name) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].title === name) {
            var idx = i;
            break;
        }
    }
    console.log(idx);
    markers[idx].setMap(null);
    markers.splice(idx, 1);
}

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
    }

    function showTodaysMarkers(currDay) {
        clearMarkers();

        for (var i = 0; i < markers.length; i++) {
            if(markers[i].day === currDay) {
                markers[i].setMap(map);
            }
        }
    }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
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
        var currDay = $('.day-buttons').find('.current-day').text();
        console.log("The current day is: " + currDay);
        var newDiv = $("<div/>").addClass(`day-${currDay} itinerary-item`);

        var newButton = $("<button>").addClass("btn btn-xs btn-danger remove btn-circle").text('x');
        var newChoice = $('<span>').text(selected);
        newDiv.append(newButton);
        newDiv.append(newChoice);


        $('#list-' + list).append(newDiv);
        var place;
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
        addMarker(selected, myLatlng, currDay);
        showTodaysMarkers(currDay);
    })

     $('#itinerary').on('click','button', function() {
        var title = $(this).siblings('span').text();
        removeMarkerByName(title);
        // console.log("located at : " + remove.place.location);
        var element = $(this).siblings('span').parent().remove();

    })

    //  $('#day-add').on('click', function() {
    //     var element = $(this).prev().text();
    //     var newValue = +element+1
    //     var newButton = $("<button>").addClass("btn btn-circle day-btn").text(newValue);
    //     $(this).before(newButton);
    //     console.log(element);
    //     console.log(newValue);
    // })

    $('.day-buttons').on('click', 'button', function() {

        if ($(this).attr('id') === 'day-add') {
            var element = $(this).prev().text();
            var newValue = +element+1
            var newButton = $("<button>").addClass("btn btn-circle day-btn").text(newValue);
            $(this).before(newButton);
        } else {
            $("button").removeClass("current-day");
            $(this).addClass("current-day");
            var currDay = $(this).text();
            $("#day-title").find('span').text(`Day ${currDay}`);
            updateItinerary(currDay);
        }
    })

    $('#day-title').on('click', 'button', function() {
        currDay = $('.current-day').text();
        console.log(currDay);
        $('.current-day').remove()
    })

    function updateItinerary(currDay) {
        $('.itinerary-item').hide();
        $(`.day-${currDay}`).show();
        showTodaysMarkers(currDay);
    }

 })


