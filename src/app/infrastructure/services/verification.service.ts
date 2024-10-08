import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  private verificationSubject = new Subject<{ verified: boolean, code: number }>();
  verification$ = this.verificationSubject.asObservable();

  emitVerification(verified: boolean, code: number) {
    this.verificationSubject.next({ verified, code });
  }
}
