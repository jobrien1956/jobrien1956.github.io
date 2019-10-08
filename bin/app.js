m.route.prefix('#')


var HA = {
	views: {},
	stores: {},
	config: {
		dataUrl: "/havingadventures.com"
// production this is       dataUrl: ""
// dev this is       dataUrl: ""
	}
};

HA.views.Main = function Main() {
	"use strict";
	return {
		view: function (vnode) {
			return m("div", "Having Adventures", vnode.attrs.adventures);
		}
	};
};

HA.views.Adventure = function (vnode) {
	var pageStore = new HA.stores.JsonLoader({
		url: vnode.attrs.dataUrl,
		name: vnode.attrs.storeName
	});

	var navStore = new HA.stores.JsonLoader({
		url: '../json/HaNav.json',
		name: 'navData'
	});

	pageStore.load();
	navStore.load();

	return {
		view: function (vnode) {
			return m("div", "this is adventure", [adventure()]);
		}}}

var myData = {
	"grpMember": {

		"hrefx": "201908sierra.html",
		"name": "from haPages Aug19 Sierra",
		"storeName": "sierra"
	}

}


var Layout = {
	view: function(vnode) {
		return m(".layout", [
			m('div', {onclick: (e) => console.log('clicked', e)}, 'header'),
			vnode.children,
			m('div', 'footer'),
		])
	}
}
const Home = {
	view: function(vnode) {
		return m("h2." +
			"" +
			"", 'Home')
	}

}
const Trip = {
	view: function(vnode) {
		return m(".layout",  m(".row",[
				m('div', myData.grpMember.name ),
				m('div', m('p', myData.grpMember.storeName),
					m('p', myData.grpMember.hrefx))
			]
		))
	}
}
// example 1
m.route(document.body, "/", {
	"/": {
		view: function() {
			return m(Layout, m(Home))
		},
	},
	"/trip/": {
		view: function() {
			return m(Layout, m(Trip))
		},
	}
})

HA.stores.JsonLoader = function JsonLoader(loaderConfig) {
	"use strict";
	var url = HA.config.dataUrl + "/" + loaderConfig.url;
	return {
		load: function () {
			m.request({
				url: url
			}).then(function (response) {
				HA.stores[loaderConfig.name] = response;
			});
		}
	};
};
