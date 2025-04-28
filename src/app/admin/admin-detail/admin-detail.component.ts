import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdministradorCL } from 'src/app/model/administrador-cl';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent {
  admin!: AdministradorCL;
  
  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.adminService.getAdmin(id).subscribe(admin => {
      this.admin = admin;
    });
  }
}
