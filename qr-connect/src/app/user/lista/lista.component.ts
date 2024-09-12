import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BackendService } from '../../services/backend.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit{
 users: User[] = [];
 isAdmin!: boolean;
  
 constructor(private backendService: BackendService, private loginService : LoginService){}

 ngOnInit(): void {
     this.loadUsers();
     this.isAdmin = this.loginService.getIsAdmin();
 }

 loadUsers(): void{
  this.backendService.list().subscribe(
    data => {
      this.users = data;
    },
    err => console.log(err)
  );
 }

//  onDelete(id: number): void {
//   this.backendService.delete(id).subscribe(
//     data => {
//       console.log(data);
//       this.loadUsers();
//     },
//     err => console.log(err)
//   );
// }
}
