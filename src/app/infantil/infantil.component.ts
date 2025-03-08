import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";

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
  palabras: string[] = ['IGNACIO', 'SERGI', 'REGINA'];
  silabas: string[][] = [
    ['IG', 'NA', 'CIO'],
    ['SER', 'GI'],
    ['RE', 'GI', 'NA']
  ];
  preguntas: string[] = [
    '¿Quién es el fundador de los Jesuitas?',
    '¿Cómo se llama este personaje famoso?',
    '¿Quién es esta santa?'
  ];
  imagenes: string[] = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Ignatius_of_Loyola.jpg/200px-Ignatius_of_Loyola.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sergi_Arola_2012.jpg/200px-Sergi_Arola_2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Saint_Rita_of_Cascia.jpg/200px-Saint_Rita_of_Cascia.jpg'
  ];
  fondos: string[] = [
    'https://img.freepik.com/vector-gratis/fondo-dibujado-mano-acuarela-pastel_23-2148902621.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracto-colorido_23-2148889930.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracto-colorido_23-2148889935.jpg'
  ];
  huecos: string[] = [];
  palabraActualIndex: number = 0;
  mensaje: string = '';
  fondo: string = this.fondos[0]; // Fondo inicial
  animacion: string = '';
  puntos: number = 0; // Contador de puntos

  // URLs de sonidos (reemplaza con tus propios archivos si es necesario)
  sonidoCorrecto: string = 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3';
  sonidoIncorrecto: string = 'https://www.soundjay.com/misc/sounds/fail-trombone-03.mp3';

  // Objetos de audio para precargar los sonidos
  audioCorrecto: HTMLAudioElement;
  audioIncorrecto: HTMLAudioElement;

  constructor() {
    // Precargar los sonidos
    this.audioCorrecto = new Audio(this.sonidoCorrecto);
    this.audioIncorrecto = new Audio(this.sonidoIncorrecto);
  }

  ngOnInit() {
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
    const silabasCorrectas = this.silabas[this.palabraActualIndex];
    if (this.huecos.every((hueco, index) => hueco === silabasCorrectas[index])) {
      this.reproducirSonido(this.audioCorrecto);
      this.mensaje = '¡Correcto!';
      this.animacion = 'correcto';
      this.fondo = this.fondos[this.palabraActualIndex]; // Cambiar fondo
      this.puntos += 10; // Sumar 10 puntos
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
    }
  }

  reproducirSonido(audio: HTMLAudioElement) {
    audio.currentTime = 0; // Reiniciar el sonido si ya estaba reproduciéndose
    audio.play();
  }
}
