import { Component }  from '@angular/core';
import { Router }     from '@angular/router';

@Component({
  selector: 'body',
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  host:     {'[class.body-loginPage]':'isLoginPage'},
  providers: []
})
export class AppComponent {

  public isLoginPage: boolean;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.registerEvents();
  }

  /**
   * Registers events needed for the application
   */
  private registerEvents(): void {

  }
}
