import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <a routerLink="/products" routerLinkActive="active" class="header-logo">
        Tuto
      </a>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
