import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from "./components/signup/signup.component";

import { SidebarComponent } from './components/patient/sidebar/sidebar.component';
import { DashboardComponent } from './components/patient/dashboard/dashboard.component';
import { MyAppointmentsComponent } from './components/patient/my-appointments/my-appointments.component';
import { NotificationsComponent } from './components/patient/notifications/notifications.component';
import { ChatAiComponent } from './components/patient/chat-ai/chat-ai.component';
import { TakeAppointmentComponent } from './components/patient/take-appointment/take-appointment.component';

import { MedecinComponent } from "./components/medecin/medecin.component";
import { RendezvousComponent } from './components/medecin/pages/rendezvous/rendezvous.component';
import { MedecinDashboardComponent } from './components/medecin/pages/dashboard/dashboard.component';
import { PaiementsComponent } from './components/medecin/pages/paiements/paiements.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/pages/dashboard/dashboard.component';
import { UtilisateursComponent } from './components/admin/pages/utilisateurs/utilisateurs.component';
import { SpecialitesComponent } from './components/admin/pages/specialites/specialites.component';
//import { AdminPaiementsComponent } from './components/admin/pages/paiements/paiements.component';
import { JustificatifsComponent } from './components/admin/pages/justificatifs/justificatifs.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    SidebarComponent,
    DashboardComponent,
    MyAppointmentsComponent,
    NotificationsComponent,
    ChatAiComponent,
    TakeAppointmentComponent,

    MedecinComponent,
    RendezvousComponent,

    MedecinDashboardComponent,
    PaiementsComponent,

    DashboardComponent,
    PaiementsComponent,
    AdminComponent,
    AdminDashboardComponent,
    UtilisateursComponent,
    SpecialitesComponent,
    JustificatifsComponent
    
    //AdminPaiementsComponent

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SignupComponent,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
