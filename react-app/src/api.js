import Http from 'http';
import Querystring from 'querystring';

export function getReportsData(callback) {
	var options = {
		port: '8080',
		path: '/reportsData',
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	};

	return Http.get(options, (response) => {
		let reports;
		response.on('data', (data) => {
			reports = data;
		});
		response.on('end', () => {
			// Data reception is done, do whatever with it!
			callback(JSON.parse(reports));
		});
	});
}

export function submitForm(formData) {
	// Build the post string from an object
	var reqData = Querystring.stringify(formData);

	// An object of options to indicate where to post to
	var reqOptions = {
		port: '8080',
		path: '/submitForm',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(reqData)
		}
	};

	// Set up the request
	var req = Http.request(reqOptions, (res) => {
		res.on('data', (data) => {
			console.log('Response: ' + data);
		});
	});

	// post the data
	req.write(reqData);
	req.end();
}
