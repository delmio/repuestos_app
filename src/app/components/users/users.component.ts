import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private messageService: MessageService
  ) { }

  columns: any[];
  insertUserDialog:boolean = false;
  submitted:boolean = false;
  users:Users[];
  newUserAux = new Users;

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
    this._userService.get('GET_USERS').toPromise()
    .then((r)=>{
        if(r.ok){
            this.users = r.result;
        }else{
            console.log(r.error);
            this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al cargar los usuarios' });
        };
    }).catch((err)=>{
        console.log(err);
        this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al cargar los usuarios' });
    });
  }

  openDialogNewUser(){
    this.newUserAux = new Users();
    this.insertUserDialog = true;
  }

  closeDialogNewUser(){
    this.newUserAux = new Users();
    this.insertUserDialog = false;
    this.submitted = false;
  }

  saveNewUser(){
    this.upperCaseNewUser();
    this.submitted = true;

    if(this.validatenNewUserForm()){

      this._userService.post('POST_USERS',this.newUserAux).toPromise()
      .then((r:any)=>{
  
        if(r.ok){
  
          this.getUsers();
          this.closeDialogNewUser();
          this.messageService.add({ key: 'tst', severity: 'success', summary: '¡Aviso!', detail: 'Se guardo el usuario correctamente' });
  
        }else{

          console.log(r.error);
  
          if(r.error === "duplicated user" ){

            this.messageService.add({ key: 'tst', severity: 'warn', summary: '¡Advertencia!', detail: 'Usuario ya existe.' });

          }else{

            this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al guardar el nuevo usuario' });

          }

       }
        
      }).catch((err)=>{
  
        console.log(err);
        this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al guardar el nuevo usuario' });
  
      });

    }



  }

  validatenNewUserForm(){

    if(this.newUserAux.run == null || this.newUserAux.run == '' || this.newUserAux.run == undefined){

      return false;

    }else if(this.newUserAux.nombres == null || this.newUserAux.nombres == '' || this.newUserAux.nombres == undefined){

      return false;

    }else if(this.newUserAux.ape_pater == null || this.newUserAux.ape_pater == '' || this.newUserAux.ape_pater == undefined){

      return false;

    }else if(this.newUserAux.ape_mater == null || this.newUserAux.ape_mater == '' || this.newUserAux.ape_mater == undefined){

      return false;
    
    }else{

      return true;

    }

  }

  upperCaseNewUser(){
    
    this.newUserAux.nombres = (this.newUserAux.nombres != null ? this.newUserAux.nombres.trim().toUpperCase() : '');
    this.newUserAux.ape_pater = (this.newUserAux.ape_pater != null ? this.newUserAux.ape_pater.trim().toUpperCase() : '');
    this.newUserAux.ape_mater = (this.newUserAux.ape_mater != null ? this.newUserAux.ape_mater.trim().toUpperCase() : '');
    this.newUserAux.run = (this.newUserAux.run != null ? this.newUserAux.run.trim().toUpperCase() : '');

  }

  updateUserStatus(updatedUser: Users){
      updatedUser.activo = !updatedUser.activo;
      this._userService.put('PUT_USERS',updatedUser).toPromise()
        .then((r:any)=>{
              if(r?.ok){
                this.messageService.add({ key: 'tst', severity: 'success', summary: '¡Aviso!', detail: 'Se Actualizo el usuario correctamente.' });
              }else{
                console.log(r.error);
                this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al actualizar el usuario' });
              }
        }).catch((err)=>{
          console.log(err);
          this.messageService.add({ key: 'tst', severity: 'error', summary: '¡Error!', detail: 'Se genero un error al actualizar el nuevo usuario' });
      });
  }

}
