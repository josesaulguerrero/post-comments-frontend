import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private BASE_URL: string;
  private jwtSubject: Subject<string | null>;

  constructor(private httpClient: HttpClient) {
    this.BASE_URL = `${environment.ALPHA_URL}/auth/login`;
    this.jwtSubject = new BehaviorSubject<string | null>(null);
  }

  public logIn(username: string, password: string): void {
    this.httpClient
      .post<AuthResponse>(this.BASE_URL, {
        username,
        password,
      })
      .subscribe({
        next: (next) => {
          this.jwtSubject.next(next.accessToken);
        },
      });
  }

  public getJWT(): Observable<string | null> {
    return this.jwtSubject.asObservable();
  }
}
