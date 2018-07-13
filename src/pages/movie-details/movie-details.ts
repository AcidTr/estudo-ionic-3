import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
  providers: [
    MovieProvider
  ]
})
export class MovieDetailsPage {

  public movie;
  public movieId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProvider:MovieProvider) {
  }

  ionViewDidEnter() {
    this.movieId = this.navParams.get("id");
    this.movieProvider.getMovieDetail(this.movieId).subscribe(data=>{
      let objReturn = (data as any)._body;
      this.movie = JSON.parse(objReturn);
    }, error=>{
      console.log(error);
    })
  }

}
