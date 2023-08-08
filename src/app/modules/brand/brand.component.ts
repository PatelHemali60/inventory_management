import { Component } from '@angular/core';
import { BrandService } from './service/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent {
  public category!: any[];
  filteredProduct: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: BrandService,
    private toastr: ToastrService
  ) {
    this.getCategoryList();
    //get product name from db
  }

  ngOnInit(): void {}

  //get user list from db
  public getCategoryList(): void {
    this.service.getBrand().subscribe({
      next: (data: any) => {
        this.category = data.Data;

        this.toastr.success('List display sucessfully !!!');
      },
      error: (e: any) => console.error(e),
    });
  }
  // {
  //   "Id": 2,
  //   "Name": "Home & Furniture",
  //   "Description": "Home & Furniture",
  //   "IsActive": true
  // },

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    this.service.deleteBrand(id).subscribe({
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
        this.getCategoryList();
      },
      error: (e) => console.error(e),
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }
}
