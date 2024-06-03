import { Component } from '@angular/core';
import { SubscriptionOptions } from 'src/app/models/pricing.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  public subscriptionOptions = SubscriptionOptions;

  public prices = {
    basic: 19,
    premium: 39
  }

  get isLoggedIn(): boolean {
    return this.commonService.isUserLoggedIn;
  } 

  get isBasicSubscription(): boolean {
    return this.commonService.userSubscirtionOption === SubscriptionOptions.Basic;
  }

  get isPremiumSubscription(): boolean {
    return this.commonService.userSubscirtionOption === SubscriptionOptions.Premium;
  }

  constructor(private commonService: CommonService) {}

  getSubscription(option: SubscriptionOptions, price: number): void {
    if (this.isLoggedIn) {
      this.commonService.openPaymentConfirmation(option, price);
    } else {
      this.commonService.openLoginPopup();
    }
  }
}
