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
  public isAddMode: boolean;
  public base64Output!: any;
  public base64Image!: string;
  public productData!: any;
  public EditProduct!: any;
  public submitted = false;
  public selectedFile!: File;
  public brand_list!: any;
  public subCategory_value: any;

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

        // console.log(editData, 'patch value in edit form');
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

        //logic for set brand value based on subcategory
        if (this.id !== null) {
          let Subcategory_id = editData.SubCategoryId;
          console.log(Subcategory_id, 'subcategory');
          this.productService.getbrandBySubcategory(Subcategory_id).subscribe({
            next: (data: any) => {
              //fetch data form category id for subcategory
              this.brand_list = data.Data;
              let brand_value = editData.BrandId;
              //map where i get all id form caterogy
              this.Product_Form.controls['BrandId'].setValue(brand_value);
            },
          });
        }

        // edit patched data in form
        this.EditProduct = {
          Id: editData.Id,
          Name: editData.Name,
          CategoryId: parseInt(editData.CategoryId),
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
          StripePaymentLink: editData.StripePaymentLink,
          StripeProductId: editData.StripeProductId,
          StripePriceProductId: editData.StripePriceProductId,
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
      CategoryId: [null, Validators.required],
      CategoryName: [null],
      SubCategoryId: [null, Validators.required],
      SubCategoryName: [null],
      BrandId: [null, Validators.required],
      BrandName: [null],
      Unit: [null, Validators.required],
      SKU: [null, Validators.required],
      MinimumQty: [null, Validators.required],
      Quantity: [null, Validators.required],
      Description: [null, Validators.required],
      Tax: [null, Validators.required],
      DiscountTypeId: [null, Validators.required],
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

  public onItemSelectedSubCategory(ele: any) {
    const subCategory_Id = ele.target.value;
    this.productService.getbrandBySubcategory(subCategory_Id).subscribe({
      next: (data: any) => {
        this.brand_list = data.Data;
      },
      error: (e: any) => console.log(e),
    });
  }

  //subcategory list

  //get brand
  private getbrandList(): void {}

  //get discount type
  private getdiscountList(): void {
    this.discountService.getDiscountType().subscribe({
      next: (data: any) => {
        this.discount = data.Data;
      },
      error: (e) => console.log(e),
    });
  }

  //convert image for file upload
  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
    formData.append('file', this.selectedFile);
    this.productService
      .AddProduct(formData)
      .then((res: any) => {
        if (res.SuccessMessage) {
          // It's a success, so display the success message
          this.toastr.success(res.SuccessMessage);
          this.router.navigate(['Inventory']);
        } else {
          // It's an error, so display the error message
          this.toastr.error(res.ErrorMessage);
          if (!res.ErrorMessage) {
            this.router.navigate(['form']);
          }
        }
      })
      .catch((error: any) => {});
  }

  //edit product
  //update product
  updateProduct() {
    const EditformData = new FormData();
    EditformData.append('Id', this.Product_Form.value.Id);
    EditformData.append('Name', this.Product_Form.value.Name.toString());
    EditformData.append('CategoryId', this.Product_Form.value.CategoryId);
    EditformData.append('SubCategoryId', this.Product_Form.value.SubCategoryId);
    EditformData.append('BrandId', this.Product_Form.value.BrandId);
    EditformData.append('Unit', this.Product_Form.value.Unit);
    EditformData.append('SKU', this.Product_Form.value.SKU);
    EditformData.append('MinimumQty', this.Product_Form.value.MinimumQty);
    EditformData.append('Quantity', this.Product_Form.value.Quantity);
    EditformData.append(
      'Description',
      this.Product_Form.value.Description.toString()
    );
    EditformData.append('Tax', this.Product_Form.value.Tax.toString());
    EditformData.append(
      'DiscountTypeId',
      this.Product_Form.value.DiscountTypeId
    );
    EditformData.append('Price', this.Product_Form.value.Price);
    EditformData.append('Status', this.Product_Form.value.Status.toString());
    EditformData.append('file', this.selectedFile);
    EditformData.append(
      'StripePaymentLink',
      this.Product_Form.value.StripePaymentLink
    );
    EditformData.append(
      'StripeProductId',
      this.Product_Form.value.StripeProductId
    );
    EditformData.append(
      'StripePriceProductId',
      this.Product_Form.value.StripePriceProductId
    );
    // EditformData.append('StripePaymentLink');
    this.productService
      .updateProduct(EditformData)
      .then((res: any) => {
        if (res.SuccessMessage) {
          // It's a success, so display the success message
          this.toastr.success(res.SuccessMessage);
          this.router.navigate(['Inventory']);
        } else {
          // It's an error, so display the error message
          this.toastr.error(res.ErrorMessage);
          if (!res.ErrorMessage) {
            this.router.navigate(['form']);
          }
        }
      })
      .catch((error: any) => {});
  }

  //on Form submit
  public onSubmit(): void {
    this.submitted = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
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
