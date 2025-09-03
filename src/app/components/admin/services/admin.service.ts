import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor() {}

  getDashboardData() {
    return {
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
  }
}
