import { Location } from '@angular/common';
import { SubCategoryService } from './../../sub-category/service/sub-category.service';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../../category/service/category.service';
import { BrandService } from '../../brand/service/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DiscountService } from '../../discount/service/discount.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  @Output() cancel: EventEmitter<Event>;
  @Output() onSubmitData: EventEmitter<Event>;
  public Product_Form!: FormGroup;
  public Products: any[];
  public categoryList!: any[];
  public C_id!: number;
  public subCategorylist!: any[];
  public Unit!: any[];
  public brand!: any[];
  public tax!: any[];
  public discount!: any[];
  public status!: any[];
  private id: number;
  private isAddMode: boolean;
  public base64Output!: any;
  public base64Image!: string;
  public productData!: any;
  public EditProduct!: any;
  public submitted = false;
  public selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private SubCategoryService: SubCategoryService,
    private brandService: BrandService,
    private discountService: DiscountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.Product_Form = this.buildUsersForm();
    this.Products = [];
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.cancel = new EventEmitter<Event>();
    this.onSubmitData = new EventEmitter<Event>();
  }
  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getcategoryList();
    // this.getsubCategoryList();

    this.getbrandList();
    this.getdiscountList();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.productService.GetProductbyId(this.id).subscribe((ele: any) => {
        const editData = ele.Data;
        //logic for set subcategory value
        if (this.id > 0) {
          let category_Id = editData.CategoryId;
          this.productService.getsubCategory(category_Id).subscribe({
            next: (data: any) => {
              //fetch data form category id for subcategory
              this.subCategorylist = data.Data;
              let subCategory_value = editData.SubCategoryId;
              //map where i get all id form caterogy
              this.Product_Form.controls['SubCategoryId'].setValue(
                subCategory_value
              );
            },
          });
        }

        //edit patched data in form
        this.EditProduct = {
          Id: editData.Id,
          Name: editData.Name,
          CategoryId: parseInt(editData.CategoryId),
          BrandId: parseInt(editData.BrandId),
          Unit: parseInt(editData.Unit),
          SKU: parseInt(editData.SKU),
          MinimumQty: parseInt(editData.MinimumQty),
          Quantity: parseInt(editData.Quantity),
          Description: editData.Description,
          Tax: editData.Tax,
          DiscountTypeId: parseInt(editData.DiscountTypeId),
          Price: editData.Price,
          Status: editData.Status,
          ImageUrl: this.base64Image,
          StripePaymentLink: 'https://buy.stripe.com/test_eVa6sjeYO27b3u07sQ',
          StripeProductId: 'prod_OX6LjoDFfOUINV',
          StripePriceProductId: 'price_1Nk29GSHl1utr3vFPoejv0l0',
        };

        this.Product_Form.patchValue(this.EditProduct);
      });
    }
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.Product_Form.controls;
  }

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      Name: [null, Validators.required],
      CategoryId: [1, Validators.required],
      CategoryName: [null],
      SubCategoryId: [null, Validators.required],
      SubCategoryName: [null],
      BrandId: [1, Validators.required],
      BrandName: [null],
      Unit: [null, Validators.required],
      SKU: [null, Validators.required],
      MinimumQty: [null, Validators.required],
      Quantity: [null, Validators.required],
      Description: [null, Validators.required],
      Tax: [null, Validators.required],
      DiscountTypeId: [1, Validators.required],
      DiscountTypeName: [null],
      Price: [null, Validators.required],
      Status: [null, Validators.required],
      ImageUrl: [null, Validators.required],
      IsActive: [false],
      StripePaymentLink: [],
      StripeProductId: [],
      StripePriceProductId: [],
      file: [null],
    });
  }

  // {
  //   "Id": 11,
  //   "Name": "Men Striped Round Neck Cotton Blend Blue, Black T-Shirt",
  //   "CategoryId": 3,
  //   "CategoryName": "Fashion",
  //   "SubCategoryId": 6,
  //   "SubCategoryName": "Mens Top Wear",
  //   "BrandId": 4,
  //   "BrandName": "Zara",
  //   "Unit": 10,
  //   "SKU": 20,
  //   "MinimumQty": 30,
  //   "Quantity": 30,
  //   "Description": "Bank OfferFlat ₹500 off on HDFC Bank.",
  //   "Tax": "string",
  //   "DiscountTypeId": 1,
  //   "DiscountTypeName": "Discount 100%",
  //   "Price": 500,
  //   "Status": "string",
  //   "ImageUrl": "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/r/v/k/m-ausk0165-ausk-original-imaghu9fbhcgf2za.jpeg?q=70",
  //   "IsActive": true,
  //   "StripePaymentLink": "https://buy.stripe.com/test_eVa6sjeYO27b3u07sQ",
  //   "StripeProductId": "prod_OX6LjoDFfOUINV",
  //   "StripePriceProductId": "price_1Nk29GSHl1utr3vFPoejv0l0"
  // }

  //category list
  private getcategoryList(): void {
    this.categoryService.getCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.Data;
      },
      error: (e) => console.log(e),
    });
  }

  //on selection of dropdown value get id
  public onItemSelected(ele: any) {
    const Id = ele.target.value;
    this.productService.getsubCategory(Id).subscribe({
      next: (data: any) => {
        this.subCategorylist = data.Data;
      },
      error: (e) => console.log(e),
    });
  }

  //subcategory list

  //get brand
  private getbrandList(): void {
    this.brandService.getBrand().subscribe({
      next: (data: any) => {
        this.brand = data.Data;
      },
      error: (e) => console.log(e),
    });
  }

  //get discount type
  private getdiscountList(): void {
    this.discountService.getDiscountType().subscribe({
      next: (data: any) => {
        this.discount = data.Data;
      },
      error: (e) => console.log(e),
    });
  }

  //for image
  // public handleInputChange(e: any) {
  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();
  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }
  //   reader.onload = this.handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }
  // handleReaderLoaded(e: any) {
  //   let reader = e.target;
  //   this.base64Image = reader.result;
  // }

  //convert image for file upload
  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  //Post data to db
  public createProduct(): void {
    const formData = new FormData();

    // Append form fields to the FormData
    formData.append('Name', this.Product_Form.value.Name.toString());
    formData.append('CategoryId', this.Product_Form.value.CategoryId);
    formData.append('SubCategoryId', this.Product_Form.value.SubCategoryId);
    formData.append('BrandId', this.Product_Form.value.BrandId);
    formData.append('Unit', this.Product_Form.value.Unit);
    formData.append('SKU', this.Product_Form.value.SKU);
    formData.append('MinimumQty', this.Product_Form.value.MinimumQty);
    formData.append('Quantity', this.Product_Form.value.Quantity);
    formData.append(
      'Description',
      this.Product_Form.value.Description.toString()
    );
    formData.append('Tax', this.Product_Form.value.Tax.toString());
    formData.append('DiscountTypeId', this.Product_Form.value.DiscountTypeId);
    formData.append('Price', this.Product_Form.value.Price);
    formData.append('Status', this.Product_Form.value.Status.toString());
    formData.append('file', this.selectedFile.toString());
    // Append the file if it exists

    // this.productData = {
    //   Name: this.Product_Form.value.Name,
    //   CategoryId: parseInt(this.Product_Form.value.CategoryId),
    //   SubCategoryId: parseInt(this.Product_Form.value.SubCategoryId),
    //   BrandId: parseInt(this.Product_Form.value.BrandId),
    //   Unit: parseInt(this.Product_Form.value.Unit),
    //   SKU: parseInt(this.Product_Form.value.SKU),
    //   MinimumQty: parseInt(this.Product_Form.value.MinimumQty),
    //   Quantity: parseInt(this.Product_Form.value.Quantity),
    //   Description: this.Product_Form.value.Description,
    //   Tax: this.Product_Form.value.Tax,
    //   DiscountTypeId: parseInt(this.Product_Form.value.DiscountTypeId),
    //   Price: this.Product_Form.value.Price,
    //   Status: this.Product_Form.value.Status,
    //   ImageUrl: null,
    //   file: this.selectedFile,
    // };

    // formData.append('productData', JSON.stringify(this.productData));
    this.productService
      .AddProduct(formData)
      .then((res: any) => {
        console.log(res, 'reponse data');
        this.toastr.success('Add Product sucessfully !!!');
        this.router.navigate(['/Inventory']);
      })
      .catch((error: any) => {});
  }
  //on Form submit
  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }
  //Put data to db
  public updateProduct(): void {
    this.productService.updateProduct(this.Product_Form.value).subscribe({
      next: () => {
        this.toastr.success('Upadte Product sucessfully !!!');
        this.router.navigate(['/Inventory']);
      },
      error: (e: any) => console.log(e),
    });
  }

  //Rest to form controls
  onRest() {
    this.Product_Form.reset();
  }
  onCancel() {
    this.location.back();
  }

  //tax object
  public Tax: any = [
    { value: 'customs-tax', label: 'Customs Tax' },
    { value: 'entralexcise-duty', label: 'Excise Duty' },
    { value: 'income-tax', label: 'Income Tax' },
    { value: 'service-tax', label: 'Service Tax' },
  ];
}
