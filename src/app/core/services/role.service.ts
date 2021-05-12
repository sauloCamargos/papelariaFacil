import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Serializer } from '../models/serializer.model';
import { of } from 'rxjs';
import { UserRole } from '@app/core/enums/user.enum';
@Injectable({
  providedIn: 'root'
})
export class RoleService extends ResourceService<Role> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      environment.apis.papelaria_facil_api,
      'v1',
      'roles',
      new Serializer<Role>(new Role)
    )
  }

  list(queryOptions?: any) {
    return of([
      {
        id: UserRole.ADMIN,
        display_name: "Administrador"
      },
      {
        id: UserRole.USER,
        display_name: "Usuário"
      },
      {
        id: UserRole.PARTNER,
        display_name: "Fornecedor/Parceiro"
      },
    ])
    // map((data: any, index: number) => data.data = this.convertData(data.data))
  }



}
