import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from './components/signup/signup.component';

import {SidebarComponent} from "./components/patient/sidebar/sidebar.component";
import {DashboardComponent} from "./components/patient/dashboard/dashboard.component";
import {ChatAiComponent} from "./components/patient/chat-ai/chat-ai.component";
import {NotificationsComponent} from "./components/patient/notifications/notifications.component";
import {MyAppointmentsComponent} from "./components/patient/my-appointments/my-appointments.component";
import {TakeAppointmentComponent} from "./components/patient/take-appointment/take-appointment.component";


import {MedecinComponent} from './components/medecin/medecin.component';
import {MedecinDashboardComponent} from './components/medecin/pages/dashboard/dashboard.component';
import {RendezvousComponent} from './components/medecin/pages/rendezvous/rendezvous.component';
import {PaiementsComponent} from './components/medecin/pages/paiements/paiements.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'patient', component: SidebarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', component: DashboardComponent },
      { path: 'chat_ai', component: ChatAiComponent },
      { path: 'notification', component: NotificationsComponent },
      { path: 'my-appointments', component: MyAppointmentsComponent },
      { path: 'take-appointment', component: TakeAppointmentComponent },
    ]
  },
  




  {
    path: 'medecin',
    component: MedecinComponent,
    children: [
      { path: 'dashboard', component: MedecinDashboardComponent },
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
