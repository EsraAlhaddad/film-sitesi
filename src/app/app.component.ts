import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-FİLM';
  navbg:any;
  @HostListener('document:scroll') scrollover(){
    
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
    {
      this.navbg = {
        'background-color':'wheat'
      }
    }else
    {
        this.navbg = {}
    }
  }

    constructor() { }
  
    addToFavorites(movieData: any) {
      const favoritesString = localStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      
      if (!favorites.some((item: any) => item.id === movieData.id)) {
        favorites.push(movieData);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Film favorilere eklendi:', movieData);
      } else {
        console.log('Film zaten favorilerde:', movieData);
      }
    }
}
