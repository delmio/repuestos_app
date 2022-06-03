import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../demo/service/productservice'; // SE DEBE CAMBIAR POR EL SERVICIO QUE LE PEGUE A LA API
import {Product} from '../../demo/domain/product'; // SE DEBE CAMBIAR POR EL ESQUEMA DE USUARIO
import {ConfirmationService, MessageService, Message} from 'primeng/api';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService, ConfirmationService, UsersService]
})
export class UsersComponent implements OnInit {

  constructor(
    private _userService: UsersService,
    private productService: ProductService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  columns: any[];

  users:any[];


  async ngOnInit() {

    await this.getUsers();

    this.columns = [
        {field: 'run', header: 'Run'},
        {field: 'nombre', header: 'Nombre'},
        {field: 'estado', header: 'Estado'},
        {field: 'acciones', header: 'Acciones'}
    ];

  }

  async getUsers(){
    this._userService.get('GET_ALL_USERS').toPromise()
    .then((r)=>{

        if(r.ok){

            this.users = r.result;

        }else{

            console.log(r.error);
            this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al cargar los usuarios' });
        }


    }).catch((err)=>{

        console.log(err);
        this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al cargar los usuarios' });

    });
  }


}
