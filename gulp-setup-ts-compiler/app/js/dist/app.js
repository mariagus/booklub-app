"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var url = new URL("https://openlibrary.org/search.json");
var favorites = { data: [] };
var handleSubmit = function () {
    document.querySelector("ul").innerHTML = "";
    var titleVal = document.querySelector("#title").value;
    var authorVal = document.querySelector("#author").value;
    var searchObject = {};
    if (titleVal) {
        searchObject["title"] = titleVal;
    }
    if (authorVal) {
        searchObject["author"] = authorVal;
    }
    url.search = new URLSearchParams(searchObject);
    getBook();
};
var submit = document.querySelector("#submit");
submit.addEventListener("click", function (e) {
    e.preventDefault();
    handleSubmit();
});
var getBook = function () { return __awaiter(void 0, void 0, void 0, function () {
    var hbs, hbsData, data, result, template, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch("template.hbs")];
            case 1:
                hbs = _a.sent();
                return [4, hbs.text()];
            case 2:
                hbsData = _a.sent();
                return [4, fetch(url)];
            case 3:
                data = _a.sent();
                return [4, data.json()];
            case 4:
                result = _a.sent();
                template = Handlebars.compile(hbsData);
                html = template(result);
                document.querySelector("#searchResults").innerHTML = html;
                addToLibrary();
                return [2];
        }
    });
}); };
var addToLibrary = function () {
    var btn = document.querySelectorAll(".add");
    btn.forEach(function (button) {
        button.addEventListener("click", function (event) {
            if (event.target.textContent !== "Added") {
                event.target.textContent = "Added";
                favorites.data.push({
                    cover_i: event.target.parentNode
                        .querySelector("img")
                        .getAttribute("src"),
                    title: event.target.parentNode.querySelector(".title")
                        .textContent,
                    author: event.target.parentNode.querySelector(".author")
                        .textContent,
                    first_published: event.target.parentNode.querySelector(".firstPublished").textContent,
                });
                displayFavorites();
            }
        });
    });
};
var displayFavorites = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, result, template, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch("myLibrary.hbs")];
            case 1:
                data = _a.sent();
                return [4, data.text()];
            case 2:
                result = _a.sent();
                template = Handlebars.compile(result);
                html = template(favorites);
                document.querySelector("#myFavorites").innerHTML = html;
                return [2];
        }
    });
}); };
