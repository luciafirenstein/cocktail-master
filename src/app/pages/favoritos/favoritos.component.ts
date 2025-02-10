import { Component, inject, Inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Drink } from '../../interfaces/api-interface';
import { DrinkListComponent } from '../../components/drink-list/drink-list.component';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { DrinkService } from '../../services/drink.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [HeaderComponent, DrinkListComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent{

  favorites: Drink[] = [];
  private _drinkService = inject(DrinkService)

  constructor(@Inject(DOCUMENT) private document: Document){
    const localStorage = document.defaultView?.localStorage;
    if(localStorage){
      const savedFavorites = localStorage.getItem('favorites');
      if(savedFavorites){
        this.favorites = JSON.parse(savedFavorites);
      }else{
        this.favorites = [];
      }
    }
  }

  async onHandleDrinkSelected( drink : any){
    const drinkData = await firstValueFrom(this._drinkService.getDrinkInfo(drink.idDrink));
    Swal.fire({
      html: `
        <h1>${drink.strDrink}</h1>
        <img src="${drink.strDrinkThumb}" width="200" height="200 alt="Bebida">
        <p>${drinkData.strInstructionsES}</p>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Entendido',
      customClass: {
        confirmButton: 'custom-swal-confirm-button' // Nombre de la clase CSS
      }
    });
  }


  onHandleDeleteFromFavorites(){
    const savedFavorites = localStorage.getItem('favorites');
    if(savedFavorites){
      this.favorites = JSON.parse(savedFavorites);

    }
  }
}
