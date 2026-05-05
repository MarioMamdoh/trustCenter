import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { CustomersComponent } from './customers/customers.component';
import { BedsComponent } from './beds/beds.component';
import { BlogsComponent } from './ui-element/blogs/blogs.component';
import { ServicesComponent } from './ui-element/services/services.component';
import { AchievementComponent } from './ui-element/achievement/achievement.component';
import { BedsDetailsComponent } from './beds/beds-details/beds-details.component';
import { EditBedsComponent } from './beds/edit-beds/edit-beds.component';
import { NewServiceComponent } from './ui-element/services/new-service/new-service.component';
import { NewBlogComponent } from './ui-element/blogs/new-blog/new-blog.component';
import { AllEmployeesComponent } from './employees/all-employees/all-employees.component';
import { AreaEmployeesComponent } from './employees/area-employees/area-employees.component';
import { NewEmployeesComponent } from './employees/new-employees/new-employees.component';
import { EditEmployeesComponent } from './employees/edit-employees/edit-employees.component';
import { AllCustomersComponent } from './customers/all-customers/all-customers.component';
import { AreaCustomerComponent } from './customers/area-customer/area-customer.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { NewBedComponent } from './beds/edit-beds/new-bed/new-bed.component';
import { AreasComponent } from './additional/areas/areas.component';
import { RolesComponent } from './additional/roles/roles.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { moderatorGuard } from './moderator.guard';
import { adminGuard } from './admin.guard';
import { moderatorOrAdminGuard } from './moderator-or-admin.guard';
import { OffersComponent } from './ui-element/offers/offers.component';
import { NewOfferComponent } from './ui-element/offers/new-offer/new-offer.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'employees/all-employees',
    component: AllEmployeesComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'employees/area-employees',
    component: AreaEmployeesComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'employees/new-employee',
    component: NewEmployeesComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'employees/edit-employees',
    component: EditEmployeesComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'customers/all-customers',
    component: AllCustomersComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'customers/area-customer',
    component: AreaCustomerComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'customers/new-customer',
    component: NewCustomerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'customers/edit-customer',
    component: EditCustomerComponent,
    canActivate: [authGuard],
  },
  { path: 'beds', component: BedsComponent, canActivate: [authGuard] },
  {
    path: 'beds-details',
    component: BedsDetailsComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'edit-beds',
    component: EditBedsComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'edit-beds/new-bed',
    component: NewBedComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/blogs',
    component: BlogsComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/blogs/new-blog',
    component: NewBlogComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/services',
    component: ServicesComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/services/new-service',
    component: NewServiceComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/achievement',
    component: AchievementComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/offers',
    component: OffersComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'ui-elements/offers/new-offer',
    component: NewOfferComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'area',
    component: AreasComponent,
    canActivate: [authGuard, moderatorOrAdminGuard],
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [authGuard, moderatorGuard],
  },
];
