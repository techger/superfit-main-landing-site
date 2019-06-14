import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userPublicProfile?: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly apiService: ApiService) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get("username");

    this.apiService.fetchUserPublicInfo(username).subscribe((userPublicProfile?: JSON) => {
      if (!userPublicProfile) {
        this.router.navigate(["/404"]);
        return
      }
      this.userPublicProfile = userPublicProfile

    }, (error: any) => {
      console.log(error);
      this.router.navigate(["/404"]);
    }, () => {
      // on complete
    })
  }

}
