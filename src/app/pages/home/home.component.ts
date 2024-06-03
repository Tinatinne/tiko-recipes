import { Component } from '@angular/core';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  recipeTags: any = [];

  constructor(private httpRequestsServie: HttpRequestsService) {
    this.httpRequestsServie.getRecipeTags().subscribe((response: any) => {
      if (response) {
        response.forEach((tag: string) => {
          this.httpRequestsServie.getRecipeByTag(tag).subscribe((res) => {
            this.recipeTags.push({ title: tag, image: res?.recipes[0].image });
          });
        });
      }
    });
  }
}
