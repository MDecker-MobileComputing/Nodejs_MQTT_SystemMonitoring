import mqtt from "mqtt";

import { mqttKonfiguration } from "./mqttKonfigurationen.js";


const authObjekt = {

    username: mqttKonfiguration.nutzername,
    password: mqttKonfiguration.passwort,
};

const mqttClient =
        await mqtt.connectAsync( mqttKonfiguration.serverUrl,
                                 authObjekt );

mqttClient.subscribe( mqttKonfiguration.basisTopic + "+", { qos: 2 } );

const timeoutSekunden = 5
let timeout = null;

mqttClient.on( "message", ( topic, message ) => {

    clearTimeout( timeout );

    const hostname = topic.split( "/" ).pop();
    console.log( `\nMetriken von ${hostname} empfangen:\n` + message.toString() );

    timeout = setTimeout( async () => {

        console.log(
            `\nSeit ${timeoutSekunden} Sekunden keine Metriken mehr empfangen, Programm wird beendet.\n` );
        await mqttClient.endAsync();

    }, timeoutSekunden * 1000 );
});


