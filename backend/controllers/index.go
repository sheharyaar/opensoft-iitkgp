/* TODO:
 * 		- Return index.html
 */

package controllers

import (
	"net/http"
)

func Index(req map[string]interface{}, r *http.Request) (interface{}, int) {
	return "success", 200
}
