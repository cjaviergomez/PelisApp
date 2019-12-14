import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartelera: any;

  constructor(private ps: PeliculasService) { }

  ngOnInit() {
    this.ps.getCartelera().subscribe( data => {
      this.cartelera = data;
    });
  }

}
