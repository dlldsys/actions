import axios from 'axios';
async function post(url, data) {
	return new Promise((resolve, rejects) => {
		axios.post(url, data)
			.then(response => {
				console.log(response);
				resolve(response.data);
			})
			.catch(error => {
				// uniCloud.logger.log(error);
			});
	})
}
async function get(url) {
	return new Promise((resolve, rejects) => {
		axios.get(url)
			.then(response => {
				console.log(response);
				resolve(response.data);
			})
			.catch(error => {
				// uniCloud.logger.log(error);
			});
	})
}
export default {
	get,post
} 