import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Drink } from '../../interfaces/api-interface';
import { DrinkService } from '../../services/drink.service';
import { DrinkListComponent } from '../../components/drink-list/drink-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alcohol',
  standalone: true,
  imports: [HeaderComponent, DrinkListComponent],
  templateUrl: './alcohol.component.html',
  styleUrl: './alcohol.component.scss'
})
export class AlcoholComponent {
  private _drinkService = inject(DrinkService);
  private _route = inject(Router);
  alcohol: Drink[] = this._drinkService.getAlcohol();


  onHandleDrinkSelected(drink : Drink){
    this._route.navigate([drink.strDrink]);
  }

}
