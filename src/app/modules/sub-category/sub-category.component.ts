import { Component } from '@angular/core';
import { SubCategoryService } from './service/sub-category.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent {
  public category!: any[];
  filteredProduct: any[] = [];

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

        // this.toastr.success('List display sucessfully !!!');
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
    this.service.deletesubCategory(id).subscribe({
      next: () => this.getCategoryList(),
      error: (e: any) => console.error(e),
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }
}
