import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AdminUtils } from '../../utils/admin.utils';

export interface Justificatif {
  id: number;
  appointmentId: number;
  filename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  referenceNumber: string;
  qrCode?: string;
  isValid: boolean;
  expiresAt?: Date;
  generatedAt: Date;
  downloadCount: number;
  lastDownloadedAt?: Date;
  appointment: {
    id: number;
    appointmentDate: Date;
    type: string;
    status: string;
  };
  patient: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    specialty: string;
  };
  payment?: {
    id: number;
    amount: number;
    status: string;
  };
}

@Component({
  selector: 'app-justificatifs',
  templateUrl: './justificatifs.component.html',
  styleUrls: ['./justificatifs.component.css']
})
export class JustificatifsComponent implements OnInit {
  justificatifs: Justificatif[] = [
    {
      id: 1,
      appointmentId: 45,
      filename: 'justificatif_rdv_45_2024120512301.pdf',
      filePath: '/uploads/justificatifs/2024/12/justificatif_rdv_45_2024120512301.pdf',
      fileSize: 245678,
      mimeType: 'application/pdf',
      referenceNumber: 'RDV-240451-A7B2C',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      isValid: true,
      expiresAt: new Date('2025-12-05'),
      generatedAt: new Date('2024-12-05T14:30:15'),
      downloadCount: 3,
      lastDownloadedAt: new Date('2024-12-08T09:15:22'),
      appointment: {
        id: 45,
        appointmentDate: new Date('2024-12-05T14:00:00'),
        type: 'consultation',
        status: 'completed'
      },
      patient: {
        id: 12,
        firstName: 'Marie',
        lastName: 'Dupont',
        email: 'marie.dupont@email.com'
      },
      doctor: {
        id: 5,
        firstName: 'Dr. Jean',
        lastName: 'Martin',
        specialty: 'Cardiologie'
      },
      payment: {
        id: 1,
        amount: 85.00,
        status: 'paid'
      }
    },
    {
      id: 2,
      appointmentId: 47,
      filename: 'justificatif_rdv_47_2024120211002.pdf',
      filePath: '/uploads/justificatifs/2024/12/justificatif_rdv_47_2024120211002.pdf',
      fileSize: 198432,
      mimeType: 'application/pdf',
      referenceNumber: 'RDV-240472-X9Y4Z',
      isValid: true,
      generatedAt: new Date('2024-12-02T11:30:45'),
      downloadCount: 1,
      lastDownloadedAt: new Date('2024-12-02T11:32:10'),
      appointment: {
        id: 47,
        appointmentDate: new Date('2024-12-02T11:00:00'),
        type: 'follow_up',
        status: 'completed'
      },
      patient: {
        id: 14,
        firstName: 'Claire',
        lastName: 'Dubois',
        email: 'claire.dubois@email.com'
      },
      doctor: {
        id: 7,
        firstName: 'Dr. Michel',
        lastName: 'Durand',
        specialty: 'Orthopédie'
      },
      payment: {
        id: 3,
        amount: 120.00,
        status: 'paid'
      }
    },
    {
      id: 3,
      appointmentId: 50,
      filename: 'justificatif_rdv_50_2024120816003.pdf',
      filePath: '/uploads/justificatifs/2024/12/justificatif_rdv_50_2024120816003.pdf',
      fileSize: 287654,
      mimeType: 'application/pdf',
      referenceNumber: 'RDV-240503-M5N8P',
      isValid: true,
      expiresAt: new Date('2025-12-08'),
      generatedAt: new Date('2024-12-08T16:15:30'),
      downloadCount: 2,
      lastDownloadedAt: new Date('2024-12-09T08:45:12'),
      appointment: {
        id: 50,
        appointmentDate: new Date('2024-12-08T16:00:00'),
        type: 'consultation',
        status: 'completed'
      },
      patient: {
        id: 17,
        firstName: 'Lucas',
        lastName: 'Leroy',
        email: 'lucas.leroy@email.com'
      },
      doctor: {
        id: 10,
        firstName: 'Dr. Marie',
        lastName: 'Girard',
        specialty: 'Gynécologie'
      },
      payment: {
        id: 6,
        amount: 110.00,
        status: 'paid'
      }
    },
    {
      id: 4,
      appointmentId: 52,
      filename: 'justificatif_rdv_52_2024120710004.pdf',
      filePath: '/uploads/justificatifs/2024/12/justificatif_rdv_52_2024120710004.pdf',
      fileSize: 156789,
      mimeType: 'application/pdf',
      referenceNumber: 'RDV-240524-Q1R3S',
      isValid: false,
      generatedAt: new Date('2024-12-07T10:22:18'),
      downloadCount: 0,
      appointment: {
        id: 52,
        appointmentDate: new Date('2024-12-07T10:00:00'),
        type: 'consultation',
        status: 'cancelled'
      },
      patient: {
        id: 18,
        firstName: 'Nathalie',
        lastName: 'Roussel',
        email: 'nathalie.roussel@email.com'
      },
      doctor: {
        id: 6,
        firstName: 'Dr. Sophie',
        lastName: 'Laurent',
        specialty: 'Dermatologie'
      }
    },
    {
      id: 5,
      appointmentId: 53,
      filename: 'justificatif_rdv_53_2024121009005.pdf',
      filePath: '/uploads/justificatifs/2024/12/justificatif_rdv_53_2024121009005.pdf',
      fileSize: 234567,
      mimeType: 'application/pdf',
      referenceNumber: 'RDV-240535-T7U2V',
      isValid: true,
      generatedAt: new Date('2024-12-10T09:45:33'),
      downloadCount: 5,
      lastDownloadedAt: new Date('2024-12-11T14:20:45'),
      appointment: {
        id: 53,
        appointmentDate: new Date('2024-12-10T09:30:00'),
        type: 'emergency',
        status: 'completed'
      },
      patient: {
        id: 19,
        firstName: 'Antoine',
        lastName: 'Moreau',
        email: 'antoine.moreau@email.com'
      },
      doctor: {
        id: 8,
        firstName: 'Dr. Anne',
        lastName: 'Petit',
        specialty: 'Neurologie'
      },
      payment: {
        id: 7,
        amount: 150.00,
        status: 'paid'
      }
    },
    {
      id: 6,
      appointmentId: 49,
      filename: 'justificatif_rdv_49_2024113010006.pdf',
      filePath: '/uploads/justificatifs/2024/11/justificatif_rdv_49_2024113010006.pdf',
      fileSize: 198765,
      mimeType: 'application/pdf',
      referenceNumber: 'RDV-240496-W9X5Y',
      isValid: false,
      generatedAt: new Date('2024-11-30T10:30:25'),
      downloadCount: 2,
      lastDownloadedAt: new Date('2024-11-30T10:35:18'),
      appointment: {
        id: 49,
        appointmentDate: new Date('2024-11-30T10:00:00'),
        type: 'consultation',
        status: 'cancelled'
      },
      patient: {
        id: 16,
        firstName: 'Emma',
        lastName: 'Rousseau',
        email: 'emma.rousseau@email.com'
      },
      doctor: {
        id: 9,
        firstName: 'Dr. Pierre',
        lastName: 'Blanc',
        specialty: 'Pédiatrie'
      },
      payment: {
        id: 5,
        amount: 60.00,
        status: 'refunded'
      }
    }
  ];

  filteredJustificatifs: Justificatif[] = [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;
  isLoading = false;
  
  // Filtres
  searchTerm = '';
  selectedStatus = '';
  selectedDateRange = '';
  selectedSpecialty = '';
  sortBy = 'generatedAt';
  sortDirection: 'asc' | 'desc' = 'desc';
  
  // Modal
  showModal = false;
  showDeleteModal = false;
  showRegenerateModal = false;
  modalMode: 'view' | 'regenerate' = 'view';
  selectedJustificatif: Justificatif | null = null;
  justificatifToDelete: Justificatif | null = null;
  
  // Options
  statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'valid', label: 'Valides' },
    { value: 'invalid', label: 'Invalides' },
    { value: 'expired', label: 'Expirés' }
  ];

  dateRangeOptions = [
    { value: '', label: 'Toutes les dates' },
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' }
  ];

  specialtyOptions = [
    { value: '', label: 'Toutes les spécialités' },
    { value: 'Cardiologie', label: 'Cardiologie' },
    { value: 'Dermatologie', label: 'Dermatologie' },
    { value: 'Orthopédie', label: 'Orthopédie' },
    { value: 'Neurologie', label: 'Neurologie' },
    { value: 'Gynécologie', label: 'Gynécologie' },
    { value: 'Pédiatrie', label: 'Pédiatrie' }
  ];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadJustificatifs();
  }

  loadJustificatifs(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.applyFilters();
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    let filtered = [...this.justificatifs];

    // Filtre de recherche
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(justificatif => 
        justificatif.referenceNumber.toLowerCase().includes(searchLower) ||
        justificatif.patient.firstName.toLowerCase().includes(searchLower) ||
        justificatif.patient.lastName.toLowerCase().includes(searchLower) ||
        justificatif.patient.email.toLowerCase().includes(searchLower) ||
        justificatif.doctor.firstName.toLowerCase().includes(searchLower) ||
        justificatif.doctor.lastName.toLowerCase().includes(searchLower) ||
        justificatif.filename.toLowerCase().includes(searchLower) ||
        justificatif.id.toString().includes(searchLower)
      );
    }

    // Filtre par statut
    if (this.selectedStatus) {
      const now = new Date();
      filtered = filtered.filter(justificatif => {
        switch (this.selectedStatus) {
          case 'valid':
            return justificatif.isValid && (!justificatif.expiresAt || justificatif.expiresAt > now);
          case 'invalid':
            return !justificatif.isValid;
          case 'expired':
            return justificatif.expiresAt && justificatif.expiresAt <= now;
          default:
            return true;
        }
      });
    }

    // Filtre par spécialité
    if (this.selectedSpecialty) {
      filtered = filtered.filter(justificatif => 
        justificatif.doctor.specialty === this.selectedSpecialty
      );
    }

    // Filtre par date
    if (this.selectedDateRange) {
      const now = new Date();
      filtered = filtered.filter(justificatif => {
        const generateDate = new Date(justificatif.generatedAt);
        switch (this.selectedDateRange) {
          case 'today':
            return generateDate.toDateString() === now.toDateString();
          case 'week':
            const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return generateDate >= weekStart;
          case 'month':
            return generateDate.getMonth() === now.getMonth() && 
                   generateDate.getFullYear() === now.getFullYear();
          case 'quarter':
            const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
            return generateDate >= quarterStart;
          default:
            return true;
        }
      });
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (this.sortBy) {
        case 'patient':
          aValue = `${a.patient.firstName} ${a.patient.lastName}`.toLowerCase();
          bValue = `${b.patient.firstName} ${b.patient.lastName}`.toLowerCase();
          break;
        case 'doctor':
          aValue = `${a.doctor.firstName} ${a.doctor.lastName}`.toLowerCase();
          bValue = `${b.doctor.firstName} ${b.doctor.lastName}`.toLowerCase();
          break;
        case 'fileSize':
          aValue = a.fileSize;
          bValue = b.fileSize;
          break;
        case 'downloadCount':
          aValue = a.downloadCount;
          bValue = b.downloadCount;
          break;
        case 'generatedAt':
        default:
          aValue = new Date(a.generatedAt).getTime();
          bValue = new Date(b.generatedAt).getTime();
          break;
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredJustificatifs = filtered;
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  sort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getPaginatedJustificatifs(): Justificatif[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredJustificatifs.slice(startIndex, endIndex);
  }

  viewJustificatif(justificatif: Justificatif): void {
    this.selectedJustificatif = { ...justificatif };
    this.modalMode = 'view';
    this.showModal = true;
  }

  downloadJustificatif(justificatif: Justificatif): void {
    // Simulation du téléchargement
    this.isLoading = true;
    
    setTimeout(() => {
      // Mettre à jour les compteurs
      const index = this.justificatifs.findIndex(j => j.id === justificatif.id);
      if (index > -1) {
        this.justificatifs[index].downloadCount++;
        this.justificatifs[index].lastDownloadedAt = new Date();
        this.applyFilters();
      }
      
      // Créer un lien de téléchargement simulé
      const link = document.createElement('a');
      link.href = '#'; // En réalité, ce serait l'URL du PDF
      link.download = justificatif.filename;
      // link.click(); // Décommenter pour le vrai téléchargement
      
      this.isLoading = false;
      console.log(`Téléchargement de ${justificatif.filename}`);
    }, 1000);
  }

  previewJustificatif(justificatif: Justificatif): void {
    // Ouvrir dans un nouvel onglet pour prévisualisation
    window.open(`/api/justificatifs/${justificatif.id}/preview`, '_blank');
  }

  regenerateJustificatif(justificatif: Justificatif): void {
    this.selectedJustificatif = justificatif;
    this.showRegenerateModal = true;
  }

  confirmRegenerate(): void {
    if (!this.selectedJustificatif) return;

    this.isLoading = true;
    
    setTimeout(() => {
      const index = this.justificatifs.findIndex(j => j.id === this.selectedJustificatif!.id);
      if (index > -1) {
        // Simuler la régénération
        this.justificatifs[index] = {
          ...this.justificatifs[index],
          generatedAt: new Date(),
          downloadCount: 0,
          lastDownloadedAt: undefined,
          isValid: true,
          referenceNumber: AdminUtils.generateReferenceNumber('RDV')
        };
        this.applyFilters();
      }
      
      this.isLoading = false;
      this.closeRegenerateModal();
    }, 1500);
  }

  sendJustificatifByEmail(justificatif: Justificatif): void {
    this.isLoading = true;
    
    setTimeout(() => {
      console.log(`Justificatif envoyé par email à ${justificatif.patient.email}`);
      this.isLoading = false;
    }, 1000);
  }

  confirmDelete(justificatif: Justificatif): void {
    this.justificatifToDelete = justificatif;
    this.showDeleteModal = true;
  }

  deleteJustificatif(): void {
    if (!this.justificatifToDelete) return;

    this.isLoading = true;
    
    setTimeout(() => {
      this.justificatifs = this.justificatifs.filter(j => j.id !== this.justificatifToDelete!.id);
      this.applyFilters();
      this.closeDeleteModal();
      this.isLoading = false;
    }, 500);
  }

  toggleJustificatifStatus(justificatif: Justificatif): void {
    const index = this.justificatifs.findIndex(j => j.id === justificatif.id);
    if (index > -1) {
      this.justificatifs[index].isValid = !this.justificatifs[index].isValid;
      this.applyFilters();
    }
  }

  bulkDownload(): void {
    const selected = this.filteredJustificatifs.filter(j => j.isValid);
    console.log(`Téléchargement en lot de ${selected.length} justificatifs`);
  }

  exportJustificatifs(): void {
    const data = this.filteredJustificatifs.map(justificatif => ({
      ID: justificatif.id,
      'Référence': justificatif.referenceNumber,
      'Patient': `${justificatif.patient.firstName} ${justificatif.patient.lastName}`,
      'Médecin': `${justificatif.doctor.firstName} ${justificatif.doctor.lastName}`,
      'Spécialité': justificatif.doctor.specialty,
      'Rendez-vous': this.formatDate(justificatif.appointment.appointmentDate),
      'Généré le': this.formatDate(justificatif.generatedAt),
      'Taille': this.formatFileSize(justificatif.fileSize),
      'Téléchargements': justificatif.downloadCount,
      'Statut': justificatif.isValid ? 'Valide' : 'Invalide'
    }));

    AdminUtils.exportToCSV(data, 'justificatifs_' + this.formatDate(new Date(), { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\//g, '-'));
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedJustificatif = null;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.justificatifToDelete = null;
  }

  closeRegenerateModal(): void {
    this.showRegenerateModal = false;
    this.selectedJustificatif = null;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  refreshData(): void {
    this.loadJustificatifs();
  }

  // Utilitaires
  formatDate = AdminUtils.formatDate;
  formatDateTime = AdminUtils.formatDateTime;
  formatFileSize = AdminUtils.formatFileSize;

  getStatusText(justificatif: Justificatif): string {
    const now = new Date();
    
    if (!justificatif.isValid) return 'Invalide';
    if (justificatif.expiresAt && justificatif.expiresAt <= now) return 'Expiré';
    return 'Valide';
  }

  getStatusColor(justificatif: Justificatif): string {
    const now = new Date();
    
    if (!justificatif.isValid) return '#e74c3c';
    if (justificatif.expiresAt && justificatif.expiresAt <= now) return '#f39c12';
    return '#27ae60';
  }

  getAppointmentTypeText(type: string): string {
  const types: { [key: string]: string } = {
    consultation: 'Consultation',
    follow_up: 'Suivi',
    emergency: 'Urgence',
    teleconsultation: 'Téléconsultation'
  };
  return types[type] ?? type;
}


  isExpired(justificatif: Justificatif): boolean {
    if (!justificatif.expiresAt) return false;
    return justificatif.expiresAt <= new Date();
  }

  getTotalStats() {
    const now = new Date();
    return {
      total: this.justificatifs.length,
      valid: this.justificatifs.filter(j => j.isValid && (!j.expiresAt || j.expiresAt > now)).length,
      invalid: this.justificatifs.filter(j => !j.isValid).length,
      expired: this.justificatifs.filter(j => j.expiresAt && j.expiresAt <= now).length,
      totalDownloads: this.justificatifs.reduce((sum, j) => sum + j.downloadCount, 0),
      totalSize: this.justificatifs.reduce((sum, j) => sum + j.fileSize, 0)
    };
  }

  trackByJustificatifId(index: number, justificatif: Justificatif): number {
    return justificatif.id;
  }
}