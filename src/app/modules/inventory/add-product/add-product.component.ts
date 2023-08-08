import { SubCategoryService } from './../../sub-category/service/sub-category.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../../category/service/category.service';
import { BrandService } from '../../brand/service/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  //   @Output() cancel: EventEmitter<Event>;
  //   @Output() onSubmitData: EventEmitter<Event>;
  //   public product_Form!: FormGroup;
  //   public departments: product[];
  //   public categoryList!: category[];
  //   public subCategorylist!: subCategory[];
  //   public Unit!: unit[];
  //   public brand!: brand[];
  //   public tax!: Tax[];
  //   public discount!: DiscountType[];
  //   public status!: Status[];
  //   private id: number;
  //   private isAddMode: boolean;
  //   public base64Output!: any;
  //   public base64Image!: string;
  //   public productData!: any;
  //   constructor(
  //     private fb: FormBuilder,
  //     private productService: ProductService,
  //     private categoryService: CategoryService,
  //     private SubCategoryService: SubCategoryService,
  //     private brandService: BrandService,
  //     private router: Router,
  //     private route: ActivatedRoute,
  //     private toastr: ToastrService
  //   ) {
  //     this.product_Form = this.buildUsersForm();
  //     this.departments = [];
  //     this.id = this.route.snapshot.params['id'];
  //     this.isAddMode = !this.id;
  //     this.cancel = new EventEmitter<Event>();
  //     this.onSubmitData = new EventEmitter<Event>();
  //   }
  //   //On init get department list and ckeck if its addMode
  //   ngOnInit(): void {
  //     this.getDepartmentList();
  //     this.getcategoryList();
  //     this.getsubCategoryList();
  //     this.getbrandList();
  //     this.getUnitList();
  //     this.getTaxList();
  //     this.getdiscountList();
  //     this.getStatusList();
  //     this.id = this.route.snapshot.params['id'];
  //     this.isAddMode = !this.id;
  //     // if (!this.isAddMode) {
  //     //   this.productService
  //     //     .getById(this.id)
  //     //     .subscribe((x) => this.userForm.patchValue(x));
  //     // }
  //   }
  //   //Reactive Form
  //   private buildUsersForm(): FormGroup {
  //     return this.fb.group({
  //       Id: [null],
  //       Name: [1, Validators.required],
  //       CategoryId: [1, Validators.required],
  //       CategoryName: [null],
  //       SubCategoryId: [1, Validators.required],
  //       SubCategoryName: [null],
  //       BrandId: [1, Validators.required],
  //       BrandName: [null],
  //       Unit: [1, Validators.required],
  //       Sku: [null, Validators.required],
  //       MinimumQty: [null, Validators.required],
  //       Quantity: [null, Validators.required],
  //       Description: [null, Validators.required],
  //       Tax: [1, Validators.required],
  //       DiscountTypeId: [1, Validators.required],
  //       DiscountTypeName: [],
  //       Price: [null, Validators.required],
  //       Status: [1, Validators.required],
  //       ImageUrl: [null, Validators.required],
  //       IsActive: [false],
  //     });
  //   }
  //   // "Id": 3,
  //   // "Name": "vivo T2x 5G ",
  //   // "CategoryId": 4,
  //   // "CategoryName": "Electronics",
  //   // "SubCategoryId": 11,
  //   // "SubCategoryName": "Mobile",
  //   // "BrandId": 7,
  //   // "BrandName": "Vivo",
  //   // "Unit": 20,
  //   // "SKU": 10,
  //   // "MinimumQty": 10,
  //   // "Quantity": 30,
  //   // "Description": "With the superb Vivo T2x 5G, you can take advantage of great pictures and a flawless user experience",
  //   // "Tax": "string",
  //   // "DiscountTypeId": 1,
  //   // "DiscountTypeName": "Discount 100%",
  //   // "Price": 16000,
  //   // "Status": "InStock",
  //   // "ImageUrl": "string",
  //   // "IsActive": true
  //   //get department list from db
  //   private getDepartmentList(): void {
  //     this.productService.getDepartments().subscribe({
  //       next: (data: any[]) => {
  //         this.departments = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //category list
  //   private getcategoryList(): void {
  //     this.categoryService.getCategory().subscribe({
  //       next: (data: any[]) => {
  //         this.categoryList = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //subcategory list
  //   private getsubCategoryList(): void {
  //     this.SubCategoryService.getsubCategory().subscribe({
  //       next: (data: any[]) => {
  //         this.subCategorylist = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //get brand
  //   private getbrandList(): void {
  //     this.brandService.getBrand().subscribe({
  //       next: (data: any[]) => {
  //         this.brand = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //get unit list
  //   private getUnitList(): void {
  //     this.usersService.getUnit().subscribe({
  //       next: (data: any[]) => {
  //         this.Unit = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //get unit list
  //   private getTaxList(): void {
  //     this.usersService.getTax().subscribe({
  //       next: (data: any[]) => {
  //         this.tax = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //get discount type
  //   private getdiscountList(): void {
  //     this.usersService.getDiscountType().subscribe({
  //       next: (data: any[]) => {
  //         this.discount = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   private getStatusList(): void {
  //     this.usersService.getStatus().subscribe({
  //       next: (data: any[]) => {
  //         this.status = data;
  //       },
  //       error: (e) => console.log(e),
  //     });
  //   }
  //   //for image
  //   public handleInputChange(e: any) {
  //     var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //     var pattern = /image-*/;
  //     var reader = new FileReader();
  //     if (!file.type.match(pattern)) {
  //       alert('invalid format');
  //       return;
  //     }
  //     reader.onload = this.handleReaderLoaded.bind(this);
  //     reader.readAsDataURL(file);
  //   }
  //   handleReaderLoaded(e: any) {
  //     let reader = e.target;
  //     this.base64Image = reader.result;
  //     //console.log(this.base64Image);
  //   }
  //   //Post data to db
  //   public createProduct(): void {
  //     this.productData = {
  //       productname: this.product_Form.value.productname,
  //       category: this.product_Form.value.category,
  //       Subcategory: this.product_Form.value.Subcategory,
  //       Brand: this.product_Form.value.Brand,
  //       Unit: this.product_Form.value.Unit,
  //       Sku: this.product_Form.value.Sku,
  //       MinimumQTY: this.product_Form.value.MinimumQTY,
  //       Qty: this.product_Form.value.Qty,
  //       Description: this.product_Form.value.Description,
  //       Tax: this.product_Form.value.Tax,
  //       Discount: this.product_Form.value.Discount,
  //       Price: this.product_Form.value.Price,
  //       Status: this.product_Form.value.Status,
  //       image: this.base64Image,
  //     };
  //     console.log(this.productData, 'dataaaaaaaa');
  //     this.productService
  //       .AddProduct(this.productData)
  //       .then((res: any) => {
  //         this.toastr.success('Add Brand sucessfully !!!');
  //         this.navigateToList();
  //       })
  //       .catch((error: any) => {});
  //   }
  //   //on Form submit
  //   //on Form submit
  //   public onSubmit(): void {
  //     console.log('hello there');
  //     if (this.isAddMode && this.product_Form.valid) {
  //       this.createProduct();
  //     } else {
  //       this.updateProduct();
  //     }
  //   }
  //   //Put data to db
  //   public updateProduct(): void {
  //     this.productService.updateProduct(this.product_Form.value).subscribe({
  //       next: () => {
  //         this.navigateToList();
  //       },
  //       error: (e: any) => console.log(e),
  //     });
  //   }
  //   public navigateToList(): void {
  //     this.router.navigate(['home/inventory']);
  //   }
  //   //Rest to form controls
  //   onRest() {
  //     this.product_Form.reset();
  //   }
  //   onCancel() {
  //     this.cancel.emit();
  //   }
  // }
}
