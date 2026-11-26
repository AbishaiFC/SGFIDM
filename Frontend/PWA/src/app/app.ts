import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@Component({
  imports: [RouterOutlet, SharedModule],
  selector: 'sgfidm-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Inko';
  private readonly router = inject(Router);
  readonly isAuthRoute = signal(false);

  constructor() {
    this.isAuthRoute.set(this.router.url.startsWith('/auth'));
    this.router.events.subscribe(() => {
      this.isAuthRoute.set(this.router.url.startsWith('/auth'));
    });
  }
}
