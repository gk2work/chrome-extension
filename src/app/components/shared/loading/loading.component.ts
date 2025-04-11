import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container" *ngIf="isLoading">
      <div class="spinner"></div>
      <div class="loading-text">{{ message }}</div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top-color: #007bff;
      animation: spin 1s infinite linear;
    }
    
    .loading-text {
      margin-top: 10px;
      color: #6c757d;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Loading...';
} 