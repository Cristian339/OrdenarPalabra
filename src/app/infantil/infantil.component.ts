import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-infantil',
  templateUrl: './infantil.component.html',
  styleUrls: ['./infantil.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    NgStyle
  ]
})
export class InfantilComponent implements OnInit {
  palabras: string[] = [
    'LOYOLA', 'CABALLERO', 'PAMPLONA', 'LIBROS SANTOS', 'JERUSALÉN', 'JESUITAS',
    'UN LIBRO', 'CORDERO', 'SOLDADO', 'SAN PEDRO', 'REZÓ MUCHO', 'CONTEMPLAR',
    'CAMISA', 'LOS CUIDÓ', 'SÍGUEME', 'ESTUDIÓ', 'SERVIRLE', 'FUNDÓ IGLESIAS',
    'HABLAR DE DIOS', 'REZÓ POR TODOS'
  ];

// Sílabas desordenadas (para mostrar al usuario)
  silabas: string[][] = [
    ['YO', 'LO', 'LA'], // LOYOLA
    ['BA', 'CA', 'RO', 'LLE'], // CABALLERO
    ['PLO', 'PAM', 'NA'], // PAMPLONA
    ['BROS', 'LI', 'TOS', 'SAN'], // LIBROS SANTOS
    ['RU', 'JE', 'LÉN', 'SA'], // JERUSALÉN
    ['JE', 'TAS', 'SUI'], // LOS JESUITAS
    ['UN', 'LI', 'BRO'], // UN LIBRO
    ['COR', 'RO', 'DE'], // UN CORDERO
    ['SOL', 'DO', 'DA'], // FUE SOLDADO
    ['PE', 'SAN', 'DRO'], // SAN PEDRO
    ['ZÓ', 'RE', 'CHO', 'MU'], // REZÓ MUCHO
    ['TEM', 'CON', 'PLAR'], // CONTEMPLAR
    ['CA','SA', 'MI'], // SU CAMISA
    ['CUI', 'LOS', 'DÓ'], // LOS CUIDÓ
    ['GUE', 'SÍ', 'ME'], // SÍGUEME
    ['TU', 'ES', 'DIÓ'], // ESTUDIÓ
    ['VIR', 'SER', 'LE'], // SERVIRLE
    ['DÓ', 'FUN', 'SIAS', 'I', 'GLE'], // FUNDÓ IGLESIAS
    ['BLAR', 'HA', 'DIOS', 'DE'], // HABLAR DE DIOS
    ['ZÓ', 'RE', 'DOS', 'POR', 'TO'] // REZÓ POR TODOS
  ];

// Sílabas ordenadas (para verificar la respuesta)
  silabasOrdenadas: string[][] = [
    ['LO', 'YO', 'LA'], // LOYOLA
    ['CA', 'BA', 'LLE', 'RO'], // CABALLERO
    ['PAM', 'PLO', 'NA'], // PAMPLONA
    ['LI', 'BROS', 'SAN', 'TOS'], // LIBROS SANTOS
    ['JE', 'RU', 'SA', 'LÉN'], // JERUSALÉN
    ['JE', 'SUI', 'TAS'], // LOS JESUITAS
    ['UN', 'LI', 'BRO'], // UN LIBRO
    ['COR', 'DE', 'RO'], // UN CORDERO
    ['SOL', 'DA', 'DO'], // FUE SOLDADO
    ['SAN', 'PE', 'DRO'], // SAN PEDRO
    ['RE', 'ZÓ', 'MU', 'CHO'], // REZÓ MUCHO
    ['CON', 'TEM', 'PLAR'], // CONTEMPLAR
    ['CA', 'MI', 'SA'], // SU CAMISA
    ['LOS', 'CUI', 'DÓ'], // LOS CUIDÓ
    ['SÍ', 'GUE', 'ME'], // SÍGUEME
    ['ES', 'TU', 'DIÓ'], // ESTUDIÓ
    ['SER', 'VIR', 'LE'], // SERVIRLE
    ['FUN', 'DÓ', 'I', 'GLE', 'SIAS'], // FUNDÓ IGLESIAS
    ['HA', 'BLAR', 'DE', 'DIOS'], // HABLAR DE DIOS
    ['RE', 'ZÓ', 'POR', 'TO', 'DOS'] // REZÓ POR TODOS
  ];

  preguntas: string[] = [
    '¿Cómo se llamaba el castillo donde nació San Ignacio?',
    '¿Qué quería ser San Ignacio cuando era joven?',
    '¿En qué batalla fue herido San Ignacio?',
    '¿Qué leyó San Ignacio mientras se recuperaba de sus heridas?',
    '¿A qué ciudad fue San Ignacio para convertirse en sacerdote?',
    '¿Qué fundó San Ignacio?',
    '¿Qué escribió San Ignacio para rezar?', // Pregunta simplificada
    '¿Qué animal vio San Ignacio en una visión?',
    '¿Qué hizo San Ignacio antes de ser sacerdote?',
    '¿A qué santo le rezaba San Ignacio?',
    '¿Qué hizo San Ignacio en Manresa?',
    '¿Qué le gustaba hacer a San Ignacio en la naturaleza?',
    '¿Qué le regaló San Ignacio a un niño pobre?',
    '¿Qué hizo San Ignacio para ayudar a los enfermos?',
    '¿Qué le dijo Jesús a San Ignacio en una visión?',
    '¿Qué hizo San Ignacio en París?',
    '¿Qué prometió San Ignacio a Dios?',
    '¿Qué hizo San Ignacio en Roma?',
    '¿Qué le gustaba hacer a San Ignacio con sus amigos?',
    '¿Qué hizo San Ignacio antes de morir?'
  ];
  imagenes: string[] = [
    'https://ejemplo.com/castillo-loyola.jpg',
    'https://ejemplo.com/caballero.jpg',
    'https://ejemplo.com/batalla-pamplona.jpg',
    'https://ejemplo.com/libros-santos.jpg',
    'https://ejemplo.com/jerusalen.jpg',
    'https://ejemplo.com/jesuitas.jpg',
    'https://ejemplo.com/ejercicios-espirituales.jpg',
    'https://ejemplo.com/cordero.jpg',
    'https://ejemplo.com/soldado.jpg',
    'https://ejemplo.com/san-pedro.jpg',
    'https://ejemplo.com/rezar.jpg',
    'https://ejemplo.com/naturaleza.jpg',
    'https://ejemplo.com/camisa.jpg',
    'https://ejemplo.com/enfermos.jpg',
    'https://ejemplo.com/sigueme.jpg',
    'https://ejemplo.com/paris.jpg',
    'https://ejemplo.com/servir.jpg',
    'https://ejemplo.com/iglesia.jpg',
    'https://ejemplo.com/amigos.jpg',
    'https://ejemplo.com/morir.jpg'
  ];
  fondos: string[] = [
    'https://img.freepik.com/vector-gratis/fondo-acuarela-nubes-arcoiris_23-2148889945.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-animales-divertidos_23-2148889950.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-estrellas-lunas_23-2148889955.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-arboles-flores_23-2148889960.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-globos-confeti_23-2148889965.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-mariposas-flores_23-2148889970.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-peces-burbujas_23-2148889975.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-montanas-sol_23-2148889980.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-aviones-nubes_23-2148889985.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-dinosaurios-volcanes_23-2148889990.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-unicornios-arcoiris_23-2148889995.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-coches-carreteras_23-2148890000.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-planetas-estrellas_23-2148890005.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-barcos-olas_23-2148890010.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-castillos-dragones_23-2148890015.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-helados-dulces_23-2148890020.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-juguetes-peluches_23-2148890025.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-flores-mariposas_23-2148890030.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-pajaros-arboles_23-2148890035.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-ninos-jugando_23-2148890040.jpg'
  ];
  huecos: string[] = [];
  palabraActualIndex: number = 0;
  mensaje: string = '';
  fondo: string = this.fondos[0]; // Fondo inicial
  animacion: string = '';
  puntos: number = 0; // Contador de puntos
  groupName: string = '';
  intentosFallidos: number = 0; // Contador de intentos fallidos

  // URLs de sonidos (reemplaza con tus propios archivos si es necesario)
  sonidoCorrecto: string = 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3';
  sonidoIncorrecto: string = 'https://www.soundjay.com/misc/sounds/fail-trombone-03.mp3';

  // Objetos de audio para precargar los sonidos
  audioCorrecto: HTMLAudioElement;
  audioIncorrecto: HTMLAudioElement;

  constructor(private route: ActivatedRoute) {
    // Precargar los sonidos
    this.audioCorrecto = new Audio(this.sonidoCorrecto);
    this.audioIncorrecto = new Audio(this.sonidoIncorrecto);
  }

  ngOnInit() {
    this.inicializarHuecos();
    this.route.queryParams.subscribe(params => {
      this.groupName = params['groupName'] || ''; // <-- Asigna el valor de groupName
    });

    this.inicializarHuecos();
  }

  inicializarHuecos() {
    this.huecos = Array(this.silabas[this.palabraActualIndex].length).fill('');
  }

  onDragStart(event: DragEvent, silaba: string) {
    event.dataTransfer?.setData('text/plain', silaba);
  }

  onDrop(event: DragEvent, huecoIndex: number) {
    event.preventDefault();
    const silaba = event.dataTransfer?.getData('text/plain');
    if (silaba) {
      this.huecos[huecoIndex] = silaba;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  verificarRespuesta() {
    const silabasCorrectas = this.silabasOrdenadas[this.palabraActualIndex]; // Usar silabasOrdenadas para verificar
    if (this.huecos.every((hueco, index) => hueco === silabasCorrectas[index])) {
      this.reproducirSonido(this.audioCorrecto);
      this.mensaje = '¡Correcto!';
      this.animacion = 'correcto';
      this.fondo = this.fondos[this.palabraActualIndex]; // Cambiar fondo
      this.puntos += 10; // Sumar 10 puntos
      this.intentosFallidos = 0; // Reiniciar contador de intentos fallidos
      setTimeout(() => {
        this.palabraActualIndex++;
        if (this.palabraActualIndex < this.palabras.length) {
          this.inicializarHuecos();
          this.mensaje = '';
          this.animacion = '';
        } else {
          this.mensaje = '¡Has completado todas las preguntas!';
        }
      }, 1000);
    } else {
      this.reproducirSonido(this.audioIncorrecto);
      this.mensaje = 'Incorrecto';
      this.animacion = 'incorrecto';
      this.intentosFallidos++; // Incrementar contador de intentos fallidos

      if (this.intentosFallidos >= 2) {
        setTimeout(() => {
          this.palabraActualIndex++;
          if (this.palabraActualIndex < this.palabras.length) {
            this.inicializarHuecos();
            this.mensaje = '';
            this.animacion = '';
            this.intentosFallidos = 0; // Reiniciar contador de intentos fallidos
          } else {
            this.mensaje = '¡Has completado todas las preguntas!';
          }
        }, 1000);
      }
    }
  }

  reproducirSonido(audio: HTMLAudioElement) {
    audio.currentTime = 0; // Reiniciar el sonido si ya estaba reproduciéndose
    audio.play();
  }
}
