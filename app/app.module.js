import angular from "angular";
import uiRouter from "angular-ui-router";

import appConfig from "./app.config.js";
import homeController from "./controllers/home/home.controller";

angular.module("weatherApp", [uiRouter]).controller("homeController", homeController).config(appConfig);