import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from './../service/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private configService: ConfigService,
    private router: Router
  ) {
    console.log('token : '+this.configService.token());

   }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if (this.configService.token()) {
      console.log("lgoin ok");
      return true;
    } else {
      console.log("tidak login");
      this.router.navigate(['/relogin']);
      
      return false;

    }
  }

}
