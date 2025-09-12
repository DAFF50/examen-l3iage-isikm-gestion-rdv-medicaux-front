export class AdminUtils {
  static formatCurrency(amount: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  static formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR').format(value);
  }

  static formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('fr-FR', { ...defaultOptions, ...options }).format(dateObj);
  }

  static formatDateTime(date: Date | string): string {
    return this.formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  static formatTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  }

  static getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      // Payment statuses
      'pending': '#f39c12',
      'paid': '#27ae60',
      'failed': '#e74c3c',
      'refunded': '#95a5a6',
      'cancelled': '#95a5a6',
      
      // Appointment statuses
      'confirmed': '#3498db',
      'completed': '#27ae60',
      'no_show': '#e67e22',
      
      // User statuses
      'active': '#27ae60',
      'inactive': '#95a5a6',
      'suspended': '#e74c3c',
      
      // General statuses
      'success': '#27ae60',
      'warning': '#f39c12',
      'error': '#e74c3c',
      'info': '#3498db',
      
      // System statuses
      'healthy': '#27ae60',
      'critical': '#e74c3c'
    };
    return colors[status.toLowerCase()] || '#34495e';
  }

  static getStatusText(status: string, context?: string): string {
    const texts: { [key: string]: string } = {
      // Payment statuses
      'pending': 'En attente',
      'paid': 'Payé',
      'failed': 'Échec',
      'refunded': 'Remboursé',
      'cancelled': 'Annulé',
      
      // Appointment statuses
      'confirmed': 'Confirmé',
      'completed': 'Terminé',
      'no_show': 'Absence',
      
      // User statuses
      'active': 'Actif',
      'inactive': 'Inactif',
      'suspended': 'Suspendu',
      
      // Roles
      'patient': 'Patient',
      'doctor': 'Médecin',
      'admin': 'Administrateur',
      
      // Payment methods
      'online': 'En ligne',
      'cash': 'Espèces',
      'bank_transfer': 'Virement',
      
      // Appointment types
      'consultation': 'Consultation',
      'follow_up': 'Suivi',
      'emergency': 'Urgence',
      'teleconsultation': 'Téléconsultation'
    };
    return texts[status.toLowerCase()] || status;
  }

  static getRoleColor(role: string): string {
    const colors: { [key: string]: string } = {
      'patient': '#3498db',
      'doctor': '#e74c3c',
      'admin': '#f39c12'
    };
    return colors[role.toLowerCase()] || '#95a5a6';
  }

  static downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  static generateReferenceNumber(prefix: string = 'RDV'): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `${prefix}-${timestamp.slice(-6)}-${random}`;
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une minuscule');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  static calculateAge(birthDate: Date | string): number {
    const today = new Date();
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  static getTimeAgo(date: Date | string): string {
    const now = new Date();
    const past = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals = [
      { label: 'an', seconds: 31536000 },
      { label: 'mois', seconds: 2592000 },
      { label: 'semaine', seconds: 604800 },
      { label: 'jour', seconds: 86400 },
      { label: 'heure', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'seconde', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `Il y a ${count} ${interval.label}${count > 1 ? 's' : ''}`;
      }
    }

    return 'À l\'instant';
  }

  static generateQRCode(data: string): string {
    // This would typically use a QR code library
    // For now, return a placeholder URL
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
  }

  static exportToCSV(data: any[], filename: string): void {
    const csvContent = this.convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.downloadFile(blob, `${filename}.csv`);
  }

  private static convertToCSV(data: any[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );

    return [csvHeaders, ...csvRows].join('\n');
  }

  static sanitizeHtml(html: string): string {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength - 3) + '...';
  }

  static capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  static formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  static generateRandomColor(): string {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c',
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#fa709a', '#fee140', '#a8edea', '#fed6e3'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    const maxLength = Math.max(parts1.length, parts2.length);

    for (let i = 0; i < maxLength; i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;

      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }

    return 0;
  }
}
