import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResult } from 'app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http: HttpClient) { }

  private baseurl = "https://api.themoviedb.org/3";
  private apikey = "08cc33bd5ae3a747598ce2ad84376e66";

  private cache: Record<string, any> = {};
  private cacheTTL: number =10 * 1000;

  private getFromCacheOrFetch(url: string): Observable<ApiResult> {
    const cachedData = this.cache[url];
    if (cachedData && Date.now() - cachedData.timestamp < this.cacheTTL) {
      return of(cachedData.data);
    } else {
      return this.http.get<ApiResult>(url).pipe(
        tap(data => {
          this.cache[url] = {
            data,
            timestamp: Date.now()
          };
        })
      );
    }
  }

  trendingMovieApiData() {
    const url = `${this.baseurl}/trending/movie/day?api_key=${this.apikey}`;
    return this.getFromCacheOrFetch(url);
  }

  getSearchMovie(data: any): Observable<any> {
    const url = `${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`;
    return this.getFromCacheOrFetch(url);
  }

  getMovieDetails(data: any): Observable<any> {
    const url = `${this.baseurl}/movie/${data}?api_key=${this.apikey}`;
    return this.getFromCacheOrFetch(url);
  }

  getMovieVideo(data: any): Observable<any> {
    const url = `${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`;
    return this.getFromCacheOrFetch(url);
  }

  getMovieCast(data: any): Observable<any> {
    const url = `${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`;
    return this.getFromCacheOrFetch(url);
  }

  fetchActionMovies(): Observable<any> {
    const url = `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`;
    return this.getFromCacheOrFetch(url);
  }

  fetchAdventureMovies(): Observable<any> {
    const url = `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`;
    return this.getFromCacheOrFetch(url);
  }

  fetchAnimationMovies(): Observable<any> {
    const url = `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=16`;
    return this.getFromCacheOrFetch(url);
  }

  fetchComedyMovies(): Observable<any> {
    const url = `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`;
    return this.getFromCacheOrFetch(url);
  }

  fetchScienceFictionMovies(): Observable<any> {
    const url = `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=878`;
    return this.getFromCacheOrFetch(url);
  }
}
