import axios from 'axios'

let login = (data) => axios.post('/api/admin/login', data);
let register = (data) => axios.post('/api/admin/register', data);
let list = (data) => axios.get('/api/admin/list', { params: data });
let edit = (data) => axios.put('/api/admin', data);
let del = (data) => axios.delete('/api/admin', { params: data });
let delImg = (data) => axios.delete('/api/upload', { params: data });
let uploadPath = (data) => axios.post('/api/upload/common', data);
let info = (data) => axios.get('/api/admin', { params: data });
let update = (data) => axios.put('/api/admin', data);

export default {
	login,
	register,
	list,
	edit,
	del,
	delImg,
	uploadPath,
	info,
	update,
}
