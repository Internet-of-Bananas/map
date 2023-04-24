//const apiAIO = "https://io.adafruit.com/api/v2/arturvc/feeds";

const participants = "network.json"; // JSON with the information of the participants

let dataParticipants = [];


let dataAio = [];

getParticipants();

async function getParticipants() {
    const resposta = await fetch(participants);
    const dados = await resposta.json();
    dataParticipants = dados;
    //console.log(dataParticipants);


    // ****
    //mapMarker();

    getIoBData();
    // ****
}

async function getIoBData() {
    for (let key in dataParticipants) {
        //console.log(dataParticipants[key].urlAPI);
        const resposta = await fetch(dataParticipants[key].urlAPI);
        dataAio[key] = await resposta.json();

    }
    console.log(dataAio);
    mapMarker();
}



let markers = [];

const iobMap = L.map('mapId').setView([0, 0], 9);
const urlOSM = 'https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}';
const tilesMap = L.tileLayer(urlOSM, {
    attribution: 'Map data &copy;  <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'arturvc/ckl3z4ddn2w3t17obvhl5d4vz',
    accessToken: 'pk.eyJ1IjoiYXJ0dXJ2YyIsImEiOiJjamVzaXNhaDUwM2dzMnFwa3A2MndjemJ6In0.QkEbXr54ao40qL9I1DuW0g',
    minZoom: 2,
    maxZoom: 9
});
tilesMap.addTo(iobMap);





let iconBanana = L.icon({
    iconUrl: 'banana_icon50x50_BW.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    //    iconAnchor: [15, -10],
});

//let popUp = L.marker([0,0], {icon: iconBanana}).addTo(iobMap);
//popUp.bindPopup("<b>The Banana Jam will start on 5th June 2021!</b>").openPopup();

async function mapMarker() {

    //console.log("estamos no mapMarker");


    for (let key in dataParticipants) {
        //console.log(dataParticipants[key].urlAPI);


        let color, humidity, temperature;
        for (let i = 0; i < 3; i++) {
            if (dataAio[key][i].name == "color") {
                color = dataAio[key][i].last_value;
            } else { }
        }
        // console.log(color);

        for (let i = 0; i < 3; i++) {
            if (dataAio[key][i].name == "temperature") {
                temperature = dataAio[key][i].last_value;
            } else { }
        }
        // console.log(temperature);

        for (let i = 0; i < 3; i++) {
            if (dataAio[key][i].name == "humidity") {
                humidity = dataAio[key][i].last_value;
            } else { }
        }



        //console.log(humidity);


        //Pino com os dados das estações.
        markers[key] = L.marker([dataParticipants[key].lat, dataParticipants[key].long], {
            icon: iconBanana
        }).bindPopup(
            "<strong> " + dataParticipants[key].name + "</strong> <br>" +
            "Updated at: " + dataAio[key][0].last_value_at + "<br>" +
            "Colour:" + color + " <svg width='20' height='20' ><rect width='20' height='20' fill='" + color + "'/></svg><br>" +
            "Humidity: " + humidity + "% <br>" +
            "Temperature: " + temperature + "°C"
        );

        /*
                markers[key] = L.marker([dataParticipants[key].lat, dataParticipants[key].long], {
                    icon: iconBanana
                }).bindPopup(
                    "<strong> " + dataParticipants[key].name + "</strong> <br>" +
                    "Station disconnected. <br>" +
                    "Updated at: " + "<br>" +
                    "Colour:" +  "<br>" +
                    "Humidity: " + " <br>" +
                    "Temperature: "
                );
                */
        markers[key].addTo(iobMap);

    }

    /////////////
    let coordenadas = [];

    // Loop through the lugares array and add the latLngs to the array
    for (let i = 0; i < dataParticipants.length; i++) {
        let lat = dataParticipants[i].lat;
        let lng = dataParticipants[i].long;
        let latLng = L.latLng(lat, lng);
        coordenadas.push(latLng);
    }

    // Use the latLngs array to create a LatLngBounds object
    let bounds = L.latLngBounds(coordenadas);

    // Use the fitBounds method to zoom and pan the map to show all of the markers
    iobMap.fitBounds(bounds, {
        padding: [8, 8]
    });
    /////////////



}

/*
  "<strong>Banana " + (int(numero) + 1) + "</strong> - " + estacao.name + "<br>" +
        "Updated at: " + estacao.data + "<br>" +
        "Colour:" + estacao.cor + " <svg width='20' height='20' ><rect width='20' height='20' fill='" + estacao.cor + "'/></svg><br>" +
        "Humidity: " + estacao.umidade + "% <br>" +
        "Temperature: " + estacao.temperatura + "°C"
*/


// const longitude = await fetch(dataParticipants[key].long);
// dataAio[key] = await longitude.json();


//marker = L.marker([0, 0], {




// marker = L.marker([0, 0], {
//     icon: iconBanana
// }).
// bindPopup(
//     "Yes, we have bananas"
// );
// marker.addTo(iobMap);





// let coord = [];
//let latlong = [];
// for (let key in dados) {
//     //console.log(dados[key].lat);
//     coord = {
//         "lat": dados[key].lat,
//         "long": dados[key].long
//     };
//     latlong.push(coord);

// }
// console.log(latlong);

//for (let [key, value] of Object.entries(dados)) {
//  console.log(key, value);
//}

// for (let [key, value] of Object.entries(yourobject)) {
// console.log(key, value);
//}