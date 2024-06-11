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
import { ContractComponent } from './contract/contract.component';
import { UserContractComponent } from './user-contract/user-contract.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { CustomerContractComponent } from './customer-contract/customer-contract.component';
import { AuthGuard } from './auth.guard';
import { ContractManageComponent } from './contract-manage/contract-manage.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: NewRegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard] },
  { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  { path: 'eqp', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'brand', component: BrandComponent, canActivate: [AuthGuard] },
  { path: 'model', component: ModelComponent, canActivate: [AuthGuard] },
  { path: 'power', component: PowerComponent, canActivate: [AuthGuard] },
  { path: 'type', component: TypeComponent, canActivate: [AuthGuard] },
  { path: 'contracts', component: ContractComponent, canActivate: [AuthGuard] },
  { path: 'contracts/edit/:id', component: NewContractComponent, canActivate: [AuthGuard] },
  { path: 'contracts/manage/:id', component: ContractManageComponent, canActivate: [AuthGuard] },
  { path: 'contracts/new', component: NewContractComponent, canActivate: [AuthGuard] },
  { path: 'mycontracts', component: UserContractComponent, canActivate: [AuthGuard] },
  { path: 'usercontract', component: CustomerContractComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
