function MapGenerator(holder) {
    this.mAlertWindow = null;
    var GODMODE = false;

    function complexAlert(windowTitle, content, primaryBtnTitle, callback) {
        mAlertWindow = new Window("dialog", windowTitle);
        mAlertWindow.orientation = "column";
        mAlertWindow.add("statictext", undefined, content);
        var buttonGroup = mAlertWindow.add("group");
        buttonGroup.orientation = "row";
        var primaryBtn = buttonGroup.add("button", undefined, primaryBtnTitle);
        var closeBtn = buttonGroup.add("button", undefined, "Close");
        primaryBtn.onClick = function() {
            callback(true);
            mAlertWindow.close();
        };
        closeBtn.onClick = function() {
            callback(false);
            mAlertWindow.close();
        };
        mAlertWindow.show();
    }
    if (Array.prototype.filter == undefined) {
        Array.prototype.filter = function(fun) {
            "use strict";
            if (this === void(0) || this === null) {
                throw new TypeError()
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") {
                throw new TypeError()
            }
            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void(0);
            for (var i = 0; i < len; i += 1) {
                if (i in t) {
                    var val = t[i];
                    if (fun.call(thisArg, val, i, t)) {
                        res.push(val)
                    }
                }
            }
            return res;
        };
    }
    if (typeof JSON !== "object") {
        JSON = {};
    }

    function() {
        "use strict";
        var rx_one = /^[\],:{}\s]*$/;
        var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
        var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

        function f(n) {
            return n < 10 ? "0" + n : n;
        }

        function this_value() {
            return this.valueOf();
        }
        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function() {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
            };
            Boolean.prototype.toJSON = this_value;
            Number.prototype.toJSON = this_value;
            String.prototype.toJSON = this_value;
        }

        function quote(string) {
            rx_escapable.lastIndex = 0;
            return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function(a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + "0000" + a.charCodeAt(0).toString(16).slice(-4);
            }) + "\"" : "\"" + string + "\"";
        }

        function str(key, holder) {
            var mind = gap;
            var value = holder[key];
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
                value = value.toJSON(key);
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value);
            }
            switch (typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value):
                        "null";
                    case "boolean":
                    case "null":
                        return String(value);
                    case "object":
                        if (!value) {
                            return "null";
                        }
                        gap += indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === "[object Array]") {
                            length = value.length;
                            for (var i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || "null";
                            }
                            v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                            gap = mind;
                            return v;
                        }
                        if (rep && typeof rep === "object") {
                            length = rep.length;
                            for (var i = 0; i < length; i += 1) {
                                if (typeof rep[i] === "string") {
                                    k = rep[i];
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + gap ? ": " : ":" + v);
                                    }
                                }
                            }
                        } else {
                            for (var k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + gap ? ": " : ":" + v);
                                    }
                                }
                            }
                        }
                        v = partial.length === 0 ? "{}":
                            gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}":
                                "{" + partial.join(",") + "}";
                                gap = mind;
                                return v;
            }
        }
        if (typeof JSON.stringify !== "function") {
            meta = {
                "": "\\b",
                "	": "\\t",
                "
": "\\n",
                "": "\\f",
                "
": "\\r",
                ""
                ": "\\\"",
                "\": "\\\\"
};
JSON.stringify = function (value, replacer, space) {
gap = "
                ";
indent = "
                ";
if (typeof space === "
                number ") {
for (var i = 0;i < space; i += 1) {
indent += "
                ";
}
} else {
if (typeof space === "
                string ") {
indent = space;
}
}
rep = replacer;
if (replacer && typeof replacer !== "
                function " && typeof replacer !== "
                object " || typeof replacer.length !== "
                number ") {
throw new Error("
                JSON.stringify ")
}
return str("
                ", {
"
                ": value
});
};
}
if (typeof JSON.parse !== "
                function ") {
JSON.parse = function (text, reviver) {
function walk(holder, key) {
var value = holder[key];
if (value && typeof value === "
                object ") {
for (var k in value) {
if (Object.prototype.hasOwnProperty.call(value, k)) {
v = walk(value, k);
if (v !== undefined) {
value[k] = v;
} else {
delete value[k];
}
}
}
}
return reviver.call(holder, key, value);
}
text = String(text);
rx_dangerous.lastIndex = 0;
if (rx_dangerous.test(text)) {
text = text.replace(rx_dangerous, function (a) {
return "\\u " + "
                0000 " + a.charCodeAt(0).toString(16).slice(-4);
});
}
if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "
            "))) {
j = eval(" (" + text + ")");
return typeof reviver === "
            function " ? walk({
"
            ": j
}, "
            ") : j;
}
return null;
};
}
}();
function Base64() {
_keyStr = "
            ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 + /=";
this.encode = function (input) {
var output = "";
var i = 0;
input = _utf8_encode(input);
while (i < input.length) {
chr1 = input.charCodeAt(i++);
chr2 = input.charCodeAt(i++);
chr3 = input.charCodeAt(i++);
enc1 = chr1 >> 2;
enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
enc4 = chr3 & 63;
if (isNaN(chr2)) {
enc3 = enc4 = 64;
} else {
if (isNaN(chr3)) {
enc4 = 64;
}
}
output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
}
return output;
};
this.decode = function (input) {
var output = "";
var i = 0;
input = input.replace(/ [ ^ A - Za - z0 - 9\ + \ / \ = ] / g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };
    _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n += 1) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode((((c & 15) << 12) | ((c2 & 63) << 6)) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
}

function removeHeaders(binary) {
    var bContinue = true;
    var line = "";
    var httpheader = "";
    var nFirst = 0;
    var count = 0;
    while (bContinue) {
        line = getLine(binary);
        httpheader = httpheader + line;
        bContinue = line.length >= 2;
        nFirst = line.length + 1;
        binary = binary.substr(nFirst);
    }
    return binary;
}

function getLine(html) {
    var line = "";
    for (var i = 0; html.charCodeAt(i) != 10; i++) {
        line += html[i];
    }
    return line;
}

function httpRequest(url, port, timeout) {
    if (arguments.length == 1) {
        url = arguments[0];
        port = 80;
    }
    var httpPrefix = url.match(/http:\/\//) || url.match(/https:\/\//);
    var domain = httpPrefix == null ? url.split("/")[0] + ":" + port : url.split("/")[2] + ":" + port;
    var call = "GET " + httpPrefix == null ? "http://" + url : url + " HTTP/1.0\r\nHost:" + httpPrefix == null ? url.split("/")[0] : url.split("/")[2] + "\r\nUser-Agent:Adobe\r\nConnection: close\r\n\r\n";
    var conn = new Socket();
    conn.encoding = "binary";
    conn.timeout = timeout;
    var reply = "";
    var typeMatch = url.match(/(\.)(\w{3,4}\b)/g);
    if (conn.open(domain, "binary")) {
        conn.write(call);
        while (!conn.eof) {
            reply = reply + conn.read(9999999);
        }
        conn.close();
        return removeHeaders(reply);
    }
    return null;
}

function openWebsite(url) {
    if ($.os.indexOf("Windows") != -1) {
        system.callSystem("C:/Program Files/Internet Explorer/iexplore.exe " + url);
    } else {
        system.callSystem("open \"" + url + "\"");
    }
}

function trimStringSpace(str) {
    return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}

function getPurchaseCode() {
    if (app.settings.haveSetting("MotionApe", "PurchaseCode")) {
        return trimStringSpace(app.settings.getSetting("MotionApe", "PurchaseCode"));
    }
    return null;
}

function saveUseHttpPreference(useHttp) {
    app.settings.saveSetting("MotionApe", "UseHttpConnection", useHttp ? "1" : "0");
}

function checkUseHttpPreference() {
    if (app.settings.haveSetting("MotionApe", "UseHttpConnection")) {
        return app.settings.getSetting("MotionApe", "UseHttpConnection") == "1";
    }
    return false;
}

function savePurchaseCode(key) {
    app.settings.saveSetting("MotionApe", "PurchaseCode", key);
}

function getAPIKey() {
    if (app.settings.haveSetting("MotionApe", "APIKey")) {
        return trimStringSpace(app.settings.getSetting("MotionApe", "APIKey"));
    }
    return null;
}

function saveAPIKey(key) {
    app.settings.saveSetting("MotionApe", "APIKey", key);
}

function getCachedPurchasedResult() {
    if (app.settings.haveSetting("MotionApe", "PurchaseResult")) {
        var encoded = trimStringSpace(app.settings.getSetting("MotionApe", "PurchaseResult"));
        var b = new Base64();
        return b.decode(encoded);
    }
    return null;
}

function saveCachedPurchasedResult(result) {
    var b = new Base64();
    app.settings.saveSetting("MotionApe", "PurchaseResult", b.encode(result));
}

function purchaseInfoFailNotice() {
    complexAlert("Registeration Fail", "Unable to register. Please check your information or update the template.", "Update", function(shouldUpdate) {
        if (shouldUpdate) {
            openWebsite("https://www.videohive.net/downloads");
        }
    });
}

function getRegistrationFeedback(apiKey, purchaseCode, timeout, useHttp) {
    if (useHttp === true) {
        var url = "http://www.motionape.com/vpurchase.php?apiKey=" + apiKey + "&purchaseCode=" + purchaseCode;
        return httpRequest(url, 80, timeout);
    } else {
        var url = "https://marketplace.envato.com/api/v3/motionape/" + apiKey + "/verify-purchase:" + purchaseCode + ".json";
        return httpRequest(url, 80, timeout);
    }
}

function checkUserRegistration(apiKey, purchaseCode, useHttp) {
    var result = getRegistrationFeedback(apiKey, purchaseCode, 10, useHttp);
    if (result != null) {
        if (result.indexOf("verify-purchase") != -1) {
            var resultInfo = JSON.parse(result);
            if (resultInfo["verify-purchase"].buyer != null) {
                alert("This product is purchased by " + resultInfo["verify-purchase"].buyer);
                saveCachedPurchasedResult(result);
                savePurchaseCode(purchaseCode);
                saveAPIKey(apiKey);
                return true;
            } else {
                alert("Purchase code is wrong, please check your info.");
                return false;
            }
        } else if (result == "Verify purchase Failed") {
            complexAlert("Update", "There is a new version, Please update the template to continue.", "Update", function(shouldUpdate) {
                if (shouldUpdate) {
                    openWebsite("https://www.videohive.net/downloads");
                }
            });
        } else {
            purchaseInfoFailNotice();
            return false;
        }
    } else {
        alert("The network connection is broken, please check.");
    }
    return false;
}

function checkCoordinate(_coordinate) {
    var coor = _coordinate.toString().replace(/\s+/g, "");
    var latitude = coor.toString().split(",")[0];
    var longitude = coor.toString().split(",")[1];
    if (!isNaN(latitude) && !isNaN(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
        return [latitude, longitude];
    } else {
        return false;
    }
}

function getCoordinations(textBoxs) {
    var locations = [];
    for (var i = 0; i < textBoxs.length; i += 1) {
        var needUpdate = textBoxs[i].checkbox.value;
        if (needUpdate) {
            var result = checkCoordinate(textBoxs[i].value.text);
            if (result === false) {
                alert("Coordinates of location " + i + 1 + " is invalid, please check!");
                return false;
            } else {
                locations.push({
                    coords: result,
                    needUpdate: true,
                    index: i
                });
            }
        } else {
            locations.push({
                coords: [0, 0],
                needUpdate: false,
                index: i
            });
        }
    }
    return locations;
}

function updateCoordinatesFromComp(arrs) {
    var comp = getCompByName("Coordinates");
    if (comp == null) {
        alert("Can't find comp 'Coordinates', action abort");
    } else {
        for (var i = 0; i < arrs.length; i += 1) {
            var layer = getLayerByName(i < 9 ? "Coordinate Value 0" + i + 1 : "Coordinate Value " + i + 1, comp);
            if (layer && layer instanceof TextLayer) {
                var coordinateString = layer.property("sourceText").value;
                if (checkCoordinate(coordinateString)) {
                    arrs[i].value.text = coordinateString;
                } else {
                    return;
                }
            }
        }
    }
}

function addLocationBox(arr, container) {
    var gr = container.add("group");
    gr.preferredSize.height = 50;
    gr.orientation = "row";
    var label = gr.add("statictext", undefined, "Location " + arr.length + 1 + ":");
    var checkBox = gr.add("checkbox", undefined, undefined);
    checkBox.value = true;
    var location = gr.add("edittext", undefined, "0,0");
    location.alignment = ["fill", "center"];
    arr.push({
        checkbox: checkBox,
        value: location
    });
}

function getCompByName(name) {
    for (var i = 1; i <= app.project.numItems; i += 1) {
        if (app.project.item(i).name == name) {
            return app.project.item(i);
        }
    }
    return null;
}

function getLayerByName(name, comp) {
    for (var i = 1; i <= comp.layers.length; i += 1) {
        if (comp.layers[i].name == name) {
            return comp.layers[i];
        }
    }
    return null;
}

function changeCompLoactionCoordinates(locations) {
    var comp = getCompByName("Coordinates");
    if (comp == null) {
        alert("Can't find comp 'Coordinates', action abort");
    } else {
        for (var i = 0; i < locations.length; i += 1) {
            if (locations[i].needUpdate) {
                var layer = getLayerByName(i < 9 ? "Coordinate Value 0" + i + 1 : "Coordinate Value " + i + 1, comp);
                if (layer && layer instanceof TextLayer) {
                    layer.property("sourceText").setValue(locations[i].coords[0].toString() + "," + locations[i].coords[1].toString());
                }
            }
        }
    }
}

function getProjectFolder() {
    var projectFile = app.project.file;
    if (!projectFile) {
        alert("Please save the project first!");
    } else {
        var imageFolder = new Folder(projectFile.path + "/(Footage)/05 SOURCE/Images/Map Images");
    }
}

function checkProjectLocation() {
    var result = false;
    var projectFile = app.project.file;
    if (!projectFile) {
        result = false;
    } else {
        if (projectFile.parent.displayName == "01 Ultimate Earth Zoom Toolkit") {
            var imageFolder = new Folder(projectFile.path + "/(Footage)/05 SOURCE/Images/Map Images");
            result = imageFolder.exists;
        } else {
            if (projectFile.parent.displayName == "04 Preview Source Files") {
                var imageFolder = new Folder(projectFile.path + "/(Footage)/05 SOURCE/Images/Map Images");
                result = imageFolder.exists;
            }
        }
    }
    if (!result) {
        alert("Please save the project in the template folder:\n Project Files > 01 Ultimate Earth Zoom Toolkit > your project.aep");
    }
    return result;
}

function getMapFolder() {
    var projectFile = app.project.file;
    if (!projectFile) {
        return false;
    } else {
        var filePath = projectFile.fsName;
        if (system.osName != "MacOS") {
            filePath = filePath.substring(0, filePath.lastIndexOf("\\"));
        } else {
            filePath = filePath.substring(0, filePath.lastIndexOf("/"));
        }
        filePath = filePath.replace(/\\/g, "/");
        return filePath + "/(Footage)/05 SOURCE/Images/Map Images";
    }
    return false;
}

function getScriptSourceFolder() {
    if (system.osName == "MacOS") {
        return File($.fileName).path + "/MapGenerator";
    } else {
        var filePath = File($.fileName).fsName;
        filePath = filePath.substr(0, (filePath.length - File($.fileName).name.length) + 3);
        terPath = filePath + "/MapGenerator";
        return terPath;
    }
}

function perform(type, locations, folder, indices) {
    if (system.osName == "MacOS") {
        var filePath = File($.fileName).path + "/MapGenerator";
        var terPath = filePath.replace(/%20/g, "\\ ");
        var cmd = "open " + terPath + "/MapGenerator.app --args --disable-http-cache " + type + " \"" + locations + "\" \"" + folder + "\" \"" + indices + "\" ";
        var staus = system.callSystem(cmd);
        return staus;
    } else {
        var filePath = File($.fileName).fsName;
        filePath = filePath.substr(0, (filePath.length - File($.fileName).name.length) + 3);
        var terPath = filePath.replace(/\\/g, "\\");
        terPath = terPath + "\\MapGenerator";
        var cmd = "cmd.exe /c \"\"" + terPath + "\\MapGenerator.exe\" --disable-http-cache " + type + " \"" + locations + "\" \"" + folder + "\" \"" + indices + "\" " + "\"";
        var staus = system.callSystem(cmd);
        return staus;
    }
}

function downloadAllMaps(location, type) {
    if (checkProjectLocation()) {
        alert("A window will open to download maps for you.\n It will take some time, please don't close it.\n It will close automaticly after it's finished");
        var locationString = "[";
        var indexString = "[";
        for (var i = 0; i < location.length; i += 1) {
            locationString += "[" + location[i].coords[0] + "," + location[i].coords[1] + "]";
            indexString += location[i].index;
            if (i != (location.length - 1)) {
                locationString += ",";
                indexString += ",";
            }
        }
        locationString += "]";
        indexString += "]";
        var folder = getMapFolder();
        if (folder === false) {
            alert("no image folder");
            return;
        } else {
            perform(type, locationString, folder, indexString);
        }
    }
}
var scriptWindows = null;

function purchaseInfoStartUpCheck() {
    if (GODMODE) {
        scriptWindows.blockGr.visible = false;
        scriptWindows.buttonGr.visible = true;
        scriptWindows.layout.layout(true);
        return true;
    }
    var apiKey = getAPIKey();
    var purchaseCode = getPurchaseCode();
    var result = null;
    var checkingFromNetwork = false;
    if (apiKey && apiKey.length > 0 && purchaseCode && purchaseCode.length > 0) {
        result = getRegistrationFeedback(apiKey, purchaseCode, 3, true);
        checkingFromNetwork = true;
    } else {
        alert("Welcome, please register the script.");
        scriptWindows.blockGr.visible = true;
        scriptWindows.buttonGr.visible = false;
        scriptWindows.registerBtn.visible = true;
        scriptWindows.infoBox.visible = false;
        scriptWindows.layout.layout(true);
        scriptWindows.buildHelpWindow();
        return;
    }
    if (result == null) {
        result = getCachedPurchasedResult();
    }
    if (result != null) {
        if (result.indexOf("verify-purchase") != -1) {
            var resultInfo = JSON.parse(result);
            if (resultInfo["verify-purchase"].buyer != null) {
                scriptWindows.blockGr.visible = false;
                scriptWindows.buttonGr.visible = true;
                scriptWindows.layout.layout(true);
                return true;
            } else {
                saveAPIKey("");
                savePurchaseCode("");
                saveCachedPurchasedResult("");
                purchaseInfoFailNotice();
                scriptWindows.blockGr.visible = true;
                scriptWindows.buttonGr.visible = false;
                scriptWindows.registerBtn.visible = true;
                scriptWindows.infoBox.visible = false;
                scriptWindows.layout.layout(true);
                return false;
            }
        } else {
            if (result == "Verify purchase Failed") {
                complexAlert("Update", "There is a new version, Please update the template to continue.", "Update", function(shouldUpdate) {
                    if (shouldUpdate) {
                        openWebsite("https://www.videohive.net/downloads");
                    }
                });
                saveAPIKey("");
                savePurchaseCode("");
                saveCachedPurchasedResult("");
                purchaseInfoFailNotice();
                scriptWindows.blockGr.visible = true;
                scriptWindows.buttonGr.visible = false;
                scriptWindows.registerBtn.visible = true;
                scriptWindows.infoBox.visible = false;
                scriptWindows.layout.layout(true);
                return false;
            }
        }
    } else {
        if (checkingFromNetwork) {
            saveAPIKey("");
            savePurchaseCode("");
            saveCachedPurchasedResult("");
            alert("The network connection is broken, please check.");
            scriptWindows.blockGr.visible = true;
            scriptWindows.buttonGr.visible = false;
            scriptWindows.registerBtn.visible = true;
            scriptWindows.infoBox.visible = false;
            scriptWindows.layout.layout(true);
            return false;
        }
    }
    saveAPIKey("");
    savePurchaseCode("");
    saveCachedPurchasedResult("");
    purchaseInfoFailNotice();
    scriptWindows.blockGr.visible = true;
    scriptWindows.buttonGr.visible = false;
    scriptWindows.registerBtn.visible = true;
    scriptWindows.infoBox.visible = false;
    scriptWindows.layout.layout(true);
    return false;
}

function buildUI() {
    scriptWindows = holder instanceof Panel ? holder : new Window("palette", "Map image generator", undefined, {
        resizeable: true
    });
    var mainGroup = scriptWindows.add("group");
    mainGroup.orientation = "column";
    mainGroup.alignment = ["fill", "fill"];
    var group = mainGroup.add("group");
    group.minimumSize = [300, 600];
    group.maximumSize.width = 400;
    group.orientation = "column";
    group.alignment = ["center", "top"];
    group.alignChildren = ["fill", "top"];
    var titleImageFile = new File(getScriptSourceFolder() + "/title.png");
    var title = group.add("iconbutton", undefined, getScriptSourceFolder() + "/title.png", {
        style: "toolbutton"
    });
    title.preferredSize.height = 60;
    var locationsInputers = [];
    for (var i = 0; i < 10; i += 1) {
        addLocationBox(locationsInputers, group);
    }
    var mapTypeGr = group.add("panel", undefined, "Map source");
    mapTypeGr.orientation = "row";
    mapTypeGr.alignChildren = ["fill", "fill"];
    var googleMap = mapTypeGr.add("radiobutton", undefined, "Google Map");
    var bingMap = mapTypeGr.add("radiobutton", undefined, "Bing Map");
    var bottomGr = group.add("group");
    bottomGr.orientation = "stack";
    bottomGr.alignChildren = ["fill", "fill"];
    scriptWindows.blockGr = bottomGr.add("group");
    scriptWindows.blockGr.orientation = "stack";
    scriptWindows.blockGr.alignment = ["fill", "fill"];
    scriptWindows.blockGr.alignChildren = ["fill", "fill"];
    scriptWindows.infoBox = scriptWindows.blockGr.add("statictext", undefined, "Checking for purchase info");
    scriptWindows.infoBox.preferredSize.height = 40;
    scriptWindows.registerBtn = scriptWindows.blockGr.add("button", undefined, "Register Script");
    scriptWindows.registerBtn.preferredSize.height = 40;
    scriptWindows.registerBtn.visible = false;
    scriptWindows.buttonGr = bottomGr.add("panel");
    scriptWindows.buttonGr.visible = false;
    scriptWindows.buttonGr.orientation = "row";
    var generateButton = scriptWindows.buttonGr.add("button", undefined, "Download Map Images");
    generateButton.alignment = ["fill", "fill"];
    generateButton.preferredSize.height = 40;
    generateButton.onClick = function() {
        if (!googleMap.value && !bingMap.value) {
            alert("You must select a map type to continue!");
            return;
        }
        var coordinates = getCoordinations(locationsInputers);
        if (coordinates !== false) {
            changeCompLoactionCoordinates(coordinates);
        }
        var needDownloadLocations = coordinates.filter(function(c) {
            return c.needUpdate;
        });
        downloadAllMaps(needDownloadLocations, googleMap.value ? "google" : "bing");
    };
    var updateButton = scriptWindows.buttonGr.add("button", undefined, "Update Coordinates");
    updateButton.alignment = ["right", "fill"];
    updateButton.onClick = function() {
        updateCoordinatesFromComp(locationsInputers);
    };
    var helpButton = scriptWindows.buttonGr.add("button", undefined, "?");
    helpButton.alignment = ["right", "fill"];
    scriptWindows.buildHelpWindow = function() {
        helpWin = new Window("palette", "Help");
        helpWin.preferredSize = [400, 200];
        var panel = helpWin.add("panel", undefined, "Register");
        panel.alignment = ["fill", "top"];
        panel.orientation = "column";
        panel.alignChildren = ["fill", "top"];
        var apiGr = panel.add("group");
        apiGr.alignment = ["fill", "fill"];
        apiGr.add("statictext", undefined, "API key");
        var apiKeyBox = apiGr.add("edittext", undefined);
        apiKeyBox.alignment = ["fill", "fill"];
        var purchaseCodeGr = panel.add("group");
        purchaseCodeGr.alignment = ["fill", "fill"];
        purchaseCodeGr.add("statictext", undefined, "Purchase code");
        var purchaseCodeBox = purchaseCodeGr.add("edittext", undefined);
        purchaseCodeBox.alignment = ["fill", "fill"];
        var useHttpConnection = panel.add("checkbox", undefined, "Use http as alternative connection");
        useHttpConnection.value = checkUseHttpPreference();
        useHttpConnection.onClick = function() {
            saveUseHttpPreference(useHttpConnection.value);
        };
        var registerBtn = panel.add("button", undefined, "Register");
        registerBtn.onClick = function() {
            var apiKey = apiKeyBox.text;
            apiKey = trimStringSpace(apiKey);
            var purchaseCode = purchaseCodeBox.text;
            purchaseCode = trimStringSpace(purchaseCode);
            if (apiKey.length == 0) {
                alert("Please enter API key!");
            } else {
                if (purchaseCode.length == 0) {
                    alert("Please enter purchase code!");
                } else {
                    if (checkUserRegistration(apiKey, purchaseCode, useHttpConnection.value)) {
                        scriptWindows.buttonGr.visible = true;
                        scriptWindows.blockGr.visible = false;
                        scriptWindows.registerBtn.visible = false;
                        scriptWindows.infoBox.visible = true;
                        scriptWindows.layout.layout(true);
                        helpWin.close();
                    } else {
                        savePurchaseCode(purchaseCode);
                        saveAPIKey(apiKey);
                        saveCachedPurchasedResult("");
                        scriptWindows.buttonGr.visible = false;
                        scriptWindows.blockGr.visible = true;
                        scriptWindows.registerBtn.visible = true;
                        scriptWindows.infoBox.visible = false;
                        scriptWindows.layout.layout(true);
                    }
                }
            }
        };
        apiKeyBox.onChange = purchaseCodeBox.onChange = function() {
            if (!registerBtn.enabled) {
                registerBtn.enabled = true;
            }
        };
        if (!scriptWindows.blockGr.visible) {
            apiKeyBox.text = getAPIKey();
            purchaseCodeBox.text = getPurchaseCode();
            registerBtn.enabled = false;
        }
        var panel2 = helpWin.add("group");
        panel2.alignment = ["fill", "top"];
        panel2.orientation = "row";
        panel2.alignChildren = ["fill", "top"];
        var downloadBtn = panel2.add("button", undefined, "Update");
        downloadBtn.onClick = function() {
            openWebsite("https://videohive.net/downloads");
        };
        var productBtn = panel2.add("button", undefined, "Product Page");
        productBtn.onClick = function() {
            openWebsite("https://videohive.net/item/ultimate-earth-zoom-toolkit/10354880");
        };
        var feedbackBtn = panel2.add("button", undefined, "Submit Feedback");
        feedbackBtn.onClick = function() {
            openWebsite("https://videohive.net/item/ultimate-earth-zoom-toolkit");
        };
        helpWin.add("statictext", undefined, "Script developed by Lieutenant");
        helpWin.show();
    };
    helpButton.onClick = function() {
        scriptWindows.buildHelpWindow();
    };
    scriptWindows.registerBtn.onClick = function() {
        scriptWindows.buildHelpWindow();
    };
    scriptWindows.layout.layout(true);
    scriptWindows.layout.resize();
    scriptWindows.onResizing = scriptWindows.onResize = function() {
        this.layout.resize();
    };
}

function isSecurityPrefSet() {
    var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
    return securitySetting == 1;
}
if (isSecurityPrefSet() == true) {
    buildUI();
    if (scriptWindows != null && scriptWindows instanceof Window) {
        scriptWindows.show();
    }
    purchaseInfoStartUpCheck();
} else {
    alert(localize({
        en: "This script requires access to write files.\nGo to the \"General\" panel of the application preferences and make sure \"Allow Scripts to Write Files and Access Network\" is checked.",
        de: "Dieses Skript benötigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik \"Allgemein\" und aktiviere die Option \"Skripten können Dateien schreiben und haben Netzwerkzugang\".",
        fr: "Ce script nécessite les droits d'écriture de fichiers.\nAllez dans le panneau \"Général\" des préférences de l'application et cochez \n\"Autoriser les scripts à écrire des fichiers et à accéder au réseau\""
    }));
}
}(this);
