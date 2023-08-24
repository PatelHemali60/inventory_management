import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: any;
  @Input() backgroundColor!: string;

  @Input() Card_Heading!: string; // decorate the property with @Input()
  @Input() Card_rate!: number;
}
