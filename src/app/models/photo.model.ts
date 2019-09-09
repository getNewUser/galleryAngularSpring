import { ICategory } from './ICategory.model';
import { ITag } from './ITag.model';
import { IFullPicture } from './IFullPicture.model';

export interface IPhoto {
    id: number;
    name: string;
    description: string;
    height: 800;
    width: 1200;
    date: string;
    tags: ITag[];
    categories: ICategory[];
    thumbnail: string;
    fullPhoto: IFullPicture;
}
