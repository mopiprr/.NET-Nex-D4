# Performance Investigation Report — Day 4

Nama: ______________________   Tag awal: `d4-start`

Cara mengukur (selalu sama):

- `npm run build && npm run start` (bukan `dev`)
- Chrome DevTools → Performance → CPU **4× slowdown**
- Ulangi 3 kali, catat median

| # | Keluhan | Alat ukur | Metrik | Sebelum | Hipotesis | Perbaikan | Sesudah |
|---|---|---|---|---|---|---|---|
| A | Filter analitik terasa lambat saat mengetik | Devtools -> Performance | scripting time (?) | 1. 655ms; 2. 694ms; 3. 974ms m= 774ms | H1:perhitungan O(n^2) di jalur ketikan -> hitung sekali dengan algo linear;   H2:Seteleh itu, render 1.000 baris per ketikan masih memblokir input -> biarkan input update dulu, table menyusul (useDeferredValue) | deferredQuery diperbaiki karena sebelumnya merender 2kali | 1. 515ms;  2. 514ms; 3. 433ms |
| B | Dashboard makin berat kalau dibiarkan terbuka | Devtools -> show performance monitor | LiveProvider ada state now yang diperbarui tiap detik. Selain itu di SalesExplorer juga ada  | tiap detik terjadi lonjakan padahal tidak ada aktivitas apa apa | state now pada LiveProvider update tiap detik, dihapus dan formatPrice dikeluarkan | formatPrice dikeluarkan dan import dari lib format | CPU Usage berkurang drastis dan update tiap 5 detik |
| C | Overview lambat di laptop staf | Devtools -> Network (filterJS) | Initial buundle size | 340KB lebih besar | Library rechart diimport statis padahal showCart defaultnya false, membebani parsing JS | pisahkan garfik ke TrendChart.tsx | initial bundlle berkurang, rechart baru terdownload on demand |
| D | Detail order lama terbuka | Devtools -> Network (timing) | Navigation duration(ms) | 1. 3.31;  2. 2.21s; 3. 1.87s  | await berada dalam loop for, jadi pizza dalam hari itu diambil lsatu per satu | samakan posisi getOrderCount dan getPizzaSold menggunakan Promise | 1. 664ms 2. 633ms 3. 640ms |

## Catatan

- Apa yang paling mengejutkan dari hasil pengukuran?
- Perbaikan mana yang TIDAK memberi hasil, dan kenapa?
