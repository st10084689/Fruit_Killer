import { Component ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  enteredusername: any;
  enteredpassword: any;
  
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  option:string = this.router.url
  
  ngOnInit(): void {

  }

  onlogin(loginform: NgForm)
  {
    // if (loginform.valid)
    // {
    //   console.log(loginform.value.enteredusername, loginform.value.enteredpassword)
    //   alert('Invalid');
    //   return;
    // }

    if (this.option == '/login'){
      this.authService.login(loginform.value.enteredusername, loginform.value.enteredpassword)
    }else{
      this.authService.signup(loginform.value.enteredusername, loginform.value.enteredpassword)
    }
  }

}
