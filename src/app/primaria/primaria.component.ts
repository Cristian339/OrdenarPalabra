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
  answerSpaces: string[] = ['', '', '', '']; // Add this property
  score: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.groupName = params['group'] || 'Sin Nombre';
    });
  }

  checkAnswer() {
    const correctAnswer = ['San', 'Ignacio', 'de', 'Loyola'];
    let points = 0;
    this.answerSlots.forEach((word, index) => {
      if (word === correctAnswer[index]) {
        points += 10 / correctAnswer.length;
      }
    });
    this.score += Math.round(points);
  }

  drop(event: DragEvent, space: string) {
    // Implement drop logic here
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, word: string) {
    // Implement drag logic here
  }
}
