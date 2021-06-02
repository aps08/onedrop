import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CampsComponent} from './camps/camps.component';
import {AwarenessComponent} from './awareness/awareness.component';
import {AboutComponent} from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', children: [
      { path: '', component: HomeComponent},
      { path: 'admin' , canActivate: [AuthGuard],component: AdminComponent, data: { role: ['admin']} },
      { path: 'dashboard',canActivate: [AuthGuard],component: DashboardComponent, data: { role: ['user']} },
      { path: 'camps', component: CampsComponent},
      { path: 'awareness', component: AwarenessComponent},
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', anchorScrolling: 'enabled',onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
