import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen = false;

  get isLoggedIn() {
    return this.commonService.isUserLoggedIn;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  get favoritesAmount(): number | null {
    return this.commonService.favorites?.length
  }

  constructor(private commonService: CommonService) {}

  public openLoginPopup(): void {
    this.commonService.openLoginPopup();
  }

  public logOut(): void {
    this.commonService.logOut();
  }
}
