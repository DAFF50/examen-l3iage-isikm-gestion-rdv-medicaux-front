// pages/utilisateurs/utilisateurs.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'patient' | 'doctor' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  specialty?: string;
  appointmentsCount?: number;
}

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      email: 'dr.martin@medicapp.com',
      firstName: 'Jean',
      lastName: 'Martin',
      phone: '+33123456789',
      role: 'doctor',
      isActive: true,
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-12-01'),
      lastLogin: new Date('2024-12-02'),
      specialty: 'Cardiologie',
      appointmentsCount: 45
    },
    {
      id: 2,
      email: 'marie.dupont@email.com',
      firstName: 'Marie',
      lastName: 'Dupont',
      phone: '+33987654321',
      role: 'patient',
      isActive: true,
      createdAt: new Date('2023-03-22'),
      updatedAt: new Date('2024-11-30'),
      lastLogin: new Date('2024-12-01'),
      appointmentsCount: 8
    },
    {
      id: 3,
      email: 'dr.laurent@medicapp.com',
      firstName: 'Sophie',
      lastName: 'Laurent',
      phone: '+33654321987',
      role: 'doctor',
      isActive: true,
      createdAt: new Date('2023-06-10'),
      updatedAt: new Date('2024-12-02'),
      lastLogin: new Date('2024-12-02'),
      specialty: 'Dermatologie',
      appointmentsCount: 32
    },
    {
      id: 4,
      email: 'admin@medicapp.com',
      firstName: 'Admin',
      lastName: 'Système',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2024-12-02'),
      lastLogin: new Date('2024-12-02')
    },
    {
      id: 5,
      email: 'paul.bernard@email.com',
      firstName: 'Paul',
      lastName: 'Bernard',
      phone: '+33147258369',
      role: 'patient',
      isActive: false,
      createdAt: new Date('2023-08-14'),
      updatedAt: new Date('2024-10-15'),
      lastLogin: new Date('2024-10-10'),
      appointmentsCount: 3
    }
  ];
  
  filteredUsers: User[] = [];
  currentPage = 1;
  totalPages = 1;
  totalUsers = 0;
  itemsPerPage = 10;
  isLoading = false;
  
  // Filtres
  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';
  sortBy = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Modal
  showModal = false;
  showDeleteModal = false;
  modalMode: 'view' | 'edit' | 'create' = 'view';
  selectedUser: User | null = null;
  userToDelete: User | null = null;
  
  roles = [
    { value: '', label: 'Tous les rôles' },
    { value: 'patient', label: 'Patients' },
    { value: 'doctor', label: 'Médecins' },
    { value: 'admin', label: 'Administrateurs' }
  ];
  
  statuses = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actifs' },
    { value: 'inactive', label: 'Inactifs' }
  ];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.totalUsers = this.users.length;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.users];

    // Filtre de recherche
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.phone && user.phone.includes(this.searchTerm))
      );
    }

    // Filtre par rôle
    if (this.selectedRole) {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // Filtre par statut
    if (this.selectedStatus) {
      if (this.selectedStatus === 'active') {
        filtered = filtered.filter(user => user.isActive);
      } else if (this.selectedStatus === 'inactive') {
        filtered = filtered.filter(user => !user.isActive);
      }
    }

    // Tri
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (this.sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredUsers = filtered;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
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

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  viewUser(user: User): void {
    this.selectedUser = { ...user };
    this.modalMode = 'view';
    this.showModal = true;
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.modalMode = 'edit';
    this.showModal = true;
  }

  createUser(): void {
    this.selectedUser = {
      id: 0,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: 'patient',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.modalMode = 'create';
    this.showModal = true;
  }

  saveUser(): void {
    if (!this.selectedUser) return;

    if (this.modalMode === 'create') {
      // Simulation de création
      this.selectedUser.id = Math.max(...this.users.map(u => u.id)) + 1;
      this.users.push({ ...this.selectedUser });
    } else if (this.modalMode === 'edit') {
      // Simulation de mise à jour
      const index = this.users.findIndex(u => u.id === this.selectedUser!.id);
      if (index > -1) {
        this.users[index] = { ...this.selectedUser };
      }
    }

    this.applyFilters();
    this.closeModal();
  }

  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  deleteUser(): void {
    if (this.userToDelete) {
      this.users = this.users.filter(u => u.id !== this.userToDelete!.id);
      this.applyFilters();
      this.closeDeleteModal();
    }
  }

  toggleUserStatus(user: User): void {
    user.isActive = !user.isActive;
    user.updatedAt = new Date();
    this.applyFilters();
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUser = null;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getStatusText(status: boolean): string {
    return status ? 'Actif' : 'Inactif';
  }

  getStatusColor(status: boolean): string {
    return status ? '#27ae60' : '#95a5a6';
  }

  getRoleText(role: string): string {
  const roleTexts: { [key: string]: string } = {
    patient: 'Patient',
    doctor: 'Médecin',
    admin: 'Administrateur'
  };
  return roleTexts[role] || role;
}

  getRoleColor(role: string): string {
  const roleColors: { [key: string]: string } = {
    patient: '#3498db',
    doctor: '#e74c3c',
    admin: '#f39c12'
  };
  return roleColors[role] || '#95a5a6';
}


  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj);
  }

  isFormValid(): boolean {
    return !!(this.selectedUser?.email && 
             this.selectedUser?.firstName && 
             this.selectedUser?.lastName &&
             this.isValidEmail(this.selectedUser.email));
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}