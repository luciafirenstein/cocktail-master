import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { enviroment } from '../enviroment';
import { Drink } from '../interfaces/api-interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private _http = inject(HttpClient);

  private _alcohol: Drink[] = [
    {
      idDrink: '1',
      strDrink: 'Vodka',
      strDrinkThumb: 'assets/vodka.png',
    },
    {
      idDrink: '2',
      strDrink: 'Rum',
      strDrinkThumb: 'assets/rum.png',
    },
    {
      idDrink: '3',
      strDrink: 'Gin',
      strDrinkThumb: 'assets/gin.png',
    },
  ];

  getDrinks() {
    return this._http.get(`${enviroment.apiUrl}/filter.php?a=Alcoholic`);
  }

  getDrinkByName(drinkName: string): Observable<Drink> {
    return this._http
      .get<DrinkResponse>(`${enviroment.apiUrl}/search.php?s=${drinkName}`)
      .pipe(map((dr) => dr.drinks[0]));
  }

  getAlcohol(): Drink[] {
    return this._alcohol;
  }

  searchByIngredient( drinkName: string): Observable<Drink[]>{
    return this._http.get<any>(`${enviroment.apiUrl}/filter.php?i=${drinkName}`).pipe(
      map((resp) => resp.drinks)
    );
  }

  getDrinkInfo(id: string){
    return this._http.get<any>(`${enviroment.apiUrl}/lookup.php?i=${id}`).pipe(
      map( (resp) => resp.drinks[0])
    )
  }
}


interface DrinkResponse{
  drinks: Drink[]
}
