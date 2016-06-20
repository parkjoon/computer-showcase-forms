import Http from 'http';
import Querystring from 'querystring';

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
		res.on('data', (chunk) => {
			console.log('Response: ' + chunk);
		});
	});

	// post the data
	req.write(reqData);
	req.end();
}
