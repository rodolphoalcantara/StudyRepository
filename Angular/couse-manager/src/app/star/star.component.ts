import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
  //essa variavel vira um atributo da tag do nosso componente
  @Input()
  rating: number = 0;

  starWidth!: number;

  ngOnChanges() : void {
    this.starWidth = this.rating * 74 / 5;
  }

}
