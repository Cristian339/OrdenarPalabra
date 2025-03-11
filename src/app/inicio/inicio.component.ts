import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { pencil, informationCircleOutline, closeCircle, happyOutline, schoolOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  imports: [
    IonicModule,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  groupName: string = '';
  backgroundMusic: HTMLAudioElement;
  clickSound: HTMLAudioElement;
  typingSound: HTMLAudioElement;
  showInfoModal: boolean = false;

  constructor(private navCtrl: NavController) {
    addIcons({ pencil, informationCircleOutline, closeCircle, happyOutline, schoolOutline });

    // Initialize audio
    this.backgroundMusic = new Audio('assets/sonidos/background-children.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.4;

    // Updated click sound URL as requested
    this.clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-33a.mp3');
    this.typingSound = new Audio('assets/sonidos/typing.mp3');
  }

  ngOnInit() {
    this.playBackgroundMusic();
  }

  playBackgroundMusic() {
    this.backgroundMusic.play().catch(err => console.error('Error playing music:', err));
  }

  playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(err => console.error('Error playing sound:', err));
  }

  playTypingSound() {
    this.typingSound.currentTime = 0;
    this.typingSound.play().catch(err => console.error('Error playing sound:', err));
  }

  goToPage(page: string) {
    this.playClickSound();
    this.backgroundMusic.pause();

    // Pass groupName to the next page
    this.navCtrl.navigateForward(`/${page}`, {
      queryParams: { groupName: this.groupName || '¡Ordena las Palabras!' }
    });
  }

  showGameInfo() {
    this.playClickSound();
    this.showInfoModal = true;
  }

  hideGameInfo() {
    this.playClickSound();
    this.showInfoModal = false;
  }
}
