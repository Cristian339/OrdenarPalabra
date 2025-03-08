import { Component } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class InicioComponent {
  groupName: string = '';

  constructor(private navCtrl: NavController) {}

  startGame(level: string) {
    if (this.groupName.trim()) {
      this.navCtrl.navigateForward(['/primario'], {
        queryParams: { group: this.groupName, level: level }
      });
    }
  }
}
