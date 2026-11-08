/* team-2 — Ekip (zengin) (31 Eki 2026, G8-C).
   Yer tutucular: t2stil t2hover t2head t2chips t2cards t2cta t2empty t2veri.
   data[] = {name, role{}, bio{}, img, img2, dept, social[{ad,url,icon}]}; departments desing.departments[{id,name{}}]. */
var t2D = json.desing || {};
var t2L = json.lang || "tr";
function t2T(v) { return wmPickLang(v, t2L); }
function t2Esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function t2Url(v) {
  var s = String(v == null ? "" : v).trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) { return ""; }
  if (/^data:/i.test(s)) { return /^data:image\//i.test(s) ? s : ""; }
  if (s.charAt(0) === "/" || /^https?:\/\//i.test(s) || /^(mailto|tel):/i.test(s)) { return s; }
  return "/img/" + json.id + "/" + s;
}
function t2Bool(v, d) {
  if (v === undefined || v === null || v === "") { return d; }
  return !(v === false || v === "false" || v === 0 || v === "0");
}
function t2Bas(ad) {
  var p = String(ad || "").trim().split(/\s+/);
  var b = "";
  for (var i = 0; i < p.length && b.length < 2; i++) { if (p[i]) { b += p[i].charAt(0).toUpperCase(); } }
  return b;
}

var t2Stil = String(t2D.stil || "kartli").trim();
if (t2Stil !== "kartli" && t2Stil !== "yuvarlak" && t2Stil !== "yatay-liste") { t2Stil = "kartli"; }
var t2Hover = String(t2D.hover || "sosyal").trim() === "gorsel" ? "gorsel" : "sosyal";

/* bölümler */
var t2DeptName = {}, t2DeptOrder = [];
if (Array.isArray(t2D.departments)) {
  for (var di = 0; di < t2D.departments.length; di++) {
    var dp = t2D.departments[di];
    if (dp && dp.id != null) { t2DeptName[String(dp.id)] = t2T(dp.name); t2DeptOrder.push(String(dp.id)); }
  }
}
var t2Items = Array.isArray(json.data) ? json.data : [];
var t2DeptCount = {};
var t2Cards = "";
var t2SocialTpl = t2T(t2D.socialLabel);
var t2Sayac = 0;
for (var ti = 0; ti < t2Items.length; ti++) {
  var it = t2Items[ti] || {};
  var ad = t2T(it.name).trim();
  if (!ad) { continue; }
  var dept = it.dept != null ? String(it.dept) : "";
  if (dept) { t2DeptCount[dept] = (t2DeptCount[dept] || 0) + 1; }
  var rol = t2T(it.role).trim();
  var bio = t2T(it.bio).trim();
  var img = t2Url(it.img);
  var img2 = t2Url(it.img2);

  var media = img
    ? '<img class="modulex-t2__img" src="' + t2Esc(img) + '" alt="' + t2Esc(ad) + '" width="600" height="750" loading="lazy" decoding="async" />' +
      (img2 && t2Hover === "gorsel" ? '<img class="modulex-t2__img modulex-t2__img2" src="' + t2Esc(img2) + '" alt="" width="600" height="750" loading="lazy" decoding="async" aria-hidden="true" />' : "")
    : '<span class="modulex-t2__ph" role="img" aria-label="' + t2Esc(ad) + '"><span class="modulex-t2__bas">' + t2Esc(t2Bas(ad)) + "</span></span>";

  var sosyal = "";
  if (Array.isArray(it.social)) {
    for (var si = 0; si < it.social.length; si++) {
      var so = it.social[si] || {};
      var soAd = t2T(so.ad || so.name).trim();
      var soUrl = t2Url(so.url);
      if (!soAd || !soUrl) { continue; }
      var dis = /^https?:\/\//i.test(soUrl);
      sosyal += '<a class="modulex-t2__sl" href="' + t2Esc(soUrl) + '"' + (dis ? ' target="_blank" rel="noopener noreferrer"' : "") + ' aria-label="' + t2Esc(soAd + " — " + ad) + '" title="' + t2Esc(soAd) + '">' +
        '<span class="material-symbols-outlined" aria-hidden="true">' + t2Esc(so.icon || "link") + "</span></a>";
    }
  }
  var sosyalHtml = sosyal ? '<nav class="modulex-t2__social" aria-label="' + t2Esc(t2SocialTpl.replace(/\{ad\}/g, ad)) + '">' + sosyal + "</nav>" : "";

  t2Cards += '<li class="modulex-t2__card' + (img2 && t2Hover === "gorsel" ? " modulex-t2__card--ikinci" : "") + '" data-t2-dept="' + t2Esc(dept) + '" style="--t2-i:' + t2Sayac + '">' +
    '<div class="modulex-t2__media">' + media + (t2Hover === "sosyal" ? '<div class="modulex-t2__overlay">' + sosyalHtml + "</div>" : "") + "</div>" +
    '<div class="modulex-t2__body">' +
      '<h3 class="modulex-t2__name">' + t2Esc(ad) + "</h3>" +
      (rol ? '<p class="modulex-t2__role">' + t2Esc(rol) + "</p>" : "") +
      (bio ? '<p class="modulex-t2__bio">' + t2Esc(bio) + "</p>" : "") +
      (t2Hover === "gorsel" ? sosyalHtml : "") +
    "</div></li>";
  t2Sayac++;
}

/* çipler: yalnız kullanılan bölümler, 2+ bölüm varsa */
var t2Used = [];
for (var ui = 0; ui < t2DeptOrder.length; ui++) { if (t2DeptCount[t2DeptOrder[ui]]) { t2Used.push(t2DeptOrder[ui]); } }
var t2ShowFilter = t2Bool(t2D.filter, true) && t2Used.length > 1;
var t2Chips = "";
if (t2ShowFilter) {
  t2Chips = '<div class="modulex-t2__chips" role="group" aria-label="' + t2Esc(t2T(t2D.filterLabel)) + '" hidden>' +
    '<button type="button" class="modulex-t2__chip" data-t2-dept="" aria-pressed="true">' + t2Esc(t2T(t2D.allLabel)) + ' <bdi class="modulex-t2__chip-n">' + t2Sayac + "</bdi></button>";
  for (var ci = 0; ci < t2Used.length; ci++) {
    t2Chips += '<button type="button" class="modulex-t2__chip" data-t2-dept="' + t2Esc(t2Used[ci]) + '" aria-pressed="false">' + t2Esc(t2DeptName[t2Used[ci]]) + ' <bdi class="modulex-t2__chip-n">' + t2DeptCount[t2Used[ci]] + "</bdi></button>";
  }
  t2Chips += "</div>";
}

var t2Title = t2T(t2D.title);
var t2Desc = t2T(t2D.description);
var t2Head = (t2Title || t2Desc)
  ? '<header class="modulex-t2__head">' + (t2Title ? '<h2 class="modulex-t2__title">' + t2Esc(t2Title) + "</h2>" : "") + (t2Desc ? '<p class="modulex-t2__desc">' + t2Esc(t2Desc) + "</p>" : "") + "</header>"
  : "";

/* CTA yolu: http(s) ise aynen, değilse iç sayfa (dil önekli); javascript: vb. reddedilir */
var t2CtaHref = String(t2D.ctaHref == null ? "" : t2D.ctaHref).trim();
if (/^\s*(javascript|vbscript|data|file):/i.test(t2CtaHref)) { t2CtaHref = ""; }
var t2CtaText = t2T(t2D.ctaText).trim();
var t2Cta = (t2CtaHref && t2CtaText)
  ? '<p class="modulex-t2__ctawrap"><a class="modulex-t2__cta" href="' + t2Esc(/^https?:\/\//i.test(t2CtaHref) ? t2CtaHref : wxLangInternalHref(t2CtaHref)) + '"><span>' + t2Esc(t2CtaText) + '</span><span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a></p>'
  : "";

var t2Veri = JSON.stringify({ lang: t2L, filter: t2ShowFilter, prefix: String(t2D.urlPrefix || ""), empty: t2T(t2D.emptyText) }).replace(/</g, "\\u003c");

html = html.replace(/\{\{t2stil\}\}/g, function () { return t2Stil; });
html = html.replace(/\{\{t2hover\}\}/g, function () { return t2Hover; });
html = html.replace(/\{\{t2head\}\}/g, function () { return t2Head; });
html = html.replace(/\{\{t2chips\}\}/g, function () { return t2Chips; });
html = html.replace(/\{\{t2cards\}\}/g, function () { return t2Cards; });
html = html.replace(/\{\{t2cta\}\}/g, function () { return t2Cta; });
html = html.replace(/\{\{t2veri\}\}/g, function () { return t2Veri; });
