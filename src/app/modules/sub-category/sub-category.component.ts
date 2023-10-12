import { Component } from '@angular/core';
import { SubCategoryService } from './service/sub-category.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent {
  public category!: any[];
  public Sub_categorylist!: any[];
  filteredProduct: any[] = [];

  page: number = 1;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: SubCategoryService,
    private toastr: ToastrService
  ) {
    this.getCategoryList();
    //get product name from db
  }

  ngOnInit(): void {}

  //get user list from db
  public getCategoryList(): void {
    this.service.getsubCategory().subscribe({
      next: (data: any) => {
        this.category = data.Data;
        this.Sub_categorylist = this.category.sort((a, b) => b.Id - a.Id);
      },
      error: (e: any) => console.error(e),
    });
  }

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
        this.service.deletesubCategory(id).subscribe({
          next: () => {
            Swal.fire(
              'Removed!',
              'Sub-category removed successfully.',
              'success'
            );
            this.getCategoryList();
            this.page = 1;
          },
          error: (e: any) => console.error(e),
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'Sub-category still in our database.', 'error');
      }
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }
}
