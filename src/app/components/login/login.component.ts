import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpRequestsService: HttpRequestsService,
    private _snackBar: MatSnackBar,
    private dialogRef: DialogRef,
    private commonService: CommonService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['emilys', [Validators.required]],
      password: ['emilyspass', [Validators.required]],
    });
  }

  logIn(): void {
    this.httpRequestsService
      .logIn(this.loginForm.value)
      .pipe(
        catchError((err) => {
          this._snackBar.open(err?.error?.message, 'Error', { duration: 3000 });
          return err;
        })
      )
      .subscribe((response) => {
        localStorage.setItem('token', response.token);

        this.httpRequestsService.fetchUserInfo().subscribe((userInfo) => {
          this.commonService.isUserLoggedIn = true;
          this.dialogRef.close();
        })
      });
  }
}
