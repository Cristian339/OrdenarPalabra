import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  groupName: string = '';

  constructor(private router: Router) {}

  goToPage(page: string) {
    if (this.groupName.trim()) {
      this.router.navigate([page], { queryParams: { groupName: this.groupName } });
    } else {
      alert('Por favor, ingresa un nombre de grupo.');
    }
  }
}
