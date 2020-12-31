(window.webpackJsonpsingle_spa_worktime=window.webpackJsonpsingle_spa_worktime||[]).push([[5],{712:function(n,e,i){"use strict";var t=i(161),r=i.n(t),o=i(162),s=i.n(o)()(r.a);s.push([n.i,".card-container__wrapper{display:flex;align-items:center}.card-container__item{padding-right:24px}.card-container__item:last-of-type{margin-left:auto;padding-right:0}","",{version:3,sources:["webpack://./CardContainer.scss"],names:[],mappings:"AACA,yBACE,YAAA,CACA,kBAAA,CAEF,sBACE,kBAAA,CAEF,mCACE,gBAAA,CACA,eAAA",sourcesContent:['@import "../../../styles/mixins";\n.card-container__wrapper{\n  display: flex;\n  align-items: center;\n}\n.card-container__item{\n  padding-right: 24px;\n}\n.card-container__item:last-of-type{\n  margin-left: auto;\n  padding-right:0;\n}'],sourceRoot:""}]),e.a=s},716:function(n,e,i){"use strict";var t=i(13),r=i(160),o=i.n(r),s=i(712),a={insert:"head",singleton:!1},c=(o()(s.a,a),s.a.locals,i(27)),l=function(){return(l=Object.assign||function(n){for(var e,i=1,t=arguments.length;i<t;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)};e.a=function(n){var e=n.user,i=n.content,r=n.action;return Object(t.jsx)(c.Tile,{children:Object(t.jsxs)("div",l({className:"card-container__wrapper"},{children:[Object(t.jsx)("div",l({className:"card-container__item"},{children:e}),void 0),Object(t.jsx)("div",l({className:"card-container__item"},{children:i}),void 0),Object(t.jsx)("div",l({className:"card-container__item"},{children:r}),void 0)]}),void 0)},void 0)}},729:function(n,e,i){"use strict";var t=i(716);e.a=t.a},773:function(n,e,i){"use strict";var t=i(161),r=i.n(t),o=i(162),s=i.n(o)()(r.a);s.push([n.i,".history-req__user-name{font-style:normal;font-weight:500;letter-spacing:.01em;color:var(--base-1000);line-height:24px;font-size:15px;padding-bottom:4px}.history-req__info{font-style:normal;font-weight:400;letter-spacing:.01em;color:var(--base-1000);font-size:15px;line-height:20px;color:var(--base-500)}.preloader__wrapper{height:200px}.history-req__status{padding:4px 12px;border-radius:16px}.history-req__card{margin-bottom:16px;cursor:pointer}.history-req__card:last-of-type{margin-bottom:40px}.history-req__status-green{background:var(--success-200);color:var(--success-600)}.history-req__status-yellow{background:var(--warning-200);color:var(--warning-600)}.history-req__status-red{background:var(--danger-200);color:var(--danger-600)}","",{version:3,sources:["webpack://./HistoryList.scss","webpack://./../../../styles/mixins.scss"],names:[],mappings:"AACA,wBC0EE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CACA,gBAAA,CAKA,cAAA,CDjFA,kBAAA,CAEF,mBC0FE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAKA,cAAA,CACA,gBAAA,CDjGA,qBAAA,CAEF,oBACE,YAAA,CAEF,qBACE,gBAAA,CACA,kBAAA,CAGF,mBACE,kBAAA,CACA,cAAA,CAEF,gCACE,kBAAA,CAEF,2BACE,6BAAA,CACA,wBAAA,CAEF,4BACE,6BAAA,CACA,wBAAA,CAEF,yBACE,4BAAA,CACA,uBAAA",sourcesContent:["@import './src/styles/mixins';\n.history-req__user-name {\n  @include s1;\n  padding-bottom: 4px;\n}\n.history-req__info {\n  @include p1;\n  color: var(--base-500);\n}\n.preloader__wrapper {\n  height: 200px;\n}\n.history-req__status {\n  padding: 4px 12px;\n  border-radius: 16px;\n}\n\n.history-req__card {\n  margin-bottom: 16px;\n  cursor: pointer;\n}\n.history-req__card:last-of-type {\n  margin-bottom: 40px;\n}\n.history-req__status-green {\n  background: var(--success-200);\n  color: var(--success-600);\n}\n.history-req__status-yellow {\n  background: var(--warning-200);\n  color: var(--warning-600);\n}\n.history-req__status-red {\n  background: var(--danger-200);\n  color: var(--danger-600);\n}\n","\n// Текст\n@mixin text($size: 18px, $weight: 400, $color: $black, $fontStyle: normal) {\n  font-size: $size;\n  font-weight: $weight;\n  font-style: $fontStyle;\n  color: $color;\n}\n\n// Неактивное состояние элемента\n@mixin disabled() {\n  cursor: default;\n  pointer-events: none;\n}\n\n// Визуально скрыть\n@mixin hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n\n// ------------------\n\n// Заголовки\n\n@mixin h {\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin h1 {\n  @include h;\n  font-size: 36px;\n  line-height: 48px;\n}\n\n@mixin h2 {\n  @include h;\n  font-size: 32px;\n  line-height: 40px;\n}\n\n@mixin h3 {\n  @include h;\n  font-size: 30px;\n  line-height: 40px;\n}\n\n@mixin h4 {\n  @include h;\n  font-size: 26px;\n  line-height: 32px;\n}\n\n@mixin h5 {\n  @include h;\n  font-size: 22px;\n  line-height: 32px;\n}\n\n@mixin h6 {\n  @include h;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n// Подзаголовки\n\n@mixin s {\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n  line-height: 24px;\n}\n\n@mixin s1 {\n  @include s;\n  font-size: 15px;\n}\n\n@mixin s2 {\n  @include s;\n  font-size: 13px;\n}\n\n// Тексты\n\n@mixin t {\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin p1 {\n  @include t;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n@mixin p2 {\n  @include t;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n@mixin c1 {\n  @include t;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin c2 {\n  @include t;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin label {\n  @include t;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n}\n\n// Кнопки\n\n@mixin button {\n  font-style: normal;\n  font-weight: 500;\n}\n\n@mixin buttonGiant {\n  @include button;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n@mixin buttonLarge {\n  @include button;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n@mixin buttonMedium {\n  @include button;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n@mixin buttonSmall {\n  @include button;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin buttonTiny {\n  @include button;\n  font-size: 10px;\n  line-height: 12px;\n  letter-spacing: 1px;\n}\n\n// Прочее\n\n@mixin round($r) {\n  width: $r;\n  height: $r;\n  min-width: $r;\n  min-height: $r;\n  border-radius: 50%;\n}\n"],sourceRoot:""}]),e.a=s},903:function(n,e,i){"use strict";i.r(e);var t=i(13),r=i(160),o=i.n(r),s=i(773),a={insert:"head",singleton:!1},c=(o()(s.a,a),s.a.locals,i(100)),l=i(27),A=i(729),p=i(34),d=function(){return(d=Object.assign||function(n){for(var e,i=1,t=arguments.length;i<t;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}).apply(this,arguments)},h=function(){var n=Object(c.c)((function(n){return n.history.history})),e=Object(p.k)(),i=n.map((function(n){return Object(t.jsx)("div",d({className:"history-req__card",onClick:function(){return function(n){"0"!==n.wiId&&n.wiId?e.push("/request/"+n.wiId):e.push("/request/0/0/"+n.procGuid)}(n)}},{children:Object(t.jsx)(A.a,{user:Object(t.jsx)(l.UserPhoto,{url:n.user.photo,radius:"56px"},void 0),content:Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("h3",d({className:"history-req__user-name"},{children:n.user.fullName+" (ТН "+n.user.id+")"}),void 0),Object(t.jsx)("p",d({className:"history-req__info"},{children:"Заявка "+n.referenceNumber+" oт "+n.InitDate}),void 0),Object(t.jsx)("p",d({className:"history-req__info"},{children:"Инициатор: "+n.initiator.fullName+" (ТН "+n.initiator.id+")"}),void 0)]},void 0),action:(i=n,r="COMPLETED"===i.procStatus?"history-req__status-green":"WITHDRAWN"===i.procStatus?"history-req__status-red":"history-req__status-yellow",o={DISPLAY:Object(t.jsx)("div",d({className:"history-req__status "+r},{children:i.procStatusText}),void 0),ZSIGNITURE:Object(t.jsx)(l.Button,d({buttonType:"outlinePrimary"},{children:" Подписать документы"}),void 0),APPROVE:Object(t.jsx)(l.Button,d({buttonType:"outlinePrimary"},{children:" Обработать "}),void 0),REQUEST:Object(t.jsx)(l.Button,d({buttonType:"outlinePrimary"},{children:" Доработать заявку"}),void 0)},i.scenarioStage?o[i.scenarioStage]:null)},void 0)}),n.referenceNumber);var i,r,o}));return Object(t.jsx)(t.Fragment,{children:n.length?Object(t.jsx)("div",d({className:"history-req__wrapper"},{children:i}),void 0):Object(t.jsx)("div",d({className:"preloader__wrapper"},{children:Object(t.jsx)(l.Preloader,{size:"large"},void 0)}),void 0)},void 0)};e.default=h}}]);
//# sourceMappingURL=5.single-spa-worktime.js.map