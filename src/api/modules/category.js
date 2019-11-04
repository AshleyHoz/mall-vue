import axios from 'axios'

let sub = (data) => axios.get('/api/category/sub', { params: data });
let update = (data) => axios.put('/api/category', data);
let add = (data) => axios.post('/api/category', data);
let del = (data) => axios.delete('/api/category', { params: data });

export default {
	sub,
	update,
	add,
	del,
}
