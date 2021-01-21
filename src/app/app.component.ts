import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'papelariaFacil';

  // Sidebar Toggle Codes;

  sidebarOpen = false;
  sidebar = document.getElementById("sidebar");
  sidebarCloseIcon = document.getElementById("sidebarIcon");

  toggleSidebar() {
    if (!this.sidebarOpen) {
      this.sidebarOpen = true;
    }
  }

  closeSidebar() {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}
