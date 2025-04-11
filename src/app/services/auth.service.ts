import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Interface for login response
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to track authentication state
  private authenticated = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {
    // Check if user is already authenticated on service initialization
    this.checkAuthState();
  }
  
  /**
   * Check chrome storage for existing auth token
   */
  private checkAuthState(): void {
    // Convert chrome storage API to observable
    from(new Promise<string>((resolve) => {
      chrome.storage.local.get(['authToken'], (result) => {
        resolve(result['authToken'] || '');
      });
    })).pipe(
      tap(token => {
        // Update authentication state based on token presence
        this.authenticated.next(!!token);
      })
    ).subscribe();
  }
  
  /**
   * Log in a user with username and password
   * @param username User's username
   * @param password User's password
   */
  login(username: string, password: string): Observable<LoginResponse> {
    // For demonstration, you'd replace this URL with your actual authentication endpoint
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        // Save token to chrome storage
        chrome.storage.local.set({ authToken: response.token });
        // Update authentication state
        this.authenticated.next(true);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({ token: '', user: { id: '', username: '' } } as LoginResponse);
      })
    );
  }
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }
  
  /**
   * Get the current auth token
   */
  getAuthToken(): Observable<string> {
    return from(new Promise<string>((resolve) => {
      chrome.storage.local.get(['authToken'], (result) => {
        resolve(result['authToken'] || '');
      });
    }));
  }
  
  /**
   * Log out the current user
   */
  logout(): Observable<boolean> {
    return from(new Promise<boolean>((resolve) => {
      chrome.storage.local.remove('authToken', () => {
        this.authenticated.next(false);
        resolve(true);
      });
    }));
  }
  
  // For demonstration purposes only - mocks a successful login
  mockLogin(username: string, password: string): Observable<LoginResponse> {
    // Demo credentials
    if (username === 'demo' && password === 'password') {
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
        user: {
          id: '1',
          username: 'demo'
        }
      };
      
      // Save token to chrome storage
      chrome.storage.local.set({ authToken: mockResponse.token });
      
      // Update authentication state
      this.authenticated.next(true);
      
      return of(mockResponse);
    } else {
      // Return an error for invalid credentials
      return new Observable(observer => {
        observer.error({ error: { message: 'Invalid username or password' } });
      });
    }
  }
} 