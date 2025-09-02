import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {SignupComponent} from "./components/signup/signup.component";
import { MedecinComponent } from "./components/medecin/medecin.component";
import { RendezvousComponent } from './components/medecin/pages/rendezvous/rendezvous.component';
import { DashboardComponent } from './components/medecin/pages/dashboard/dashboard.component';
import { PaiementsComponent } from './components/medecin/pages/paiements/paiements.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MedecinComponent,
    RendezvousComponent,
    DashboardComponent,
    PaiementsComponent
    
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
