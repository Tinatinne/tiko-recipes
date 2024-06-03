import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private httpClient: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.httpClient.get('https://dummyjson.com/recipes');
  }

  getSingleRecipe(id: string | number): Observable<any> {
    return this.httpClient.get(`https://dummyjson.com/recipes/${id}`);
  }

  getRecipeTags(): Observable<any> {
    return this.httpClient.get('https://dummyjson.com/recipes/tags');
  }

  getRecipeByTag(tag: string): Observable<any> {
    return this.httpClient.get(`https://dummyjson.com/recipes/tag/${tag}`);
  }

  logIn(data: any): Observable<any> {
    return this.httpClient.post('https://dummyjson.com/auth/login', data);
  }

  fetchUserInfo(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get('https://dummyjson.com/auth/me', { headers });
  }
}
