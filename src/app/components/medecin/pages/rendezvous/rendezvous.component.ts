// rendezvous-medecin.component.ts
import { Component, OnInit } from '@angular/core';

interface RendezVous {
  id: number;
  patientNom: string;
  patientPrenom: string;
  patientEmail: string;
  patientTelephone: string;
  date: string;
  heure: string;
  statut: 'en_attente' | 'confirme' | 'refuse' | 'termine';
  statutPaiement: 'en_attente' | 'paye' | 'cabinet';
  motif: string;
  montant: number;
  referenceRdv: string;
}

interface PlageHoraire {
  id: number;
  jour: string;
  heureDebut: string;
  heureFin: string;
  dureeSlot: number; // en minutes
  pauseDebut?: string;
  pauseFin?: string;
  actif: boolean;
}

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {

  activeTab: 'rdv' | 'plages' = 'rdv';
  filtreStatut: string = 'tous';
  filtreDateDebut: string = '';
  filtreDateFin: string = '';
  
  // Liste des rendez-vous
  rendezVous: RendezVous[] = [
    {
      id: 1,
      patientNom: 'Diallo',
      patientPrenom: 'Aminata',
      patientEmail: 'aminata.diallo@email.com',
      patientTelephone: '+221 77 123 45 67',
      date: '2025-09-02',
      heure: '09:00',
      statut: 'en_attente',
      statutPaiement: 'paye',
      motif: 'Consultation générale - Douleurs abdominales',
      montant: 15000,
      referenceRdv: 'RDV-2025-001'
    },
    {
      id: 2,
      patientNom: 'Ba',
      patientPrenom: 'Moussa',
      patientEmail: 'moussa.ba@email.com',
      patientTelephone: '+221 78 987 65 43',
      date: '2025-09-02',
      heure: '10:30',
      statut: 'confirme',
      statutPaiement: 'cabinet',
      motif: 'Suivi cardiologique',
      montant: 25000,
      referenceRdv: 'RDV-2025-002'
    },
    {
      id: 3,
      patientNom: 'Ndiaye',
      patientPrenom: 'Fatou',
      patientEmail: 'fatou.ndiaye@email.com',
      patientTelephone: '+221 76 456 78 90',
      date: '2025-09-03',
      heure: '14:00',
      statut: 'en_attente',
      statutPaiement: 'en_attente',
      motif: 'Consultation dermatologique',
      montant: 20000,
      referenceRdv: 'RDV-2025-003'
    }
  ];

  // Plages horaires
  plagesHoraires: PlageHoraire[] = [
    { id: 1, jour: 'Lundi', heureDebut: '08:00', heureFin: '12:00', dureeSlot: 30, pauseDebut: '10:00', pauseFin: '10:15', actif: true },
    { id: 2, jour: 'Lundi', heureDebut: '14:00', heureFin: '18:00', dureeSlot: 30, actif: true },
    { id: 3, jour: 'Mardi', heureDebut: '08:00', heureFin: '12:00', dureeSlot: 30, actif: true },
    { id: 4, jour: 'Mercredi', heureDebut: '08:00', heureFin: '12:00', dureeSlot: 30, actif: false },
    { id: 5, jour: 'Jeudi', heureDebut: '14:00', heureFin: '18:00', dureeSlot: 30, actif: true },
    { id: 6, jour: 'Vendredi', heureDebut: '08:00', heureFin: '12:00', dureeSlot: 30, actif: true }
  ];

  // Variables pour le modal d'ajout de plage
  showModalPlage = false;
  nouvellePlage: Partial<PlageHoraire> = {};

  ngOnInit(): void {
    this.chargerRendezVous();
  }

  // Gestion des tabs
  setActiveTab(tab: 'rdv' | 'plages'): void {
    this.activeTab = tab;
  }

  // Chargement des données
  chargerRendezVous(): void {
    // Simulation API call
    console.log('Chargement des rendez-vous...');
  }

  // Filtrage des rendez-vous
  get rendezVousFiltres(): RendezVous[] {
    let filtered = this.rendezVous;

    if (this.filtreStatut !== 'tous') {
      filtered = filtered.filter(rdv => rdv.statut === this.filtreStatut);
    }

    if (this.filtreDateDebut) {
      filtered = filtered.filter(rdv => rdv.date >= this.filtreDateDebut);
    }

    if (this.filtreDateFin) {
      filtered = filtered.filter(rdv => rdv.date <= this.filtreDateFin);
    }

    return filtered.sort((a, b) => new Date(a.date + ' ' + a.heure).getTime() - new Date(b.date + ' ' + b.heure).getTime());
  }

  // Actions sur les rendez-vous
  confirmerRendezVous(rdv: RendezVous): void {
    rdv.statut = 'confirme';
    console.log(`Rendez-vous ${rdv.id} confirmé`);
    // API call
  }

  refuserRendezVous(rdv: RendezVous): void {
    rdv.statut = 'refuse';
    console.log(`Rendez-vous ${rdv.id} refusé`);
    // API call
  }

  marquerTermine(rdv: RendezVous): void {
    rdv.statut = 'termine';
    console.log(`Rendez-vous ${rdv.id} terminé`);
    // API call
  }

  // Téléchargement du justificatif PDF
  telechargerJustificatif(rdv: RendezVous): void {
    console.log(`Téléchargement du justificatif pour RDV ${rdv.id}`);
    // Simulation de génération PDF
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.genererContenuPDF(rdv)));
    element.setAttribute('download', `justificatif-${rdv.referenceRdv}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private genererContenuPDF(rdv: RendezVous): string {
    return `
JUSTIFICATIF DE RENDEZ-VOUS MÉDICAL
===================================

Référence: ${rdv.referenceRdv}
Date d'émission: ${new Date().toLocaleDateString('fr-FR')}

INFORMATIONS PATIENT:
- Nom: ${rdv.patientPrenom} ${rdv.patientNom}
- Email: ${rdv.patientEmail}
- Téléphone: ${rdv.patientTelephone}

RENDEZ-VOUS:
- Date: ${new Date(rdv.date).toLocaleDateString('fr-FR')}
- Heure: ${rdv.heure}
- Motif: ${rdv.motif}
- Statut: ${rdv.statut}

PAIEMENT:
- Montant: ${rdv.montant} FCFA
- Statut: ${rdv.statutPaiement === 'paye' ? 'Payé en ligne' : rdv.statutPaiement === 'cabinet' ? 'Paiement au cabinet' : 'En attente'}

Ce document certifie la prise de rendez-vous médical.
    `.trim();
  }

  // Gestion des plages horaires
  ajouterPlage(): void {
    this.nouvellePlage = {
      jour: 'Lundi',
      heureDebut: '08:00',
      heureFin: '12:00',
      dureeSlot: 30,
      actif: true
    };
    this.showModalPlage = true;
  }

  sauvegarderPlage(): void {
    if (this.nouvellePlage.jour && this.nouvellePlage.heureDebut && this.nouvellePlage.heureFin) {
      const nouvellePlage: PlageHoraire = {
        id: Date.now(),
        jour: this.nouvellePlage.jour!,
        heureDebut: this.nouvellePlage.heureDebut!,
        heureFin: this.nouvellePlage.heureFin!,
        dureeSlot: this.nouvellePlage.dureeSlot || 30,
        pauseDebut: this.nouvellePlage.pauseDebut,
        pauseFin: this.nouvellePlage.pauseFin,
        actif: this.nouvellePlage.actif || true
      };
      
      this.plagesHoraires.push(nouvellePlage);
      this.showModalPlage = false;
      this.nouvellePlage = {};
      console.log('Nouvelle plage horaire ajoutée');
    }
  }

  supprimerPlage(id: number): void {
    this.plagesHoraires = this.plagesHoraires.filter(plage => plage.id !== id);
    console.log(`Plage ${id} supprimée`);
  }

  togglePlage(plage: PlageHoraire): void {
    plage.actif = !plage.actif;
    console.log(`Plage ${plage.id} ${plage.actif ? 'activée' : 'désactivée'}`);
  }

  fermerModal(): void {
    this.showModalPlage = false;
    this.nouvellePlage = {};
  }

  // Utilitaires
  getStatutClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'statut-attente';
      case 'confirme': return 'statut-confirme';
      case 'refuse': return 'statut-refuse';
      case 'termine': return 'statut-termine';
      case 'paye': return 'statut-paye';
      case 'cabinet': return 'statut-cabinet';
      default: return '';
    }
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'confirme': return 'Confirmé';
      case 'refuse': return 'Refusé';
      case 'termine': return 'Terminé';
      case 'paye': return 'Payé';
      case 'cabinet': return 'Cabinet';
      default: return statut;
    }
  }
}