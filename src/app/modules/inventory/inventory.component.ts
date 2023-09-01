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
        console.log(this.Products, 'products');
        // this.ImageUrl = data.Data.ImageUrl;
        console.log(this.ImageUrl, 'image');
      },
      error: (e) => console.error(e),
    });
  }

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
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

        this.GetallProductList();
      },
      error: (e) => console.error(e),
    });
  }

  //get category name form this list
  // private CategoryNameList(): void {
  //   this.productService.getCategory().subscribe({
  //     next: (data: category[]) => {
  //       this.categoryname = data;
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }

  // //get brand name
  // private BrandNameList(): void {
  //   this.productService.getBrand().subscribe({
  //     next: (data: category[]) => {
  //       this.brandName = data;
  //     },
  //     error: (e) => console.error(e),
  //   });
  // }

  // //get user list from db
  // public getProductList(): void {
  //   this.productService.getProduct().subscribe({
  //     next: (data) => (this.Products = data),
  //     error: (e) => console.error(e),
  //   });
  // }

  //for filter data in search
  // handle change event of search input
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
