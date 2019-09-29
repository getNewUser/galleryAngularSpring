import { UpdateComponent } from './update.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";




export const routes:Routes= [
    { path:'', component: UpdateComponent}
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class UpdateRoutingModule{}