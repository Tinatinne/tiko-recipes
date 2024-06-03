import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import {
  RecipeDifficulty,
  SubscriptionOptions,
} from 'src/app/models/pricing.model';
import { CommonService } from 'src/app/services/common.service';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  recipes: any = [];
  isLoading = false;

  subscriptionOptions = SubscriptionOptions;

  get tag(): string {
    return this.activatedRoute.snapshot.paramMap.get('tag') || '';
  }

  get userSubscriptionType() {
    return this.commonService.userSubscirtionOption;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpRequestService: HttpRequestsService,
    private commonService: CommonService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchRecipes();
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

  fetchRecipes(): void {
    this.isLoading = true;

    if (this.tag) {
      this.httpRequestService
        .getRecipeByTag(this.tag)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((response: any) => {
          if (!response?.recipes?.length) {
            this.router.navigate(['/not-found']);
            return
          }
          this.recipes = response.recipes;
        });
    }
  }
}
