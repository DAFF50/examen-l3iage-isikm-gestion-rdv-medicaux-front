import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+221|00221)?[0-9]{9}$/)]],
      dateOfBirth: ['', [Validators.required, this.ageValidator]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  // Validateur personnalisé pour l'âge minimum
  ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const today = new Date();
    const birthDate = new Date(control.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 16) {
      return { minAge: { requiredAge: 16, actualAge: age } };
    }
    return null;
  }

  // Validateur personnalisé pour la complexité du mot de passe
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    
    if (!valid) {
      return {
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          hasSpecial
        }
      };
    }
    return null;
  }

  // Validateur pour vérifier que les mots de passe correspondent
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Méthodes pour basculer la visibilité des mots de passe
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Vérifier si un champ a une erreur
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.signupForm.get(fieldName);
    if (!field) return false;
    
    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    return field.invalid && (field.dirty || field.touched);
  }

  // Obtenir le message d'erreur pour un champ
  getErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        if (errors['required']) return `Ce champ est requis`;
        if (errors['minlength']) return `Minimum 2 caractères requis`;
        break;
      
      case 'email':
        if (errors['required']) return 'L\'email est requis';
        if (errors['email']) return 'Format d\'email invalide';
        break;
      
      case 'phone':
        if (errors['required']) return 'Le téléphone est requis';
        if (errors['pattern']) return 'Format: +221XXXXXXXXX ou XXXXXXXXX';
        break;
      
      case 'dateOfBirth':
        if (errors['required']) return 'La date de naissance est requise';
        if (errors['minAge']) return `Âge minimum requis: 16 ans`;
        break;
      
      case 'password':
        if (errors['required']) return 'Le mot de passe est requis';
        if (errors['minlength']) return 'Minimum 8 caractères';
        if (errors['passwordStrength']) return 'Le mot de passe doit contenir: majuscule, minuscule, chiffre et caractère spécial';
        break;
      
      case 'confirmPassword':
        if (errors['required']) return 'Confirmez votre mot de passe';
        break;
    }

    // Erreur de correspondance des mots de passe
    if (fieldName === 'confirmPassword' && this.signupForm.hasError('passwordMismatch')) {
      return 'Les mots de passe ne correspondent pas';
    }

    return 'Champ invalide';
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      
      const formData = {
        ...this.signupForm.value
      };
      delete formData.confirmPassword; // Supprimer la confirmation du mot de passe
      delete formData.acceptTerms; // Supprimer l'acceptation des termes
      
      // Simulation d'un appel API
      console.log('Données d\'inscription:', formData);
      
      // Simuler un délai d'API
      setTimeout(() => {
        this.isLoading = false;
        alert('Inscription réussie ! Redirection vers la page de connexion...');
        this.router.navigate(['/login']);
      }, 2000);
      
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}