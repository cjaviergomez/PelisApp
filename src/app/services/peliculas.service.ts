import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apikey = 'd1eca39d2ccc8b7d54e5a8a93d74dfd6';
  private urlMoviedb = 'https://api.themoviedb.org/3';
  peliculas: any[] = [];

  constructor( private http: HttpClient ) { }

  getCartelera() {
    const desde = new Date();
    const hasta = new Date();
    hasta.setDate(hasta.getDate() + 7);

    const desdeStr = `${ desde.getFullYear()}-${ desde.getMonth() + 1}-${desde.getDate()}`;
    const hastaStr = `${ hasta.getFullYear()}-${ hasta.getMonth() + 1}-${hasta.getDate()}`;

    const url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${ this.apikey }&language=es&angular.callbacks._0`;
    return this.http.jsonp( url, 'callback' )
          .pipe(map((data: any) => {
            return data.results;
          }));
  }

  getPopulares() {
    const url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&angular.callbacks._0`;
    return this.http.jsonp( url, 'callback' )
            .pipe(map((data: any) => {
              return data.results;
            }));
  }

  getPopularesNinos() {
    const url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&angular.callbacks._0`;
    return this.http.jsonp( url, 'callback' )
          .pipe(map((data: any) => {
            return data.results;
          }));
  }

  buscarPelicula( texto: string ) {
    const url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&angular.callbacks._0`;
    return this.http.jsonp( url, 'callback' )
          .pipe(map((data: any) => {
            this.peliculas = data.results;
            return data.results;
          }));
  }

  getPelicula(id: string) {
    const url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apikey }&language=es&angular.callbacks._0`;
    return this.http.jsonp( url, 'callback' )
            .pipe(map((data: any) => {
              return data;
            }));
  }
}
