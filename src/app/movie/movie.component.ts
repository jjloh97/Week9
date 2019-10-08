import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { element } from 'protractor';

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"],
})
export class MovieComponent implements OnInit {
  movieDB: any[] = [];

  section = 1;
  
  title: string = "";
  year: number = 0;
  movieId: string = "";

  aYear: number = 0;

  actorsDB: any[] = [];
  movieActor:any[]=[];
  actorsName:string="";
  actorsId:string="";
  
  constructor(private dbService: DatabaseService) {}

  //Get all Movies
  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
    })
  }

  //Create a new Movie, POST request
  OnSaveMovie(){
    let obj = {title:this.title, year:this.year};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    })
  }

  // Delete movies before aYear
  onDeletebeforeYear(){
  this.movieDB.forEach(movie => {
    if(movie.year < this.aYear) this.dbService.deleteMovie(movie._id).subscribe(result => {
      this.onGetMovies();
    });
  });
  }

  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }


//Get Actors
onGetActors() {
  this.dbService.getActors().subscribe((data: any[]) => {
    this.actorsDB = data;
  });
}



//Saving actor name and id
onSelectActor(item) {	 
  this.actorsName = item.name;
  this.actorsId = item._id;
}
//Saving movie title, year and id
onSelectUpdate(item) {
  this.title = item.title;
  this.year = item.year;
  this.movieId = item._id;
  this.movieActor = item.actors;
}

onUpdateMovie() {
  if (this.actorsId !=""){
    this.movieActor.push(this.actorsId);
  }
  let obj = { title: this.title, year: this.year ,actors:this.movieActor};
  this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
    this.onGetMovies();
  });
}

// This lifecycle callback function will be invoked with the component get initialized by Angular.
ngOnInit() {
  this.onGetMovies();  
  this.onGetActors();

}

changeSection(sectionId) {
  this.section = sectionId;
  this.resetValues();
}

resetValues() {
  this.title = "";
  this.year = 0;
  this.movieId = "";
  this.actorsName = "";
  this.actorsId = "";
}


}