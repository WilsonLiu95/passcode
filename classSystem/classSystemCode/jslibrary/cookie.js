// cookie
var CookieUtile = {
  get: function (name){
    var cookieName = encodeURIComponent(name) + "=",
        cookieStart =document.cookie.indexOf(cookieName),
        cookieVaule = null;
    if (cookieStart > -1) {
      var cookieEnd = document.cookie.indexOf(cookieName);
      if (cookieEnd == -1) {
      var cookieEnd =document.cookie.length;
      }
    cookieVaule = decodeURIComponent(document.cookie.substring(cookieStart
      + cookieName.length, cookieEnd));
    }
  return cookieVaule;
},

  set: function (name,value,expires,path,domain,secure){
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += "; expires=" + expires.toGMTString();
    }
    if (path) {
      cookieText += "; path=" + path;
    }
    if (domain) {
      cookieText += "; domain=" + domain;
    }
    if (secure) {
      cookieText += "; secure";
    }
    document.cookie = cookieText;
  },
  unset: function (name,path,domain,secure){
    this.set(name,"", new Date(0), path,domain, secure);
  }
}

var SubCookieUtil = {
  get: function (name, subName){
    var subCookies = this.getAll(name);
    if (subCookies) {
      return subCookies[subName];
    }else {
      return null;
    }
  },
  getAll: function(name){
    var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieVaule = null,
        cookieEnd,
        subCookies,
        i,
        parts,
        result = {};

    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(";",cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieVaule = document.cookie.substring(cookieStart + cookieName.length,cookieEnd);
      if (cookieVaule.length > 0) {
        subCookies = cookieVaule.split("&");
        for (i = 0,len=subCookies.length; i < len; i++) {
          parts = subCookies[i].split("=");
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return result;

      }
    }
    return null;
  },

  set: function (name,subName,value,expires,path,domain,secure) {
    var subCookies = this.getAll(name) || {};
    subCookies[subName] = value;
    this.setAll(name,subCookies,expires,path,domain,secure);
  },
  setAll: function(name, subCookies, expires, path, domain, secure){
    var cookieText = encodeURIComponent(name) + "=",
        subName;
    for (subName in subCookies){
      if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
        subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
      }
    }
    if (cookieParts.length > 0) {
      cookieText += subcookieParts.join("&");
      if (expires instanceof Date) {
        cookieText += ";expires=" + expires.toGMTString();
      }
      if (path) {
        cookieText += "; path=" + path;
      }
      if (domain) {
        cookieText += "; domain=" + domain;
      }
      if (secure) {
        cookieText += "; secure";
      }
    }else {
      cookieText += "; expiress=" + (new Date(0)).toGMTString();
    }
    document.cookie = cookieText;
  },
  unset: function (name, subName, path, domain, secure){
    var subcookies = this.getAll(name);
    if (subcookies) {
      delete subcookies[subname];
      this.setAll(name, subcookies, null, path, domain, secure);
    }
  },
  unsetAll: function(name, path, domain, secure){
    this.setAll(name,null,new Date(0), path, domain, secure);
  }

}
