import {Component, OnInit} from '@angular/core';

import {Hero} from './hero';
import {Item} from './item';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  user;
  items;
  form: Item;

  constructor(private heroService: HeroService) {}

  getItems(): void {
    this.heroService.getItems().subscribe(data => {
      // Read the result field from the JSON response.
      this.items = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));

    this.heroService.getUser().subscribe(data => this.user = data);

    this.getItems();



    this.form = new Item();
    this.form.idUser = 1;
    this.form.start = new Date();
  }

  addItem(form): void {
    this.heroService.addItem(form).subscribe(data => {
      // Read the result field from the JSON response.
      this.items = data;
      console.log(data);

      this.getItems();
    });
  }

}
