import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';

@Component({
  imports: [RouterOutlet, MatIconModule, SharedModule],
  selector: 'sgfidm-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'SGFIDM';
}
