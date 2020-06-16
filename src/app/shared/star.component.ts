import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
 ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
     this.starWidth = this.rating * 75/5;
 }
 @Input() rating: number = 4;
 starWidth:  number;
 @Output() notify: EventEmitter<string> = new EventEmitter<string>();
 onClick(): void {
     this.notify.emit("click " + this.rating);
 }
}