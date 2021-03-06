import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {
  constructor(
    private http: Http
  ) {}

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  getUser() {
    return this.http.get(`https://conduit.productionready.io/api/profiles/eric`).map((res: Response) => res.json());
  }

  getItems() {
    return this.http.get(`http://127.0.0.1:8080/tm/api/item/1/0/10000000000000`).map((res: Response) => res.json());
  }

  addItem(form) {
    return this.http.post(`http://127.0.0.1:8080/tm/api/item`, form);
  }

}
