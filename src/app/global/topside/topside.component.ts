import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConnectionService } from 'ngx-connection-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service'; 

declare var $;
declare var feather;

@Component({
  selector: 'app-topside',
  templateUrl: './topside.component.html',
  styleUrls: ['./topside.component.css']
})
export class TopsideComponent implements OnInit {
  hasNetworkConnection: boolean;
  hasInternetAccess: boolean;
  status: boolean = true;

  obj : any = [];

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router, 
    private connectionService: ConnectionService
  ) {

    this.connectionService.monitor().subscribe(currentState => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
      if (this.hasNetworkConnection && this.hasInternetAccess) {
        this.status =  true;
      } else {
        this.status = false;
      }
    });

   }

  ngOnInit(): void {
    this.obj = this.configService.getObj(); 
    
    $(document).ready(function () {
      
      feather.replace();
 
      //Horizontal menu in mobile
      $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
          $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
      });
      // Horizontal menu navigation in mobile menu on click
      var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
      navItemClicked.on("click", function(event) {
          if (window.matchMedia('(max-width: 991px)').matches) {
              if (!($(this).hasClass('show-submenu'))) {
                  navItemClicked.removeClass('show-submenu');
              }
              $(this).toggleClass('show-submenu');
          }
      })
      $(window).scroll(function() {
          if (window.matchMedia('(min-width: 992px)').matches) {
              var header = $('.horizontal-menu');
              if ($(window).scrollTop() >= 60) {
                  $(header).addClass('fixed-on-scroll');
              } else {
                  $(header).removeClass('fixed-on-scroll');
              }
          }
      });

    });
  }

  logout(){
    this.http.get<any>(environment.api + "profile/logout", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
          this.configService.removeToken();
          this.router.navigate(['relogin']);
      },
      error => {
        console.log(error); 
      },

    );
  }
}
