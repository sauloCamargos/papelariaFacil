import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private sidebarOpen: boolean = true;
  private showSidebarToggle: boolean = false;
  constructor() { }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setSidebarOpen(newValue: boolean) {
    if (this.sidebarOpen != newValue) {
      this.sidebarOpen = newValue;
    }
  }

  get getSidebarOpen() {
    return this.sidebarOpen;
  }

  setShowSidebarToggle(newValue: boolean) {
    if (this.showSidebarToggle != newValue) {
      this.showSidebarToggle = newValue;
    }
  }

  get getShowSidebarToggle() {
    return this.showSidebarToggle;
  }

}
