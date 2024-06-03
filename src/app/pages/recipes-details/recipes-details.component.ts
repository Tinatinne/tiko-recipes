import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent {
  productData: any = null;

  get recipeIsInFavorites(): boolean {
    return this.commonService.recipeIsInStorage(this.productData.id);
  }

  get isLoggedIn() {
    return this.commonService.isUserLoggedIn;
  }

  constructor(
    private httpRequestsService: HttpRequestsService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
  ) {
    const getProductId = this.activatedRoute.snapshot.paramMap.get('id');
    if (getProductId) {
      this.httpRequestsService
        .getSingleRecipe(getProductId)
        .pipe(catchError(() => this.router.navigate(['/not-found'])))
        .subscribe((response) => {
          this.productData = response;
        });
    }
  }

  public printRecipe(): void {
    window.print();
  }

  toggleFavorites(): void {
    this.commonService.toggleFavorites(this.productData);
  }
}
