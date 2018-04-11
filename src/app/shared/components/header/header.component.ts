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
        <img src="/assets/images/logo_full_dark.png">
      </a>

      <div class="header-profileBarWrapper">
        <profile-action-bar>
        </profile-action-bar>
      </div>
      <div class="header-languageSelectorWrapper">
        <language-selector>
        </language-selector>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
