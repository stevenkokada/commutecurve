<<<<<<< HEAD:requests.js
$(document).ready(function() {

	$('#queryBtn').on('click', submitQuery);

	

	
});
=======
// $(document).ready(function() {
// 	$('#queryBtn').on('click', submitQuery);
// });

const HERE_APP_ID='267f9NJSwzyCIx6hWBFZ';
const HERE_APP_CODE='sytOu8Ybgls8UHnTlB_GOg';
>>>>>>> 367d50072875cfb4765b56d8702ce70a3d287d0f:reactapp/public/requests.js

const QUERY_FREQ_IN_MIN = 30;
const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const DUMMY_ENDPOINT = 'http://dummy.restapiexample.com/api/v1/employee';
const HERE_ENDPOINT = 'https://route.api.here.com/routing/7.2/calculateroute.json';
// const HERE_ENDPOINT = 'https://route.api.here.com/routing/7.2/calculateroute.json?app_id=267f9NJSwzyCIx6hWBFZ&app_code=sytOu8Ybgls8UHnTlB_GOg&waypoint0=geo!52.5,13.4&waypoint1=geo!52.5,13.45&mode=fastest;car;traffic:disabled';

const addMinutes = function(date, minutes) {
	return new Date(date.getTime() + minutes * 60000);
}

function submitQuery() {
  console.log("inside submitQuery")
	const waypoint0 = 'geo!52.5,13.4';
	const waypoint1 = 'geo!52.5,13.45';
	const mode = 'fastest;car;traffic:enabled;'

	const now = new Date();
	const curr_hour = now.getHours();
	const curr_minute = now.getMinutes();
	const curr_time = curr_hour * MINS_PER_HOUR + curr_minute;

	const query_deferred = [];
	const query_data = [];

	const tot_minutes = MINS_PER_HOUR * HOURS_PER_DAY;
	for (let i = curr_time; i < tot_minutes; i+=QUERY_FREQ_IN_MIN) {
		departure = addMinutes(now, i - curr_time).toISOString();
		const deferred = $.ajax({
			url: `${HERE_ENDPOINT}`,
			type: 'GET',
			data: {
				app_id: HERE_APP_ID,
				app_code: HERE_APP_CODE,
				waypoint0: waypoint0,
				waypoint1: waypoint1,
				mode: mode,
				departure: departure
			},
			success: function(result) {
				const data = result['response']['route'];
				query_data.push([i, data])
			},
			error: function(err) {
				console.log(err);
			}
		});

		query_deferred.push(deferred)
	}

	$.when.apply($, query_deferred).then(function() {
		query_data.sort(function(a, b) {
			return a[0] - b[0]
<<<<<<< HEAD:requests.js
		});
		// query_data.forEach(element => {
		// 	// console.log(element)
		// 	// console.log(element[0])
		// 	// console.log(element[1][0]['summary']['text']);
		// });


		// optimal time calculation

		const timeSplit = $("#desiredDeparture").val().split(':');
		const hours = parseInt(timeSplit[0], 10);
		const minutes = parseInt(timeSplit[1], 10);
		const tolerance = parseInt($("#tolerance").val(), 10);
	
		const minuteIndex = hours*60 + minutes;
	
	

		const validRoutes = query_data.filter(elt => elt[0] > minuteIndex - tolerance && elt[0] < minuteIndex + tolerance);

		validRoutes.forEach(elt => console.log(elt[1][0].summary.trafficTime))

		var shortestRoute = validRoutes.reduce(function (shortest, route) {
			return (route[1][0].summary.trafficTime || 0) < shortest[1][0].summary.trafficTime ? route: shortest;
		  }, [null,[{summary:{trafficTime:10000}}]]);

		
	


=======
    });
    console.log(query_data);
		// query_data.forEach(element => {
		// 	console.log(element[1][0]['summary']['text']);
		// })
>>>>>>> 367d50072875cfb4765b56d8702ce70a3d287d0f:reactapp/public/requests.js
	});


	
		
	
	
	
		
}















