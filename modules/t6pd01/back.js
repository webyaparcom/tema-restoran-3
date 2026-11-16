/**
 * page-desc — back.js
 * Yan menu: kategori / categorypage verisine gore (tillo: category.json ust kategoriler).
 * Icerik: gorsel solda, aciklama + desc etiketleri sagda; uzun metin altta.
 */

function pdPick(val) {
  if (val == null) return "";
  if (typeof val === "object") {
    return val[json.lang] || val.tr || "";
  }
  return String(val);
}

var finalHtml = "";
if (page["text"] != undefined && page["text"][json.lang]) {
  var rawText = page["text"][json.lang];
  var isHtml =
    typeof rawText === "string" &&
    (rawText.trim().indexOf("<") === 0 || rawText.indexOf("<style") !== -1);
  if (isHtml) {
    finalHtml = rawText;
  } else {
    var lines = rawText.split("\n");
    var htmlContent = [];
    var li;
    for (li = 0; li < lines.length; li++) {
      if (lines[li]) {
        htmlContent.push("<p>" + lines[li] + "</p>");
      }
    }
    var ulIndex = htmlContent.lastIndexOf("</li>");
    if (ulIndex !== -1) {
      htmlContent.splice(ulIndex + 1, 0, "</ul>");
    }
    finalHtml = htmlContent.join("\n");
  }
}
if (page["text"] != undefined) {
  html = html.replace(new RegExp("{{text}}", "g"), finalHtml);
} else {
  html = html.replace(new RegExp("{{text}}", "g"), "");
}

var getName = function(item) {
  if (!item) {
    return "";
  }
  if (item.name) {
    if (typeof item.name === "object") {
      return (
        item.name[json.lang] ||
        item.name.tr ||
        Object.values(item.name)[0] ||
        ""
      );
    }
    return item.name;
  }
  return "";
};

var pageSlug = function(item) {
  if (!item || typeof item !== "object") {
    return "";
  }
  var n = item.pathnext;
  if (n != null && String(n).trim() !== "") {
    return String(n).trim();
  }
  return item.path != null ? String(item.path) : "";
};

var currentSlug = pageSlug(page);

/** Menu veri kaynagi: modul desing.category oncelikli, yoksa page.categorypage */
var menuSourceKey = "";
if (
  json.desing &&
  json.desing.category &&
  webmakerdata[json.desing.category] &&
  webmakerdata[json.desing.category].data
) {
  menuSourceKey = json.desing.category;
} else if (
  page.categorypage &&
  webmakerdata[page.categorypage] &&
  webmakerdata[page.categorypage].data
) {
  menuSourceKey = page.categorypage;
}

var pageData = menuSourceKey ? webmakerdata[menuSourceKey].data : [];

/** Sayfa category.json ust kategori satiri mi (urun grubu landing) */
var isCategoryHub = false;
if (webmakerdata.category && webmakerdata.category.data) {
  var hubIdx;
  for (hubIdx = 0; hubIdx < webmakerdata.category.data.length; hubIdx++) {
    if (
      webmakerdata.category.data[hubIdx].id === page.id &&
      webmakerdata.category.data[hubIdx].status === "play"
    ) {
      isCategoryHub = true;
      break;
    }
  }
}

var menuItems = [];
if (isCategoryHub && webmakerdata.category && webmakerdata.category.data) {
  menuItems = webmakerdata.category.data.filter(function(item) {
    return item.status === "play" && (!item.category || item.category === "");
  });
} else if (page.category && page.category !== "" && menuSourceKey === "products") {
  menuItems = pageData.filter(function(item) {
    return item.status === "play" && item.category === page.category;
  });
} else if (menuSourceKey === "category") {
  menuItems = pageData.filter(function(item) {
    return item.status === "play" && (!item.category || item.category === "");
  });
} else {
  menuItems = pageData.filter(function(item) {
    return item.status === "play";
  });
}

var pagelist = "";
var menuIdx;
for (menuIdx = 0; menuIdx < menuItems.length; menuIdx++) {
  var iterator = menuItems[menuIdx];
  var activeClass = pageSlug(iterator) === currentSlug ? " active" : "";
  pagelist +=
    '<a class="modulex-menu-link' +
    activeClass +
    '" href="' +
    wxLangInternalHref(pageSlug(iterator)) +
    '"><span class="modulex-menu-link-text">' +
    getName(iterator) +
    "</span></a>";
}

html = html.replace(new RegExp("{{pagelist}}", "g"), pagelist);

/** Gorsel: page.img veya varsayilan index.webp */
var descImgFile = "";
if (page["img"] != null && page["img"] !== undefined) {
  descImgFile = String(page["img"]).replace(/^\s+|\s+$/g, "");
}
if (descImgFile === "" && page["id"]) {
  descImgFile = "index.webp";
}

var hasDescImage = descImgFile !== "";

/** Sag sutun: kisa aciklama (description) */
var leadHtml = "";
if (page.description && page.description[json.lang]) {
  leadHtml =
    '<p class="modulex-lead">' + page.description[json.lang] + "</p>";
} else if (page.description && typeof page.description === "string") {
  leadHtml = '<p class="modulex-lead">' + page.description + "</p>";
}

/** products.json desc semasindan alan etiketi (olcu sistemi) */
var resolveDescLabel = function(pathKey) {
  var defs =
    webmakerdata.products && webmakerdata.products.desc
      ? webmakerdata.products.desc
      : null;
  var di;
  if (defs && defs.length) {
    for (di = 0; di < defs.length; di++) {
      if (defs[di].path === pathKey && defs[di].name) {
        if (typeof defs[di].name === "object") {
          return (
            defs[di].name[json.lang] ||
            defs[di].name.tr ||
            pathKey
          );
        }
        return defs[di].name;
      }
    }
  }
  return pathKey;
};

var formatDescValue = function(pathKey, rawVal) {
  var v = String(rawVal).replace(/^\s+|\s+$/g, "");
  if (v === "") {
    return "";
  }
  if (pathKey === "genislik" || pathKey === "derinlik" || pathKey === "yukseklik") {
    if (v.indexOf("cm") === -1) {
      return v + " cm";
    }
  }
  if (pathKey === "agirlik" && v.indexOf("kg") === -1) {
    return "~" + v + " kg";
  }
  return v;
};

/** Olculer tablosu (G × D × Y) */
var olcuTableHtml = "";
if (page.desc && page.desc.genislik && page.desc.derinlik && page.desc.yukseklik) {
  var gVal = formatDescValue("genislik", page.desc.genislik);
  var dVal = formatDescValue("derinlik", page.desc.derinlik);
  var yVal = formatDescValue("yukseklik", page.desc.yukseklik);
  var wRow = "";
  if (page.desc.agirlik) {
    wRow =
      "<tr><th>" +
      resolveDescLabel("agirlik") +
      "</th><td>" +
      formatDescValue("agirlik", page.desc.agirlik) +
      "</td></tr>";
  }
  var matRow = "";
  if (page.desc.malzeme) {
    matRow =
      "<tr><th>" +
      resolveDescLabel("malzeme") +
      "</th><td>" +
      page.desc.malzeme +
      "</td></tr>";
  }
  var olcuTitle = pdPick(json.desing.olcuTitle);
  var olcuNote = pdPick(json.desing.olcuNote);
  olcuTableHtml =
    '<div class="modulex-olcu-wrap">' +
    '<h3 class="modulex-olcu-title">' + olcuTitle + '</h3>' +
    '<p class="modulex-olcu-summary"><strong>' +
    gVal +
    " × " +
    dVal +
    " × " +
    yVal +
    "</strong></p>" +
    '<table class="modulex-olcu-table"><tbody>' +
    "<tr><th>" +
    resolveDescLabel("genislik") +
    "</th><td>" +
    gVal +
    "</td></tr>" +
    "<tr><th>" +
    resolveDescLabel("derinlik") +
    "</th><td>" +
    dVal +
    "</td></tr>" +
    "<tr><th>" +
    resolveDescLabel("yukseklik") +
    "</th><td>" +
    yVal +
    "</td></tr>" +
    wRow +
    matRow +
    "</tbody></table>" +
    '<p class="modulex-olcu-note">' + olcuNote + '</p>' +
    "</div>";
}

/** page.desc — olcu disi etiketler */
var descTagsHtml = "";
if (page.desc && typeof page.desc === "object") {
  var descKeys = Object.keys(page.desc);
  var tagIdx;
  var tagsInner = "";
  var skipKeys = {
    genislik: true,
    derinlik: true,
    yukseklik: true,
    agirlik: true,
    malzeme: true
  };
  for (tagIdx = 0; tagIdx < descKeys.length; tagIdx++) {
    var dk = descKeys[tagIdx];
    if (skipKeys[dk]) {
      continue;
    }
    var dv = page.desc[dk];
    if (dv != null && String(dv).replace(/^\s+|\s+$/g, "") !== "") {
      tagsInner +=
        '<span class="modulex-desc-tag"><span class="modulex-desc-tag-label">' +
        resolveDescLabel(dk) +
        '</span><span class="modulex-desc-tag-value">' +
        formatDescValue(dk, dv) +
        "</span></span>";
    }
  }
  if (tagsInner !== "") {
    descTagsHtml = '<div class="modulex-desc-tags">' + tagsInner + "</div>";
  }
}

var contentRow = "";
if (hasDescImage || leadHtml !== "" || descTagsHtml !== "" || olcuTableHtml !== "") {
  var imgAlt = getName(page);
  var safeAlt = String(imgAlt).replace(/"/g, "&quot;");
  var imgBlock = "";
  if (hasDescImage) {
    imgBlock =
      '<div class="modulex-row-media">' +
      '<div class="modulex-img">' +
      '<img src="/page/' +
      page["id"] +
      "/" +
      descImgFile +
      '?v={{random}}" alt="' +
      safeAlt +
      '" loading="lazy" />' +
      "</div></div>";
  }
  contentRow =
    '<div class="modulex-row">' +
    imgBlock +
    '<div class="modulex-row-desc">' +
    leadHtml +
    olcuTableHtml +
    descTagsHtml +
    "</div></div>";
}

html = html.replace(new RegExp("{{contentRow}}", "g"), contentRow);
html = html.replace(new RegExp("{{img}}", "g"), descImgFile);

/** Hero arka plan (bgimg) */
var bgFile = "";
if (page["bgimg"] != null && page["bgimg"] !== undefined) {
  bgFile = String(page["bgimg"]).replace(/^\s+|\s+$/g, "");
}
if (bgFile !== "") {
  html = html.replace(
    /background-image:\s*none;\s*\/\*\s*modulex-title-bg-dyn\s*\*\//g,
    'background-image: url("/page/' +
      page["id"] +
      "/bg/" +
      bgFile +
      '"); /* modulex-title-bg-dyn */',
  );
}
