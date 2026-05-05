import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { ReserveComponent } from './reserve/reserve.component';
import { OffersComponent } from './offers/offers.component';
import { DashboardShellComponent } from './dashboard/app.component';
import { LoginComponent } from './dashboard/login/login.component';
import { authGuard } from './dashboard/auth.guard';
import { routes as dashboardRoutes } from './dashboard/app.routes';

const dashboardChildRoutes = dashboardRoutes.filter(
  (route) => route.path !== 'login'
);

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'reserve', component: ReserveComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'dashboard/login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      ...dashboardChildRoutes,
    ],
  },
  { path: '**', redirectTo: 'blogs' },
];
