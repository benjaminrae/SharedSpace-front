import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

(async () => platformBrowserDynamic().bootstrapModule(AppModule))();
