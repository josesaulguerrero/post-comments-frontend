import { Auth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import {
  tap,
  Subject,
  BehaviorSubject,
  from,
  switchMap,
  Observable,
} from 'rxjs';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCredentials$: Subject<UserCredential | null>;
  private userIsLoggedIn: boolean;

  constructor(
    private auth: Auth,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.userCredentials$ = new BehaviorSubject<UserCredential | null>(null);
    this.userIsLoggedIn = false;
  }

  public firebaseLogin(): void {
    from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(
        tap((next) => {
          console.log('firebase login');
          this.jwtService.logIn(next.user.email!, next.user.email!);
        })
      )
      .subscribe({
        next: (next) => {
          this.userCredentials$.next(next);
          this.userIsLoggedIn = true;
          this.router.navigateByUrl('/app');
        },
      });
  }

  public userHasLoggedIn(): boolean {
    return this.userIsLoggedIn;
  }
}
