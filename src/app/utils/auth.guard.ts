import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/auth-area/login/login.component';
import { AuthService } from '../services/auth.service';
import { NotifierService } from '../services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    public constructor( private auth: AuthService, public dialog:MatDialog,   public router:Router ,public notifier:NotifierService   ){}
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dialog.open(LoginComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if( this.auth.isLoggedIn() ){
        return true;
    }
    this.notifier.toast.error('You Are Not logged in!')
    this.router.navigateByUrl('home')
    this.openDialog('100ms', '100ms')
    return false;
  }
  
}
