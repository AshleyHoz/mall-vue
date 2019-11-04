import axios from 'axios'

let list = (data) => axios.get('/api/admin/goods/list', { params: data });
let del = (data) => axios.delete('/api/admin/goods', { params: data });
let detail = (data) => axios.get('/api/admin/goods', { params: data });
let release = (data) => axios.post('/api/admin/goods', data);

export default {
	list,
	del,
	detail,
	release
}
