import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ageValidator } from './myvalidators';
import { IUser } from './user.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Reactive Forms ';
  passWordLength = 4; // bring this data from API ; 

  // email = new FormControl("debugmode@outlook.com",[])
  loginForm : FormGroup; 
  minAge = 18; 
  maxAge = 45; 
  emailapi = {
    value :"debugmode@outlook.com",
    required : true
  }

  user : IUser = {
    email:"a@a.com",
    password:"hdhdhdh",
    age : "12",
    phone : "8838383",
    notification :'email'
  }
  constructor(private fb : FormBuilder){

    this.loginForm = new FormGroup({
      email : new FormControl(this.emailapi,[Validators.required]),
      password : new FormControl("",[Validators.required,Validators.minLength(this.passWordLength)]),
      age : new FormControl("",[ageValidator(this.minAge,this.maxAge)]),
      phone: new FormControl(""),
      notification : new FormControl("email")
    })

    this.loginForm.setValue(this.user);



    // if(this.emailapi.required){
    //   this.loginForm.get('email')?.setValidators([Validators.required]);
    //   this.loginForm.get('email')?.updateValueAndValidity();
    // }
    // this.loginForm = this.fb.group({
    // email: [null, [Validators.required, Validators.minLength(4)]],
    // password: [null, [Validators.required, Validators.maxLength(8)]]
    // })
    // {
    
    
  }

  ngOnInit(): void {
    this.notificatioChanged();
  }

  login():void{
    console.log(this.loginForm.value);
    console.log(this.loginForm.status);
   
  }

  setValues(){
    this.loginForm.setValue({
      email:"aa.com",
      password:"abchdhdhdhdhdhdhdh"
    }); 

    // this.loginForm.patchValue({
    //   password:'India'
    // }); 
  }

  notificatioChanged(){
    const phoneControl = this.loginForm.get('phone');
    this.loginForm.get('email')?.valueChanges.subscribe(data=>{
      console.log(data);
    })
    this.loginForm.get('notification')?.valueChanges.subscribe(
      (mode:any)=>{
        console.log(mode);
        if(mode == 'phone'){
          phoneControl?.setValidators([Validators.required]);
        }
        else if(mode == 'email') {

          phoneControl?.clearValidators();

        }
        phoneControl?.updateValueAndValidity();
      });

  }

}




// Angular have two types of Forms

// 1. Template Drivern Forms 
// 2. Reactive Forms 

// 1. input controls input , radio button 
// 2. valdiations  and data binding 
// 3. data binding 

 // service call 
    //  Login api 
    // if you are using routing , route guards 
