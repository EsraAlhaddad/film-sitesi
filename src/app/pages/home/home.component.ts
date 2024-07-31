import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { Title,Meta } from '@angular/platform-browser';
import { Movie } from 'app/models/movie';
import { BackendService } from 'app/service/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  favorites: Movie[] = [];

  constructor(private service: MovieApiServiceService,private title:Title,private meta:Meta, private backendService: BackendService) {
    this.title.setTitle('Home - E-FİLM');
    this.meta.updateTag({name:'description',content:'watch online movies'});
    
    this.backendService.getFavorites().subscribe(favs => {
      this.favorites = favs;
    })
   }

  trendingMovieResult: Movie[] = [];
  actionMovieResult: Movie[] = [];
  adventureMovieResult: Movie[] = [];
  animationMovieResult: Movie[] = [];
  comedyMovieResult: Movie[] = [];
  sciencefictionMovieResult: Movie[] = [];
  

  ngOnInit(): void { // ilk defa çalıştığında çalışıcak kodları barındırır
    this.trendingData(); 
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.sciencefictionMovie();
    
  }


  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
      
    });
  }

  
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }


  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }


  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }


  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

}
