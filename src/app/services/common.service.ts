import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { SubscriptionOptions } from '../models/pricing.model';
import { PaymentConfirmationComponent } from '../components/payment-confirmation/payment-confirmation.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public userSubscirtionOption: null | string = null;

  public favorites: any = [];

  public isUserLoggedIn = false;

  constructor(public dialog: MatDialog, private router: Router) {
    if (localStorage.getItem('subscription')) {
      this.userSubscirtionOption = localStorage.getItem('subscription');
    }

    if (localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
  }

  public openLoginPopup(): void {
    this.dialog.open(LoginComponent);
  }

  public openPaymentConfirmation(
    option: SubscriptionOptions,
    price: number
  ): void {
    this.dialog.open(PaymentConfirmationComponent, { data: { option, price } });
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  public setSubscription(option: SubscriptionOptions): void {
    localStorage.setItem('subscription', option);
    this.userSubscirtionOption = option;
  }

  public logOut(): void {
    this.isUserLoggedIn = false;
    this.userSubscirtionOption = null;
    this.favorites = [];
    localStorage.clear();
    this.router.navigate(['/']);
  }

  public toggleFavorites(recipe: any): void {
    const recipeIndex = this.favorites.findIndex(
      (item: any) => item.id === recipe.id
    );

    if (recipeIndex !== -1) {
      this.favorites.splice(recipeIndex, 1);
    } else {
      this.favorites.push(recipe);
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  public recipeIsInStorage(id: number): boolean {
    return this.favorites.some((item: any) => item.id === id);
  }
}
