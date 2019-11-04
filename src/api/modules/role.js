import axios from 'axios'

let list = (data) => axios.get('/api/role/list', { params: data });
let config = (data) => axios.get('/api/role/config', { params: data });


export default {
	list,
	config,
}
