import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/i/category';
import { NFrameService } from 'src/app/s/animation/n-frame.service';
import { CategoryService } from 'src/app/s/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  constructor(
    private _nframe: NFrameService,
    private _category: CategoryService
  ) {}

  @Input() category: Category;
  @Input() activeClass: string;

  categories: Category[];

  ngOnInit(): void {
    this._nframe.hover();
  }
}
