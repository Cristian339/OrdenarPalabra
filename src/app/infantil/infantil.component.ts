import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-infantil',
  templateUrl: './infantil.component.html',
  styleUrls: ['./infantil.component.scss'],
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgForOf
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
    'https://imgs.search.brave.com/6EGAbzhantlEC5TatsmDMuDHbSDO4ER_-anbRj1yy7A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGVwZS5sdC93cC1j/b250ZW50L3VwbG9h/ZHMvc3BhbHZpbnRp/L2FyYWJ1LXN2ZW50/eWtsYS0xMDI0eDY2/NC5qcGcud2VicA',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sergi_Arola_2012.jpg/200px-Sergi_Arola_2012.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Saint_Rita_of_Cascia.jpg/200px-Saint_Rita_of_Cascia.jpg'
  ];
  huecos: string[] = [];
  palabraActualIndex: number = 0;
  mensaje: string = '';
  fondo: string = '#f4f4f9'; // Color de fondo inicial

  constructor() { }

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
      this.mensaje = '¡Correcto!';
      this.fondo = '#d4edda'; // Fondo verde
      setTimeout(() => {
        this.palabraActualIndex++;
        if (this.palabraActualIndex < this.palabras.length) {
          this.inicializarHuecos();
          this.mensaje = '';
          this.fondo = '#f4f4f9'; // Restaurar fondo inicial
        } else {
          this.mensaje = '¡Has completado todas las preguntas!';
        }
      }, 1000);
    } else {
      this.mensaje = 'Incorrecto';
      this.fondo = '#f8d7da'; // Fondo rojo
    }
  }
}
