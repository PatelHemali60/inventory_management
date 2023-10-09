import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './service/product.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  public Products!: any[];
  filteredProduct: any[] = [];
  public productname: any;
  public categoryname: any;
  public brandName: any;
  public searchText: string = '';
  public ImageUrl: any;
  page: number = 1;

  public data: any[] = this.Products;
  public excludeColumns: string[] = ['id'];

  // public currentPage: number;
  // public dataPerPage: number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.Products = [];
    // this.getProductList();
    this.GetallProductList();
    //get product name from db
    // this.ProductNameList();
    // this.CategoryNameList();
    // this.BrandNameList();
  }

  ngOnInit(): void {
    this.filterData('');
  }

  public navigateToForm() {
    this.router.navigate(['inventory/form']);
  }

  //get department list from db
  private GetallProductList(): void {
    this.productService.getallProduct().subscribe({
      next: (data: any) => {
        this.Products = data.Data;
        // console.log(this.Products, 'products');
        // this.ImageUrl = data.Data.ImageUrl;
        //console.log(this.ImageUrl, 'image');
      },
      error: (e) => console.error(e),
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
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            Swal.fire('Removed!', 'Product removed successfully.', 'success');
            this.GetallProductList();
          },
          error: (e: any) => console.error(e),
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'Product still in our database.', 'error');
      }
    });
  }

  //for filter data in search
  // handle change event of search input

  public handleChange(event: any): void {
    this.searchText = event.target.value;
    this.filterData(event.target.value);
  }

  // filter records by search text
  filterData(value: string): void {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') {
      this.filteredProduct = this.filteredProduct;
    } else {
      this.filteredProduct = this.Products.filter((item) => {
        return Object.keys(item).some((key) => {
          const itemValue = item[key];
          if (itemValue !== null && itemValue !== undefined) {
            return (
              !this.excludeColumns.includes(key) &&
              itemValue.toString().toLowerCase().includes(lowercasedValue)
            );
          }
          return false;
        });
      });
    }
  }
}
