$(document).ready(function() {
	$('#queryBtn').on('click', submitQuery);
});

const QUERY_FREQ_IN_MIN = 30;
const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const DUMMY_ENDPOINT = 'http://dummy.restapiexample.com/api/v1/employee';
const HERE_ENDPOINT = 'https://route.api.here.com/routing/7.2/calculateroute.json';

const submitQuery = function() {
	const today = new Date();
	const curr_hour = today.getHours();
	const curr_minute = today.getMinutes();
	const curr_time = curr_hour * MINS_PER_HOUR + curr_minute;

	const query_deferred = [];
	const query_data = [];

	console.log(APP_ID);
	const tot_minutes = MINS_PER_HOUR * HOURS_PER_DAY;
	for (let i = curr_time; i < tot_minutes; i+=QUERY_FREQ_IN_MIN) {
		const deferred = $.ajax({
			url: `${DUMMY_ENDPOINT}/${i}`,
			data: {
				// app_id: 
			},
			success: function(result) {
				console.log("HI");
				query_data.push([i, result])
			}

		});
		query_deferred.push(deferred)
		break
	}

	// for (let i = curr_time; i < tot_minutes; i+=QUERY_FREQ_IN_MIN) {
	// 	const deferred = $.ajax({
	// 		url: `${DUMMY_ENDPOINT}/${i}`,
	// 		data: {

	// 		}
	// 		success: function(result) {
	// 			console.log("HI");
	// 			query_data.push([i, result])
	// 		}

	// 	});
	// 	query_deferred.push(deferred)
	// 	break
	// }

	$.when.apply($, query_deferred).then(function() {
		query_data.sort(function(a, b) {
			return a[0] - b[0]
		});
		console.log(query_data)
	});
}

