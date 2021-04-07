let tela;

let contador = 0;


let alturaTexto = 20;
let y = alturaTexto * 1;

let fonte;

function setup() {
  tela = createCanvas(400, 100); // put setup code here
  tela.parent('mapa');
  textSize(alturaTexto);
  textFont('Open Sans');
  textAlign(CENTER);
}

function draw() {
  background('#1111EE');
  fill('#F5F5F5');
  //y = random((height / 2) - 1, (height / 2) + 2);
  text("ARTUR VASCONCELOS CORDEIRO", width / 2, height / 2);


  contador++;
}

//   <img src="img/verdesdigitais_1.JPG" class="img-fluid" alt="Responsive image">


/*
<iframe width="560" height="315"
          src="https://www.youtube.com/embed/bXmWrrEBtm0?autoplay=1&controls=0&fs=0&loop=1&playlist=bXmWrrEBtm0&rel=0&showinfo=0&color=white&iv_load_policy=3&mute=1"
          frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>




            Artur Vasconcelos Cordeiro é arquiteto, doutorando na FAUUSP / FAPESP, desenvolve projetos experimentais com
      tecnologias digitais, modelagem 3D, programação, Arduino, Processing, fabricação digital,
      leds piscantes e coisas sonoras.



       <div><a href="http://arturvc.net.br/3derrar">3d errar</a></div>
      <div><a href="http://arturvc.net.br/20pixelsofdata.html">20 pixels of data Workshop</a></div>
      <div><a href="https://www.youtube.com/channel/UCA_iUikpjSvuqfV-ryN5s7A">Projetos no YouTube</a></div>
      <div><a href="http://arturvc.net.br/parlador/">Parlador</a>
        <br>Leitor de frases em diversos idiomas usando P5*JS e Responsive Voice
      </div>
      <div><a href="http://arturvc.net.br/statusQuode/">Status <em>Quo</em>de</a>
        <br>Central de mensagens sobre códigos de status HTTP, usando P5*JS e Responsive Voice</div>

      <div><a href="http://arturvc.net.br/4vilas/">4 vilas</a>
        <br>Mapa de quatro vilas no planeta Terra selecionadas aleatoriamente. Projeto desenvolvido com a
        biblioteca de mapas Leaflet e P5*JS.</div>

*/