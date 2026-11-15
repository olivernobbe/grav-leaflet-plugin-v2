---
title: Leaflet 2 – Brouwersdam Abnahme
cache_enable: true
process:
  markdown: true
  twig: false
---

[map-leaflet lat=51.7397 lng=3.8715 zoom=11 scale]
[a-markers markerColor="black" iconColor="white"]
[{"lat":51.79204,"lng":3.87355,"icon":"fa-solid fa-van-shuttle","title":"Brouwersdam Camping"}]
[/a-markers]
[a-markers markerColor="green"]
[
{"lat":51.74906,"lng":3.82455,"text":1,"title":"Brouwersdam"},
{"lat":51.69783,"lng":3.81475,"text":2,"title":"fritureluur"},
{"lat":51.6497,"lng":3.92099,"text":3,"title":"Zierikzee"},
{"lat":51.64719,"lng":3.92742,"text":4,"title":"Grand Café de Werk"},
{"lat":51.78582,"lng":3.86603,"text":5,"title":"Strandbude 't Gorsje"}
]
[/a-markers]
[/map-leaflet]

## Zweite Karte ohne mapname

[map-leaflet lat=51.74906 lng=3.82455 zoom=12 height=350px]
[a-markers icon="coffee" markerColor="red"]
[
{"lat":51.74906,"lng":3.82455,"text":0,"title":"Nur zweite Karte","draggable":true},
{"lat":51.75,"lng":3.83,"title":"Gruppen-Icon coffee","spin":true},
{"lat":51.76,"lng":3.84,"icon":"fa-solid fa-van-shuttle","markerColor":"black","title":"FA Shuttle"}
]
[/a-markers]
[/map-leaflet]
