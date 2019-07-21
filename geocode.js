$(document).ready(function() {

    $('#geocode').on("submit", forwardGeocode);

});




const forwardGeocode = function(event){
    event.preventDefault();


    const start = $("#start").val()
    const destination = $("#destination").val();
    var query_data = {};

    const deferred_start = $.get('https://geocoder.api.here.com/6.2/geocode.json',
    {app_id: '267f9NJSwzyCIx6hWBFZ' , app_code: "sytOu8Ybgls8UHnTlB_GOg", searchtext: start},
    function(data){
        const startCoord = data.Response.View[0].Result[0].Location.NavigationPosition[0];
        query_data['startLat'] = startCoord.Latitude;
        query_data['startLon'] = startCoord.Longitude;

        query_data['startWayPoint'] = "geo!" + String(startCoord.Latitude) + "," + String(startCoord.Longitude);

        
        });
    
    const deferred_end = $.get('https://geocoder.api.here.com/6.2/geocode.json',
    {app_id: '267f9NJSwzyCIx6hWBFZ' , app_code: "sytOu8Ybgls8UHnTlB_GOg", searchtext: destination},
    function(data){
        const endCoord = data.Response.View[0].Result[0].Location.NavigationPosition[0];
        query_data['endLat'] = endCoord.Latitude;
        query_data['endLon'] = endCoord.Longitude;

        query_data['endWayPoint'] = "geo!" + String(endCoord.Latitude) + "," + String(endCoord.Longitude);
        }
    );

    $.when(deferred_start, deferred_end).done(function(){console.log(query_data)})







}



// 