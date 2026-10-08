# Performance Investigation Report — Day 4

Nama: ______________________   Tag awal: `d4-start`

Cara mengukur (selalu sama):

- `npm run build && npm run start` (bukan `dev`)
- Chrome DevTools → Performance → CPU **4× slowdown**
- Ulangi 3 kali, catat median

| # | Keluhan | Alat ukur | Metrik | Sebelum | Hipotesis | Perbaikan | Sesudah |
|---|---|---|---|---|---|---|---|
| A | Filter analitik terasa lambat saat mengetik | Devtools -> Performance | scripting time (?) | 1. 655ms; 2. 694ms; 3. 974ms m= 774ms | H1:perhitungan O(n^2) di jalur ketikan -> hitung sekali dengan algo linear;   H2:Seteleh itu, render 1.000 baris per ketikan masih memblokir input -> biarkan input update dulu, table menyusul (useDeferredValue) | deferredQuery diperbaiki karena sebelumnya merender 2kali | 1. 515ms;  2. 514ms; 3. 433ms |
| B | Dashboard makin berat kalau dibiarkan terbuka | Devtools -> show performance monitor | tiap detik terjadi lonjakan padahal tidak ada aktivitas apa apa | | | | |
| C | Overview lambat di laptop staf | | | | | | |
| D | Detail order lama terbuka | | | | | | |

## Catatan

- Apa yang paling mengejutkan dari hasil pengukuran?
- Perbaikan mana yang TIDAK memberi hasil, dan kenapa?
