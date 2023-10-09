import { UserService } from './service/user.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public User!: any[];
  // filteredProduct: any[] = [];
  public searchText: string = '';
  public page: number = 1;
  public excludeColumns: string[] = ['id'];

  // public currentPage: number;
  // public dataPerPage: number;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.User = [];
    // this.getProductList();
    this.GetallUserList();
  }

  ngOnInit(): void {
    // this.filterData('');
  }

  public navigateToForm() {
    this.router.navigate(['User/form']);
  }

  //get department list from db
  private GetallUserList(): void {
    this.userService.getallUser().subscribe({
      next: (data: any) => {
        this.User = data.Data;
      },
      error: (e) => console.error(e),
    });
  }

  //Delete user from db and Update user list

  public deleteuser(id: number): void {
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
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Removed!', 'User removed successfully.', 'success');
            this.GetallUserList();
          },
          error: (e) => console.error(e),
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'User still in our database.', 'error');
      }
    });
  }
  // //get user list from db
}
