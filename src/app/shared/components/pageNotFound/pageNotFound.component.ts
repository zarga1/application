import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'page-not-found',
  template: `
    <div class="pageNotFound">
    	<div class="pageNotFound-content">
    		<img src="/assets/images/Martian.png" />
      	<h1>404 Error</h1>
      	<button (click)="goBack()">Page Not Found!</button>
    	</div>
    </div>
  `,
  styleUrls: ['./pageNotFound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
	constructor(private location: Location) {}

  public goBack() {
    this.location.back();
  }
}