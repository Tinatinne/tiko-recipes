import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeDifficulty, SubscriptionOptions } from 'src/app/models/pricing.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public recipes: any = []

  subscriptionOptions = SubscriptionOptions;

  get userSubscriptionType() {
    return this.commonService.userSubscirtionOption;
  }

  constructor(private commonService: CommonService, private router: Router,) {
    this.recipes = this.commonService.favorites;
  }

  enableNavigation(difficulty: RecipeDifficulty) {
    if (difficulty === RecipeDifficulty.Easy) {
      return true;
    } else if (
      difficulty === RecipeDifficulty.Medium &&
      (this.subscriptionOptions.Basic === this.userSubscriptionType ||
        this.subscriptionOptions.Premium === this.userSubscriptionType)
    ) {
      return true;
    } else if (
      difficulty === RecipeDifficulty.Hard &&
      this.subscriptionOptions.Premium === this.userSubscriptionType
    ) {
      return true;
    } else {
      return false;
    }
  }

  getSubscription(): void {
    this.router.navigate(['/pricing'])
  }
}
