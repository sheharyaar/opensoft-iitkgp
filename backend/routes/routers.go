package routes

import (
	"net/http"
	"strings"

	"opensoft-backend/controllers"
	"opensoft-backend/utils"

	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		handler = utils.Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	return router
}

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/api/",
		(utils.JsonIO(controllers.Index)),
	},

	Route{
		"AddCustomer",
		strings.ToUpper("Post"),
		"/api/customers/AddCustomer",
		(utils.JsonIO(controllers.AddCustomer)),
	},

	Route{
		"Login",
		strings.ToUpper("Post"),
		"/api/customers/Login",
		(utils.JsonIO(controllers.Login)),
	},

	Route{
		"GetOrders",
		strings.ToUpper("Post"),
		"/api/orders/GetOrders",
		(utils.JsonIO(controllers.GetOrders)),
	},

	Route{
		"GetItemById",
		strings.ToUpper("Get"),
		"/api/items/GetItemById",
		(utils.JsonIO(controllers.GetItemById)),
	},

	Route{
		"GetItemsByName",
		strings.ToUpper("Get"),
		"/api/items/GetItemByName",
		(utils.JsonIO(controllers.GetItemByName)),
	},

	Route{
		"PlaceOrder",
		strings.ToUpper("Post"),
		"/api/orders/PlaceOrder",
		(utils.JsonIO(controllers.PlaceOrder)),
	},

	Route{
		"VendorGetStores",
		strings.ToUpper("Get"),
		"/api/stores/GetStores",
		(utils.JsonIO(controllers.GetStores)),
	},

	Route{
		"AddVendor",
		strings.ToUpper("Post"),
		"/api/vendors/AddVendor",
		(utils.JsonIO(controllers.AddVendor)),
	},

	Route{
		"LoginVendor",
		strings.ToUpper("Post"),
		"/api/vendors/VendorLogin",
		(utils.JsonIO(controllers.VendorLogin)),
	},

	Route{
		"VendorGetOrders",
		strings.ToUpper("Post"),
		"/api/vendors/orders/GetOrders",
		(utils.JsonIO(controllers.VendorGetOrders)),
	},

	Route{
		"VendorGetItemById",
		strings.ToUpper("Get"),
		"/api/vendors/items/GetItemById",
		(utils.JsonIO(controllers.VendorGetItemById)),
	},

	Route{
		"VendorGetItemsByName",
		strings.ToUpper("Get"),
		"/api/vendors/items/GetItemByName",
		(utils.JsonIO(controllers.VendorGetItemByName)),
	},

	Route{
		"VendorPlaceOrder",
		strings.ToUpper("Post"),
		"/api/vendors/orders/PlaceOrder",
		(utils.JsonIO(controllers.VendorPlaceOrder)),
	},

	Route{
		"VendorGetStores",
		strings.ToUpper("Get"),
		"/api/vendors/stores/GetStores",
		(utils.JsonIO(controllers.VendorGetStores)),
	},
	Route{
		"Recommend",
		strings.ToUpper("Get"),
		"/api/nonEssentials/Recommend",
		(utils.JsonIO(controllers.Recommend)),
	},
	Route{
		"VendorRecommend",
		strings.ToUpper("Get"),
		"/api/vendors/nonEssentials/Recommend",
		(utils.JsonIO(controllers.VendorRecommend)),
	},
	Route{
		"VendorStoreStatus",
		strings.ToUpper("Get"),
		"/api/vendors/StoreStatus",
		(utils.JsonIO(controllers.VendorStoreStatus)),
	},
	Route{
		"StatusTweak",
		strings.ToUpper("Post"),
		"/api/vendors/OrderStatusTweak",
		(utils.JsonIO(controllers.OrderTweakStatus)),
	},
	Route{
		"HealthCheck",
		strings.ToUpper("Get"),
		"/api/HealthCheck",
		(utils.JsonIO(controllers.HealthCheck)),
	},
	Route{
		"Loyalty",
		strings.ToUpper("Get"),
		"/api/nonEssentials/Loyalty",
		(utils.JsonIO(controllers.Loyalty)),
	},
	Route{
		"Loyalty",
		strings.ToUpper("Get"),
		"/api/vendors/nonEssentials/Loyalty",
		(utils.JsonIO(controllers.Loyalty)),
	},
	Route{
		"Infra",
		strings.ToUpper("Get"),
		"/api/Infra",
		(utils.JsonIO(controllers.Infra)),
	},
	Route{
		"Notif",
		strings.ToUpper("Post"),
		"/api/Notif",
		(utils.JsonIO(controllers.Notif)),
	},
	Route{
		"LoatTest",
		strings.ToUpper("Get"),
		"/api/LoadTest",
		(utils.JsonIO(controllers.LoadTest)),
	},
}
