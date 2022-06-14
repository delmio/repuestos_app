import { Profiles } from './profiles';

export class Users{
    public id: number;
    public run: string;
    public nombres: string;
    public ape_pater: string;
    public ape_mater: string;
    public activo: boolean;
    public reseteo_contrasenia: boolean;
    public perfiles: Profiles;

    constructor(){
        this.id = null;
        this.run = null;
        this.nombres = null;
        this.ape_pater = null;
        this.ape_mater = null;
        this.activo = true;
        this.reseteo_contrasenia = true;
        this.perfiles = new Profiles;
    }
}