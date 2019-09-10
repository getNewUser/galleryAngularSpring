import { IPhoto } from 'src/app/models/photo.model';
import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITag, IFullPicture, ICategory } from '../models';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  // const httpOptions = {
  //   headers: HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }

  constructor(private http: HttpClient) { }

  updateImage(image: IPhoto) {
    this.http.put('http://localhost:8080/images/update', image)
    .subscribe(
      data => {
        console.log('PUT Request was successful: ' + data);
      },
      error => {
        console.log('error bois: ', error);
      }
    )
  }

  deleteImage(imageId: number): Observable<IPhoto>{
    console.log('http://localhost:8080/images/delete/' + imageId);
    return this.http.delete<IPhoto>('http://localhost:8080/images/delete/' + imageId);
  }

  getPhoto(index: number): Observable<IPhoto>{
    return this.http.get<IPhoto>('http://localhost:8080/images/' + index);
  }

  getFullPhoto(index: number): Observable<IFullPicture>{
    return this.http.get<IFullPicture>('http://localhost:8080/images/fullpicture?imageId=' + index);
  } 

  getThumbnails(): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images');

  }

  getPhotosByCategory(categoryName: string): Observable<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images/categories/' + categoryName);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/categories');
  }

  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>('http://localhost:8080/tags');
  }




  search(categories: number[], tags: number[], search: string): Observable<IPhoto[]> {
    let query = 'http://localhost:8080/images/search?categories='
  
    for(let string of categories){
      query = query + string + ',';
    }

    query = query + '&tags=';

    for(let string of tags){
      query = query + string + ',';
    }

    
    query = query.substring(0, query.length-1);
    query = query + '&search=' + search;

    
    console.log(query);

    return this.http.get<IPhoto[]>(query );
  }
}
