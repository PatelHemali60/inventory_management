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
  public handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  handleReaderLoaded(e: any) {
    let reader = e.target;
    this.base64Image = reader.result;
  }

  //Post data to db
  public createProduct(): void {
    this.productData = {
      Name: this.Product_Form.value.Name,
      CategoryId: parseInt(this.Product_Form.value.CategoryId),
      SubCategoryId: parseInt(this.Product_Form.value.SubCategoryId),
      BrandId: parseInt(this.Product_Form.value.BrandId),
      Unit: parseInt(this.Product_Form.value.Unit),
      SKU: parseInt(this.Product_Form.value.SKU),
      MinimumQty: parseInt(this.Product_Form.value.MinimumQty),
      Quantity: parseInt(this.Product_Form.value.Quantity),
      Description: this.Product_Form.value.Description,
      Tax: this.Product_Form.value.Tax,
      DiscountTypeId: parseInt(this.Product_Form.value.DiscountTypeId),
      Price: this.Product_Form.value.Price,
      Status: this.Product_Form.value.Status,
      ImageUrl: this.base64Image,
    };

    this.productService
      .AddProduct(this.productData)
      .then((res: any) => {
        this.toastr.success('Add Product sucessfully !!!');
        this.router.navigate(['home/Inventory']);
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
        this.router.navigate(['home/Inventory']);
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

  public Tax: any = [
    { value: 'customs-tax', label: 'Customs Tax' },
    { value: 'entralexcise-duty', label: 'Excise Duty' },
    { value: 'income-tax', label: 'Income Tax' },
    { value: 'service-tax', label: 'Service Tax' },
  ];
}
