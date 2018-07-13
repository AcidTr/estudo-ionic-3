import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailsPage } from '../movie-details/movie-details';
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ],
})

export class FeedPage {
  public objFeed = {
    title: "Victor Mourão",
    date: "November 5, 1955",
    description: "Estou criando um instagram",
    likes: 12,
    comments: 4,
    time: "11h ago"
  }

  public listMovies = new Array<any>();

  public page = 1;
  public nomeUsuario: string = "Victor Mourão";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.loadMovies();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
  closeLoading() {
    this.loader.dismiss();
  }

  public somaDoisNumero(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  ionViewDidEnter() {
    // this.somaDoisNumero(10,5);
    this.loadMovies();
  }

  openDetails(movie){
    console.log(movie);
    this.navCtrl.push(MovieDetailsPage, { id:movie.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadMovies(true);
  }

  loadMovies(newPage:boolean = false) {
    this.presentLoading();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objReturn = JSON.parse(response._body);

        if(newPage){
          this.listMovies = this.listMovies.concat(objReturn.results);
          this.infiniteScroll.complete();
          console.log(this.page);
          console.log(this.listMovies);
        }else{
          this.listMovies = objReturn.results;
        }

        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.closeLoading();
      }
    )

    console.log('ionViewDidLoad FeedPage');


  }
}
