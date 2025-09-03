// paiements-medecin.component.ts
import { Component, OnInit } from '@angular/core';

interface Paiement {
  id: number;
  referenceRdv: string;
  referencePaiement: string;
  patientNom: string;
  patientPrenom: string;
  montant: number;
  datePaiement: string;
  typePaiement: 'en_ligne' | 'cabinet';
  statut: 'en_attente' | 'paye' | 'rembourse' | 'annule';
  methodePaiement: 'carte_bancaire' | 'mobile_money' | 'especes' | 'cheque';
  dateRendezVous: string;
  heureRendezVous: string;
  motif: string;
}

interface StatistiquesPaiement {
  totalMois: number;
  totalEnLigne: number;
  totalCabinet: number;
  nombrePaiements: number;
  nombreRemboursements: number;
  tauxPaiementEnLigne: number;
}

@Component({
  selector: 'app-paiements',
  templateUrl: './paiements.component.html',
  styleUrl: './paiements.component.css'
})
export class PaiementsComponent implements OnInit {

  // Filtres
  filtreStatut: string = 'tous';
  filtreType: string = 'tous';
  filtreDateDebut: string = '';
  filtreDateFin: string = '';
  filtreMois: string = '';

  // Variables pour l'affichage
  viewMode: 'liste' | 'stats' = 'liste';
  
  // Données des paiements
  paiements: Paiement[] = [
    {
      id: 1,
      referenceRdv: 'RDV-2025-001',
      referencePaiement: 'PAY-001-2025',
      patientNom: 'Diallo',
      patientPrenom: 'Aminata',
      montant: 15000,
      datePaiement: '2025-09-01',
      typePaiement: 'en_ligne',
      statut: 'paye',
      methodePaiement: 'carte_bancaire',
      dateRendezVous: '2025-09-02',
      heureRendezVous: '09:00',
      motif: 'Consultation générale'
    },
    {
      id: 2,
      referenceRdv: 'RDV-2025-002',
      referencePaiement: 'PAY-002-2025',
      patientNom: 'Ba',
      patientPrenom: 'Moussa',
      montant: 25000,
      datePaiement: '2025-09-01',
      typePaiement: 'cabinet',
      statut: 'paye',
      methodePaiement: 'especes',
      dateRendezVous: '2025-09-02',
      heureRendezVous: '10:30',
      motif: 'Suivi cardiologique'
    },
    {
      id: 3,
      referenceRdv: 'RDV-2025-003',
      referencePaiement: 'PAY-003-2025',
      patientNom: 'Ndiaye',
      patientPrenom: 'Fatou',
      montant: 20000,
      datePaiement: '2025-08-30',
      typePaiement: 'en_ligne',
      statut: 'paye',
      methodePaiement: 'mobile_money',
      dateRendezVous: '2025-09-03',
      heureRendezVous: '14:00',
      motif: 'Consultation dermatologique'
    },
    {
      id: 4,
      referenceRdv: 'RDV-2025-004',
      referencePaiement: 'PAY-004-2025',
      patientNom: 'Fall',
      patientPrenom: 'Omar',
      montant: 18000,
      datePaiement: '2025-08-28',
      typePaiement: 'en_ligne',
      statut: 'rembourse',
      methodePaiement: 'carte_bancaire',
      dateRendezVous: '2025-08-29',
      heureRendezVous: '16:00',
      motif: 'Consultation annulée'
    },
    {
      id: 5,
      referenceRdv: 'RDV-2025-005',
      referencePaiement: '',
      patientNom: 'Sarr',
      patientPrenom: 'Aïssatou',
      montant: 22000,
      datePaiement: '',
      typePaiement: 'cabinet',
      statut: 'en_attente',
      methodePaiement: 'especes',
      dateRendezVous: '2025-09-04',
      heureRendezVous: '11:00',
      motif: 'Consultation pédiatrique'
    }
  ];

  // Statistiques calculées
  statistiques: StatistiquesPaiement = {
    totalMois: 0,
    totalEnLigne: 0,
    totalCabinet: 0,
    nombrePaiements: 0,
    nombreRemboursements: 0,
    tauxPaiementEnLigne: 0
  };

  // Données pour les graphiques
  donneesGraphique: any[] = [];

  ngOnInit(): void {
    this.calculerStatistiques();
    this.preparerDonneesGraphique();
    this.definirMoisActuel();
  }

  definirMoisActuel(): void {
    const aujourdhui = new Date();
    this.filtreMois = `${aujourdhui.getFullYear()}-${(aujourdhui.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  // Calcul des statistiques
  calculerStatistiques(): void {
    const paiementsValides = this.paiements.filter(p => p.statut === 'paye');
    const paiementsEnLigne = paiementsValides.filter(p => p.typePaiement === 'en_ligne');
    const paiementsCabinet = paiementsValides.filter(p => p.typePaiement === 'cabinet');
    const remboursements = this.paiements.filter(p => p.statut === 'rembourse');

    this.statistiques = {
      totalMois: paiementsValides.reduce((sum, p) => sum + p.montant, 0),
      totalEnLigne: paiementsEnLigne.reduce((sum, p) => sum + p.montant, 0),
      totalCabinet: paiementsCabinet.reduce((sum, p) => sum + p.montant, 0),
      nombrePaiements: paiementsValides.length,
      nombreRemboursements: remboursements.length,
      tauxPaiementEnLigne: paiementsValides.length > 0 ? 
        (paiementsEnLigne.length / paiementsValides.length) * 100 : 0
    };
  }

  // Préparation des données pour les graphiques
  preparerDonneesGraphique(): void {
    const paiementsParJour = new Map();
    
    this.paiements
      .filter(p => p.statut === 'paye' && p.datePaiement)
      .forEach(p => {
        const date = new Date(p.datePaiement).toLocaleDateString('fr-FR');
        if (paiementsParJour.has(date)) {
          paiementsParJour.set(date, paiementsParJour.get(date) + p.montant);
        } else {
          paiementsParJour.set(date, p.montant);
        }
      });

    this.donneesGraphique = Array.from(paiementsParJour.entries())
      .map(([date, montant]) => ({ date, montant }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // Filtrage des paiements
  get paiementsFiltres(): Paiement[] {
    let filtered = [...this.paiements];

    if (this.filtreStatut !== 'tous') {
      filtered = filtered.filter(p => p.statut === this.filtreStatut);
    }

    if (this.filtreType !== 'tous') {
      filtered = filtered.filter(p => p.typePaiement === this.filtreType);
    }

    if (this.filtreDateDebut) {
      filtered = filtered.filter(p => p.datePaiement && p.datePaiement >= this.filtreDateDebut);
    }

    if (this.filtreDateFin) {
      filtered = filtered.filter(p => p.datePaiement && p.datePaiement <= this.filtreDateFin);
    }

    if (this.filtreMois) {
      filtered = filtered.filter(p => {
        if (!p.datePaiement) return false;
        const paiementMois = p.datePaiement.substring(0, 7);
        return paiementMois === this.filtreMois;
      });
    }

    return filtered.sort((a, b) => {
      if (!a.datePaiement && !b.datePaiement) return 0;
      if (!a.datePaiement) return 1;
      if (!b.datePaiement) return -1;
      return new Date(b.datePaiement).getTime() - new Date(a.datePaiement).getTime();
    });
  }

  // Changement de vue
  setViewMode(mode: 'liste' | 'stats'): void {
    this.viewMode = mode;
  }

  // Actions sur les paiements
  rembourserPaiement(paiement: Paiement): void {
    if (confirm(`Êtes-vous sûr de vouloir rembourser le paiement de ${paiement.montant} FCFA ?`)) {
      paiement.statut = 'rembourse';
      this.calculerStatistiques();
      console.log(`Paiement ${paiement.id} remboursé`);
      // Appel API pour traiter le remboursement
    }
  }

  annulerPaiement(paiement: Paiement): void {
    if (confirm(`Êtes-vous sûr de vouloir annuler ce paiement ?`)) {
      paiement.statut = 'annule';
      this.calculerStatistiques();
      console.log(`Paiement ${paiement.id} annulé`);
      // Appel API pour annuler le paiement
    }
  }

  // Téléchargement du reçu
  telechargerRecu(paiement: Paiement): void {
    console.log(`Téléchargement du reçu pour paiement ${paiement.id}`);
    const contenu = this.genererContenuRecu(paiement);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenu));
    element.setAttribute('download', `recu-${paiement.referencePaiement || paiement.referenceRdv}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private genererContenuRecu(paiement: Paiement): string {
    return `
REÇU DE PAIEMENT
================

Référence Paiement: ${paiement.referencePaiement || 'N/A'}
Référence RDV: ${paiement.referenceRdv}
Date d'émission: ${new Date().toLocaleDateString('fr-FR')}

PATIENT:
${paiement.patientPrenom} ${paiement.patientNom}

RENDEZ-VOUS:
Date: ${new Date(paiement.dateRendezVous).toLocaleDateString('fr-FR')}
Heure: ${paiement.heureRendezVous}
Motif: ${paiement.motif}

PAIEMENT:
Montant: ${paiement.montant} FCFA
Type: ${paiement.typePaiement === 'en_ligne' ? 'Paiement en ligne' : 'Paiement au cabinet'}
Méthode: ${this.getMethodePaiementLabel(paiement.methodePaiement)}
Date: ${paiement.datePaiement ? new Date(paiement.datePaiement).toLocaleDateString('fr-FR') : 'En attente'}
Statut: ${this.getStatutLabel(paiement.statut)}

Merci pour votre confiance.
    `.trim();
  }

  // Export des données
  exporterDonnees(): void {
    const donneesExport = this.paiementsFiltres.map(p => ({
      'Référence RDV': p.referenceRdv,
      'Référence Paiement': p.referencePaiement || 'N/A',
      'Patient': `${p.patientPrenom} ${p.patientNom}`,
      'Montant': p.montant,
      'Date Paiement': p.datePaiement || 'En attente',
      'Type': p.typePaiement === 'en_ligne' ? 'En ligne' : 'Cabinet',
      'Statut': this.getStatutLabel(p.statut),
      'Méthode': this.getMethodePaiementLabel(p.methodePaiement)
    }));

    const csvContent = this.convertirEnCSV(donneesExport);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `paiements-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private convertirEnCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => `"${row[header]}"`).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  }

  // Utilitaires
  getStatutClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'statut-attente';
      case 'paye': return 'statut-paye';
      case 'rembourse': return 'statut-rembourse';
      case 'annule': return 'statut-annule';
      default: return '';
    }
  }

  getStatutLabel(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'paye': return 'Payé';
      case 'rembourse': return 'Remboursé';
      case 'annule': return 'Annulé';
      default: return statut;
    }
  }

  getMethodePaiementLabel(methode: string): string {
    switch (methode) {
      case 'carte_bancaire': return 'Carte bancaire';
      case 'mobile_money': return 'Mobile Money';
      case 'especes': return 'Espèces';
      case 'cheque': return 'Chèque';
      default: return methode;
    }
  }

  getTypeClass(type: string): string {
    return type === 'en_ligne' ? 'type-enligne' : 'type-cabinet';
  }

  // Actualisation des données
  actualiserDonnees(): void {
    console.log('Actualisation des données...');
    this.calculerStatistiques();
    this.preparerDonneesGraphique();
    // Appel API pour recharger les données
  }
}