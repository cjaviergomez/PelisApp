import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { PeliculasService } from './../../services/peliculas.service';
@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: any;
  regresarA: string = '';
  busqueda: string = '';

  constructor(private route: ActivatedRoute, private ps: PeliculasService) {
    this.route.params.subscribe(params => {

      if (params['busqueda']) {
        this.busqueda = params['busqueda'];
      }
      this.regresarA = params['pag'];
      this.ps.getPelicula(params['id'])
          .subscribe(pelicula => this.pelicula = pelicula);
    });
  }

  ngOnInit() {
  }

}
