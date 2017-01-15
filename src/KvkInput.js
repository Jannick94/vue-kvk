import Vue from 'vue';
import KvkInput from './components/KvkInput';

const Kvk = {
	install(Vue, options) {
		Vue.component('kvkInput', KvkInput);
	}
}

export default Kvk;