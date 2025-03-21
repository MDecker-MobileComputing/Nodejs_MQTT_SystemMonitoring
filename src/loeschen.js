import mqtt from "mqtt";
import os   from "os";

import { mqttKonfiguration } from "./mqttKonfigurationen.js";


const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort,
};

const mqttClient =
        await mqtt.connectAsync( mqttKonfiguration.serverUrl,
                                 authObjekt );

const hostname = os.hostname();
const topic    = mqttKonfiguration.basisTopic + hostname;

const konfigObjekt = {
                        qos: 2,
                        retain: true
                     };

await mqttClient.publishAsync( topic, "", konfigObjekt );

console.log( `Metrik gelöscht auf Topic ${topic}.` );

await mqttClient.endAsync();

console.log();

