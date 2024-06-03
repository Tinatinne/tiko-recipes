import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss'],
})
export class PaymentConfirmationComponent {
  get userSubscriptionOption(): string {
    return this.dialogData.option
  }

  get userSubscriptionOptionPrice(): string {
    return this.dialogData.price
  }

  constructor(
    private commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: DialogRef,
    private _snackBar: MatSnackBar,
  ) {}

  confirm(): void {
    this.commonService.setSubscription(this.dialogData.option);
    this.dialogRef.close();
    this._snackBar.open('Purchased successfully', 'Success', { duration: 3000 });

  }
}
