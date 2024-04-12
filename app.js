#! /usr/bin/env node
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
//01
var chalk_1 = require("chalk");
var inquirer_1 = require("inquirer");
//*************STEPS TO BUILD THE CURRENCY CONVERTER***********************
//Step 01 Import required packages
//Step 02 Generate API key from exchangerate-api.com
//Step 03 Fetch data from the API
//Step 04 Convert object.keys into array
//Step 05 Creating Questions using Inquirer
//Step 06 Conversion Rate
//Step 07 Fetching data for conversion rate
//Step 08 Converting rate into amount
//02
var apiLink = "https://v6.exchangerate-api.com/v6/9b2f0b58760d97970ab45a1e/latest/PKR";
//03
var fetchData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var fetchData, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(data)];
            case 1:
                fetchData = _a.sent();
                return [4 /*yield*/, fetchData.json()];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.conversion_rates];
        }
    });
}); };
var data = await fetchData(apiLink);
//04
var countries = Object.keys(data);
//05
var firstCountry = await inquirer_1.default.prompt([
    {
        type: "list",
        name: "name",
        message: "Converting From:",
        choices: countries,
    },
]);
var userMoney = await inquirer_1.default.prompt([
    {
        type: "number",
        name: "money",
        message: "Enter your amount in ".concat(chalk_1.default.greenBright.bold(firstCountry.name))
    }
]);
var secondCountry = await inquirer_1.default.prompt([
    {
        type: "list",
        name: "name",
        message: "Converting To:",
        choices: countries,
    },
]);
//06
var conversionRate = "https://v6.exchangerate-api.com/v6/9b2f0b58760d97970ab45a1e/pair/".concat(firstCountry.name, "/").concat(secondCountry.name);
//07
var conversionData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var cnvData, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(data)];
            case 1:
                cnvData = _a.sent();
                return [4 /*yield*/, cnvData.json()];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.conversion_rate];
        }
    });
}); };
var cnvRate = await conversionData(conversionRate);
//08
var convertedRate = await userMoney.money * cnvRate;
var result = "Your ".concat(chalk_1.default.cyanBright.bold(firstCountry.name), " ").concat(chalk_1.default.cyanBright.bold(userMoney.money), " in ").concat(chalk_1.default.cyanBright.bold(secondCountry.name), " is ").concat(chalk_1.default.cyanBright.bold(convertedRate));
console.log(result);
