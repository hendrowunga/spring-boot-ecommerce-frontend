// Dalam luv2-shop-form.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Impor 'of' untuk credit card months/years jika statis
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';
@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  // Sesuaikan URL API Backend Anda
  private countriesUrl = 'http://localhost:9898/api/countries';
  private statesUrl = 'http://localhost:9898/api/states';

  constructor(private httpClient: HttpClient) {}

  // Method untuk mengambil Countries
  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map((response) => response._embedded.countries)
      // Jika API Anda langsung mengembalikan array Country[], hapus .pipe(map(...))
      // return this.httpClient.get<Country[]>(this.countriesUrl);
    );
  }

  // Method untuk mengambil States berdasarkan country code
  getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map((response) => response._embedded.states)
      // Jika API Anda langsung mengembalikan array State[], hapus .pipe(map(...))
      // return this.httpClient.get<State[]>(searchStatesUrl);
    );
  }

  // Method Credit Card Months (contoh dengan of jika statis)
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    // build an array for "Month" dropdown list
    // - start at current month and loop until 12
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data); // 'of' dari RxJS untuk membuat Observable dari array biasa
  }

  // Method Credit Card Years (contoh dengan of jika statis)
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    // build an array for "Year" dropdown list
    // - start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }
}

// Interface pembantu jika backend menggunakan Spring Data REST (HAL format)
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
