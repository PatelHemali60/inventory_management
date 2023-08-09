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
  public deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, go ahead.',
          cancelButtonText: 'No, let me think',
        }).then((result) => {
          if (result.value) {
            Swal.fire('Removed!', 'Item removed successfully.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Item is safe.)', 'error');
          }
        });
        this.router.navigate(['home/User']);
      },
      error: (e) => console.error(e),
    });
  }

  // //get user list from db

  //for filter data in search
  // handle change event of search input
  // handle change event of search input
  // public handleChange(event: any): void {
  //   this.searchText = event.target.value;
  //   this.filterData(event.target.value);
  // }
}
