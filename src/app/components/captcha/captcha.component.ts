import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  constructor() { }
  @Output() verificacion: EventEmitter<any> = new EventEmitter<any>();

  palabrasRandom = ['g1r3ku','f4lc0n3','83rnh31m','g05onc1o','m422ucc0','3Ln4w3']
  captcha:any;
  ngOnInit(): void {
    let index = this.getRandomInt(0,6);
    (<HTMLInputElement>document.getElementById('captcha')).value = this.palabrasRandom[index];
    this.captcha = this.palabrasRandom[index];
  }

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  verificar()
  {
    let texto = (<HTMLInputElement>document.getElementById('txtCaptcha')).value ;

    if(this.captcha == texto)
    {
      this.verificacion.emit(true);
    }
    else
    {
      this.verificacion.emit(false);
    }

  }

}
