// specialites.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

export interface Specialty {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  doctorsCount: number;
  appointmentsCount: number;
  averagePrice: number;
  createdAt: Date;
  updatedAt: Date;
  icon?: string;
}

@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.css']
})
export class SpecialitesComponent implements OnInit {
  specialties: Specialty[] = [
    { 
      id: 1, 
      name: 'Cardiologie', 
      description: 'Spécialité médicale qui traite les troubles du cœur et des vaisseaux sanguins.', 
      isActive: true, 
      doctorsCount: 8, 
      appointmentsCount: 145, 
      averagePrice: 85000, 
      createdAt: new Date('2023-01-10'), 
      updatedAt: new Date('2024-11-15'), 
      icon: 'bx-heart' 
    },
    { 
      id: 2, 
      name: 'Dermatologie', 
      description: 'Spécialité qui traite les maladies de la peau, des cheveux et des ongles.', 
      isActive: true, 
      doctorsCount: 6, 
      appointmentsCount: 98, 
      averagePrice: 75000, 
      createdAt: new Date('2023-01-10'), 
      updatedAt: new Date('2024-10-20'), 
      icon: 'bx-face' 
    },
    { 
      id: 3, 
      name: 'Pédiatrie', 
      description: 'Spécialité médicale consacrée aux nourrissons, enfants et adolescents.', 
      isActive: true, 
      doctorsCount: 5, 
      appointmentsCount: 87, 
      averagePrice: 65000, 
      createdAt: new Date('2023-02-15'), 
      updatedAt: new Date('2024-12-01'), 
      icon: 'bx-baby-carriage' 
    },
    { 
      id: 4, 
      name: 'Neurologie', 
      description: 'Spécialité médicale qui traite les maladies du système nerveux.', 
      isActive: true, 
      doctorsCount: 4, 
      appointmentsCount: 72, 
      averagePrice: 90000, 
      createdAt: new Date('2023-03-20'), 
      updatedAt: new Date('2024-11-28'), 
      icon: 'bx-brain' 
    },
    { 
      id: 5, 
      name: 'Orthopédie', 
      description: 'Spécialité chirurgicale qui traite les maladies de l\'appareil locomoteur.', 
      isActive: false, 
      doctorsCount: 3, 
      appointmentsCount: 45, 
      averagePrice: 80000, 
      createdAt: new Date('2023-04-12'), 
      updatedAt: new Date('2024-11-10'), 
      icon: 'bx-bone' 
    },
    { 
      id: 6, 
      name: 'Ophtalmologie', 
      description: 'Spécialité médicale qui traite les maladies de l\'œil et des annexes.', 
      isActive: true, 
      doctorsCount: 7, 
      appointmentsCount: 112, 
      averagePrice: 70000, 
      createdAt: new Date('2023-05-08'), 
      updatedAt: new Date('2024-12-02'), 
      icon: 'bx-show' 
    }
  ];

  filteredSpecialties: Specialty[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  
  // Filtres
  statusFilter: string = 'all'; // all, active, inactive
  sortBy: string = 'name'; // name, doctorsCount, appointmentsCount, averagePrice
  sortOrder: 'asc' | 'desc' = 'asc';

  // Pagination
  pageIndex = 0;
  pageSize = 6;

  // Modal
  showModal = false;
  editingSpecialty = false;
  currentSpecialty: Partial<Specialty> = {};

  // Statistiques
  totalSpecialties = 0;
  activeSpecialties = 0;
  totalDoctors = 0;
  averagePrice = 0;

  Math = Math;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
    this.calculateStats();
  }

  loadData() {
    this.filteredSpecialties = [...this.specialties];
    this.applyFilters();
  }

  calculateStats() {
    this.totalSpecialties = this.specialties.length;
    this.activeSpecialties = this.specialties.filter(s => s.isActive).length;
    this.totalDoctors = this.specialties.reduce((sum, s) => sum + s.doctorsCount, 0);
    this.averagePrice = this.specialties.reduce((sum, s) => sum + s.averagePrice, 0) / this.specialties.length;
  }

  get pagedSpecialties() {
    const start = this.pageIndex * this.pageSize;
    return this.filteredSpecialties.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredSpecialties.length / this.pageSize);
  }

  // Recherche et filtrage
  search() {
    this.applyFilters();
    this.pageIndex = 0;
  }

  onStatusFilterChange() {
    this.applyFilters();
    this.pageIndex = 0;
  }

  applyFilters() {
    let filtered = [...this.specialties];

    // Filtre par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (this.statusFilter === 'active') {
      filtered = filtered.filter(s => s.isActive);
    } else if (this.statusFilter === 'inactive') {
      filtered = filtered.filter(s => !s.isActive);
    }

    // Tri
    // Tri
filtered.sort((a, b) => {
  let aValue = a[this.sortBy as keyof Specialty] ?? '';
  let bValue = b[this.sortBy as keyof Specialty] ?? '';

  // Si ce sont des strings
  if (typeof aValue === 'string' && typeof bValue === 'string') {
    aValue = aValue.toLowerCase();
    bValue = bValue.toLowerCase();
  }

  if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
  if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
  return 0;
});


    this.filteredSpecialties = filtered;
  }

  // Tri
  sort(field: string) {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  // Actions CRUD
  addSpecialty() {
    this.editingSpecialty = false;
    this.currentSpecialty = {
      name: '',
      description: '',
      isActive: true,
      averagePrice: 50000,
      icon: 'bx-plus-medical'
    };
    this.showModal = true;
  }

  editSpecialty(specialty: Specialty) {
    this.editingSpecialty = true;
    this.currentSpecialty = { ...specialty };
    this.showModal = true;
  }

  deleteSpecialty(specialty: Specialty) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la spécialité "${specialty.name}" ?`)) {
      this.specialties = this.specialties.filter(s => s.id !== specialty.id);
      this.loadData();
      this.calculateStats();
      this.showSuccessMessage('Spécialité supprimée avec succès');
    }
  }

  saveSpecialty() {
    if (!this.currentSpecialty.name || !this.currentSpecialty.description) {
      this.showErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.isLoading = true;

    // Simuler un appel API
    setTimeout(() => {
      if (this.editingSpecialty && this.currentSpecialty.id) {
        // Modifier
        const index = this.specialties.findIndex(s => s.id === this.currentSpecialty.id);
        if (index !== -1) {
          this.specialties[index] = {
            ...this.specialties[index],
            ...this.currentSpecialty,
            updatedAt: new Date()
          } as Specialty;
        }
        this.showSuccessMessage('Spécialité modifiée avec succès');
      } else {
        // Ajouter
        const newSpecialty: Specialty = {
          id: Math.max(...this.specialties.map(s => s.id)) + 1,
          name: this.currentSpecialty.name!,
          description: this.currentSpecialty.description!,
          isActive: this.currentSpecialty.isActive || true,
          averagePrice: this.currentSpecialty.averagePrice || 50000,
          icon: this.currentSpecialty.icon || 'bx-plus-medical',
          doctorsCount: 0,
          appointmentsCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.specialties.push(newSpecialty);
        this.showSuccessMessage('Spécialité ajoutée avec succès');
      }

      this.isLoading = false;
      this.closeModal();
      this.loadData();
      this.calculateStats();
    }, 800);
  }

  toggleStatus(specialty: Specialty) {
    specialty.isActive = !specialty.isActive;
    specialty.updatedAt = new Date();
    this.calculateStats();
    this.showSuccessMessage(`Spécialité ${specialty.isActive ? 'activée' : 'désactivée'} avec succès`);
  }

  // Modal
  closeModal() {
    this.showModal = false;
    this.editingSpecialty = false;
    this.currentSpecialty = {};
  }

  // Pagination
  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.filteredSpecialties.length) {
      this.pageIndex++;
    }
  }

  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
    }
  }

  goToPage(page: number) {
    this.pageIndex = page;
  }

  // Actions bulk
  activateAll() {
    if (confirm('Activer toutes les spécialités ?')) {
      this.specialties.forEach(s => {
        s.isActive = true;
        s.updatedAt = new Date();
      });
      this.calculateStats();
      this.showSuccessMessage('Toutes les spécialités ont été activées');
    }
  }

  // Utilitaires
  refresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.loadData();
      this.calculateStats();
      this.isLoading = false;
      this.showSuccessMessage('Données rafraîchies');
    }, 500);
  }

  clearSearch() {
    this.searchTerm = '';
    this.statusFilter = 'all';
    this.sortBy = 'name';
    this.sortOrder = 'asc';
    this.pageIndex = 0;
    this.applyFilters();
  }

  exportData() {
    // Simuler l'export
    const dataStr = JSON.stringify(this.specialties, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `specialites_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    this.showSuccessMessage('Export réussi');
  }

  // Messages
  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 3000);
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000);
  }

  // Getters pour les icônes de tri
  getSortIcon(field: string): string {
    if (this.sortBy !== field) return 'bx-sort';
    return this.sortOrder === 'asc' ? 'bx-sort-up' : 'bx-sort-down';
  }
}