import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {


  private baseApi = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1){
    return this.http.get(this.baseApi+`/movie/popular?page=${page}&api_key=` + this.getApiKey());
  }
  getMovieDetail(movieId){
    return this.http.get(this.baseApi + `/movie/${movieId}?api_key=` + this.getApiKey());
  }
  getApiKey():string{
    return "801c834f39cec0b96df67af7363b0032";
  }
}
