import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'profile-action-bar',
  template: `
    <div class="profileActionBar">
      <div class="profileActionBar-anchor">
        <a class="profileActionBar-imgWrapper"></a>
      </div>
    </div>
  `,
  styleUrls: ['./profileActionBar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileActionBarComponent {

  constructor() {}
}