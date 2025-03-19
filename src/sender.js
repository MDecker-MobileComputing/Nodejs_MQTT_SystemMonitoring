
import { mqttKonfiguration } from "./mqttKonfigurationen.js";
import os   from "os";
import mqtt from "mqtt";


const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort,
}

const mqttClient =
        await mqtt.connectAsync( mqttKonfiguration.serverUrl,
                                 authObjekt );

const hostname = os.hostname();
const topic    = mqttKonfiguration.basisTopic + hostname;
console.log( "Ziel-Topic: " + topic );

const ramFreiBytes   = os.freemem();
const ramGesamtBytes = os.totalmem();
const ramFreiProzent = Math.round( 100 * ramFreiBytes / ramGesamtBytes );
const dateTimeUTC    = new Date().toISOString();

// Objektname und Wert sind gleich (Shorthand Property Names)
const metrikObjekt = { ramFreiBytes,
                       ramGesamtBytes,
                       ramFreiProzent,
                       dateTimeUTC
                     };

const metrikString = JSON.stringify( metrikObjekt );
console.log( "Metrik-String: " + metrikString );

const konfigObjekt = { qos: 2, retain: true };
await mqttClient.publishAsync( topic, metrikString, konfigObjekt );

await mqttClient.endAsync();
