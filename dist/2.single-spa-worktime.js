(window.webpackJsonpsingle_spa_worktime=window.webpackJsonpsingle_spa_worktime||[]).push([[2],{711:function(n,i,e){"use strict";e.p},724:function(n,i,e){"use strict";var t=e(13),o=e(0),s=e.n(o),r=e(160),l=e.n(r),A=e(726),p={insert:"head",singleton:!1},a=(l()(A.a,p),A.a.locals,e(27)),x=e(711),c=function(){return(c=Object.assign||function(n){for(var i,e=1,t=arguments.length;e<t;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o]);return n}).apply(this,arguments)},h=function(n){var i=n.department,e=n.path.split(" -> ").map((function(n,i){return Object(t.jsxs)(s.a.Fragment,{children:[!!i&&Object(t.jsxs)("span",c({className:"arrow-separator"},{children:[" "," > "]}),i),Object(t.jsxs)("span",{children:[" ",n]},i+1e3)]},i)}));return Object(t.jsxs)("div",c({className:"position__dep-block"},{children:[Object(t.jsx)("div",c({className:"position__user-text"},{children:i}),void 0),Object(t.jsxs)(a.Tooltip,c({className:"position__tooltip-main",position:"right"},{children:[Object(t.jsx)(a.Button,c({className:"position__user-info",buttonType:"text"},{children:Object(t.jsx)(x.ReactComponent,{},void 0)}),void 0),Object(t.jsx)("div",c({className:"position__tooltip"},{children:e}),void 0)]}),void 0)]}),void 0)};i.a=h},725:function(n,i,e){"use strict";var t=e(161),o=e.n(t),s=e(162),r=e.n(s)()(o.a);r.push([n.i,".worktime__user-wrapper{display:flex;padding-bottom:32px}.worktime__user-texts{padding-left:32px}.worktime__user-fio{font-style:normal;font-weight:700;letter-spacing:.01em;color:var(--base-1000);font-size:22px;line-height:32px;padding-bottom:8px}.worktime__user-text{font-style:normal;font-weight:400;letter-spacing:.01em;color:var(--base-1000);font-size:15px;line-height:20px;color:var(--base-500)}","",{version:3,sources:["webpack://./UserCard.scss","webpack://./../../../styles/mixins.scss"],names:[],mappings:"AACA,wBACE,YAAA,CACA,mBAAA,CAEF,sBACE,iBAAA,CAEF,oBCsBE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CA6BA,cAAA,CACA,gBAAA,CDrDA,kBAAA,CAEF,qBCmFE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAKA,cAAA,CACA,gBAAA,CD1FA,qBAAA",sourcesContent:["@import './src/styles/mixins';\n.worktime__user-wrapper {\n  display: flex;\n  padding-bottom: 32px;\n}\n.worktime__user-texts {\n  padding-left: 32px;\n}\n.worktime__user-fio {\n  @include h5;\n  padding-bottom: 8px;\n}\n.worktime__user-text {\n  @include p1;\n  color: var(--base-500);\n}\n","\n// Текст\n@mixin text($size: 18px, $weight: 400, $color: $black, $fontStyle: normal) {\n  font-size: $size;\n  font-weight: $weight;\n  font-style: $fontStyle;\n  color: $color;\n}\n\n// Неактивное состояние элемента\n@mixin disabled() {\n  cursor: default;\n  pointer-events: none;\n}\n\n// Визуально скрыть\n@mixin hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n\n// ------------------\n\n// Заголовки\n\n@mixin h {\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin h1 {\n  @include h;\n  font-size: 36px;\n  line-height: 48px;\n}\n\n@mixin h2 {\n  @include h;\n  font-size: 32px;\n  line-height: 40px;\n}\n\n@mixin h3 {\n  @include h;\n  font-size: 30px;\n  line-height: 40px;\n}\n\n@mixin h4 {\n  @include h;\n  font-size: 26px;\n  line-height: 32px;\n}\n\n@mixin h5 {\n  @include h;\n  font-size: 22px;\n  line-height: 32px;\n}\n\n@mixin h6 {\n  @include h;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n// Подзаголовки\n\n@mixin s {\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n  line-height: 24px;\n}\n\n@mixin s1 {\n  @include s;\n  font-size: 15px;\n}\n\n@mixin s2 {\n  @include s;\n  font-size: 13px;\n}\n\n// Тексты\n\n@mixin t {\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin p1 {\n  @include t;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n@mixin p2 {\n  @include t;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n@mixin c1 {\n  @include t;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin c2 {\n  @include t;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin label {\n  @include t;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n}\n\n// Кнопки\n\n@mixin button {\n  font-style: normal;\n  font-weight: 500;\n}\n\n@mixin buttonGiant {\n  @include button;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n@mixin buttonLarge {\n  @include button;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n@mixin buttonMedium {\n  @include button;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n@mixin buttonSmall {\n  @include button;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin buttonTiny {\n  @include button;\n  font-size: 10px;\n  line-height: 12px;\n  letter-spacing: 1px;\n}\n\n// Прочее\n\n@mixin round($r) {\n  width: $r;\n  height: $r;\n  min-width: $r;\n  min-height: $r;\n  border-radius: 50%;\n}\n"],sourceRoot:""}]),i.a=r},726:function(n,i,e){"use strict";var t=e(161),o=e.n(t),s=e(162),r=e.n(s)()(o.a);r.push([n.i,".position__tooltip-main{max-width:400px}.position__tooltip{font-style:normal;font-weight:400;letter-spacing:.01em;color:var(--base-1000);font-size:15px;line-height:20px}.arrow-separator{color:var(--accent-500)}.position__dep-block{display:flex}.position__user-info{margin-left:8px}.rf-tooltip__content,.rf-tooltip__inner:after{box-shadow:var(--basic-shadow-long)}","",{version:3,sources:["webpack://./Position.scss","webpack://./../../../styles/mixins.scss"],names:[],mappings:"AAEA,wBACE,eAAA,CAEF,mBC0FE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAKA,cAAA,CACA,gBAAA,CDhGF,iBACE,uBAAA,CAEF,qBACE,YAAA,CAEF,qBACE,eAAA,CAEF,8CACE,mCAAA",sourcesContent:["@import './src/styles/mixins';\n\n.position__tooltip-main {\n  max-width: 400px;\n}\n.position__tooltip{\n  @include p1;\n}\n.arrow-separator{\n  color: var(--accent-500);\n}\n.position__dep-block {\n  display: flex;\n}\n.position__user-info{\n  margin-left: 8px;\n}\n.rf-tooltip__content ,.rf-tooltip__inner:after{\n  box-shadow: var(--basic-shadow-long);\n}\n","\n// Текст\n@mixin text($size: 18px, $weight: 400, $color: $black, $fontStyle: normal) {\n  font-size: $size;\n  font-weight: $weight;\n  font-style: $fontStyle;\n  color: $color;\n}\n\n// Неактивное состояние элемента\n@mixin disabled() {\n  cursor: default;\n  pointer-events: none;\n}\n\n// Визуально скрыть\n@mixin hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n\n// ------------------\n\n// Заголовки\n\n@mixin h {\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin h1 {\n  @include h;\n  font-size: 36px;\n  line-height: 48px;\n}\n\n@mixin h2 {\n  @include h;\n  font-size: 32px;\n  line-height: 40px;\n}\n\n@mixin h3 {\n  @include h;\n  font-size: 30px;\n  line-height: 40px;\n}\n\n@mixin h4 {\n  @include h;\n  font-size: 26px;\n  line-height: 32px;\n}\n\n@mixin h5 {\n  @include h;\n  font-size: 22px;\n  line-height: 32px;\n}\n\n@mixin h6 {\n  @include h;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n// Подзаголовки\n\n@mixin s {\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n  line-height: 24px;\n}\n\n@mixin s1 {\n  @include s;\n  font-size: 15px;\n}\n\n@mixin s2 {\n  @include s;\n  font-size: 13px;\n}\n\n// Тексты\n\n@mixin t {\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin p1 {\n  @include t;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n@mixin p2 {\n  @include t;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n@mixin c1 {\n  @include t;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin c2 {\n  @include t;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin label {\n  @include t;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n}\n\n// Кнопки\n\n@mixin button {\n  font-style: normal;\n  font-weight: 500;\n}\n\n@mixin buttonGiant {\n  @include button;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n@mixin buttonLarge {\n  @include button;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n@mixin buttonMedium {\n  @include button;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n@mixin buttonSmall {\n  @include button;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin buttonTiny {\n  @include button;\n  font-size: 10px;\n  line-height: 12px;\n  letter-spacing: 1px;\n}\n\n// Прочее\n\n@mixin round($r) {\n  width: $r;\n  height: $r;\n  min-width: $r;\n  min-height: $r;\n  border-radius: 50%;\n}\n"],sourceRoot:""}]),i.a=r},738:function(n,i,e){"use strict";var t=e(13),o=e(160),s=e.n(o),r=e(725),l={insert:"head",singleton:!1},A=(s()(r.a,l),r.a.locals,e(27)),p=e(724),a=function(){return(a=Object.assign||function(n){for(var i,e=1,t=arguments.length;e<t;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o]);return n}).apply(this,arguments)},x=function(n){var i=n.user;return Object(t.jsx)(t.Fragment,{children:!!i&&Object(t.jsxs)("div",a({className:"worktime__user-wrapper"},{children:[Object(t.jsx)(A.UserPhoto,{url:null==i?void 0:i.photo,radius:"80px"},void 0),Object(t.jsxs)("div",a({className:"worktime__user-texts"},{children:[Object(t.jsx)("div",a({className:"worktime__user-fio"},{children:(null==i?void 0:i.fullName)+" (ТН "+(null==i?void 0:i.id)+")"}),void 0),Object(t.jsx)("div",a({className:"worktime__user-text"},{children:null==i?void 0:i.position}),void 0),Object(t.jsx)("div",a({className:"worktime__user-text"},{children:Object(t.jsx)(p.a,{department:(null==i?void 0:i.department)||"",path:(null==i?void 0:i.departmentPath)||""},void 0)}),void 0)]}),void 0)]}),void 0)},void 0)};i.a=x},762:function(n,i,e){"use strict";var t=e(13),o=e(160),s=e.n(o),r=e(767),l={insert:"head",singleton:!1},A=(s()(r.a,l),r.a.locals,e(738)),p=e(27),a=e(768),x={insert:"head",singleton:!1},c=(s()(a.a,x),a.a.locals,e(769)),h={insert:"head",singleton:!1},d=(s()(c.a,h),c.a.locals,e(251)),m=function(){return(m=Object.assign||function(n){for(var i,e=1,t=arguments.length;e<t;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o]);return n}).apply(this,arguments)},u=function(n){var i=n.data,e=n.break_,o=Object(t.jsxs)("div",m({className:"week-tile__wrapper"},{children:[Object(t.jsx)("div",m({className:"week-tile__text"},{children:Object(d.h)(+i.dayId)+" "+Object(d.e)(i.start,1)+" - "+Object(d.e)(i.end,1)+" "}),void 0),Object(t.jsx)("div",m({className:"week-tile__text"},{children:Object(d.e)(i.end-i.start-e,0)}),void 0)]}),void 0),s=Object(t.jsx)("div",m({className:"week-tile__weekend"},{children:Object(t.jsxs)("div",{children:[Object(d.h)(+i.dayId)," "]},void 0)}),void 0);return Object(t.jsx)(t.Fragment,{children:i.start!==i.end?o:s},void 0)},g=function(){return(g=Object.assign||function(n){for(var i,e=1,t=arguments.length;e<t;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o]);return n}).apply(this,arguments)},f=function(n){var i=n.data,e=function(n,i){return Object(t.jsxs)("div",g({className:"worktime__stats-wrapper"},{children:[Object(t.jsx)("div",g({className:"worktime__stats-title"},{children:n}),void 0),Object(t.jsx)("div",g({className:"worktime__stats-content"},{children:i}),void 0)]}),void 0)},o=i.workTime.map((function(n){return Object(t.jsx)(u,{break_:i.break,data:n},n.dayId)}));return Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("div",g({className:"worktime__week-text"},{children:"Рабочая неделя"}),void 0),Object(t.jsx)("div",g({className:"worktime__week-tiles"},{children:o}),void 0),Object(t.jsxs)("div",g({className:"worktime__stats"},{children:[e("Период действия",i.startDate+" - "+(i.endDate||"Бессрочно")),e("Время в неделю",Object(d.e)(i.timePerWeek,0)+" "),e("Перерыв",Object(d.e)(i.break,0)+" "),e("Доля рабочего времени",i.percentage+"%")]}),void 0)]},void 0)},b=e(34),C=function(){return(C=Object.assign||function(n){for(var i,e=1,t=arguments.length;e<t;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(n[o]=i[o]);return n}).apply(this,arguments)},w=function(n){var i,e,o=n.worktime,s=n.user,r=n.showButtons,l=void 0===r||r,a=Object(b.k)(),x="ZSIGNITURE"===(null===(i=o.createdTask)||void 0===i?void 0:i.scenarioStage),c="REQUEST"===(null===(e=o.createdTask)||void 0===e?void 0:e.scenarioStage),h=function(n){a.push("/request/"+n)},d=x||c?Object(t.jsx)(p.Button,C({type:"button",buttonType:"primary",onClick:function(){var n;return h((null===(n=o.createdTask)||void 0===n?void 0:n.wiId)||"")}},{children:c?"Внести корректировки":"Подписать документы"}),void 0):Object(t.jsx)("div",C({className:"worktime__notify"},{children:Object(t.jsx)("p",{children:"У вас уже есть активная заявка. Изменение графика не доступно."},void 0)}),void 0);return Object(t.jsxs)("div",C({className:"worktime__container"},{children:[Object(t.jsx)(A.a,{user:s},void 0),Object(t.jsx)("div",C({className:"worktime__schedule-text"},{children:o.nameWorkTemplate}),void 0),Object(t.jsx)(f,{data:o},void 0),!!l&&(o.createdTask?d:Object(t.jsx)("div",C({className:"worktime__buttons"},{children:Object(t.jsx)(p.Button,C({buttonType:"primary",onClick:function(){return h("0")}},{children:"Изменить"}),void 0)}),void 0))]}),void 0)};i.a=w},767:function(n,i,e){"use strict";var t=e(161),o=e.n(t),s=e(162),r=e.n(s)()(o.a);r.push([n.i,'.worktime__schedule-text{font-style:normal;font-weight:700;letter-spacing:.01em;color:var(--base-1000);font-size:18px;line-height:24px;padding-bottom:16px}.worktime__notify{font-style:normal;font-weight:400;letter-spacing:.01em;color:var(--base-1000);font-size:15px;line-height:20px;padding:16px;background:var(--warning-100);max-width:640px;position:relative;margin-left:8px}.worktime__notify:before{content:"";position:absolute;height:100%;left:-8px;top:0;background:var(--warning-300);width:8px;border-radius:8px 0 0 8px}',"",{version:3,sources:["webpack://./WorkTimeCard.scss","webpack://./../../../styles/mixins.scss"],names:[],mappings:"AAEA,yBC4BE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAmCA,cAAA,CACA,gBAAA,CDjEA,mBAAA,CAGF,kBCwFE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAKA,cAAA,CACA,gBAAA,CD/FA,YAAA,CACA,6BAAA,CACA,eAAA,CACA,iBAAA,CACA,eAAA,CAGF,yBACE,UAAA,CACA,iBAAA,CACA,WAAA,CACA,SAAA,CACA,KAAA,CACA,6BAAA,CACA,SAAA,CACA,yBAAA",sourcesContent:["@import '../../../styles/mixins';\n\n.worktime__schedule-text {\n  @include h6;\n  padding-bottom: 16px;\n}\n\n.worktime__notify {\n  @include p1;\n  padding: 16px;\n  background: var(--warning-100);\n  max-width: 640px;\n  position: relative;\n  margin-left: 8px;\n}\n\n.worktime__notify:before {\n  content: '';\n  position: absolute;\n  height: 100%;\n  left: -8px;\n  top: 0;\n  background: var(--warning-300);\n  width: 8px;\n  border-radius: 8px 0 0 8px;\n}\n","\n// Текст\n@mixin text($size: 18px, $weight: 400, $color: $black, $fontStyle: normal) {\n  font-size: $size;\n  font-weight: $weight;\n  font-style: $fontStyle;\n  color: $color;\n}\n\n// Неактивное состояние элемента\n@mixin disabled() {\n  cursor: default;\n  pointer-events: none;\n}\n\n// Визуально скрыть\n@mixin hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n\n// ------------------\n\n// Заголовки\n\n@mixin h {\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin h1 {\n  @include h;\n  font-size: 36px;\n  line-height: 48px;\n}\n\n@mixin h2 {\n  @include h;\n  font-size: 32px;\n  line-height: 40px;\n}\n\n@mixin h3 {\n  @include h;\n  font-size: 30px;\n  line-height: 40px;\n}\n\n@mixin h4 {\n  @include h;\n  font-size: 26px;\n  line-height: 32px;\n}\n\n@mixin h5 {\n  @include h;\n  font-size: 22px;\n  line-height: 32px;\n}\n\n@mixin h6 {\n  @include h;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n// Подзаголовки\n\n@mixin s {\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n  line-height: 24px;\n}\n\n@mixin s1 {\n  @include s;\n  font-size: 15px;\n}\n\n@mixin s2 {\n  @include s;\n  font-size: 13px;\n}\n\n// Тексты\n\n@mixin t {\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin p1 {\n  @include t;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n@mixin p2 {\n  @include t;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n@mixin c1 {\n  @include t;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin c2 {\n  @include t;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin label {\n  @include t;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n}\n\n// Кнопки\n\n@mixin button {\n  font-style: normal;\n  font-weight: 500;\n}\n\n@mixin buttonGiant {\n  @include button;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n@mixin buttonLarge {\n  @include button;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n@mixin buttonMedium {\n  @include button;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n@mixin buttonSmall {\n  @include button;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin buttonTiny {\n  @include button;\n  font-size: 10px;\n  line-height: 12px;\n  letter-spacing: 1px;\n}\n\n// Прочее\n\n@mixin round($r) {\n  width: $r;\n  height: $r;\n  min-width: $r;\n  min-height: $r;\n  border-radius: 50%;\n}\n"],sourceRoot:""}]),i.a=r},768:function(n,i,e){"use strict";var t=e(161),o=e.n(t),s=e(162),r=e.n(s)()(o.a);r.push([n.i,".worktime__week-text{font-style:normal;font-weight:400;letter-spacing:.01em;color:var(--base-1000);font-size:15px;line-height:20px;color:var(--base-500)}.worktime__week-tiles{display:flex;width:100%;align-items:center;justify-content:flex-start;flex-wrap:wrap;margin-top:8px;margin-bottom:24px}.worktime__stats{width:100%;display:flex;flex-wrap:wrap}.worktime__stats-title{font-style:normal;font-weight:400;letter-spacing:.01em;color:var(--base-1000);font-size:15px;line-height:20px;color:var(--base-500);padding-bottom:8px}.worktime__stats-content{font-style:normal;font-weight:500;letter-spacing:.01em;color:var(--base-1000);line-height:24px;font-size:15px}.worktime__stats-wrapper{padding-right:56px;margin-bottom:32px}.worktime__stats-wrapper:last-of-type{margin-right:0}@media(max-width: 768px){.worktime__stats-wrapper{padding-right:0;width:50%}}","",{version:3,sources:["webpack://./WorkTimeWidget.scss","webpack://./../../../styles/mixins.scss"],names:[],mappings:"AAEA,qBC6FE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAKA,cAAA,CACA,gBAAA,CDpGA,qBAAA,CAIF,sBACE,YAAA,CACA,UAAA,CACA,kBAAA,CACA,0BAAA,CACA,cAAA,CACA,cAAA,CACA,kBAAA,CAGF,iBACE,UAAA,CACA,YAAA,CACA,cAAA,CAGF,uBCuEE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CAKA,cAAA,CACA,gBAAA,CD9EA,qBAAA,CACA,kBAAA,CAGF,yBC6CE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CACA,gBAAA,CAKA,cAAA,CDlDF,yBACE,kBAAA,CACA,kBAAA,CAGF,sCACE,cAAA,CAGF,yBACE,yBACE,eAAA,CACA,SAAA,CAAA",sourcesContent:["@import './src/styles/mixins';\n\n.worktime__week-text {\n  @include p1;\n  color: var(--base-500);\n\n}\n\n.worktime__week-tiles {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: flex-start;\n  flex-wrap: wrap;\n  margin-top: 8px;\n  margin-bottom: 24px;\n}\n\n.worktime__stats {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.worktime__stats-title {\n  @include p1;\n  color: var(--base-500);\n  padding-bottom: 8px;\n}\n\n.worktime__stats-content {\n  @include s1;\n}\n\n.worktime__stats-wrapper {\n  padding-right: 56px;\n  margin-bottom: 32px;\n}\n\n.worktime__stats-wrapper:last-of-type {\n  margin-right: 0;\n}\n\n@media (max-width: 768px) {\n  .worktime__stats-wrapper {\n    padding-right: 0;\n    width: 50%;\n  }\n}\n","\n// Текст\n@mixin text($size: 18px, $weight: 400, $color: $black, $fontStyle: normal) {\n  font-size: $size;\n  font-weight: $weight;\n  font-style: $fontStyle;\n  color: $color;\n}\n\n// Неактивное состояние элемента\n@mixin disabled() {\n  cursor: default;\n  pointer-events: none;\n}\n\n// Визуально скрыть\n@mixin hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n\n// ------------------\n\n// Заголовки\n\n@mixin h {\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin h1 {\n  @include h;\n  font-size: 36px;\n  line-height: 48px;\n}\n\n@mixin h2 {\n  @include h;\n  font-size: 32px;\n  line-height: 40px;\n}\n\n@mixin h3 {\n  @include h;\n  font-size: 30px;\n  line-height: 40px;\n}\n\n@mixin h4 {\n  @include h;\n  font-size: 26px;\n  line-height: 32px;\n}\n\n@mixin h5 {\n  @include h;\n  font-size: 22px;\n  line-height: 32px;\n}\n\n@mixin h6 {\n  @include h;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n// Подзаголовки\n\n@mixin s {\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n  line-height: 24px;\n}\n\n@mixin s1 {\n  @include s;\n  font-size: 15px;\n}\n\n@mixin s2 {\n  @include s;\n  font-size: 13px;\n}\n\n// Тексты\n\n@mixin t {\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin p1 {\n  @include t;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n@mixin p2 {\n  @include t;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n@mixin c1 {\n  @include t;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin c2 {\n  @include t;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin label {\n  @include t;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n}\n\n// Кнопки\n\n@mixin button {\n  font-style: normal;\n  font-weight: 500;\n}\n\n@mixin buttonGiant {\n  @include button;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n@mixin buttonLarge {\n  @include button;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n@mixin buttonMedium {\n  @include button;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n@mixin buttonSmall {\n  @include button;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin buttonTiny {\n  @include button;\n  font-size: 10px;\n  line-height: 12px;\n  letter-spacing: 1px;\n}\n\n// Прочее\n\n@mixin round($r) {\n  width: $r;\n  height: $r;\n  min-width: $r;\n  min-height: $r;\n  border-radius: 50%;\n}\n"],sourceRoot:""}]),i.a=r},769:function(n,i,e){"use strict";var t=e(161),o=e.n(t),s=e(162),r=e.n(s)()(o.a);r.push([n.i,".week-tile__text{font-style:normal;font-weight:500;letter-spacing:.01em;color:var(--base-1000);line-height:24px;font-size:15px;color:var(--accent-500)}.week-tile__text:last-of-type{padding-top:4px}.week-tile__wrapper{background-color:var(--accent-200);padding:8px 12px;margin-right:16px;margin-bottom:16px;border-radius:8px;min-width:134px}.week-tile__weekend{border-radius:50%;background-color:rgba(255,61,113,.08);width:40px;height:40px;display:flex;justify-content:center;align-items:center;margin-right:16px;margin-bottom:16px;color:var(--danger-300)}.week-tile__weekend:last-of-type{margin-right:0}","",{version:3,sources:["webpack://./WorkTile.scss","webpack://./../../../styles/mixins.scss"],names:[],mappings:"AAEA,iBCyEE,iBAAA,CACA,eAAA,CACA,oBAAA,CACA,sBAAA,CACA,gBAAA,CAKA,cAAA,CDhFA,uBAAA,CAGF,8BACE,eAAA,CAGF,oBACE,kCAAA,CACA,gBAAA,CACA,iBAAA,CACA,kBAAA,CACA,iBAAA,CACA,eAAA,CAGF,oBACE,iBAAA,CACA,qCAAA,CACA,UAAA,CACA,WAAA,CACA,YAAA,CACA,sBAAA,CACA,kBAAA,CACA,iBAAA,CACA,kBAAA,CACA,uBAAA,CAGF,iCACE,cAAA",sourcesContent:["@import './src/styles/mixins';\n\n.week-tile__text {\n  @include s1;\n  color: var(--accent-500);\n}\n\n.week-tile__text:last-of-type {\n  padding-top: 4px;\n}\n\n.week-tile__wrapper {\n  background-color: var(--accent-200);\n  padding: 8px 12px;\n  margin-right: 16px;\n  margin-bottom: 16px;\n  border-radius: 8px;\n  min-width: 134px;\n}\n\n.week-tile__weekend {\n  border-radius: 50%;\n  background-color: rgba(255, 61, 113, 0.08);\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-right: 16px;\n  margin-bottom: 16px;\n  color: var(--danger-300);\n}\n\n.week-tile__weekend:last-of-type {\n  margin-right: 0;\n}\n","\n// Текст\n@mixin text($size: 18px, $weight: 400, $color: $black, $fontStyle: normal) {\n  font-size: $size;\n  font-weight: $weight;\n  font-style: $fontStyle;\n  color: $color;\n}\n\n// Неактивное состояние элемента\n@mixin disabled() {\n  cursor: default;\n  pointer-events: none;\n}\n\n// Визуально скрыть\n@mixin hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 1px;\n  height: 1px;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n\n// ------------------\n\n// Заголовки\n\n@mixin h {\n  font-style: normal;\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin h1 {\n  @include h;\n  font-size: 36px;\n  line-height: 48px;\n}\n\n@mixin h2 {\n  @include h;\n  font-size: 32px;\n  line-height: 40px;\n}\n\n@mixin h3 {\n  @include h;\n  font-size: 30px;\n  line-height: 40px;\n}\n\n@mixin h4 {\n  @include h;\n  font-size: 26px;\n  line-height: 32px;\n}\n\n@mixin h5 {\n  @include h;\n  font-size: 22px;\n  line-height: 32px;\n}\n\n@mixin h6 {\n  @include h;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n// Подзаголовки\n\n@mixin s {\n  font-style: normal;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n  line-height: 24px;\n}\n\n@mixin s1 {\n  @include s;\n  font-size: 15px;\n}\n\n@mixin s2 {\n  @include s;\n  font-size: 13px;\n}\n\n// Тексты\n\n@mixin t {\n  font-style: normal;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  color: var(--base-1000);\n}\n\n@mixin p1 {\n  @include t;\n  font-size: 15px;\n  line-height: 20px;\n}\n\n@mixin p2 {\n  @include t;\n  font-size: 13px;\n  line-height: 18px;\n}\n\n@mixin c1 {\n  @include t;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin c2 {\n  @include t;\n  font-weight: 500;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin label {\n  @include t;\n  font-weight: 700;\n  font-size: 12px;\n  line-height: 16px;\n  text-transform: uppercase;\n}\n\n// Кнопки\n\n@mixin button {\n  font-style: normal;\n  font-weight: 500;\n}\n\n@mixin buttonGiant {\n  @include button;\n  font-size: 18px;\n  line-height: 24px;\n}\n\n@mixin buttonLarge {\n  @include button;\n  font-size: 16px;\n  line-height: 20px;\n}\n\n@mixin buttonMedium {\n  @include button;\n  font-size: 14px;\n  line-height: 16px;\n}\n\n@mixin buttonSmall {\n  @include button;\n  font-size: 12px;\n  line-height: 16px;\n}\n\n@mixin buttonTiny {\n  @include button;\n  font-size: 10px;\n  line-height: 12px;\n  letter-spacing: 1px;\n}\n\n// Прочее\n\n@mixin round($r) {\n  width: $r;\n  height: $r;\n  min-width: $r;\n  min-height: $r;\n  border-radius: 50%;\n}\n"],sourceRoot:""}]),i.a=r}}]);
//# sourceMappingURL=2.single-spa-worktime.js.map