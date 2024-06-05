import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { UserPageComponent } from './user-page/user-page.component';
import { HomeComponent } from './home/home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-page', component: UserPageComponent },
  { path: 'signup', component: SignupModalComponent },
  { path: 'admin-page', component: AdminPageComponent },
  // Add other necessary routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
