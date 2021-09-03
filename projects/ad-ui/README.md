
# AD-UI [![npm version](https://badge.fury.io/js/ng-ad-ui.svg)](http://badge.fury.io/js/ng-ad-ui) [![npm downloads](https://img.shields.io/npm/dm/ng-ad-ui.svg)](https://npmjs.org/ng-ad-ui)

Easy to use Angular2 directives for files upload ([demo](http://valor-software.github.io/ng-ad-ui/))

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)


## Quick start

1. A recommended way to install ***ad-ui*** is through [npm](https://www.npmjs.com/search?q=ng-ad-ui) package manager using the following command:

  `npm i ng-ad-ui --save`


## Using ***ad-ui*** in a project

1. Install as shown in the above section.

2. Import `AdUiModule` into the module that declares the component using ***ad-ui***:

    ```import { AdUiModule } from 'ad-ui';```

   you can also import the component you need from the specify module ***like this***:

    ``` import { AdTreeModule } from 'ad-ui'; ```


3. Add it to `[imports]` under `@NgModule`:

    ```imports: [ ... AdUiModule, ... ]```

## adTree
[链接地址](/tree/master/projects/ad-ui/src/lib/ad-scroll-box)


## adScrollBox
[链接地址](/tree/master/projects/ad-ui/src/lib/ad-tree)