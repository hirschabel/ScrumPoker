# ScrumPoker

# Leírás
A cél egy webes alkalmazás fejlesztése. Megnyitáskor a főoldal fogad minket. A főoldalon a saját felhasználónevünk megadása lehetséges. Itt jelennek meg sorban a csatlakozható szobák is. A szobákba lehet csatlakozni a soronként megjelenő csatlakozás gombbal, vagy a lista tetején lévő input mezőbe megadott szoba nevével is.

A szoba létrehozásánál megadható a neve és a választható szavazatok értékei.

A csatlakozás után egy új oldalra kerülünk. Itt a játékos listát látjuk. A listának 2 oszlopa van: játékosnév és szavazat. A szavazáshoz az oldalon megjelenő szám gombokat lehet megnyomni. A szavazatok valós időben frissülnek minden csatlakozott játékosnál. Az oldal alján az átlagot kell megjeleníteni. Az átlag és a szavazatok felfedéséhez egy gomb szükséges. Ez a gomb felfedés után átvált szavazatok törlésére.

Szavazás után lehetőség az átlag (vagy annak kézzel átírásának) beküldésére egy jegyszám megadása mellett. Ezzel a Redmine-ban a megadott jegy becsült idejét növeli a végleges válasszal.

## Fő funkciók
* Felhasználónév megadása
* Szoba létrehozása
* Szobába csatlakozás
* Szobából kilépés
* Egyik választható szám beküldése
* A választott szám ne látszódjon amíg nincs kiértékelés
* Kiértékelés egy gombbal
* Átlag számolása kiértékelés után

## Extra funkciók
* Szobában választható számok személyre szabása
* Munkamenet megtartása
* Szobák és játékos listájuk mentése
* Redmine összeköttetés
  * Jegy megjelenítés valamilyen formában
  * Jegy becsült idő hozzáadás