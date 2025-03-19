# MQTT mit Nodejs: RAM-Metriken #

<br>

Dieses Repo enthält ein Nodejs-Programm, das über [MQTT](https://mqtt.org/) eine Nachricht mit
Metriken zur aktuellen RAM-Belegung des ausführenden Computers auf ein Topic mit `retain=true`
schreibt.
Da Repo enthält auch das zugehörige Empfänger-Programm.

Die Nachricht ist wegen `retain=true` eine persistierte Nachricht, sie wird also auch an Subscriber
zugestellt, die zum Zeitpunkt des Versands der Nachricht nicht mit dem MQTT-Server verbunden waren.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

<br>
