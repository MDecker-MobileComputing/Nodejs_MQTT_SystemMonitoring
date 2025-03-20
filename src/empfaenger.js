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

mqttClient.on( "message", ( topic, message ) => {

    const hostname = topic.split( "/" ).pop();

    console.log( `\nMetriken von ${hostname} empfangen:\n` + message.toString() );
});


