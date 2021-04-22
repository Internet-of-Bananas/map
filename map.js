//const apiAIO = "https://io.adafruit.com/api/v2/arturvc/feeds";

const participants = "network.json";

let dataParticipants = [];


let dataAio = [];

getParticipants();

async function getParticipants() {
    const resposta = await fetch(participants);
    const dados = await resposta.json();
    dataParticipants = dados;
    //console.log(dataParticipants);

    getIoBData();

}

async function getIoBData() {
    for (let key in dataParticipants) {
        //console.log(dataParticipants[key].urlAPI);
        const resposta = await fetch(dataParticipants[key].urlAPI);
        dataAio[key] = await resposta.json();
    }


    mapMarker();
}



let markers = [];

const iobMap = L.map('mapId').setView([0, 0], 2);
const urlOSM = 'https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}';
const tilesMap = L.tileLayer(urlOSM, {
    attribution: 'Map data &copy;  <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'arturvc/ckl3z4ddn2w3t17obvhl5d4vz',
    accessToken: 'pk.eyJ1IjoiYXJ0dXJ2YyIsImEiOiJjamVzaXNhaDUwM2dzMnFwa3A2MndjemJ6In0.QkEbXr54ao40qL9I1DuW0g',
    minZoom: 2,
    maxZoom: 5
});
tilesMap.addTo(iobMap);

let iconBanana = L.icon({
    iconUrl: 'banana_icon50x50_BW.png',
    iconSize: [30, 30],
    iconAnchor: [15,15],
//    iconAnchor: [15, -10],

});

async function mapMarker() {

    console.log("estamos no mapMarker");
    for (let key in dataParticipants) {
        //console.log(dataParticipants[key].urlAPI);
        markers[key] = L.marker([dataParticipants[key].lat, dataParticipants[key].long], {
            icon: iconBanana
        }).bindPopup(
            "<strong> " + dataParticipants[key].name + "</strong> <br>" +
            "Updated at: " + dataAio[key][0].last_value_at + "<br>" +
            "Colour:" + dataAio[key][0].last_value + " <svg width='20' height='20' ><rect width='20' height='20' fill='" + dataAio[key][0].last_value + "'/></svg><br>" +
            "Humidity: " + dataAio[key][1].last_value + "% <br>" +
            "Temperature: " + dataAio[key][2].last_value + "°C"
        );
        markers[key].addTo(iobMap);

    }

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