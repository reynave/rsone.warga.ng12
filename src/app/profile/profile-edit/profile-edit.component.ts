import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript";

export class Password {
  constructor( 
    public curPass : string,
    public pass: string,
    public newPass: string, 
  ) { }

}

export class Upload {
  constructor(
    public uploadId : string,
  ){}
}

export class Model {
  constructor(
    public idNumber: string,
    public tax: string,
    
    public bank: string,
    public bank_name: string,
    public bank_number: string, 
   
  ) { }

}
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  loading: boolean = true;
  model: any = new Model("", "", "", "", "");
  password: any = new Password("", "","");
 
  upload : any = new Upload("");
  items : any = []; 
  readonly : boolean = true;
  notes : string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }
 
  getHttp() { 
    this.http.get<any>(environment.api + "profile/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data); 
        this.items = data['items'];
        this.notes = data['notes'];
        this.readonly = data['items']['verified'] == '0' ? false : true ;
        this.model = new Model( data['items']['ktp'],  data['items']['npwp'],  data['items']['bank'],  data['items']['bank_number'],data['items']['bank_account']);
        this.upload['uploadId'] = data['upload']['uploadId'];
      },
      error => {
        console.log(error);
      },

    );
  }

  onSubmitVerify(){
    const body = {
      model: this.model,  
    }
    console.log(body); 
    this.http.post<any>(environment.api + "profile/onSubmitVerify/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;  
        this.getHttp();
      },
      error => {
        console.log(error);
      },

    );
  }


  onChangePassword(){
    const body = {
      curPass: Md5.init(this.password['curPass']), 
      pass1: Md5.init(this.password['pass']), 
      pass2: Md5.init(this.password['newPass']),  
    } 
    console.log(body);
    if( Md5.init(this.password['curPass']) == this.items.password){
      if( Md5.init(this.password['pass']) !==  Md5.init(this.password['newPass']) ){
         alert("New password doest match !");
      }else{
        this.http.post<any>(environment.api + "profile/onChangePassword/", body, {
          headers: this.configService.headers()
        }).subscribe(
          data => { 
            this.getHttp();
          },
          error => {
            console.log(error);
          }, 
        );
      }
    }else{
      alert("Current password doest match !");
    }
  }

 
  fileId : any;  
  onFileSelected(event) {
    this.fileId = event.target.files[0];  
  }
 
  onUploadId() {
    const fd = new FormData();
    if (!  this.fileId ) {
      alert("File tidak ditemukan!");
      return false;
    }
    fd.append('uploadFile', this.fileId, this.fileId.name); 
    fd.append('token',  this.configService.token() ); 
    fd.append('name', 'fileId');
    this.fileId = null;
    this.loading = true;
    this.http.post<any>(environment.api + 'upload/uploadId', fd).subscribe(
      data => {
        console.log(data);  
        this.loading = false; 
        this.upload['uploadId'] = data['upload_data']
      },
      error => {
        console.log(error);
      }
    );
  }
 
}
