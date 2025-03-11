import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { arrowForward, checkmarkCircleOutline, heart, refreshOutline, trophy, star } from "ionicons/icons";
import { addIcons } from "ionicons";

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
  showInfoModal: boolean = true;
  hasShownInfoModal: boolean = false;
  infoImage: string = 'assets/Menu/Comentario.png';

  backgroundImages: string[] = [
    'https://img.freepik.com/vector-gratis/fondo-dibujado-mano-acuarela-pastel_23-2148902621.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracto-colorido_23-2148889930.jpg',
    'https://img.freepik.com/vector-gratis/fondo-acuarela-abstracto-colorido_23-2148889935.jpg',
    'https://img.freepik.com/free-vector/hand-drawn-cartoon-background_52683-30786.jpg',
    'https://img.freepik.com/free-vector/rainbow-sky-background_23-2148995842.jpg',
  ];
  currentBackground: string = '';

  questions: any[] = [
    {
      question: '¿Dónde nació San Ignacio?',
      correctAnswer: 'San Ignacio nació en España',
      image: 'assets/images/spain.jpg'
    },
    {
      question: '¿Qué organización fundó San Ignacio?',
      correctAnswer: 'San Ignacio fundó la Compañía de Jesús',
      image: 'assets/images/jesuit-symbol.jpg'
    },
    {
      question: '¿Qué obra importante escribió San Ignacio?',
      correctAnswer: 'San Ignacio escribió los Ejercicios Espirituales',
      image: 'assets/images/spiritual-exercises.jpg'
    },
    {
      question: '¿Qué fue San Ignacio en la Iglesia?',
      correctAnswer: 'San Ignacio fue un santo católico',
      image: 'assets/images/st-ignatius.jpg'
    },
    {
      question: '¿Qué profesión tuvo San Ignacio durante su juventud?',
      correctAnswer: 'De joven, San Ignacio fue soldado',
      image: 'assets/images/soldier.jpg'
    },
    {
      question: '¿De quién son seguidores los jesuitas?',
      correctAnswer: 'Los jesuitas son seguidores de San Ignacio',
      image: 'assets/images/jesuits.jpg'
    },
    {
      question: '¿Dónde realizó sus estudios San Ignacio?',
      correctAnswer: 'San Ignacio estudió en la Universidad de París',
      image: 'assets/images/paris-university.jpg'
    },
    {
      question: '¿Cuándo se celebra la fiesta de San Ignacio?',
      correctAnswer: 'La fiesta de San Ignacio es el 31 de julio',
      image: 'assets/images/calendar.jpg'
    },
    {
      question: '¿Qué experiencia cambió la vida de San Ignacio?',
      correctAnswer: 'San Ignacio tuvo una conversión religiosa',
      image: 'assets/images/conversion.jpg'
    },
    {
      question: '¿Cuál era la frase habitual en las oraciones de San Ignacio?',
      correctAnswer: 'San Ignacio rezaba diciendo todo para mayor gloria de Dios',
      image: 'assets/images/prayer.jpg'
    },
    {
      question: '¿A quiénes educan los colegios jesuitas?',
      correctAnswer: 'Los colegios jesuitas educan a muchos niños',
      image: 'assets/images/school.jpg'
    },
    {
      question: '¿En qué parte del cuerpo fue herido San Ignacio?',
      correctAnswer: 'San Ignacio fue herido en una pierna',
      image: 'assets/images/leg-injury.jpg'
    },
    {
      question: '¿En qué lugar especial vivió San Ignacio un tiempo?',
      correctAnswer: 'San Ignacio vivió en una cueva en Manresa',
      image: 'assets/images/cave.jpg'
    },
    {
      question: '¿Qué organización religiosa aprobó el Papa?',
      correctAnswer: 'El Papa aprobó la Compañía de Jesús',
      image: 'assets/images/pope.jpg'
    },
    {
      question: '¿Qué valoraba especialmente San Ignacio para la sociedad?',
      correctAnswer: 'San Ignacio amaba la educación para todos',
      image: 'assets/images/education.jpg'
    },
    {
      question: '¿Cuál era el lema principal de San Ignacio?',
      correctAnswer: 'El lema de San Ignacio era en todo amar y servir',
      image: 'assets/images/heart.jpg'
    },
    {
      question: '¿A qué grupos de personas ayudaba San Ignacio?',
      correctAnswer: 'San Ignacio ayudaba a los pobres y enfermos',
      image: 'assets/images/charity.jpg'
    },
    {
      question: '¿Qué enseñanza espiritual promovía San Ignacio?',
      correctAnswer: 'San Ignacio enseñaba a encontrar a Dios en todo',
      image: 'assets/images/spirituality.jpg'
    },
    {
      question: '¿A qué lugar sagrado viajó San Ignacio?',
      correctAnswer: 'San Ignacio viajó a Tierra Santa',
      image: 'assets/images/holy-land.jpg'
    },
    {
      question: '¿Dónde falleció San Ignacio?',
      correctAnswer: 'San Ignacio murió en Roma',
      image: 'assets/images/rome.jpg'
    }
  ];

  // Audio files
  dragSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-32.mp3';
  dropSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-31.mp3';
  correctSoundUrl: string = 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3';
  incorrectSoundUrl: string = 'https://www.soundjay.com/misc/sounds/fail-trombone-03.mp3';
  checkSoundUrl: string = 'https://www.soundjay.com/buttons/sounds/button-33a.mp3';

  // Audio objects
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
    addIcons({checkmarkCircleOutline, refreshOutline, trophy, arrowForward, heart, star });
    // Preload sounds
    this.dragSound = new Audio(this.dragSoundUrl);
    this.dropSound = new Audio(this.dropSoundUrl);
    this.correctSound = new Audio(this.correctSoundUrl);
    this.incorrectSound = new Audio(this.incorrectSoundUrl);
    this.checkSound = new Audio(this.checkSoundUrl);
  }

  ngOnInit(): void {
    this.shuffleQuestions();
    this.totalQuestions = this.questions.length;
    this.currentBackground = this.getRandomBackground();
    this.setupQuestion();
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

    // Update current question number
    this.currentQuestionNumber = this.currentQuestionIndex + 1;

    // Change background
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

    if (allCorrect) {
      this.score += 10;
      this.playSound('correct');
      this.showFeedback('¡Excelente! ¡Lo lograste!', 'checkmark-circle', 'success', 3500);

      setTimeout(() => {
        this.showSuccessModal = true;
      }, 2000);
    } else {
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
          this.showFeedback('¡Casi lo tienes! Inténtalo de nuevo.', 'alert-circle', 'warning', 3500);
        } else {
          this.showFeedback('Sigue intentando. Te queda ' + this.attemptsLeft +
            ' intento' + (this.attemptsLeft > 1 ? 's' : ''),
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
        'trophy', 'success');
    }
  }

  resetQuestion(): void {
    this.setupQuestion();
  }

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

  closeInfoModal(): void {
    this.playSound('check'); // Fixed: Using existing playSound method instead of undefined playButtonSound
    this.showInfoModal = false;
    this.hasShownInfoModal = true;
  }
}
