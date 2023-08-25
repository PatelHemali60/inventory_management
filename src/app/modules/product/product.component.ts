import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product = {
    Product_name: 'iPhone 14 Plus',
    price: '$1300',
    description:
      '17.00 cm or 15.54 cm Super Retina XDR display footnote¹ ProMotion technology Always-On display',
  };
  product2 = {
    Product_name: 'iPhone 13 Pro-max',
    price: '$1200',
    description:
      '17.00 cm or 15.54 cm Super Retina XDR display footnote¹ ProMotion technology Always-On display',
  };
  product3 = {
    Product_name: 'Vivo-V3',
    price: '$400',
    description:
      '17.00 cm or 15.54 cm Super Retina XDR display footnote¹ ProMotion technology Always-On display',
  };
  product4 = {
    Product_name: 'samsung-galaxy-z-fold',
    price: '$1800',
    description:
      '17.00 cm or 15.54 cm Super Retina XDR display footnote¹ ProMotion technology Always-On display',
  };
  product5 = {
    Product_name: 'samsung-galaxyS-21',
    price: '$1900',
    description:
      '17.00 cm or 15.54 cm Super Retina XDR display footnote¹ ProMotion technology Always-On display',
  };

  product6 = {
    Product_name: 'Vivo-x-fold',
    price: '$1900',
    description:
      '17.00 cm or 15.54 cm Super Retina XDR display footnote¹ ProMotion technology Always-On display',
  };
  constructor() {}

  ngOnInit(): void {}
}
