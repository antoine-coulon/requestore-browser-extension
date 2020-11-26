import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RequestListComponent } from "./requestore/components/request-list/request-list.component";
import { CategoryTabsComponent } from "./requestore/components/category-tabs/category-tabs.component";
import { RequestoreService } from "./requestore/services/requestore.service";
import { RequestoreManagerComponent } from "./requestore/components/requestore-manager/requestore-manager.component";
import { RequestoreHistoryComponent } from "./requestore/components/requestore-history/requestore-history.component";
import { RequestPerformancesComponent } from "./requestore/components/request-performances/request-performances.component";
import { RequestFiltersComponent } from "./requestore/components/requestore-manager/filters/filters.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [BrowserModule],
  declarations: [
    AppComponent, 
    RequestListComponent, 
    RequestPerformancesComponent,
    CategoryTabsComponent, 
    RequestoreManagerComponent,
    RequestoreHistoryComponent,
    RequestFiltersComponent
  ],
  providers: [ RequestoreService ]
  
})
export class AppModule { }
