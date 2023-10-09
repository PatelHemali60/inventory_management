import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiscountService } from './service/discount.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  public Discount!: any[];
  filteredProduct: any[] = [];
  page: number = 1;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: DiscountService,
    private toastr: ToastrService
  ) {
    this.getDiscountTypeList();
    //get product name from db
  }

  ngOnInit(): void {}

  //get user list from db
  public getDiscountTypeList(): void {
    this.service.getDiscountType().subscribe({
      next: (data: any) => {
        this.Discount = data.Data;
      },
      error: (e) => console.error(e),
    });
  }

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    Swal.fire({
      title: 'Are you sure want to Delete this Discount-Type ?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // User clicked "Yes," proceed with deletion
        this.service.deleteDiscount(id).subscribe({
          next: () => {
            Swal.fire(
              'Removed!',
              'DiscountType removed successfully.',
              'success'
            );
            this.getDiscountTypeList();
          },
          error: (e: any) => console.error(e),
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'DiscountType still in our database.', 'error');
      }
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }
}
