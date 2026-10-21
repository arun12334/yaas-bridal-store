import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export const apiBaseUrl = 'http://localhost/Razorpay-backend/api';

export function getApiBaseUrl(): string {
  return apiBaseUrl;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 

}
