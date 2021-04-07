let mapaLeaflet;
let tela;

let estacao1, estacao2, estacao3, estacao4, estacao5;

let url = ["https://io.adafruit.com/api/v2/arturvc/feeds", "https://io.adafruit.com/api/v2/MattiThibault/feeds"];

let nomes = ["Artur", "D1ana"];
//let

let lugar = [
    [-2.0257, -38.4848],
    [61.49911, 23.78712]

];


let marcador;
let numero = 0;

function setup() {
    //setInterval(lerDados1, 2000);

    lerDados1();
    lerDados2();
    mapa();

}


function lerDados1() {
    loadJSON(url[0], urlCarregada1);
}

function lerDados2() {
    loadJSON(url[1], urlCarregada2);
}




function urlCarregada1(dadosApi) {
    console.log(dadosApi);
    dadosApi[0].description = nomes[0];
    console.log(dadosApi[0].last_value);
    console.log(dadosApi[1].last_value);
    console.log(dadosApi[2].last_value);
    estacao1 = {
        "name": nomes[0],
        "data": (dadosApi[0].last_value_at),
        "cor": dadosApi[0].last_value,
        "umidade": float(dadosApi[1].last_value),
        "temperatura": float(dadosApi[2].last_value)
    };

    //console.log(estacao);
    //console.log(Object.keys(estacao1));

    // for (let [key, value] of Object.entries(yourobject)) {
    // console.log(key, value);
    //}
    carregarPontos(estacao1, 0);
}

function urlCarregada2(dadosApi) {
    //console.log(dadosApi);
    estacao2 = {
        "name": nomes[1],
        "data": (dadosApi[0].last_value_at),
        "cor": dadosApi[0].last_value,
        "umidade": float(dadosApi[1].last_value),
        "temperatura": float(dadosApi[2].last_value)
    };
    carregarPontos(estacao2, 1);
}



function draw() {}

function mapa() {
    mapaLeaflet = L.map('mapa').setView(lugar[0], 10);
    //mapaLeaflet = L.map('mapa').fitBounds(lugar[0], lugar[4]);

    //L.tileLayer(' https://api.mapbox.com/styles/v1/arturvc/cke1w9rda0cir19t7y30v0y70/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {

    //mapbox://styles/arturvc/ckl3z4ddn2w3t17obvhl5d4vz
    L.tileLayer(' https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy;  <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

        minZoom: 2,
        maxZoom: 5,
        //zoomSnap: 0.5,
        zoomDelta: 2,
        id: 'arturvc/ckl3z4ddn2w3t17obvhl5d4vz',
        // id: 'arturvc/cke1w9rda0cir19t7y30v0y70',
        // id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoiYXJ0dXJ2YyIsImEiOiJjamVzaXNhaDUwM2dzMnFwa3A2MndjemJ6In0.QkEbXr54ao40qL9I1DuW0g'
    }).addTo(mapaLeaflet);


    mapaLeaflet.fitBounds([
        lugar[0],
        lugar[1]
    ], {
        padding: [20, 30]
    });

    //mapaLeaflet.fitBounds(lugar[0], lugar[2]);
    //borda.addTo(mapaLeaflet);

    //mapaLeaflet.options.minZoom = map.getZoom();



    //var popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(mapaLeaflet);
    // }
}

function carregarPontos(estacao, numero) {

    //var marker = L.marker([-7.26, -39.38]).addTo(mapaLeaflet);

    // for (let i = 0; i < lugar.length; i++) {
    // marcador = L.marker(lugar[numero]).bindPopup(
    //     "<strong>Estação " + (int(numero) + 1) + "</strong>" + "<br>" +
    //     "Temperatura (°C): " + estacao.temperatura + "<br>" +
    //     "Pressão atmosférica (hPa): " + estacao.pressao + "<br>" +
    //     "Umidade relativa (%): " + estacao.umidade + "<br>" +
    //     "Altitude (m): " + estacao.altitude + "<br>" +
    //     "Presença de gases: " + estacao.gases
    // );
    // marcador.addTo(mapaLeaflet);


    let icone = L.icon({
        iconUrl: 'banana_icon50x50_BW.png',
        iconSize: [30, 30],
        iconAnchor: [15, -10],
        //popupAnchor: [-3, -76],
        //shadowSize: [68, 95],
        //shadowAnchor: [22, 94]
    });
    marcador = L.marker(lugar[numero], {
        icon: icone
    }).
    bindPopup(
        "<strong>Banana " + (int(numero) + 1) + "</strong> - " + estacao.name + "<br>" +
        "Updated at: " + estacao.data + "<br>" +
        "Colour:" + estacao.cor + " <svg width='20' height='20' ><rect width='20' height='20' fill='" + estacao.cor + "'/></svg><br>" +
        "Humidity: " + estacao.umidade + "% <br>" +
        "Temperature: " + estacao.temperatura + "°C"
    );
    marcador.addTo(mapaLeaflet);



    // }
}



/*
  bindPopup(
        "<strong>Estação " + (int(numero) + 1) + "</strong>" + "<br>" +
        "Última atualização: " + estacao.data + "<br>" +
        "Cor:" + estacao.cor + "<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'> <rect width='30' height='30'   fill='" + estacao.cor + "'/> </svg> <br>" +
        "Umidade relativa: " + estacao.umidade + "% <br>" +
        "Temperatura: " + estacao.temperatura + "°C"
    );

    */

// "<div width='20px' style='background-color:" + estacao.cor + ";'>|||</div>
//<link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet">