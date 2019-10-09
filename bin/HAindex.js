var HAindex = {
	views: {},
	stores: {},
	config: {
		dataUrl: "/havingadventures.com"
		// production this is       dataUrl: ""
		// dev this is       dataUrl: "/havingadventures.com"
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

HAindex.views.Adventure = function (vnode) {
	"use strict";
	var IndexCardstore;
	IndexCardstore = new HAindex.stores.JsonLoader({
		url: vnode.attrs.dataUrl,
		name: vnode.attrs.storeName
	});

	IndexCardstore.load();

	return {
		view: function (vnode) {
			return m("div", [adventure()]);

				function navBar(HomePageNavBarData) {
					console.log("3 From adventure 'HomePageNavBarData' is", HomePageNavBarData);
										return m("nav", m("nav.navbar.navbar-inverse.navbar-fixed-top[role='navigation']",
						m(".container",
							[m(".navbar-header",
								[m("a.navbar-brand[href='../index.html']",
									{style: {"color": "gold"}}, "Having Adventures.com"),
									m("button.navbar-toggle[data-target='#bs-example-navbar-collapse-1'][data-toggle='collapse'][type='button']",
										[m("span.sr-only", "Toggle navigation"),
											m("span.icon-bar"), m("span.icon-bar"), m("span.icon-bar")
										])]), //navbar-brand
								m(
									".collapse.navbar-right.navbar-collapse[id='bs-example-navbar-collapse-1']",
									HomePageNavBarData.map(navUL)
								)
							]
						) /*container*/));/*nav & nav.navbar*/
				}  // navigationBar(x)

			function navUL(theGrp) {
					console.log("4 From navUl 'theGrp is", theGrp);
					// console.log("5 From navUl 'theGrp.grpName' is", theGrp.grpName);
				return m("ul.nav.navbar-nav.navbar-collapse",
					[m("li.dropdown",
						[m("a.dropdown-toggle[data-toggle='dropdown'][href='#']",
							[theGrp.grpName, m("b.caret")]),
							m("ul.dropdown-menu",
								theGrp.grpMember.map(navSection)
							)
						])])
			}

			function navSection(theMember) {
				console.log("6 From navSection 'x.grpName.theMember' is", theMember);
				return [
					m("ul", navSectionList(theMember)
					)]
			}

			// console.log("7 From navSectionList 'x.storeName' is", x.storeName);
			// console.log('8 From navSectionList =a[href="adventures/' + x.hrefx + "]");
			//
			// console.log('9 From navSectionList "json/ha-' + x.storeName + ".json");
			// console.log('10 From navSectionList "x.name' , x.name);

			function navSectionList(x) {
				return (x.storeName
						? m("li", m('a[href=""]', { //if
							onclick: function (e) {
								e.preventDefault();
								console.log('this is a click');
								m.mount(document.getElementById("output1"), {
									view: function (vnode) {
										return m(HavingAdventures.views.Main, {
											adventures: [
												m(HavingAdventures.views.Adventure, {
													storeName:  x.storeName,
													dataUrl: "json/ha-" + x.storeName + ".json"
												})]});}}); //end of mount
							}
						}, x.name))
						: m("li", m("a[href=" + x.hrefx + "]", x.name))  //else
				)
			}



			//tripCard creates a box for each page link which is used in adventure to loop thru each
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
				var theIndexNavData = HAindex.stores['HomePageNavBarData'];
				console.log("1 From adventure theStoreData.haPages is", theStoreData.haPages);
				console.log("2 From adventure 'HomePageNavBarData' is", theStoreData.HomePageNavBarData);
				return [
					m(".container", m(".row", [
						navBar(theStoreData.HomePageNavBarData),
						theStoreData.haPages.map(function (adventure) {
							return adventure.TripId && tripCard(adventure);
						})]))

				]
			}
		}
	};
};

//theStoreData.haPages.map(function (adventure) {
//  return m(".container", m(".row", adventure.TripId && tripHeader(adventure)));
//})
//{ url: "json/ha-alaska.json", name: "alaska" } add to json fromrandalls  video(theStoreData)),

HAindex.stores.JsonLoader = function JsonLoader(config) {
	"use strict";
	var url = HAindex.config.dataUrl + "/" + config.url;
	return {
		load: function () {
			m.request({
				url: url
			}).then(function (response) {
				HAindex.stores[config.name] = response;
				console.log(config, response);
			});
		}
	};
};
