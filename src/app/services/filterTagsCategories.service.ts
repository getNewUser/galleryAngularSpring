import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterCategoriesService {
  filter(tag: number, selectedTagsOrCategories: number[]): number[] {
    if (selectedTagsOrCategories.includes(tag)) {
      for (let i = 0; i < selectedTagsOrCategories.length; i++) {
        if (selectedTagsOrCategories[i] === tag) {
          selectedTagsOrCategories.splice(i, 1);
          return selectedTagsOrCategories;
        }
      }
    }
    selectedTagsOrCategories.push(tag);
    console.log(selectedTagsOrCategories);
    return selectedTagsOrCategories;
  }
}
