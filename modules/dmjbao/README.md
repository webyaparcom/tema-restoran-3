# tema-restoran-3 · dmjbao — Menü / Fiyat Listesi

## Nedir

tema-restoran-3 sitesinin matrix modülü. `Menü / Fiyat Listesi` şablonu (section kökü,
sınıf `modulex-ml`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (14 KB) |
| `index.html` | Modül şablonu (render hedefi) (18 KB) |
| `index.json` | Veri + tema token'ları (20 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `980px` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `surface` | `var(--mx-site-surface, #f6f6f4)` |
| `surface2` | `var(--mx-site-surface-2, #ececea)` |
| `accent` | `var(--mx-site-primary, #2563eb)` |
| `accentText` | `var(--mx-site-primary-contrast, #ffffff)` |
| `bordercolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 18%, transparent)` |

- `name`: `Menü / Fiyat Listesi`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **bgcolor**, **textcolor**, **surface**, **surface2**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-ml`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-restoran-3 sitesinde `web/matrix/modules/dmjbao/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Menü / Fiyat Listesi",
  "desing": {
    "max": "980px",
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "surface2": "var(--mx-site-surface-2, #ececea)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "var(--mx-site-primary-contrast, #ffffff)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 18%, transparent)",
    "muted": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 72%, var(--mx-site-bg, #fff))",
    "stickyTop": "0px",
    "mode": "menu",
    "currency": "₺",
    "showAllergens": true,
    "allergenLegend": true,
    "print": true,
 
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
