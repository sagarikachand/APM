import { Component, OnInit ,Input ,OnChanges} from '@angular/core';



@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit,OnChanges {



  @Input() rating:number;
  starWidth:number;
  starColor: string="green";
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.starWidth= 86*(this.rating/5);
    if(this.rating<= 2.5){
      this.starColor='red'
    }
  }

}
