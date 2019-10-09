m.route.prefix('#')


var HAindex = {
	views: {},
	stores: {},
	config: {
		dataUrl: "/havingadventures.com/mithril"
// production this is       dataUrl: ""
// dev this is       dataUrl: ""
	}
};

HAindex.views.Main = function Main() {
	"use strict";
	return {
		view: function (vnode) {
			return m("div", vnode.attrs.adventures);  //removed "HA index",
		}
	};
};

var myData = {
	"grpMember": {
		"hrefx": "201908sierra.html",
		"name": "Aug19 Sierra",
		"storeName": "sierra",
		"TripId": "ha-201908sierra",
		"id": "ha-sierra",
		"BackgroundPic": "img/index/201908sierra.jpg",
		"PageLink": "adventures/201908sierra.html",
		"PageTitle": "June 2019 - Sierra Nevada",
		"PageSubtitle": "",
  	"TripSumm": "A five day, 45 mile hike through the Benson Lake Loop"
	}
}


var Layout = {
	view: function(vnode) {
		return m(".layout", [
			m('nav', {onclick: (e) => console.log('clicked', e)}, 'HavingAdventures NAV'),
			m('h2', {onclick: (e) => console.log('clicked', e)}, 'HavingAdventures header'),
			vnode.children,
			m('div', ' ----  '),
			m('div', 'HavingAdventures footer'),
		])
	}
}
const Home = {
	view: function(vnode) {
		return m("h2." +
			"" +
			"", 'Content goes here')
	}
}
const Trip = {
	view: function(vnode) {
		return m(".layout",  m(".row",[
				m('div',  "MyData-grpMember-name is -- " + myData.grpMember.name ),
				m('div', m('p', "MyData-grpMember-storeName is -- " + myData.grpMember.storeName),
					m('p',  "MyData-grpMember-hrefx is -- " + myData.grpMember.hrefx))
			]
		))
	}
}

const Output1 = {
	view: function(vnode) {
		return m(".layout",  m("div", {"id":"output1"},
			[
				"TD List",
				m("br"),
				m("br"), " TripId = "+ myData.grpMember.TripId,
				m("div"), " id = "+ myData.grpMember.id,
				m("div"), " Background Pic = "+ myData.grpMember.BackgroundPic,
				m("div"), " Page Link = "+ myData.grpMember.PageLink,
				m("h2"), " Page Title = " + myData.grpMember.PageTitle,
				m("h3"), " Page Subtitle = "+ myData.grpMember.PageSubtitle,
				m("p"), " Trip Summ = "+ myData.grpMember.TripSumm,
				m("br")
			]
		))
	}
}

const Output2 = {
		view: function (vnode) {
			var theStoreData;
			theStoreData = new HAindex.stores.JsonLoader({
				url: vnode.attrs.dataUrl,
				name: vnode.attrs.storeName
			});

			theStoreData.load();

			return {
				view: function (vnode) {
					return m("div", [adventure()]);

					function tripCard(trip) {
						return m(".col-xs-6.col-sm-4.col-md-3[id=" + trip.id + "-th]",
							[
								m(".margin-top"),
								m("a.square-text[href=" + trip.pageLink + "]", trip.pageTitle),
								m(".square-img", {style: {"background-image": "url(" + trip.tripThumb + ")"}})
							]
						);
					}

					function adventure() {
						var theStoreData = HAindex.stores[vnode.attrs.storeName];
						if (!theStoreData) return undefined;
						console.log("1 From adventure theStoreData.haPages is", theStoreData.haPages);
						return [
							m(".container", m(".row", [
								theStoreData.haPages.map(function (adventure) {
									return adventure.TripId && tripCard(adventure);
								})]))

						]
					}

				}
			}
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
	},
	"/output1/": {
		view: function() {
			return m(Layout, m(Output1))
		},
	},
	"/output2/": {
		view: function() {
			return m(Layout, m(Output2))
		},
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
