export interface RolesModel{
  id : string;
  nombre : string;
  agrega_usuario : boolean;
  ve_reportes : boolean;
  puede_timbrar : boolean;
  owner : string;
}
