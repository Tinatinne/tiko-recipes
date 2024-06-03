import { Component } from '@angular/core';
import { HttpRequestsService } from './services/http-requests.service';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tiko-recipes';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private httpRequestsService: HttpRequestsService,
    private commonService: CommonService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });

    this.httpRequestsService.fetchUserInfo().subscribe((user) => {
      this.commonService.isUserLoggedIn = true;
    });
  }
}
