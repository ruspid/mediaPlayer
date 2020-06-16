import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl : './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

    constructor(private productService: ProductService ){
    }

    performFilter(filterby: string): IProduct[] {
        filterby = filterby.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterby) !== -1); 
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products  => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
    }


    pageTitle: string = 'title';
    errorMessage: string;
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts=this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct[];

    products: IProduct[] =  [];
      toggleImage(): void{
          this.showImage = !this.showImage;
      }
      onEvent(rating: string): void{
          this.pageTitle = rating;
      }
}