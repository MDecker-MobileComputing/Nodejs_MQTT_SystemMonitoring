
import { mqttKonfiguration } from "./mqttKonfigurationen.js";
import os   from "os";
import mqtt from "mqtt";

function rundeAufEineDezimalstelle( wert ) {

    return Math.round( wert * 10 ) / 10;
}

const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort,
}

const mqttClient =
        await mqtt.connectAsync( mqttKonfiguration.serverUrl,
                                 authObjekt );

// Ziel-Topic enthält Rechnername, weil es pro Topic höchstens
// eine Message mit retain=true geben kann
const hostname = os.hostname();
const topic    = mqttKonfiguration.basisTopic + hostname;

const ramFreiBytes   = os.freemem();
const ramGesamtBytes = os.totalmem();
const dateTimeUTC    = new Date().toISOString(); // Deutsche Zeit: UTC+1 (Winterzeit), UTC+2 (Sommerzeit)

let ramFreiMiB     = ramFreiBytes   / ( 1024 *  1024 ); // MiB=Mebibyte
let ramGesamtMiB   = ramGesamtBytes / ( 1024 * 1024  );
let ramFreiProzent = 100 * ramFreiBytes / ramGesamtBytes;

ramFreiMiB     = rundeAufEineDezimalstelle( ramFreiMiB     );
ramGesamtMiB   = rundeAufEineDezimalstelle( ramGesamtMiB   );
ramFreiProzent = rundeAufEineDezimalstelle( ramFreiProzent );

// Objektname und Wert sind gleich (Shorthand Property Names)
const metrikObjekt = {
                       ramFreiBytes,
                       ramFreiMiB,
                       ramGesamtBytes,
                       ramGesamtMiB,
                       ramFreiProzent,
                       dateTimeUTC
                     };

const metrikString = JSON.stringify( metrikObjekt, null, 2 ); // replacer=null, indent=2

const konfigObjekt = {
                        qos: 2,
                        retain: true
                     };
await mqttClient.publishAsync( topic, metrikString, konfigObjekt );

console.log( `Metrik-String gesendet auf Topic ${topic} :\n` + metrikString );

await mqttClient.endAsync();

console.log();
