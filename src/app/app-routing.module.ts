import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { BrandComponent } from './equipment/brand/brand.component';
import { ModelComponent } from './equipment/model/model.component';
import { PowerComponent } from './equipment/power/power.component';
import { TypeComponent } from './equipment/type/type.component';
import { NewRegisterComponent } from './new-register/new-register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: NewRegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'eqp', component: EquipmentComponent },
  { path: 'brand', component: BrandComponent },
  { path: 'model', component: ModelComponent },
  { path: 'power', component: PowerComponent },
  { path: 'type', component: TypeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
