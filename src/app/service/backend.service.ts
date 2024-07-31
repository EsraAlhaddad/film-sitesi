import { Injectable } from '@angular/core';
import { Movie } from 'app/models/movie';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  private getStorage<T>(key: string, defaultValue: T){
    try{
      const result = JSON.parse(localStorage.getItem(key) ?? "null");
      if(!result) return defaultValue;

      return result;
    } catch(e){
      return defaultValue;
    }
  }

  getFavorites(){
    return of(this.getStorage<Movie[]>("favorites", []));
  }

  getMovies(){
    return of(this.getStorage<Movie[]>("movies", []))
  }
}
