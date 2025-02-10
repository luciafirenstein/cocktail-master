import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from '../../interfaces/api-interface';
import { DrinkService } from '../../services/drink.service';
import { HeaderComponent } from '../../components/header/header.component';
import { DrinkListComponent } from '../../components/drink-list/drink-list.component';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-drink-list-by-name',
  standalone: true,
  imports: [HeaderComponent, DrinkListComponent],
  templateUrl: './drink-list-by-name.component.html',
  styleUrl: './drink-list-by-name.component.scss'
})
export class DrinkListByNameComponent implements OnInit{

  private _activatedRoute = inject(ActivatedRoute);
  private _drinkService = inject(DrinkService);
  drinkData : Drink[] = [];
  drinkName : string = '';



  ngOnInit(): void {
    this.drinkName = this._activatedRoute.snapshot.paramMap.get('drinkName') ?? '';
    if(this.drinkName){
      this._drinkService.searchByIngredient(this.drinkName.toLocaleLowerCase()).subscribe(
        resp => {this.drinkData = resp}
      );
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
