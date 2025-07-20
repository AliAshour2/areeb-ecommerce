
import { Injectable } from '@angular/core';
import { AuthResponse, SignInData, SignUpData } from '../../../shared/models/auth.model';
import { BehaviorSubject,  Observable, } from 'rxjs';
import { SignInEndPoint, SignUpEndPoint } from '../../../shared/constants/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(credentials: SignUpData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SignUpEndPoint, credentials);
  }

  signin(credentials: SignInData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(SignInEndPoint, credentials);
  }

  
}
