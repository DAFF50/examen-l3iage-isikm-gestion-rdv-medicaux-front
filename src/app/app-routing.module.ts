import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from './components/signup/signup.component';
import {MedecinComponent} from './components/medecin/medecin.component';
import {DashboardComponent} from './components/medecin/pages/dashboard/dashboard.component';
import {RendezvousComponent} from './components/medecin/pages/rendezvous/rendezvous.component';
import {PaiementsComponent} from './components/medecin/pages/paiements/paiements.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'medecin',
    component: MedecinComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rendezvous', component: RendezvousComponent },
      { path: 'paiements', component: PaiementsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
