import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-productdetail',
  templateUrl: './view-productdetail.component.html',
  styleUrls: ['./view-productdetail.component.scss'],
})
export class ViewProductdetailComponent {
  public ID: any;
  public LoggedinUser: any;

  constructor(private router: Router, private overlay: Overlay) {}

  public BuyNow() {
    if (this.ID == null) {
      this.LoggedinUser = true;
      // location.reload();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
      this.LoggedinUser = false;
    }
  }
}
