import { Component, Input, OnInit } from '@angular/core';
import { ToggleChangeEventDetail } from '@ionic/angular';
import { IonToggleCustomEvent } from '@ionic/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  @Input() themeToggle = false;
  public appPages = [
    { title: 'chat', url: '/menu/chatrooms', icon: 'chatbubble' },
    { title: 'Profil', url: '/menu/profile', icon: 'person' },
  ];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');


    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
  }

  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark: boolean) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }


  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev: any) {

    this.toggleDarkTheme(ev.detail.checked);
  }
  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }


  isLoggedIn(): any {
    return this.authService.isAuthenticated();
  }
}
