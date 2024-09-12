import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit{

  user!: User;

  constructor(private backendService: BackendService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

    ngOnInit(): void {
      const id = this.activatedRoute.snapshot.params['id'];
      this.backendService.delete(id).subscribe(
        data => {
          this.user = data;
        },
        err => console.log(err)
      );
    }
    
  volver(): void {
    this.router.navigate(['/lista']);
  }
}
