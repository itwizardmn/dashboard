/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|      CORE LIBS      |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
//import 'es6-promise/auto'
//import 'es7-shim'
import "core-js"
import _ from 'lodash'
import Vue from 'vue'
import "element-ui/lib/theme-chalk/index.css";
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuebar from 'vuebar'
import vClickOutside from 'v-click-outside'
import VueFloatLabel from 'vue-float-label'
import VuePerfectScrollbar from './components/vue-ps';
import axios from "axios";


/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|  THIRD PARTS LIBS   |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
import VueI18n from 'vue-i18n'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import moment from 'moment-timezone'
import Fullscreen from 'vue-fullscreen'
import VueLazyload from 'vue-lazyload'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/color-brewer.css'
import VirtualList from 'vue-virtual-scroll-list'
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'
import VueGoodTable from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.min.css'
import VirtualCollection from 'vue-virtual-collection'
import * as VueGoogleMaps from 'vue2-google-maps' 
import GmapCluster from 'vue2-google-maps/dist/components/cluster' // replace src with dist if you have Babel issues
import V2Table from 'v2-table'
import 'v2-table/dist/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VuePellEditor from 'vue-pell-editor'
import { StatusIndicator } from 'vue-status-indicator'
import Bars from 'vuebars'
import Trend from 'vuetrend'
import VueChartist from 'v-chartist'
import 'chartist/dist/chartist.css'
import D3Network from 'vue-d3-network'
import 'vue-d3-network/dist/vue-d3-network.css'
import Chart from 'chart.js'
import BulmaChart from 'vue-bulma-chartjs'
import Peity from 'vue-peity'
import VueChartkick from 'vue-chartkick'
import VueMasonry from 'vue-masonry-css'
import VueTextareaAutosize from 'vue-textarea-autosize'
//import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import * as Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import 'flag-icon-css/css/flag-icon.css'
import 'balloon-css/balloon.min.css'
import VueCodemirror from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'


/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|     CORE ASSETS     |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
//import './assets/scss/element-variables.scss'
import './assets/scss/global.scss'
import 'flex.box'
import 'animate.css'
//import '../node_modules/mdi/scss/materialdesignicons.scss'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'
import Affix from './directives/affix'
import App from './App.vue'
import router from './router/' 
import store from './store' 
import i18n_messages from './i18n.json' 
import VueHtml2pdf from 'vue-html2pdf';
import excel from 'vue-excel-export';
import textApi from '@/assets/js/utils';


Vue.config.productionTip = false


/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|  THIRD PARTS COMPONENTS |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ */
Vue.use(VueTextareaAutosize)
Vue.use(excel);
Vue.use(VueMasonry)
Vue.component('StatusIndicator', StatusIndicator)
Vue.use(VueChartkick, {adapter: Chart})
Vue.use(Trend)
Vue.use(Bars)
Vue.component('Peity', Peity)
Vue.component('BulmaChart', BulmaChart)
Vue.component('D3Network', D3Network)
Vue.component('VueChartist', VueChartist)
Vue.use(VuePellEditor)
Vue.use(mavonEditor)
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyA8sFDujn-xj-pZk0ueSVCtvN5AoPu7HRU',
		libraries: 'places', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)
	}
})
Vue.component('GmapCluster', GmapCluster)
Vue.use(VirtualCollection)
Vue.use(VueResize)
Vue.use(Fullscreen)
Vue.use(VueI18n)
Vue.use(VueHighlightJS)
Vue.use(Viewer)
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEuNDE0MjE7Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgc3R5bGU9ImZpbGw6I2UyZTNlNTsiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSIzMDAiIHI9IjE1NSIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2Utd2lkdGg6NDdweDtzdHJva2U6I2JjYmRiZjsiLz48cmVjdCB4PSIxNjAiIHk9IjIyMyIgd2lkdGg9IjI3NSIgaGVpZ2h0PSIxNjYiIHN0eWxlPSJmaWxsOiNlM2U1ZTQ7Ii8+PHBhdGggZD0iTTQ0MC41LDM5NC41bC0yODYsMGwwLC0xNzdsMjg2LDBsMCwxNzdaTTE2NS41LDIyOC41bDAsMTU1bDI2NCwwbDAsLTE1NWwtMjY0LDBaIiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Ik00MDQuNDM0LDE3MC44NzdsLTIzMi45NCwyMzIuOTQxbDM1LjM1NSwzNS4zNTVsMjMyLjk0MSwtMjMyLjk0bC0zNS4zNTYsLTM1LjM1NloiIHN0eWxlPSJmaWxsOiNiY2JkYmY7Ii8+PC9zdmc+',
	loading: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwcHgiICBoZWlnaHQ9IjEwMHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcmlwcGxlIiBzdHlsZT0iYmFja2dyb3VuZDogbm9uZTsiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI4LjY2ODUiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMX19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjNGE1OTZhIiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDszMCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgYmVnaW49Ii0xcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49Ii0xcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48L2NpcmNsZT48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNS45ODI4IiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuYzJ9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIHN0cm9rZT0iIzg5YWRlOCIgc3Ryb2tlLXdpZHRoPSIyIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7MzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMiIga2V5U3BsaW5lcz0iMCAwLjIgMC44IDEiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIyIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjwvc3ZnPg==',
	attempt: 1
})
Vue.use(VueGoodTable)
Vue.use(V2Table)
Vue.component('vue-virtual-list', VirtualList)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ 
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), 
	iconUrl: require('leaflet/dist/images/marker-icon.png'), 
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.use(VueCodemirror, /* {
	options: { theme: 'base16-dark', ... },
	events: ['scroll', ...]
  } */)


/* ═ ═ ═ ═ ═ ═ ═ ═ *\
|  CORE COMPONENTS  |
\* ═ ═ ═ ═ ═ ═ ═ ═ */
Vue.use(Element, {locale})
Vue.use(vClickOutside)
Vue.use(VueFloatLabel)
Vue.use(Vuebar)
Vue.component('vue-scroll', VuePerfectScrollbar)
Vue.directive('affix', Affix)

const i18n = new VueI18n({ locale: 'us', messages:i18n_messages });

// const url = "http://192.168.0.60:5100";
// const imgUrl = "http://192.168.0.60:5100/v2/common/download/";

const url = 'http://api.itwizard.mn';
const imgUrl = 'http://api.itwizard.mn/v2/common/download/';

axios.defaults.baseURL = url;
const tkn = localStorage.getItem("token");

if (tkn != null) {
  axios.defaults.headers.common.Authorization = "Bearer " + tkn;
}

const useapi = async (method, url, data) => {
  let response = await axios({
      method: method,
      url: url,
			data
  }).then(data => {
    return data;
  });

  return response;
};

// console.log = function() {};
console.warn = function() {};

Vue.prototype.$appUrl = url;
Vue.prototype.$imgUrl = imgUrl;
Vue.prototype.$useapi = useapi;
Vue.prototype.$axios = axios;
Vue.prototype.$textApi = textApi;

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
