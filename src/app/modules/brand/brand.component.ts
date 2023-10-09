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
  public TotalData!: number;
  filteredProduct: any[] = [];
  pageOfItems!: Array<any>;
  page: number = 1;

  public itemsPerPage!: number;
  public totalItems!: number;

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
        this.totalItems = this.category.length;
        console.log(this.TotalData, 'brand data');
      },
      error: (e: any) => console.error(e),
    });
  }

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    Swal.fire({
      title: 'Are you sure want to Delete this?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // User clicked "Yes," proceed with deletion
        this.service.deleteBrand(id).subscribe({
          next: () => {
            Swal.fire('Removed!', 'Brand removed successfully.', 'success');
            this.getCategoryList();
          },
          error: (e: any) => console.error(e),
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'Brand still in our database.', 'error');
      }
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
