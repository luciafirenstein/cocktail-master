import { Component, EventEmitter, Input, Output, ɵgetOutputDestroyRef } from '@angular/core';
import { Drink } from '../../interfaces/api-interface';
import { DrinkComponent } from '../drink/drink.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drink-list',
  standalone: true,
  imports: [DrinkComponent],
  templateUrl: './drink-list.component.html',
  styleUrl: './drink-list.component.scss'
})
export class DrinkListComponent {
  @Input() drinkList : Drink[] = [];
  @Input() showFavorites = false;
  @Input() showDeleteFromFavorites = false;
  @Output() drinkSelectedEmitter = new EventEmitter<Drink>();
  @Output() deleteFromFavoritesEmitter = new EventEmitter()

  onHandleSelectDrink( drink : Drink ){
    this.drinkSelectedEmitter.emit(drink);
  }

  onHandleDeleteFromFavorites(){
    this.deleteFromFavoritesEmitter.emit();
  }

}
