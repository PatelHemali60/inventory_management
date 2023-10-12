import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../role/service/role.service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './service/category.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public category!: any[];
  public Category_list!: any[];
  filteredProduct: any[] = [];
  page: number = 1;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: CategoryService,
    private toastr: ToastrService
  ) {
    this.getCategoryList();
    //get product name from db
  }

  ngOnInit(): void {}

  //get user list from db
  public getCategoryList(): void {
    this.service.getCategory().subscribe({
      next: (data: any) => {
        this.category = data.Data;
        this.Category_list = this.category.sort((a, b) => b.Id - a.Id);
      },
      error: (e) => console.error(e),
    });
  }

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    this.service.deleteCategory(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Are you sure want to Delete this Category ?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.value) {
            Swal.fire('Removed!', 'Category removed successfully.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Category still in our database.', 'error');
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
