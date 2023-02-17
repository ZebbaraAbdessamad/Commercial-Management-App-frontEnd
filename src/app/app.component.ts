import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
  <body [class.toggle-sidebar]="isSidebarOpen">
  <app-root #app></app-root>


  </body>
`
})
export class AppComponent {
  isSidebarOpen = false;
  title = 'Commercial-Management-App-frontEnd';

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
