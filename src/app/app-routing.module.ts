import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { ReloginComponent } from './login/relogin/relogin.component';   
import { SupportComponent } from './support/support.component';
import { PanicComponent } from './panic/panic.component';
import { CmsComponent } from './cms/cms.component';
import { BillingComponent } from './billing/billing.component';
import { CmsDetailComponent } from './cms/cms-detail/cms-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { SupportFormComponent } from './support/support-form/support-form.component';
import { IzinFormComponent } from './support/izin-form/izin-form.component';
import { RenovasiFormComponent } from './support/renovasi-form/renovasi-form.component';
import { SupportDetailComponent } from './support/support-detail/support-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'relogin', component: ReloginComponent },
  { path: 'login', component: LoginComponent }, 
 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data:{active:"Home"} },
 
  { path: 'support', component: SupportComponent, canActivate: [AuthGuard], data:{active:"Support"} },
  { path: 'support/:ticket', component: SupportDetailComponent, canActivate: [AuthGuard], data:{active:"Support"} },
 
  { path: 'support/form', component: SupportFormComponent, canActivate: [AuthGuard], data:{active:"Support"} },
  { path: 'support/form/izin', component: IzinFormComponent, canActivate: [AuthGuard], data:{active:"Support"} },
  { path: 'support/form/renovasi', component: RenovasiFormComponent, canActivate: [AuthGuard], data:{active:"Support"} },

  { path: 'panic', component: PanicComponent, canActivate: [AuthGuard], data:{active:"Panic"} },
  { path: 'cms', component: CmsComponent, canActivate: [AuthGuard], data:{active:"Article"} },
  { path: 'cms/detail/:id', component: CmsDetailComponent, canActivate: [AuthGuard], data:{active:"CMS"} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data:{active:"Profile"} },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard], data:{active:"Profile"} }, 
  { path: 'billing', component: BillingComponent, canActivate: [AuthGuard], data:{active:"Billing"} },
  
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
