# tema-restoran-3 · k21gxl — Ekip 2 — Zengin kartlar

## Nedir

tema-restoran-3 sitesinin matrix modülü. `Ekip 2 — Zengin kartlar` şablonu (section kökü,
sınıf `modulex-t2`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (6 KB) |
| `index.html` | Modül şablonu (render hedefi) (13 KB) |
| `index.jpeg` | Önizleme görseli (53 KB) |
| `index.json` | Veri + tema token'ları (6 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `stil` | `kartli` |
| `hover` | `sosyal` |
| `filter` | `True` |
| `urlPrefix` | `` |
| `bgcolor` | `var(--mx-site-bg, #ffffff)` |
| `textcolor` | `var(--mx-site-text, #1b1b1b)` |
| `mutedcolor` | `color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-bg, #ffffff))` |

- `name`: `Ekip 2 — Zengin kartlar`
- `data`: 6 kayıt. Örnek: `{"name": "Ayşe Yılmaz", "role": {"tr": "Genel Müdür", "en": "General Manager", "ar": "المديرة العامة"}, "bio": {"tr": "20 yıllık sektör den…`
- Diğer anahtarlar: `description`, `version`, `icon`, `category`, `tags`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **stil**, **hover**, **filter**, **urlPrefix**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-t2`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-restoran-3 sitesinde `web/matrix/modules/k21gxl/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": {
    "tr": "Ekip 2 — Zengin kartlar",
    "en": "Team 2 — Rich cards",
    "ar": "الفريق 2 — بطاقات غنية"
  },
  "desing": {
    "max": "1200px",
    "stil": "kartli",
    "hover": "sosyal",
    "filter": true,
    "urlPrefix": "",
    "bgcolor": "var(--mx-site-bg, #ffffff)",
    "textcolor": "var(--mx-site-text, #1b1b1b)",
    "mutedcolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 70%, var(--mx-site-bg, #ffffff))",
    "surface": "var(--mx-site-surface, #f6f6f4)",
    "surface2": "var(--mx-site-surface-2, #ececea)",
    "bordercolor": "color-mix(in srgb, var(--mx-site-text, #1b1b1b) 14%, transparent)",
    "accent": "var(--mx-site-primary, #2563eb)",
    "accentText": "
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.
