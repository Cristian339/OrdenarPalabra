import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-primaria',
  templateUrl: './primaria.component.html',
  styleUrls: ['./primaria.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class PrimariaComponent implements OnInit {
  groupName: string = '';
  words: string[] = ['San', 'Ignacio', 'de', 'Loyola'];
  answerSlots: string[] = ['', '', '', ''];
  score: number = 0;
  currentQuestionIndex: number = 0;
  questions: any[] = [
    {
      question: "¿Quién es esta persona?",
      image: "assets/Imagenes/SanIgnacio.jpg",
      correctAnswer: ['San', 'Ignacio', 'de', 'Loyola']
    },
    // Agrega más preguntas aquí
  ];
  feedback: string[] = ['', '', '', ''];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.groupName = params['group'] || 'Sin Nombre';
    });
  }

  checkAnswer() {
    const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
    let points = 0;
    this.answerSlots.forEach((word, index) => {
      if (word === correctAnswer[index]) {
        points += 10 / correctAnswer.length;
        this.feedback[index] = 'correct';
      } else {
        this.feedback[index] = 'incorrect';
      }
    });
    this.score += Math.round(points);
    setTimeout(() => {
      this.nextQuestion();
    }, 2000); // Espera 2 segundos antes de pasar a la siguiente pregunta
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.words = [...this.questions[this.currentQuestionIndex].correctAnswer].sort(() => Math.random() - 0.5);
      this.answerSlots = new Array(this.questions[this.currentQuestionIndex].correctAnswer.length).fill('');
      this.feedback = new Array(this.questions[this.currentQuestionIndex].correctAnswer.length).fill('');
    } else {
      alert('Juego terminado! Puntuación final: ' + this.score);
    }
  }

  drop(event: DragEvent, index: number) {
    event.preventDefault();
    const word = event.dataTransfer?.getData('text');
    if (word) {
      this.answerSlots[index] = word;
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, word: string) {
    event.dataTransfer?.setData('text', word);
  }
}
