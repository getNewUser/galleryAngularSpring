import { AddComponent } from './add.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";




export const routes:Routes= [
    { path:'', component: AddComponent}
];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AddRoutingModule{}