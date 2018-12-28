/* export class AuthService {
    loggedIn = false;
    isAuthenticated() {
      const promise = new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            resolve(this.loggedIn);
          }, 800);
        }
      );
      return promise;
    }
  }
 */
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor() { }

  logout() {
   /*  const defaultValue = {'menuList': [ {
      b2bCustomerPermission: true,
      b2cMarketPermission: true,
      backupPermission: true,
      emailMenuPermission: true,
      smsMenuPermission: true,
      uploadPermission: true
  }]}; */
  /*   sessionStorage.setItem('role', JSON.stringify(defaultValue)  ); */
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('role');
  }
}
