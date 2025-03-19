# MQTT mit Nodejs: RAM-Metriken #

<br>

Dieses Repo enthält ein Nodejs-Programm, das über [MQTT](https://mqtt.org/) eine Nachricht mit
Metriken zur aktuellen RAM-Belegung des ausführenden Computers auf ein Topic mit `retain=true`
schreibt.
Da Repo enthält auch das zugehörige Empfänger-Programm.

Die Nachricht ist wegen `retain=true` eine persistierte Nachricht, sie wird also auch an Subscriber
zugestellt, die zum Zeitpunkt des Versands der Nachricht nicht mit dem MQTT-Server verbunden waren.

Beispielnachricht:
```
{
  "ramFreiBytes": 16355450880,
  "ramFreiMiB": 15597.8,
  "ramGesamtBytes": 29878575104,
  "ramGesamtMiB": 28494.4,
  "ramFreiProzent": 54.7,
  "dateTimeUTC": "2025-03-19T16:17:40.177Z"
}
```

Für jeden Rechner wird ein eigenes Topic erzeugt, den pro Topic darf es höchstens eine
persistierte Nachricht geben.
Der Topic-Name wird durch Anhängen des Hostname des sendenden Computers gebildet.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

<br>
