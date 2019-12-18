import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { PeliculasService } from './../../services/peliculas.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  buscar: string;

  constructor(public ps: PeliculasService,
              public route: ActivatedRoute) {

              this.route.params.subscribe(params => {
                if (params['texto']) {
                  this.buscar = params['texto'];
                  this.buscarPelicula();

                }
              });
              }

  ngOnInit() {
  }

  buscarPelicula() {
    if (this.buscar.length === 0) {
      return;
    }

    this.ps.buscarPelicula(this.buscar).subscribe();
  }

}
