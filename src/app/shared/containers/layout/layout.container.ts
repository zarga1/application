import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subscription }     from "rxjs";
import { ConfigService }    from '../../../app-config.service';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  template: `
    <app-header></app-header>
    <!--<navigation></navigation>-->
    <div class="layout-content">
      <ng-content></ng-content>
    </div>
  `
})
export class LayoutContainer {

  private assetsFolder: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private configService: ConfigService
  ) {
    this.assetsFolder = this.configService.get('paths').userImageFolder;
  }

  ngOnInit() {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private registerEvents() {

  }

}
