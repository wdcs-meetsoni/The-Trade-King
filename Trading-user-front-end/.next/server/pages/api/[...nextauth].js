"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/[...nextauth]";
exports.ids = ["pages/api/[...nextauth]"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./src/pages/api/[...nextauth].ts":
/*!****************************************!*\
  !*** ./src/pages/api/[...nextauth].ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authOptions\": () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst authOptions = {\n    pages: {\n        signIn: \"/signin\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 300\n    },\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2___default()({\n            name: \"credentials\",\n            credentials: {},\n            async authorize (credentials) {\n                const { emailId , password , OTP , userId  } = credentials;\n                if (OTP) {\n                    try {\n                        const user = await axios__WEBPACK_IMPORTED_MODULE_1___default().post(`http://localhost:5000/trade-App/common/verifySecurityCode/${userId}`, {\n                            OTP: parseInt(OTP)\n                        });\n                        return user.data.responseData.User;\n                    } catch (error) {\n                        throw new Error(error.message);\n                    }\n                } else {\n                    try {\n                        const user1 = await axios__WEBPACK_IMPORTED_MODULE_1___default().post(`http://localhost:5000/trade-App/user/login`, {\n                            emailId,\n                            password\n                        });\n                        if (user1.data.responseCode === 200) {\n                            return user1.data.responseData;\n                        } else {\n                            throw new Error(user1.data.responseMessage);\n                        }\n                    } catch (error1) {\n                        throw new Error(error1.message);\n                    }\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user  }) {\n            // console.log('Seconf', user)\n            if (user) {\n                //    console.log('True')\n                return true;\n            } else {\n                //    console.log('error')\n                return false;\n            }\n        },\n        async redirect ({ baseUrl  }) {\n            //    console.log('baseUrl', baseUrl)\n            return baseUrl;\n        },\n        async jwt ({ token , user  }) {\n            // console.log('User', user, 'TOken', token)\n            if (user) {\n                return {\n                    ...token,\n                    user\n                };\n            }\n            return token;\n        },\n        async session ({ session , token  }) {\n            // console.log('sessionToken', token, 'session', session)\n            if (token) {\n                return {\n                    ...session,\n                    user: token.user\n                };\n            }\n            return session;\n        }\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL1suLi5uZXh0YXV0aF0udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBOEQ7QUFDckM7QUFFd0M7QUFHMUQsTUFBTUcsY0FBK0I7SUFDeENDLE9BQU87UUFDSEMsUUFBUTtJQUNaO0lBQ0FDLFNBQVM7UUFDTEMsVUFBVTtRQUNWQyxRQUFRO0lBQ1o7SUFDQUMsV0FBVztRQUNQUCxzRUFBbUJBLENBQUM7WUFDaEJRLE1BQU07WUFDTkMsYUFBYSxDQUFDO1lBQ2QsTUFBTUMsV0FBVUQsV0FBVyxFQUFFO2dCQUN6QixNQUFNLEVBQUVFLFFBQU8sRUFBRUMsU0FBUSxFQUFFQyxJQUFHLEVBQUVDLE9BQU0sRUFBRSxHQUFHTDtnQkFDM0MsSUFBSUksS0FBSztvQkFDTCxJQUFJO3dCQUNBLE1BQU1FLE9BQU8sTUFBTWhCLGlEQUFVLENBQUMsQ0FBQywwREFBMEQsRUFBRWUsT0FBTyxDQUFDLEVBQUU7NEJBQ2pHRCxLQUFLSSxTQUFTSjt3QkFDbEI7d0JBQ0EsT0FBT0UsS0FBS0csSUFBSSxDQUFDQyxZQUFZLENBQUNDLElBQUk7b0JBQ3RDLEVBQUUsT0FBT0MsT0FBWTt3QkFDakIsTUFBTSxJQUFJQyxNQUFNRCxNQUFNRSxPQUFPLEVBQUM7b0JBQ2xDO2dCQUNKLE9BQU87b0JBQ0gsSUFBSTt3QkFDQSxNQUFNUixRQUFZLE1BQU1oQixpREFBVSxDQUFDLENBQUMsMENBQTBDLENBQUMsRUFBRTs0QkFDN0VZOzRCQUNBQzt3QkFDSjt3QkFDQSxJQUFHRyxNQUFLRyxJQUFJLENBQUNNLFlBQVksS0FBRyxLQUFJOzRCQUM1QixPQUFPVCxNQUFLRyxJQUFJLENBQUNDLFlBQVk7d0JBQ2pDLE9BQUs7NEJBQ0QsTUFBTSxJQUFJRyxNQUFNUCxNQUFLRyxJQUFJLENBQUNPLGVBQWUsRUFBQzt3QkFDOUMsQ0FBQztvQkFDTCxFQUFFLE9BQU9KLFFBQVk7d0JBQ2pCLE1BQU0sSUFBSUMsTUFBTUQsT0FBTUUsT0FBTyxFQUFDO29CQUNsQztnQkFDSixDQUFDO1lBQ0w7UUFDSjtLQUtIO0lBQ0RHLFdBQVc7UUFDUCxNQUFNdkIsUUFBTyxFQUFFWSxLQUFJLEVBQUUsRUFBRTtZQUNuQiw4QkFBOEI7WUFDOUIsSUFBSUEsTUFBTTtnQkFDVix5QkFBeUI7Z0JBQ3JCLE9BQU8sSUFBSTtZQUNmLE9BQU87Z0JBQ1AsMEJBQTBCO2dCQUN0QixPQUFPLEtBQUs7WUFDaEIsQ0FBQztRQUNMO1FBQ0EsTUFBTVksVUFBUyxFQUFFQyxRQUFPLEVBQUUsRUFBRTtZQUM1QixxQ0FBcUM7WUFDakMsT0FBT0E7UUFDWDtRQUNBLE1BQU1DLEtBQUksRUFBRUMsTUFBSyxFQUFFZixLQUFJLEVBQUUsRUFBRTtZQUN4Qiw0Q0FBNEM7WUFDM0MsSUFBSUEsTUFBTTtnQkFDTixPQUFPO29CQUNILEdBQUdlLEtBQUs7b0JBQ1JmO2dCQUNKO1lBQ0osQ0FBQztZQUNELE9BQU9lO1FBQ1g7UUFDQSxNQUFNMUIsU0FBUSxFQUFFQSxRQUFPLEVBQUUwQixNQUFLLEVBQUUsRUFBRTtZQUMvQix5REFBeUQ7WUFDeEQsSUFBSUEsT0FBTztnQkFDUCxPQUFPO29CQUNILEdBQUcxQixPQUFPO29CQUFFVyxNQUFNZSxNQUFNZixJQUFJO2dCQUNoQztZQUNKLENBQUM7WUFDRCxPQUFPWDtRQUNYO0lBQ0o7QUFDSixFQUFDO0FBQ0QsaUVBQWVOLGdEQUFRQSxDQUFDRyxZQUFZQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJhZGluZ2FwcG5leHQvLi9zcmMvcGFnZXMvYXBpL1suLi5uZXh0YXV0aF0udHM/Y2YxYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgTmV4dEF1dGhPcHRpb25zLCBTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xuaW1wb3J0IEdpdGh1YlByb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvZ2l0aHViJ1xuaW1wb3J0IHsgdXJsIH0gZnJvbSAnaW5zcGVjdG9yJ1xuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gICAgcGFnZXM6IHtcbiAgICAgICAgc2lnbkluOiAnL3NpZ25pbidcbiAgICB9LFxuICAgIHNlc3Npb246IHtcbiAgICAgICAgc3RyYXRlZ3k6ICdqd3QnLFxuICAgICAgICBtYXhBZ2U6IDMwMFxuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgICAgICAgbmFtZTogJ2NyZWRlbnRpYWxzJyxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB7fSxcbiAgICAgICAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZW1haWxJZCwgcGFzc3dvcmQsIE9UUCwgdXNlcklkIH0gPSBjcmVkZW50aWFscyBhcyB7IGVtYWlsSWQ6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgT1RQOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nIH1cbiAgICAgICAgICAgICAgICBpZiAoT1RQKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXhpb3MucG9zdChgaHR0cDovL2xvY2FsaG9zdDo1MDAwL3RyYWRlLUFwcC9jb21tb24vdmVyaWZ5U2VjdXJpdHlDb2RlLyR7dXNlcklkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPVFA6IHBhcnNlSW50KE9UUClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci5kYXRhLnJlc3BvbnNlRGF0YS5Vc2VyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXI6IGFueSA9IGF3YWl0IGF4aW9zLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC90cmFkZS1BcHAvdXNlci9sb2dpbmAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlci5kYXRhLnJlc3BvbnNlQ29kZT09PTIwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIuZGF0YS5yZXNwb25zZURhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih1c2VyLmRhdGEucmVzcG9uc2VNZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIC8vIEdpdGh1YlByb3ZpZGVyKHtcbiAgICAgICAgLy8gICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HSVRIVUJfQ0xJRU5UX0lEISxcbiAgICAgICAgLy8gICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR0lUSFVCX0NMSUVOVF9TZWNyZXRzIVxuICAgICAgICAvLyB9KVxuICAgIF0sXG4gICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGFzeW5jIHNpZ25Jbih7IHVzZXIgfSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1NlY29uZicsIHVzZXIpXG4gICAgICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ1RydWUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ2Vycm9yJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgcmVkaXJlY3QoeyBiYXNlVXJsIH0pIHtcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ2Jhc2VVcmwnLCBiYXNlVXJsKVxuICAgICAgICAgICAgcmV0dXJuIGJhc2VVcmxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnVXNlcicsIHVzZXIsICdUT2tlbicsIHRva2VuKVxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgdXNlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0b2tlblxuICAgICAgICB9LFxuICAgICAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2Vzc2lvblRva2VuJywgdG9rZW4sICdzZXNzaW9uJywgc2Vzc2lvbilcbiAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnNlc3Npb24sIHVzZXI6IHRva2VuLnVzZXIgYXMgU2Vzc2lvblsndXNlciddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICAgICAgfSxcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aChhdXRoT3B0aW9ucykiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJheGlvcyIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJhdXRoT3B0aW9ucyIsInBhZ2VzIiwic2lnbkluIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiYXV0aG9yaXplIiwiZW1haWxJZCIsInBhc3N3b3JkIiwiT1RQIiwidXNlcklkIiwidXNlciIsInBvc3QiLCJwYXJzZUludCIsImRhdGEiLCJyZXNwb25zZURhdGEiLCJVc2VyIiwiZXJyb3IiLCJFcnJvciIsIm1lc3NhZ2UiLCJyZXNwb25zZUNvZGUiLCJyZXNwb25zZU1lc3NhZ2UiLCJjYWxsYmFja3MiLCJyZWRpcmVjdCIsImJhc2VVcmwiLCJqd3QiLCJ0b2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();