import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuedatecalculatorComponent } from './duedatecalculator/duedatecalculator.component';

const routes: Routes = [
  {path:'',component:DuedatecalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
