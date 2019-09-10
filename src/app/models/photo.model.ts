import { ITag, ICategory, IFullPicture } from '.';

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
