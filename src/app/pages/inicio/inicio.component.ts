import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { DrinkListComponent } from '../../components/drink-list/drink-list.component';
import { Drink } from '../../interfaces/api-interface';
import { DrinkService } from '../../services/drink.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderComponent, DrinkListComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{

  featuredDrinksData: Drink[] = [];
  private _drinkService = inject(DrinkService);

   featuredDrinks: string[] = [
    'Blue Margarita',
    'gin tonic',
    'Mojito',
  ];

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this._drinkService
        .getDrinkByName(this.featuredDrinks[i])
        .subscribe((resp) => {
          this.featuredDrinksData.push(resp);
        });
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




}
