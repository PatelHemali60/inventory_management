import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BrandService } from '../service/brand.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent {
  @Output() cancel!: EventEmitter<Event>;
  @Output() onSubmitData!: EventEmitter<Event>;

  public brandForm!: FormGroup;
  public roleData!: any;
  private id: number;
  private isAddMode: boolean;
  private categoryList: any;
  editData: any;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.brandForm = this.buildUsersForm();

    this.id = this.route.snapshot.params['id'];

    this.isAddMode = !this.id;
  }

  //On init get department list and ckeck if its addMode
  ngOnInit(): void {
    this.getbrandList();
  }

  //get form controlfrom Reactive Form
  get f(): { [key: string]: AbstractControl } {
    return this.brandForm.controls;
  }

  public getbrandList(): void {
    this.brandService.getBrand().subscribe({
      next: (data: any) => {
        const dataCategary = data.Data;
        //condition for check the id if get id then patch value
        if (this.id) {
          dataCategary.map((x: any) => {
            if ((x.Id = this.id)) {
              this.editData = x;
              this.brandForm.patchValue({
                Id: parseInt(this.editData.Id),
                Name: this.editData.Name,
                Description: this.editData.Description,
              });
            }
          });
        }
      },
      error: (e) => console.error(e),
    });
  }

  //Reactive Form
  private buildUsersForm(): FormGroup {
    return this.fb.group({
      Id: [null],
      Name: [null, Validators.required],
      Description: [null, Validators.required],
      IsActive: [false, Validators.required],
    });
  }

  //on Form submit
  //on Form submit
  public onSubmit(): void {
    debugger;
    this.submitted = true;
    if (this.isAddMode && this.brandForm.valid) {
      this.addRole();
    } else {
      this.updateUser();
    }
  }

  //Post data to db
  public addRole(): void {
    this.roleData = {
      Name: this.brandForm.value.Name,
      Description: this.brandForm.value.Description,
    };

    this.brandService
      .AddBrand(this.roleData)
      .then((res: any) => {
        this.toastr.success('Add Brand sucessfully !!!');
        this.navigateToList();
      })
      .catch((error: any) => {});
  }

  //Put data to db
  public updateUser(): void {
    this.brandService.updateBrand(this.brandForm.value).subscribe({
      next: () => {
        this.navigateToList();
      },
      error: (e: any) => console.log(e),
    });
  }

  public navigateToList(): void {
    this.router.navigate(['home/BrandMaster']);
  }

  //Rest to form controls
  onRest() {
    this.brandForm.reset();
  }

  onCancel() {
    this.location.back();
  }
}
