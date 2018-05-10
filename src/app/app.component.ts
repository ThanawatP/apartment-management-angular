import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  currentPage: string = "dashboard";

  setCurrentPage(name: string) {
    this.currentPage = name;
  }
}
