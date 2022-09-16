import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private BASE_URL: string;
  private jwt: string | null;
  private jwtSubject$: Subject<string | null>;

  constructor(private httpClient: HttpClient) {
    this.BASE_URL = `${environment.ALPHA_URL}/auth/login`;
    this.jwt = null;
    this.jwtSubject$ = new BehaviorSubject<string | null>(null);
  }

  public logIn(username: string, password: string): void {
    this.httpClient
      .post<AuthResponse>(this.BASE_URL, {
        username,
        password,
      })
      .subscribe({
        next: ({ accessToken }) => {
          this.jwt = accessToken;
          this.jwtSubject$.next(accessToken);
        },
      });
  }

  public userHasLoggedIn(): Observable<boolean> {
    return this.jwtSubject$.pipe(map((jwt) => !!jwt));
  }

  public getJWT(): string | null {
    return this.jwt;
  }
}
