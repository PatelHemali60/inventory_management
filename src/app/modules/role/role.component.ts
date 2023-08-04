import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  public Role!: any;
  filteredProduct: any[] = [];


  constructor(private router:Router,private http: HttpClient,private service:RoleService){

    this.getRoleList();
    //get product name from db

  }

  ngOnInit(): void {

  }



    //get user list from db
    public getRoleList(): void {

      this.service.getProduct().subscribe({
        next: (data: any) => {

          this.Role = data.Data;
        },
        error: (e) => console.error(e),
      });
    }


     //Delete user from db and Update user list
  public deleteProduct(id: number): void {
    // debugger
    this.service.deleteRole(id).subscribe({
      next: () => this.getRoleList(),
      error: (e) => console.error(e),
    })

  }

    public navigateToForm(){
      this.router.navigate(['/form'])
    }

}
