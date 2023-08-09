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

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: DiscountService,
    private toastr: ToastrService
  ) {
    this.getRoleList();
    //get product name from db
  }

  ngOnInit(): void {}

  //get user list from db
  public getRoleList(): void {
    this.service.getDiscountType().subscribe({
      next: (data: any) => {
        this.Discount = data.Data;

        this.toastr.success('List display sucessfully !!!');
      },
      error: (e) => console.error(e),
    });
  }

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    this.service.deleteDiscount(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Are you sure want to Delete this ?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('Removed!', 'Product removed successfully.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Product still in our database.)', 'error');
          }
        });
        this.getRoleList();
      },
      error: (e) => console.error(e),
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }
}
