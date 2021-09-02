import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router'; 

declare var $;

@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css']
})
export class LeftsideComponent implements OnInit {
  verified:string = '100';
  active : string;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void { 
    this.active = this.activatedRoute.snapshot.data.active;
  
  }
  
  

}
