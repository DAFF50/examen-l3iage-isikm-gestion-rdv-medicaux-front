import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart', { static: false }) revenueChartRef!: ElementRef;
  @ViewChild('appointmentsChart', { static: false }) appointmentsChartRef!: ElementRef;

  dashboardData = {
    totalUsers: 1250,
    totalDoctors: 45,
    totalPatients: 1205,
    totalAppointments: 384,
    totalRevenue: 28450,
    paidAppointments: 342,
    pendingPayments: 42,
    generatedPdfs: 298,
    todayAppointments: 28,
    monthlyGrowth: 15.3
  };

  recentActivities = [
    {
      id: 1,
      type: 'appointment',
      icon: 'bx-calendar-plus',
      description: 'Nouveau rendez-vous confirmé avec Dr. Martin',
      timestamp: new Date(Date.now() - 5 * 60000),
      user: 'Marie Dupont'
    },
    {
      id: 2,
      type: 'payment',
      icon: 'bx-money',
      description: 'Paiement de 32000CFA reçu pour consultation',
      timestamp: new Date(Date.now() - 15 * 60000),
      user: 'Jean Bernard'
    },
    {
      id: 3,
      type: 'user',
      icon: 'bx-user-plus',
      description: 'Nouveau médecin inscrit - Dr. Sophie Laurent',
      timestamp: new Date(Date.now() - 30 * 60000),
      user: 'Dr. Laurent'
    },
    {
      id: 4,
      type: 'justificatif',
      icon: 'bx-file-blank',
      description: 'Justificatif PDF généré pour RDV #2845',
      timestamp: new Date(Date.now() - 45 * 60000),
      user: 'Système'
    },
    {
      id: 5,
      type: 'payment',
      icon: 'bx-credit-card',
      description: 'Remboursement effectué - 100000CFA',
      timestamp: new Date(Date.now() - 60 * 60000),
      user: 'Admin'
    }
  ];

  paymentStats = [
    { label: 'Paiements confirmés', value: 342, percentage: 89, color: '#27ae60' },
    { label: 'En attente', value: 42, percentage: 11, color: '#f39c12' },
    { label: 'Échecs', value: 8, percentage: 2, color: '#e74c3c' },
    { label: 'Remboursements', value: 15, percentage: 4, color: '#95a5a6' }
  ];

  quickStats = [
    { label: "Aujourd'hui", value: this.dashboardData.todayAppointments, suffix: ' RDV' },
    { label: 'Cette semaine', value: 156, suffix: ' RDV' },
    { label: 'Taux de confirmation', value: 94.2, suffix: '%' },
    { label: 'Croissance mensuelle', value: this.dashboardData.monthlyGrowth, suffix: '%' }
  ];

  private revenueChart: Chart | null = null;
  private appointmentsChart: Chart | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createRevenueChart();
      this.createAppointmentsChart();
    }, 100);
  }

  loadDashboardData(): void {
    // Simulation des données - remplacer par des appels API réels
    /*
    this.adminService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du dashboard:', error);
      }
    });
    */
  }

 private createRevenueChart(): void {
  const ctx = this.revenueChartRef.nativeElement.getContext('2d');

  const monthlyData: number[] = [18200, 22400, 19800, 25600, 28450, 31200];
  const labels: string[] = ['Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  this.revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Revenus (CFA)',
        data: monthlyData,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.1)' },
          ticks: {
            callback: function(value: any) {
              return value + 'CFA';
            }
          }
        },
        x: { grid: { display: false } }
      }
    }
  });
}


  private createAppointmentsChart(): void {
    const ctx = this.appointmentsChartRef.nativeElement.getContext('2d');
    
    const specialtyData = {
      'Cardiologie': 85,
      'Dermatologie': 72,
      'Pédiatrie': 68,
      'Neurologie': 45,
      'Orthopédie': 52,
      'Autre': 62
    };

    this.appointmentsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(specialtyData),
        datasets: [{
          data: Object.values(specialtyData),
          backgroundColor: [
            '#667eea',
            '#f093fb',
            '#4facfe',
            '#43e97b',
            '#f39c12',
            '#e74c3c'
          ],
          borderWidth: 0,
          hoverBorderWidth: 3,
          hoverBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        },
        cutout: '70%'
      }
    });
  }

getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    appointment: 'bx-calendar-plus',
    payment: 'bx-money',
    user: 'bx-user-plus',
    justificatif: 'bx-file-blank'
  };
  return icons[type] || 'bx-info-circle';
}

getActivityColor(type: string): string {
  const colors: Record<string, string> = {
    appointment: '#3498db',
    payment: '#27ae60',
    user: '#e74c3c',
    justificatif: '#f39c12'
  };
  return colors[type] || '#95a5a6';
}


  refreshDashboard(): void {
    this.loadDashboardData();
    // Actualiser les graphiques
    if (this.revenueChart) {
      this.revenueChart.update();
    }
    if (this.appointmentsChart) {
      this.appointmentsChart.update();
    }
  }
}