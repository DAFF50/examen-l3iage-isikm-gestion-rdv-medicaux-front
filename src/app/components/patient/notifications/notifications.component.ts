import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  // Gestion des filtres
  activeFilter: string = 'toutes';

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
