import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RequestListComponent } from "./requestore/components/request-list/request-list.component";
import { CategoryTabsComponent } from "./requestore/components/category-tabs/category-tabs.component";
import { NetworkActivityService } from "./requestore/services/network-activity.service";
import { RequestoreManagerComponent } from "./requestore/components/requestore-manager/requestore-manager.component";
import { RequestoreHistoryComponent } from "./requestore/components/requestore-history/requestore-history.component";
import { RequestPerformancesComponent } from "./requestore/components/request-performances/request-performances.component";
import { RequestFiltersComponent } from "./requestore/components/requestore-manager/filters/filters.component";
import { ChromeAdapter } from "./requestore/browser/interface/target/chrome/chrome.adapter";
import { environment } from './requestore/environment/environment';
import { BrowserEnum } from "./requestore/browser/interface/browser.enum";
import { RequestoreModelManager } from "./requestore/store/requestore-model.manager";
import { StorageService } from "./requestore/services/storage.service";
import ChromeMock from "./requestore/browser/interface/target/chrome/chrome.mock";
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
  providers: [
    StorageService,
    {
      provide: RequestoreModelManager, useValue: new RequestoreModelManager()
    },
    {
      provide: NetworkActivityService,
      useFactory: (model: RequestoreModelManager) => {
        if(environment.browser === BrowserEnum.CHROME) {
          console.log(ChromeMock)
          const chromeAdapter = new ChromeAdapter(
            environment.mock ? ChromeMock : chrome,
            model
          );
          return new NetworkActivityService(model, chromeAdapter);
        }
      },
      deps: [RequestoreModelManager]
    }
  ]
})
export class AppModule { }
