import { Admin } from '@/api/index.js'

export default {
	async loadInfo({ commit }) {
		let { id } = sessionStorage;
		let { status, data } = await Admin.info({ id });
		if (status) {
			commit('saveUserInfo', data)
		}
		return data;
	},
	async updateInfo({ commit }, payload) {
		let { status, msg } = await Admin.update(payload);
		if (status) {
			commit('saveUserInfo', payload)
		}
		return { status, msg };
	}
}
