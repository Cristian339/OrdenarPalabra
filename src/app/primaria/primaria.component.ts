import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import {IonicModule} from "@ionic/angular";

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
  // Game properties
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

  // Background images - using direct URLs like in the Infantil component
  backgroundImages: string[] = [
    'https://img.freepik.com/vector-gratis/fondo-dibujado-mano-acuarela-pastel_23-2148902621.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracto-colorido_23-2148889930.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracto-colorido_23-2148889935.jpg',
    'https://img.freepik.com/free-vector/hand-drawn-cartoon-background_52683-30786.jpg',
    'https://img.freepik.com/free-vector/rainbow-sky-background_23-2148995842.jpg',
    'https://img.freepik.com/free-vector/children-template-with-balloons-clouds_1308-32341.jpg'
  ];
  currentBackground: string = '';

  // Questions
  questions: any[] = [
    {
      question: 'San Ignacio nació en...',
      correctAnswer: 'San Ignacio nació en España',
      image: 'https://cdn.pixabay.com/photo/2019/03/22/09/38/spain-4072789_1280.jpg'
    },
    {
      question: 'San Ignacio fundó la...',
      correctAnswer: 'San Ignacio fundó la Compañía de Jesús',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/JHS-IHS-monogram-name-Jesus.svg/800px-JHS-IHS-monogram-name-Jesus.svg.png'
    },
    {
      question: 'San Ignacio escribió los...',
      correctAnswer: 'San Ignacio escribió los Ejercicios Espirituales',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ejercicios_Espirituales_de_San_Ignacio_de_Loyola_1.jpg/800px-Ejercicios_Espirituales_de_San_Ignacio_de_Loyola_1.jpg'
    },
    {
      question: 'San Ignacio fue un...',
      correctAnswer: 'San Ignacio fue un santo católico',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Saint_Ignatius_of_Loyola.jpg/800px-Saint_Ignatius_of_Loyola.jpg'
    },
    {
      question: 'De joven, San Ignacio fue...',
      correctAnswer: 'De joven, San Ignacio fue soldado',
      image: 'https://img.freepik.com/free-vector/knight-warrior-silhouette_23-2147501798.jpg'
    },
    {
      question: 'Los jesuitas son seguidores de...',
      correctAnswer: 'Los jesuitas son seguidores de San Ignacio',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Monogram_of_the_Jesuits.svg/800px-Monogram_of_the_Jesuits.svg.png'
    },
    {
      question: 'San Ignacio estudió en la...',
      correctAnswer: 'San Ignacio estudió en la Universidad de París',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Sorbonne_France.JPG/1280px-Sorbonne_France.JPG'
    },
    {
      question: 'La fiesta de San Ignacio es el...',
      correctAnswer: 'La fiesta de San Ignacio es el 31 de julio',
      image: 'https://img.freepik.com/free-vector/flat-design-calendar-icon_23-2149511735.jpg'
    },
    {
      question: 'San Ignacio tuvo una...',
      correctAnswer: 'San Ignacio tuvo una conversión religiosa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Conv_San_Ignacio.jpg/800px-Conv_San_Ignacio.jpg'
    },
    {
      question: 'San Ignacio rezaba diciendo...',
      correctAnswer: 'San Ignacio rezaba diciendo todo para mayor gloria de Dios',
      image: 'https://cdn.pixabay.com/photo/2017/06/20/16/25/hands-2423801_1280.jpg'
    },
    {
      question: 'Los colegios jesuitas educan a...',
      correctAnswer: 'Los colegios jesuitas educan a muchos niños',
      image: 'https://cdn.pixabay.com/photo/2017/03/27/14/12/school-2179123_1280.jpg'
    },
    {
      question: 'San Ignacio fue herido en...',
      correctAnswer: 'San Ignacio fue herido en una pierna',
      image: 'https://cdn.pixabay.com/photo/2017/01/31/22/58/first-aid-2027702_1280.png'
    },
    {
      question: 'San Ignacio vivió en una...',
      correctAnswer: 'San Ignacio vivió en una cueva en Manresa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/La_Santa_Cova.jpg/800px-La_Santa_Cova.jpg'
    },
    {
      question: 'El Papa aprobó la...',
      correctAnswer: 'El Papa aprobó la Compañía de Jesús',
      image: 'https://cdn.pixabay.com/photo/2015/10/08/14/23/crown-978076_1280.jpg'
    },
    {
      question: 'San Ignacio amaba la...',
      correctAnswer: 'San Ignacio amaba la educación para todos',
      image: 'https://cdn.pixabay.com/photo/2014/07/31/22/50/reading-407168_1280.jpg'
    },
    {
      question: 'El lema de San Ignacio era...',
      correctAnswer: 'El lema de San Ignacio era en todo amar y servir',
      image: 'https://cdn.pixabay.com/photo/2019/12/12/09/09/heart-4689935_1280.jpg'
    },
    {
      question: 'San Ignacio ayudaba a los...',
      correctAnswer: 'San Ignacio ayudaba a los pobres y enfermos',
      image: 'https://cdn.pixabay.com/photo/2017/09/07/20/29/charity-2726756_1280.png'
    },
    {
      question: 'San Ignacio enseñaba a...',
      correctAnswer: 'San Ignacio enseñaba a encontrar a Dios en todo',
      image: 'https://cdn.pixabay.com/photo/2018/05/02/21/37/nature-3370233_1280.jpg'
    },
    {
      question: 'San Ignacio viajó a...',
      correctAnswer: 'San Ignacio viajó a Tierra Santa',
      image: 'https://cdn.pixabay.com/photo/2019/07/18/10/09/jerusalem-4345461_1280.jpg'
    },
    {
      question: 'San Ignacio murió en...',
      correctAnswer: 'San Ignacio murió en Roma',
      image: 'https://cdn.pixabay.com/photo/2020/11/24/19/34/colosseum-5773684_1280.jpg'
    }
  ];

  // Audio files
  dragSoundUrl: string = 'https://www.soundjay.com/button/sounds/button-09.mp3';
  dropSoundUrl: string = 'https://www.soundjay.com/button/sounds/button-10.mp3';
  correctSoundUrl: string = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3';
  incorrectSoundUrl: string = 'https://www.soundjay.com/misc/sounds/fail-buzzer-03.mp3';
  checkSoundUrl: string = 'https://www.soundjay.com/mechanical/sounds/page-flip-01a.mp3';

  // Audio objects like in Infantil component
  dragSound: HTMLAudioElement;
  dropSound: HTMLAudioElement;
  correctSound: HTMLAudioElement;
  incorrectSound: HTMLAudioElement;
  checkSound: HTMLAudioElement;

  // Touch handling
  private touchStartElement: any = null;
  private touchStartWord: string = '';
  private slotDragSource: number = -1;

  constructor(private renderer: Renderer2) {
    // Preload sounds
    this.dragSound = new Audio(this.dragSoundUrl);
    this.dropSound = new Audio(this.dropSoundUrl);
    this.correctSound = new Audio(this.correctSoundUrl);
    this.incorrectSound = new Audio(this.incorrectSoundUrl);
    this.checkSound = new Audio(this.checkSoundUrl);
  }

  ngOnInit(): void {
    this.totalQuestions = this.questions.length;
    this.currentBackground = this.getRandomBackground();
    this.setupQuestion();
  }

  // Get random background from the array
  getRandomBackground(): string {
    const index = Math.floor(Math.random() * this.backgroundImages.length);
    return this.backgroundImages[index];
  }

  // Set up current question
  setupQuestion(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswerWords = currentQuestion.correctAnswer.split(' ');

    this.words = [...correctAnswerWords].sort(() => Math.random() - 0.5);
    this.answerSlots = Array(correctAnswerWords.length).fill('');
    this.feedback = Array(correctAnswerWords.length).fill('');
    this.attemptsLeft = 2;
    this.currentMaxScore = this.score + 10;

    // Update current question number
    this.currentQuestionNumber = this.currentQuestionIndex + 1;

    // Change background
    this.currentBackground = this.getRandomBackground();
  }

  // Play sound effects
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

  // Highlight drop zone
  setDraggedOver(index: number): void {
    this.isDraggedOver = index;
  }

  // Start dragging from word pool or answer slot
  drag(event: DragEvent, word: string, fromSlotIndex: number = -1): void {
    if (event.dataTransfer) {
      const dragData = {word: word, fromSlot: fromSlotIndex};
      event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
      this.slotDragSource = fromSlotIndex;
      this.playSound('drag');
    }
  }

  // Allow drop
  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  // Handle drop with rearrangement
  drop(event: DragEvent, index: number): void {
    event.preventDefault();

    if (!event.dataTransfer) return;

    try {
      const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
      const word = dragData.word;
      const fromSlot = dragData.fromSlot;

      // Existing word in target slot
      const existingWord = this.answerSlots[index];

      if (fromSlot >= 0) {
        // Moving from one slot to another
        this.answerSlots[fromSlot] = '';
        this.feedback[fromSlot] = '';

        if (existingWord) {
          // Swap words between slots
          this.answerSlots[fromSlot] = existingWord;
        }

        // Place dragged word in target
        this.answerSlots[index] = word;
      } else {
        // From word pool to slot
        if (existingWord) {
          // Return existing word to pool
          this.words.push(existingWord);
        }

        // Place new word in slot
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

  // Return word to pool
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

  // Check answer
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

    if (allCorrect) {
      this.score += 10;
      this.playSound('correct');
      this.showFeedback('¡Excelente! ¡Lo lograste!', 'checkmark-circle', 'success');

      setTimeout(() => {
        this.showSuccessModal = true;
      }, 2000);
    } else {
      this.playSound('incorrect');

      if (this.attemptsLeft <= 0) {
        this.showFeedback('¡Se acabaron los intentos! La respuesta correcta era: ' +
          currentQuestion.correctAnswer, 'close-circle', 'error');

        setTimeout(() => {
          this.showSuccessModal = true;
        }, 3000);
      } else {
        const percentCorrect = (correctCount / correctAnswerWords.length) * 100;

        if (percentCorrect > 50) {
          this.showFeedback('¡Casi lo tienes! Inténtalo de nuevo.', 'alert-circle', 'warning');
        } else {
          this.showFeedback('Sigue intentando. Te queda ' + this.attemptsLeft +
            ' intento' + (this.attemptsLeft > 1 ? 's' : ''),
            'refresh-circle', 'warning');
        }
      }
    }
  }

  // Show feedback message
  showFeedback(message: string, icon: string, type: 'success' | 'error' | 'warning'): void {
    this.feedbackMessage = message;
    this.feedbackIcon = icon;
    this.showFeedbackModal = true;

    setTimeout(() => {
      this.showFeedbackModal = false;
    }, 3500);
  }

  // Move to next question
  nextQuestion(): void {
    this.showSuccessModal = false;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.setupQuestion();
    } else {
      this.gameCompleted = true;
      this.showFeedback(`¡Felicidades! Has completado el juego con ${this.score} puntos.`,
        'trophy', 'success');
    }
  }

  // Reset current question
  resetQuestion(): void {
    this.setupQuestion();
  }

  // Generate stars based on score
  getStars(): number[] {
    const starCount = Math.min(5, Math.floor(this.score / 20));
    return Array(starCount).fill(0);
  }

  startTouch(event: TouchEvent, word: string): void {
    this.touchStartElement = event.target;
    this.touchStartWord = word;
    this.playSound('drag');
  }

  moveTouch(event: TouchEvent): void {
    if (!this.touchStartElement || this.touchStartWord === '') return;

    event.preventDefault();

    const touch = event.touches[0];
    const element = this.touchStartElement;

    this.renderer.setStyle(element, 'position', 'fixed');
    this.renderer.setStyle(element, 'left', `${touch.clientX - 50}px`);
    this.renderer.setStyle(element, 'top', `${touch.clientY - 25}px`);
    this.renderer.setStyle(element, 'zIndex', '1000');
  }

  endTouch(event: TouchEvent): void {
    if (!this.touchStartElement || this.touchStartWord === '') return;

    const element = this.touchStartElement as HTMLElement;
    const touch = event.changedTouches[0];


    const dropZones = document.querySelectorAll('.drop-zone');
    let targetIndex = -1;

    dropZones.forEach((zone, index) => {
      const rect = zone.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        targetIndex = index;
      }
    });


    if (targetIndex !== -1) {
      const wordIndex = this.words.indexOf(this.touchStartWord);
      if (wordIndex !== -1) {
        this.answerSlots[targetIndex] = this.touchStartWord;
        this.words.splice(wordIndex, 1);
        this.playSound('drop');
      }
    }


    this.renderer.removeStyle(element, 'position');
    this.renderer.removeStyle(element, 'left');
    this.renderer.removeStyle(element, 'top');
    this.renderer.removeStyle(element, 'zIndex');

    this.touchStartElement = null;
    this.touchStartWord = '';
  }
}
