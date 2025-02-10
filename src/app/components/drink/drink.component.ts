import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Drink } from '../../interfaces/api-interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.scss',
})
export class DrinkComponent {
  @Input({ required: true }) drink: Drink = {
    idDrink: '',
    strDrink: '',
    strDrinkThumb: '',
  };
  @Input() showFavorites = false;
  @Output() selectDrinkEmitter = new EventEmitter<Drink>();
  @Output() deleteFromFavoritesEmitter = new EventEmitter();
  @Input() showDeleteFromFavorites = false;
  favorites: Drink[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedFavorites = window.localStorage.getItem('favorites');
      this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    }
  }

  selectDrink(drink: Drink) {
    this.selectDrinkEmitter.emit(drink);
  }

  toggleFavorite(drink: Drink) {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedFavorites = localStorage.getItem('favorites');
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
//verifica si el drink esta en fav
    const index = this.favorites.findIndex(
      (fav) => fav.idDrink === drink.idDrink
    );

    if (index === -1) {
      //agrega a fav
      this.favorites.push(drink);
    } else {
      //elimina de fav
      this.favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(drink: any): boolean {
    return this.favorites.some((fav) => fav.idDrink === drink.idDrink);
  }

  deleteFromFavorites(drink: Drink) {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedFavorites = localStorage.getItem('favorites');
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    this.favorites = this.favorites.filter(
      (fav) => fav.idDrink !== drink.idDrink
    );

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.deleteFromFavoritesEmitter.emit();
  }
}
