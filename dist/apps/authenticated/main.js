/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/authenticated/src/app/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signup = void 0;
const helpers_1 = __webpack_require__("./apps/authenticated/src/app/helpers/index.ts");
exports.signup = (0, helpers_1.errorHandler)((req, res) => {
    return res.status(200).json({
        success: true,
        data: { name: "tom" },
    });
});


/***/ }),

/***/ "./apps/authenticated/src/app/helpers/index.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorHandler = void 0;
const errorHandler = function (callback) {
    return (req, res, next) => {
        try {
            callback(req, res, next);
        }
        catch (e) {
            return res.status(500).json({
                success: false,
                error: "Internal error",
            });
        }
    };
};
exports.errorHandler = errorHandler;


/***/ }),

/***/ "./apps/authenticated/src/app/routers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const controllers_1 = __webpack_require__("./apps/authenticated/src/app/controllers/index.ts");
const express = __webpack_require__("express");
const router = express.Router();
router.post("/api/sign-up", controllers_1.signup);
exports["default"] = router;


/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express = __webpack_require__("express");
const routers_1 = __webpack_require__("./apps/authenticated/src/app/routers/index.ts");
const app = express();
app.use(routers_1.default);
const port = process.env.port || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map