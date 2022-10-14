/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/authenticated/src/app/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signup = void 0;
const tslib_1 = __webpack_require__("tslib");
const helpers_1 = __webpack_require__("./apps/authenticated/src/app/helpers/index.ts");
const profile_1 = __webpack_require__("./apps/authenticated/src/app/models/profile.ts");
const user_1 = __webpack_require__("./apps/authenticated/src/app/models/user.ts");
const bcrypt = __webpack_require__("bcrypt");
exports.signup = (0, helpers_1.errorHandler)((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const foundUser = yield user_1.default.findOne({ email });
    if (foundUser) {
        return res.status(400).json({
            success: false,
            message: "EMAIL_EXISTED",
        });
    }
    const hashedPassword = yield new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        });
    });
    const user = yield user_1.default.create({
        email,
        password: hashedPassword,
    });
    const profile = yield profile_1.default.create({
        name,
        email,
        userId: user._id,
    });
    return res.status(200).json({
        success: true,
        data: profile,
    });
}));


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

/***/ "./apps/authenticated/src/app/models/profile.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__("mongoose");
const profileSchema = new mongoose_1.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
    },
}, {
    timestamps: true,
});
const Profile = (0, mongoose_1.model)("Profile", profileSchema);
exports["default"] = Profile;


/***/ }),

/***/ "./apps/authenticated/src/app/models/user.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports["default"] = User;


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

/***/ "./apps/authenticated/src/environments/environment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    dbUsername: "daicatam001",
    dbPassword: "%40Bcdmon1",
    dbCluster: "cluster0.n5ikb",
    dbName: "authenticated",
};


/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

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
const tslib_1 = __webpack_require__("tslib");
const express = __webpack_require__("express");
const routers_1 = __webpack_require__("./apps/authenticated/src/app/routers/index.ts");
const cors = __webpack_require__("cors");
const bodyParser = __webpack_require__("body-parser");
const mongoose_1 = __webpack_require__("mongoose");
const environment_1 = __webpack_require__("./apps/authenticated/src/environments/environment.ts");
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(routers_1.default);
const port = process.env.port || 3333;
const server = app.listen(port, () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb+srv://${environment_1.environment.dbUsername}:${environment_1.environment.dbPassword}@${environment_1.environment.dbCluster}.mongodb.net/${environment_1.environment.dbName}?retryWrites=true&w=majority`);
    console.log(`Listening at http://localhost:${port}/api`);
}));
server.on("error", console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map