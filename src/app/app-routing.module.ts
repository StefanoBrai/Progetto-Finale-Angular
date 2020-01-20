import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';
import { CardViewComponent } from './components/card-view/card-view.component';



const routes: Routes = [
  { path: '', component: CardViewComponent },
  { path: 'app-table', component: TableComponent },
  { path: 'app-form', component: FormComponent},
  { path: 'app-card-view', component: CardViewComponent},
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
