import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let isLoggedin = localStorage.getItem('User_id');
  let user_id = localStorage.getItem('Login_roleid');
  // localStorage.setItem('Login_roleid', res.Data.RoleId);
  // localStorage.setItem('User_id', res.Data.Id);

  if (user_id == null && isLoggedin == null) {
    alert('Not Authenticate User !!!');
    // this.Router.
    return false;
  }
  return true;
};
