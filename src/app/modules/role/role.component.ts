import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './service/role.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from './model/role.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {
  public Role!: Role[];
  filteredProduct: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: RoleService,
    private toastr: ToastrService
  ) {
    this.getRoleList();
    //get product name from db
  }

  ngOnInit(): void {}

  //get user list from db
  public getRoleList(): void {
    this.service.getProduct().subscribe({
      next: (data: any) => {
        this.Role = data.Data;

        this.toastr.success('List display sucessfully !!!');
      },
      error: (e) => console.error(e),
    });
  }

  //Delete user from db and Update user list
  public deleteProduct(id: number): void {

    this.service.deleteRole(id).subscribe({
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
        this.getRoleList();
      },
      error: (e) => console.error(e),
    });
  }

  public navigateToForm() {
    this.router.navigate(['/form']);
  }
}
