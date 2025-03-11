import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { arrowForward, checkmarkCircleOutline, heart, refreshOutline, trophy, star, homeOutline, refreshCircle } from "ionicons/icons";
import { addIcons } from "ionicons";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-primaria',
  templateUrl: './primaria.component.html',
  styleUrls: ['./primaria.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    NgStyle,
    IonicModule
  ]
})
export class PrimariaComponent implements OnInit {


  groupName: string = '¡Ordena las Palabras!';
  currentQuestionIndex: number = 0;
  score: number = 0;
  words: string[] = [];
  answerSlots: string[] = [];
  feedback: string[] = [];
  isDraggedOver: number = -1;
  gameCompleted: boolean = false;
  attemptsLeft: number = 2;
  showFeedbackModal: boolean = false;
  feedbackMessage: string = '';
  feedbackIcon: string = '';
  showSuccessModal: boolean = false;
  currentMaxScore: number = 0;
  currentQuestionNumber: number = 1;
  totalQuestions: number = 0;
  showInfoModal: boolean = true;
  hasShownInfoModal: boolean = false;
  infoImage: string = '/assets/Menu/Comentario.png';
  showFinalModal: boolean = false;
  pointsEarnedForCurrentQuestion: number = 0;
  perfectAnswerCount: number = 0;


  backgroundImages: string[] = [
    'https://st4.depositphotos.com/1763191/40189/v/450/depositphotos_401892196-stock-illustration-jesus-children-park-illustration.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-in-the-style-of-lush-landscape-backgrounds-image_2563946.jpg',
    'https://t4.ftcdn.net/jpg/07/43/98/11/360_F_743981194_ihotpsJIjrrLoEYbrWG8m7j74KH5y5aE.jpg',
    'https://i.pinimg.com/550x/6a/c8/96/6ac896f076d8e4843699052ff5d826b7.jpg',
    'https://serjesuita.co/images/actualidad/ignacio-modelo-para-la-compania-y-el-mundo-por-p-pedro-arrupe-sj.jpg',
    'https://t3.ftcdn.net/jpg/07/17/39/80/360_F_717398008_IFdzJdgjqsRKDkQw1hsJgYNmdusVDssu.jpg',
    'https://cantaycamina.net/wp-content/uploads/2021/08/San-Ignacio-de-Loyola-500.jpg',
    'https://st4.depositphotos.com/1763191/40189/v/450/depositphotos_401892196-stock-illustration-jesus-children-park-illustration.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-in-the-style-of-lush-landscape-backgrounds-image_2563946.jpg',
    'https://t4.ftcdn.net/jpg/07/43/98/11/360_F_743981194_ihotpsJIjrrLoEYbrWG8m7j74KH5y5aE.jpg',
    'https://i.pinimg.com/550x/6a/c8/96/6ac896f076d8e4843699052ff5d826b7.jpg',
    'https://serjesuita.co/images/actualidad/ignacio-modelo-para-la-compania-y-el-mundo-por-p-pedro-arrupe-sj.jpg',
    'https://t3.ftcdn.net/jpg/07/17/39/80/360_F_717398008_IFdzJdgjqsRKDkQw1hsJgYNmdusVDssu.jpg',
    'https://cantaycamina.net/wp-content/uploads/2021/08/San-Ignacio-de-Loyola-500.jpg',
    'https://st4.depositphotos.com/1763191/40189/v/450/depositphotos_401892196-stock-illustration-jesus-children-park-illustration.jpg',
    'https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-in-the-style-of-lush-landscape-backgrounds-image_2563946.jpg',
    'https://t4.ftcdn.net/jpg/07/43/98/11/360_F_743981194_ihotpsJIjrrLoEYbrWG8m7j74KH5y5aE.jpg',
    'https://i.pinimg.com/550x/6a/c8/96/6ac896f076d8e4843699052ff5d826b7.jpg',
    'https://serjesuita.co/images/actualidad/ignacio-modelo-para-la-compania-y-el-mundo-por-p-pedro-arrupe-sj.jpg',
    'https://t3.ftcdn.net/jpg/07/17/39/80/360_F_717398008_IFdzJdgjqsRKDkQw1hsJgYNmdusVDssu.jpg',
    'https://cantaycamina.net/wp-content/uploads/2021/08/San-Ignacio-de-Loyola-500.jpg'
  ];
  currentBackground: string = '';

  questions: any[] = [{
    question: '¿En qué lugar nació San Ignacio de Loyola?',
    correctAnswer: 'San Ignacio nació en Azpeitia en España',
    image: '/assets/ImagenesPreg/1.jpg'
  }, {
    question: '¿En qué año nació San Ignacio?',
    correctAnswer: 'San Ignacio nació en el año 1491',
    image: '/assets/ImagenesPreg/2.jpg'
  }, {
    question: '¿Cómo se llamaba San Ignacio antes de ser santo?',
    correctAnswer: 'Se llamaba Íñigo López de Loyola',
    image: '/assets/ImagenesPreg/3.jpg'
  },    {
      question: '¿Qué soñaba ser San Ignacio cuando era joven?',
      correctAnswer: 'San Ignacio soñaba ser un soldado valiente',
      image: '/assets/ImagenesPreg/4.jpg'
    },
    {
      question: '¿Cómo resultó herido San Ignacio?',
      correctAnswer: 'San Ignacio fue herido por una bala de cañón',
      image: '/assets/ImagenesPreg/5.jpg'
    },
    {
      question: '¿Qué hizo mientras se recuperaba de su herida?',
      correctAnswer: 'San Ignacio leyó sobre Jesús y los santos',
      image: '/assets/ImagenesPreg/6.jpg'
    },
    {
      question: '¿Qué decidió hacer después de leer esos libros?',
      correctAnswer: 'San Ignacio decidió seguir a Dios',
      image: '//assets/ImagenesPreg/7.jpg'
    },
    {
      question: '¿Qué importante libro escribió en Manresa?',
      correctAnswer: 'San Ignacio escribió los Ejercicios Espirituales',
      image: '/assets/ImagenesPreg/8.jpg'
    },
    {
      question: '¿A qué ciudad fue a estudiar San Ignacio?',
      correctAnswer: 'San Ignacio estudió en la Universidad de París',
      image: '/assets/ImagenesPreg/9.jpg'
    },
    {
      question: '¿Qué amigos importantes conoció en París?',
      correctAnswer: 'San Ignacio conoció a Francisco Javier y Pedro Fabro',
      image: '/assets/ImagenesPreg/10.jpg'
    },
    {
      question: '¿Cómo se llama el grupo que fundó con sus amigos?',
      correctAnswer: 'San Ignacio fundó la Compañía de Jesús',
      image: '/assets/ImagenesPreg/11.jpg'
    },
    {
      question: '¿Cuál era el objetivo de la Compañía de Jesús?',
      correctAnswer: 'Su objetivo era acercar a las personas a Dios',
      image: '/assets/ImagenesPreg/12.jpg'
      /*sdfsdfds*/
    },
    {
      question: '¿Qué es ser un jesuita?',
      correctAnswer: 'Un jesuita es parte del grupo que sigue a Jesús',
      image: '/assets/ImagenesPreg/13.jpg'
    },
    {
      question: '¿Qué creó San Ignacio para ayudar a los niños?',
      correctAnswer: 'San Ignacio creó escuelas y colegios',
      image: '/assets/ImagenesPreg/14.jpg'
    },
    {
      question: '¿En qué ciudad murió San Ignacio?',
      correctAnswer: 'San Ignacio murió en Roma Italia',
      image: '/assets/ImagenesPreg/15.jpg'
    },
    {
      question: '¿En qué año murió San Ignacio?',
      correctAnswer: 'San Ignacio murió en el año 1556',
      image: '/assets/ImagenesPreg/16.jpg'
    },
    {
      question: '¿Cuándo fue declarado santo?',
      correctAnswer: 'San Ignacio fue declarado santo en 1622',
      image: '/assets/ImagenesPreg/17.jpg'
    },
    {
      question: '¿Por qué recordamos a San Ignacio hoy?',
      correctAnswer: 'Lo recordamos por su fe y amor a Dios',
      image: '/assets/ImagenesPreg/18.jpg'
    },
    {
      question: '¿Cuál es el lema de los jesuitas?',
      correctAnswer: 'El lema es Ad maiorem Dei gloriam',
      image: '/assets/ImagenesPreg/19.jpg'
    },
    {
      question: '¿Qué día celebramos a San Ignacio?',
      correctAnswer: 'San Ignacio se celebra el 31 de julio',
      image: '/assets/ImagenesPreg/20.jpg'
    }
  ];



  dragSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-32.mp3';
  dropSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-31.mp3';
  correctSoundUrl: string = 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3';
  incorrectSoundUrl: string = 'https://www.soundjay.com/misc/sounds/fail-trombone-03.mp3';
  checkSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-33a.mp3';



  dragSound: HTMLAudioElement;
  dropSound: HTMLAudioElement;
  correctSound: HTMLAudioElement;
  incorrectSound: HTMLAudioElement;
  checkSound: HTMLAudioElement;
  backgroundMusic: HTMLAudioElement;
  // Touch handling



  private touchStartElement: any = null;
  private touchStartWord: string = '';
  private slotDragSource: number = -1;

  constructor(private renderer: Renderer2,private route: ActivatedRoute) {
    addIcons({
      checkmarkCircleOutline,
      refreshOutline,
      trophy,
      arrowForward,
      heart,
      star,
      'home-outline': homeOutline,
      'refresh-outline': refreshCircle
    });



    this.dragSound = new Audio(this.dragSoundUrl);
    this.dropSound = new Audio(this.dropSoundUrl);
    this.correctSound = new Audio(this.correctSoundUrl);
    this.incorrectSound = new Audio(this.incorrectSoundUrl);
    this.checkSound = new Audio(this.checkSoundUrl);

    this.backgroundMusic = new Audio('assets/sonidos/happy-kids-music-307326.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.1;



  }

  ngOnInit(): void {
    this.shuffleQuestions();
    this.totalQuestions = this.questions.length;
    this.currentBackground = this.getRandomBackground();
    this.setupQuestion();
    this.route.queryParams.subscribe(params => {
      this.groupName = params['groupName'] || '';
    });
  }


  playBackgroundMusic() {
    this.backgroundMusic.play().catch(err => console.error('Error playing music:', err));
  }
  shuffleQuestions(): void {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  getRandomBackground(): string {
    const index = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[index];
  }

  setupQuestion(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswerWords = currentQuestion.correctAnswer.split(' ');

    this.words = [...correctAnswerWords].sort(() => Math.random() - 0.5);
    this.answerSlots = Array(correctAnswerWords.length).fill('');
    this.feedback = Array(correctAnswerWords.length).fill('');
    this.attemptsLeft = 2;
    this.currentMaxScore = this.score + 10;
    this.pointsEarnedForCurrentQuestion = 0;

    this.currentQuestionNumber = this.currentQuestionIndex + 1;

    this.currentBackground = this.getRandomBackground();
  }

  playSound(type: 'drag' | 'drop' | 'correct' | 'incorrect' | 'check'): void {
    let audio: HTMLAudioElement;

    switch (type) {
      case 'drag':
        audio = this.dragSound;
        break;
      case 'drop':
        audio = this.dropSound;
        break;
      case 'correct':
        audio = this.correctSound;
        break;
      case 'incorrect':
        audio = this.incorrectSound;
        break;
      case 'check':
        audio = this.checkSound;
        break;
      default:
        return;
    }

    audio.currentTime = 0;
    audio.play().catch(error => console.error('Error playing sound:', error));
  }

  setDraggedOver(index: number): void {
    this.isDraggedOver = index;
  }

  drag(event: DragEvent, word: string, fromSlotIndex: number = -1): void {
    if (event.dataTransfer) {
      const dragData = {word: word, fromSlot: fromSlotIndex};
      event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
      this.slotDragSource = fromSlotIndex;
      this.playSound('drag');
    }
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent, index: number): void {
    event.preventDefault();

    if (!event.dataTransfer) return;

    try {
      const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
      const word = dragData.word;
      const fromSlot = dragData.fromSlot;



      const existingWord = this.answerSlots[index];

      if (fromSlot >= 0) {


        this.answerSlots[fromSlot] = '';
        this.feedback[fromSlot] = '';

        if (existingWord) {


          this.answerSlots[fromSlot] = existingWord;
        }



        this.answerSlots[index] = word;
      } else {


        if (existingWord) {


          this.words.push(existingWord);
        }



        this.answerSlots[index] = word;
        const wordIndex = this.words.indexOf(word);
        if (wordIndex !== -1) {
          this.words.splice(wordIndex, 1);
        }
      }

      this.playSound('drop');
      this.feedback[index] = '';
    } catch (error) {
      console.error('Error handling drop:', error);
    }

    this.setDraggedOver(-1);
  }

  dropToPool(event: DragEvent): void {
    event.preventDefault();

    if (!event.dataTransfer) return;

    try {
      const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
      const word = dragData.word;
      const fromSlot = dragData.fromSlot;

      if (fromSlot >= 0) {
        this.words.push(word);
        this.answerSlots[fromSlot] = '';
        this.feedback[fromSlot] = '';
        this.playSound('drop');
      }
    } catch (error) {
      console.error('Error dropping to pool:', error);
    }
  }

  checkAnswer(): void {
    this.playSound('check');
    this.attemptsLeft--;

    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswerWords = currentQuestion.correctAnswer.split(' ');
    let allCorrect = true;
    let correctCount = 0;

    for (let i = 0; i < this.answerSlots.length; i++) {
      if (this.answerSlots[i] === correctAnswerWords[i]) {
        this.feedback[i] = 'correct';
        correctCount++;
      } else {
        this.feedback[i] = 'incorrect';
        allCorrect = false;
      }
    }


    const earnedPoints = correctCount === 0 ? 0 : Math.max(1, Math.round((correctCount / correctAnswerWords.length) * 10));
    const remainingPoints = 10 - this.pointsEarnedForCurrentQuestion;
    const pointsToAdd = Math.min(earnedPoints, remainingPoints);

    if (allCorrect) {

      this.score += remainingPoints;
      this.pointsEarnedForCurrentQuestion = 10; // Max points reached


      if (this.pointsEarnedForCurrentQuestion === 10) {
        this.perfectAnswerCount++;
      }

      this.playSound('correct');
      this.showFeedback(`¡Excelente! ¡Lo lograste! +${remainingPoints} puntos`, 'checkmark-circle', 'success', 3500);

      setTimeout(() => {
        this.showSuccessModal = true;
      }, 2000);
    } else {
      if (correctCount > 0 && pointsToAdd > 0) {
        this.score += pointsToAdd;
        this.pointsEarnedForCurrentQuestion += pointsToAdd;

        this.showFeedback(`¡Tienes ${correctCount} palabras correctas! +${pointsToAdd} puntos`,
          'alert-circle', 'warning', 3500);
      } else if (correctCount === 0) {
        // Special case for zero correct answers
        this.showFeedback(`No has acertado ninguna palabra. +0 puntos`,
          'alert-circle', 'warning', 3500);
      }

      this.playSound('incorrect');

      if (this.attemptsLeft <= 0) {
        this.showFeedback('¡Se acabaron los intentos! La respuesta correcta era: ' +
          currentQuestion.correctAnswer, 'close-circle', 'error', 5000);

        setTimeout(() => {
          this.showSuccessModal = true;
        }, 5000);
      } else {
        const percentCorrect = (correctCount / correctAnswerWords.length) * 100;

        if (percentCorrect > 50) {
          this.showFeedback(`¡Casi lo tienes! Inténtalo de nuevo. Has ganado ${pointsToAdd} puntos.`, 'alert-circle', 'warning', 3500);
        } else if (correctCount > 0) {
          this.showFeedback(`Sigue intentando. Te queda ${this.attemptsLeft} intento. Has ganado ${pointsToAdd} puntos.`,
            'refresh-circle', 'warning', 3500);
        } else {
          this.showFeedback(`Sigue intentando. Te queda ${this.attemptsLeft} intento. No has ganado puntos.`,
            'refresh-circle', 'warning', 3500);
        }
      }
    }
  }

  showFeedback(message: string, icon: string, type: 'success' | 'error' | 'warning', duration: number = 3500): void {
    this.feedbackMessage = message;
    this.feedbackIcon = icon;
    this.showFeedbackModal = true;

    setTimeout(() => {
      this.showFeedbackModal = false;
    }, duration);
  }

  nextQuestion(): void {
    this.showSuccessModal = false;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.setupQuestion();
    } else {
      this.gameCompleted = true;

      this.showFeedback(`¡Felicidades! Has completado el juego con ${this.score} puntos.`,
        'trophy', 'success', 4000);

      // Show final modal after a delay
      setTimeout(() => {
        this.showFinalModal = true;
      }, 4500);
    }
  }

  restartGame(): void {
    this.showFinalModal = false;
    this.gameCompleted = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.perfectAnswerCount = 0;
    this.shuffleQuestions();
    this.setupQuestion();
  }

  resetQuestion(): void {
    this.setupQuestion();
  }

  getStars(): number[] {
    const starCount = Math.min(5, Math.floor(this.score / 20));
    return Array(starCount).fill(0);
  }

  private touchOffset = {x: 0, y: 0};



  startTouch(event: TouchEvent, word: string): void {


    event.preventDefault();

    this.touchStartElement = event.target;
    this.touchStartWord = word;

    const touch = event.touches[0];
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();



    this.touchOffset = {
      x: touch.clientX - (rect.left + rect.width / 2),
      y: touch.clientY - (rect.top + rect.height / 2)
    };



    const clone = element.cloneNode(true) as HTMLElement;
    this.renderer.setStyle(clone, 'position', 'fixed');
    this.renderer.setStyle(clone, 'left', `${touch.clientX - this.touchOffset.x}px`);
    this.renderer.setStyle(clone, 'top', `${touch.clientY - this.touchOffset.y}px`);
    this.renderer.setStyle(clone, 'zIndex', '1000');
    this.renderer.setStyle(clone, 'opacity', '0.8');
    this.renderer.setStyle(clone, 'pointer-events', 'none');
    this.renderer.addClass(clone, 'touch-dragging');



    this.renderer.setAttribute(clone, 'data-drag-id', Date.now().toString());

    document.body.appendChild(clone);
    this.touchStartElement = clone;

    this.playSound('drag');
  }



  moveTouch(event: TouchEvent): void {
    if (!this.touchStartElement || this.touchStartWord === '') return;

    event.preventDefault();

    const touch = event.touches[0];
    const element = this.touchStartElement as HTMLElement;



    this.renderer.setStyle(element, 'left', `${touch.clientX - this.touchOffset.x}px`);
    this.renderer.setStyle(element, 'top', `${touch.clientY - this.touchOffset.y}px`);
  }



  endTouch(event: TouchEvent, slotIndex?: number): void {
    if (!this.touchStartElement || this.touchStartWord === '') return;

    event.preventDefault();

    const element = this.touchStartElement as HTMLElement;
    const touch = event.changedTouches[0];



    if (element.parentNode === document.body) {
      document.body.removeChild(element);
    }



    const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);

    if (slotIndex !== undefined) {
      this.handleDrop(slotIndex);
    } else if (elementAtPoint) {


      const slotElement = elementAtPoint.closest('.answer-slot');
      if (slotElement) {
        const index = slotElement.getAttribute('data-index');
        if (index) {
          this.handleDrop(parseInt(index, 10));
        }
      } else if (elementAtPoint.closest('.word-bank')) {
        this.returnWordToBank();
      }
    }

    this.touchStartElement = null;
    this.touchStartWord = '';
  }



  private handleDrop(slotIndex: number): void {
    const existingWord = this.answerSlots[slotIndex];



    let fromSlot = -1;
    for (let i = 0; i < this.answerSlots.length; i++) {
      if (this.answerSlots[i] === this.touchStartWord) {
        fromSlot = i;
        break;
      }
    }

    if (fromSlot >= 0) {


      this.answerSlots[fromSlot] = '';
      this.feedback[fromSlot] = '';

      if (existingWord) {
        this.answerSlots[fromSlot] = existingWord;
      }

      this.answerSlots[slotIndex] = this.touchStartWord;
    } else {


      const wordIndex = this.words.indexOf(this.touchStartWord);

      if (wordIndex !== -1) {
        if (existingWord) {
          this.words.push(existingWord);
        }

        this.answerSlots[slotIndex] = this.touchStartWord;
        this.words.splice(wordIndex, 1);
      }
    }

    this.playSound('drop');
  }



  private returnWordToBank(): void {


    let fromSlot = -1;
    for (let i = 0; i < this.answerSlots.length; i++) {
      if (this.answerSlots[i] === this.touchStartWord) {
        fromSlot = i;
        break;
      }
    }

    if (fromSlot >= 0) {
      this.words.push(this.touchStartWord);
      this.answerSlots[fromSlot] = '';
      this.feedback[fromSlot] = '';
      this.playSound('drop');
    }
  }

  closeInfoModal(): void {
    this.playSound('check');
    this.showInfoModal = false;
    this.hasShownInfoModal = true;
    this.playBackgroundMusic();
  }


}
