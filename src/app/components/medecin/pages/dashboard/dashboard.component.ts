// dashboard-medecin.component.ts
import { Component, OnInit } from '@angular/core';

interface RendezVous {
  id: number;
  patientNom: string;
  patientPrenom: string;
  date: string;
  heure: string;
  statut: 'en_attente' | 'confirme' | 'refuse' | 'termine';
  statutPaiement: 'en_attente' | 'paye' | 'cabinet';
  motif: string;
}

interface PlageHoraire {
  id: number;
  date: string;
  heureDebut: string;
  heureFin: string;
  disponible: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class MedecinDashboardComponent implements OnInit {
  
  // Statistiques du dashboard
  stats = {
    rdvAujourdhui: 5,
    rdvEnAttente: 3,
    rdvConfirmes: 8,
    revenuMois: 45000
  };

  // Rendez-vous récents
  rdvRecents: RendezVous[] = [
    {
      id: 1,
      patientNom: 'Diallo',
      patientPrenom: 'Aminata',
      date: '2025-09-02',
      heure: '09:00',
      statut: 'en_attente',
      statutPaiement: 'paye',
      motif: 'Consultation générale'
    },
    {
      id: 2,
      patientNom: 'Ba',
      patientPrenom: 'Moussa',
      date: '2025-09-02',
      heure: '10:30',
      statut: 'confirme',
      statutPaiement: 'cabinet',
      motif: 'Suivi cardiologique'
    },
    {
      id: 3,
      patientNom: 'Ndiaye',
      patientPrenom: 'Fatou',
      date: '2025-09-02',
      heure: '14:00',
      statut: 'en_attente',
      statutPaiement: 'en_attente',
      motif: 'Consultation dermatologique'
    }
  ];

  // Plages horaires de la semaine
  plagesHoraires: PlageHoraire[] = [
    { id: 1, date: '2025-09-02', heureDebut: '08:00', heureFin: '12:00', disponible: true },
    { id: 2, date: '2025-09-02', heureDebut: '14:00', heureFin: '18:00', disponible: false },
    { id: 3, date: '2025-09-03', heureDebut: '08:00', heureFin: '12:00', disponible: true },
  ];

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(): void {
    // Simulation du chargement des données depuis l'API
    console.log('Chargement des données du médecin...');
  }

  confirmerRendezVous(rdv: RendezVous): void {
    rdv.statut = 'confirme';
    console.log(`Rendez-vous ${rdv.id} confirmé`);
    // Appel API pour confirmer le RDV
  }

  refuserRendezVous(rdv: RendezVous): void {
    rdv.statut = 'refuse';
    console.log(`Rendez-vous ${rdv.id} refusé`);
    // Appel API pour refuser le RDV
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'statut-attente';
      case 'confirme': return 'statut-confirme';
      case 'refuse': return 'statut-refuse';
      case 'paye': return 'statut-paye';
      case 'cabinet': return 'statut-cabinet';
      default: return '';
    }
  }
}