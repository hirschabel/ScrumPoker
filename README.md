A cél egy webes alkalmazás fejlesztése. Megnyitáskor a főoldal fogad minket. A főoldalon a saját felhasználónevünk megadása mellett létrehozhatunk egy új szobát vagy csatlakozhatunk egy már létező szobához. -Itt jelennek meg sorban a csatlakozható szobák is. A szobákba lehet csatlakozni a soronként megjelenő csatlakozás gombbal, vagy a lista tetején lévő input mezőbe megadott szoba nevével is.- A szoba létrehozásánál megadható a neve és kiválaszthatók becslés során megadható értékek.
{{collapse(Szoba létrehozása)

# saját felhasználónév megadása

# szobanév megadása

# egyedi becslés értékek megadása (checkbox: 0.5; 1; 1.5; 2; 2.5; 3; 5; 8; 16; 24; 40; 168); a választott értékek kerülnek megjelenítésre a felhasználók számára

# Create Room gombra kattintással létrehozzuk a szobát. (Az alkalmazás átirányít minket a létrehozott szobába, ahol a felületen a szoba neve mellett a Room ID is megjelenik.)

}}

{{collapse(Csatlakozás a meglévő szobába)

# saját felhasználónév megadása

# Room ID megadása

# Connect gombra kattintás (Az alkalmazás átirányít minket a ScrumPoker becslési felületére.)

}}

Csatlakozás után egy új oldalra kerülünk. Itt a felhasználó listát látjuk. A listának 2 oszlopa van: felhasználónév és szavazat. A szavazáshoz az oldalon megjelenő szám gombokat kell megnyomni. A felületen megjelenik még egy @Show@ gomb, amellyel a felhasználók által megadott értékek kerülnek felfedésre / megjelenítésre. Felfedés után a @Show@ átvált @Hide@ -ra, valamint megjelenik mellette a @Clear@ gomb, amivel lehetőség van a szavazatok törlésére.

- @Show@ állapotban a megadott értékeken a felhasználók nem módosíthatnak;
- a @Hide@ gombbal lehetőség van a korábban megadott értékek módosításához (ezzel a korábban megjelenített értékeket elrejtjük).
- A @Clear@ gombbal a felhasználók által megadott értékek törlésre kerülnek és automatikusan visszatérünk a @Show@ állapotba.

A szavazatok valós időben frissülnek minden csatlakozott játékosnál. A megadott érték módosítására addig van lehetőség, ameddig valaki rá nem kattint a @Show@ gombra. Az egyes felhasználók csak a saját, választott értéküket látják mindaddig, . Az oldal alján az átlagot kell megjeleníteni.

Szavazás után lehetőség van az átlag (vagy annak kézzel átírt értékénet) beküldésére egy jegyszám és a Becsült időigény VAGY Becsült időigény (QA) megadása mellett. Ezzel lehetőség van a Redmine-ban az adott jegy korábban becsült idejét megnövelni VAGY módosítani.

## TODOs

- felhasználónév validáció (max x karakter)
- szavazási lehetőség validáció (max x karakter)
- aki létrehozta a szobát, azt állítsuk be adminnak, és csak ő láthassa az akciógombokat.
- felhasználó kirúgási funkció
- oldal újratöltése a szobában azt eredményezi, hogy kiléptet a szobából, mégis látod mi történik. Ez egy bug, ki kellene javítani
- becsült idő beállítása az issue-nak a redmineban
  -issue választásnál a projekt választás után, egy lekérdezés alapján lehessen issuet kiválasztani. Tehát kell még egy legördülő lista a lekérdezéseknek, ami alapján az issuekat listázzuk ki.
- issue ID validáció issue választásnál
- szobába csatlakozás link segítségével

- responsive dizájn, hogy minden eszközön jól nézzen ki
- refaktor és dizájn szépítés mindig ráfér a projektre
