let fs = require ('fs');
const child_process = require ('child_process');

const readline = require ('readline');
const rl = readline.createInterface ({
    input: process.stdin,
    output: process.stdout,
});
//----------------------------------------------------------------------------------------------------------------------
var PROJECT_NAME = '';

main ();

async function main () {
    console.info (
        '\x1b[33m%s\x1b[0m',
        `*********************************************start********************************************`
    );
    const isConfigsExists = fs.existsSync('./package.json');

    await getName ();
    listFolders ();
    listFiles ();
    makeConfigs();
    console.info (
        '\x1b[33m%s\x1b[0m',
        `*********************************************end**********************************************`
    );

    try {
        await install(isConfigsExists ? PROJECT_NAME : '');
    } catch(err) {
        console.error(err);
        process.exit(1);
    }


    process.exit (0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function install (projectName) {
    return new Promise ((resolve, reject) => {
        const install = child_process.spawn (`yarn i${projectName ? ':' + projectName : ''} && yarn subi`, {
            stdio: 'inherit',
            shell: true
        });

        install.on ('close', code => {
            if (code !== 0) {
                reject ({
                    command: `yarn i && yarn subi`,
                });
                return;
            }
            resolve();
        });
    });
}


function listFiles () {
    [
        { path: './', filename: 'README.md', func: readme, editable: false },
        { path: './', filename: 'changelog.config.js', func: changelog },
        { path: './', filename: '.prettierrc.js', func: prettierrc },
        { path: './', filename: '.gitignore', func: gitignore },
        { path: './', filename: 'commitlint.config.js', func: commitlint },
        { path: './', filename: 'tsconfig.json', func: tsconfigJSON },
        { path: './_conf/eslint-config/', filename: 'index.js', func: lint },
        { path: `./${PROJECT_NAME}/`, filename: '.env.development', func: env },
        { path: `./${PROJECT_NAME}/`, filename: '.env.quality', func: env },
        { path: `./${PROJECT_NAME}/`, filename: 'package.json', func: packageProj },
        { path: `./${PROJECT_NAME}/`, filename: 'tsconfig.json', func: tsconfigN },
        { path: `./${PROJECT_NAME}/`, filename: 'custom.d.ts', func: customType },
        {
            path: `./${PROJECT_NAME}/src/`,
            filename: 'serviceWorker.ts',
            func: serviceWorker,
        },
        { path: `./${PROJECT_NAME}/src/`, filename: 'theme.scss', func: themes },
        { path: `./${PROJECT_NAME}/src/`, filename: 'index.tsx', func: index },
        { path: `./${PROJECT_NAME}/src/`, filename: 'App.tsx', func: appTSX },
        { path: `./${PROJECT_NAME}/src/`, filename: 'App.scss', func: appSCSS },
        {
            path: `./${PROJECT_NAME}/src/_utils/`,
            filename: 'interceptor.ts',
            func: interceptor,
        },
        { path: `./${PROJECT_NAME}/src/_utils/`, filename: 'redux.ts', func: redux },
        {
            path: `./${PROJECT_NAME}/scripts/`,
            filename: 'start.js',
            func: startScript,
        },
        {
            path: `./${PROJECT_NAME}/scripts/`,
            filename: 'build.js',
            func: buildScript,
        },
        { path: `./${PROJECT_NAME}/scripts/`, filename: 'test.js', func: testScript },
        { path: `./${PROJECT_NAME}/public/`, filename: 'favicon.ico', func: ico },
        {
            path: `./${PROJECT_NAME}/public/`,
            filename: 'manifest.json',
            func: manifest,
        },
        {
            path: `./${PROJECT_NAME}/public/`,
            filename: 'index.html',
            func: indexHTML,
        },
        {
            path: `./${PROJECT_NAME}/config/`,
            filename: 'webpackDevServer.config.js',
            func: webpackDevServerConfig,
        },
        {
            path: `./${PROJECT_NAME}/config/`,
            filename: 'webpack.config.js',
            func: webpackConfig,
        },
        { path: `./${PROJECT_NAME}/config/`, filename: 'pnpTS.js', func: pnpTS },
        { path: `./${PROJECT_NAME}/config/`, filename: 'paths.js', func: paths },
        { path: `./${PROJECT_NAME}/config/`, filename: 'modules.js', func: modules },
        {
            path: `./${PROJECT_NAME}/config/`,
            filename: 'getHttpsConfig.js',
            func: getHTTPConfig,
        },
        { path: `./${PROJECT_NAME}/config/`, filename: 'env.js', func: envJS },
        { path: `./${PROJECT_NAME}/`, filename: '.env.production', func: env },
        {
            path: `./${PROJECT_NAME}/src/_store/`,
            filename: 'index.ts',
            func: reduxIndex,
        },
    ].forEach (i => {
        createFile ([i.path], i.filename, i.func);
    });
}

function makeConfigs() {
    const gitmodulesFile = { path: './', filename: '.gitmodules', func: gitmodules };
    const packageJSONFile = { path: './', filename: 'package.json', func: packageJSON };

    fs.appendFileSync(`${gitmodulesFile.path + gitmodulesFile.filename}`, gitmodulesFile.func());

    if (!fs.existsSync(packageJSONFile.path + packageJSONFile.filename)) {
        createFile(packageJSONFile.path, packageJSONFile.filename, packageJSONFile.func);
    } else {
        const scripts = {
            "subi": `git submodule add https://github.com/mun4kin/rootFront ${PROJECT_NAME}/src/_rootFront `,
            [`start:${PROJECT_NAME}`]: `yarn --cwd ${PROJECT_NAME} start`,
            [`i:${PROJECT_NAME}`]: `yarn && cd ${PROJECT_NAME} && yarn && cd ..`,
            [`story:${PROJECT_NAME}`]: `cd ${PROJECT_NAME}/src/_rootFront && yarn && yarn storybook`,
            [`build:test:${PROJECT_NAME}`]: `cd ${PROJECT_NAME} && env-cmd -f .env.test node scripts/build.js`,
            [`build:prod:${PROJECT_NAME}`]: `cd ${PROJECT_NAME} && env-cmd -f .env.production node scripts/build.js`,
            [`test:${PROJECT_NAME}`]: `node ${PROJECT_NAME}/scripts/test.js`
        };

        let contents = JSON.parse(fs.readFileSync(packageJSONFile.path + packageJSONFile.filename));
        contents.scripts = Object.assign({}, contents.scripts, scripts);

        fs.writeFileSync(packageJSONFile.path + packageJSONFile.filename, JSON.stringify(contents, null, 2));
    }
}

function listFolders () {
    [
        '_conf',
        '_conf/eslint-config',
        PROJECT_NAME,
        `${PROJECT_NAME}/src`,
        `${PROJECT_NAME}/src/assets`,
        `${PROJECT_NAME}/src/_store`,
        `${PROJECT_NAME}/src/_utils`,
        `${PROJECT_NAME}/src/_store/actions`,
        `${PROJECT_NAME}/src/_store/effects`,
        `${PROJECT_NAME}/src/_store/reducers`,
        `${PROJECT_NAME}/src/_store/services`,
        `${PROJECT_NAME}/src/_store/tests`,
        `${PROJECT_NAME}/src/components`,
        `${PROJECT_NAME}/src/components/atoms`,
        `${PROJECT_NAME}/src/components/molecules`,
        `${PROJECT_NAME}/src/components/organisms`,
        `${PROJECT_NAME}/src/components/pages`,
        `${PROJECT_NAME}/scripts`,
        `${PROJECT_NAME}/public`,
        `${PROJECT_NAME}/config`,
    ].forEach (name => !fs.existsSync (name) && fs.mkdirSync (name));
}

//=======================================================
/** спрашивает имя файла */
function getName () {
    return new Promise (resolve => {
        rl.question ('Введите имя файла проекта: ', userInputFilename => {
            PROJECT_NAME = userInputFilename;
            console.log ('\x1b[4m%s\x1b[0m', `создаем проект ${PROJECT_NAME}`);
            resolve ();
        });
    });
}

//=======================================================
function createFile (_path, filename, func) {
    fs.writeFileSync (`${_path + filename}`, func ());
    console.log ('\x1b[34m%s\x1b[0m', `файл ${filename} успешно создан`);
}

// function getFile(name) {
//     let result = '';
//     console.log(name);
//     switch (name) {
//         case 'README.md':
//             result = readme();
//             break;
//         case 'package.json':
//             result = packageJSON();
//             break;
//         case 'index.js':
//             result = lint();
//             break;
//         default:
//             result = '111';
//     }
//     console.log('\x1b[34m%s\x1b[0m', `файл ${name} успешно создан`);
//     return result;
// }

function env () {
    return `REACT_APP_ENV = dev
REACT_APP_HOST = https://p2passesmentj2dacd8d8.ru1.hana.ondemand.com/
REACT_APP_BASIC_AUTH = Basic bWF0dmV5OnBhc3N3b3Jk
PORT = 8000
    `;
}
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
function themes () {
    return `//@import './_reactShared/ui/uiScss/atoms/Input/career-Input';
//@import './_reactShared/ui/uiScss/atoms/Textarea/career-Textarea';
//@import './_reactShared/ui/uiScss/atoms/SimpleButton/career-SimpleButton';

    `;
}
function redux () {
    return `import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, skip } from 'rxjs/operators';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

/** типизация расширенного стора*/

interface IExtStore extends Store {
  asyncReducers?: { [key: string]: any };
}

/** Создаем middleware для эффектов (эпиков) */
const observableMiddleware = createEpicMiddleware();

/** Динамическое подключение редьюсеров*/
export function createReducer(asyncReducers: any) {
  return combineReducers({
    ...asyncReducers
  });

}

const initReducer = (state = {}) => state;

/** Универсальный стор для всех приложений*/
export function configureStore() {
  const store: IExtStore = createStore(
    createReducer({ initReducer }),
    composeWithDevTools(applyMiddleware(observableMiddleware))
  );

  store.asyncReducers = {};
  return store;
}

// @ts-ignore
export const addEpics = (...rest) =>
  rest.forEach(i => {
    if (!mapEfects[i.name]) {
      mapEfects[i.name] = true;
      effect$$.next(i);
    }
  });

export const store = configureStore();

/* функция для подключения редьюсеров в проект*/
export function injectAsyncReducer(store: any, name: string, asyncReducer: any) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

/** Инициализация эффектов */
const effect$$ = new BehaviorSubject(undefined);
const mapEfects:{[key:string]:boolean} = {};
/* функция для подключения  эффектов*/

const rootEpic: any = (action$: any, state$: any) => effect$$.pipe(
  skip(1),
  // @ts-ignore
  mergeMap((epic) => epic && epic(action$, state$)));

observableMiddleware.run(rootEpic);

   `;
}

function commitlint () {
    return `module.exports = {
  extends: ['@ptsecurity/commitlint-config'],
  rules: {
    'header-max-length': [2, 'always', 150],
    'body-max-line-length': [2, 'always', 72],
    'footer-max-line-length': [2, 'always', 72],
    'scope-case': [2, 'always', ['lower-case']],
    'subject-case': [0, 'never', ['upper-case', 'sentence-case', 'start-case', 'pascal-case']],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'ci',
        'chore',
        'fix',
        'build',
        'release',
        'docs',
        'refactor',
        'revert',
        'style',
        'test',
        'perf',
        'merge',
        'wip'
      ]
    ]
  }
};
`;
}

function gitignore () {
    return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
**/node_modules
/.pnp
.pnp.js

# мы используем npm i, поэтому на не нужен
**/package-lock.json
/package-lock.json

# конфликты с yarn
**/yarn.lock
/yarn.lock

# testing
/coverage

# production
/build
**/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# в главный репозиторий не пушим свои конфиги, сохрняйте их локально
# добавляйте свои папки с настройками для того чтобы конфиги не коммитились
# конфиги от ide, текстовых редакторов, git програм and etc..

# webstorm
**/.idea

# mpeltonen/sbt-idea plugin
.idea_modules/

# JIRA plugin
atlassian-ide-plugin.xml

# vs code
**/.vscode

# sublime text
**/*.sublime-workspace
**/*.sublime-project

# tortoisegit
**/.tgitconfig

# файлы finder на MacOS
**/.DS_Store
**/.AppleDouble
**/.LSOverride

# кэш windows
**/Thumbs.db
**/ehthumbs.db`;
}

function gitmodules () {
    return `[submodule "${PROJECT_NAME}/src/_rootFront"]
	path = ${PROJECT_NAME}/src/_rootFront
  url = https://sbtatlas.sigma.sbrf.ru/stash/scm/sf_extensions/rootfront.git
  
`;
}

function prettierrc () {
    return `'use strict';

module.exports = {
    "arrowParens": "always",
    "endOfLine": "lf",
    "singleQuote": true,
    "trailingComma": "none",
    "jsxSingleQuote": true,
    "jsxBracketSameLine": true,
    "printWidth": 120,
    "overrides": [
        {
            "files": "*.html",
            "options": {
                "requirePragma": true
            }
        },
        {
            "files": [
                "*.spec.js",
                "*.spec.ts",
                "*.test.js",
                "*.test.jsx",
                "*.test.ts",
                "*.test.tsx"
            ],
            "options": {
                "printWidth": 100
            }
        },
        {
            "files": ["*.js", "*.jsx"],
            "options": {
                "parser": "babel"
            }
        },
        {
            "files": ["*.ts", "*.tsx"],
            "options": {
                "parser": "typescript"
            }
        },
        {
            "files": ["*.json", ".*rc", ".yaml", ".yml"],
            "options": {
                "tabWidth": 2
            }
        }
    ]
}
`;
}
function lint () {
    return `module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: [
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
    'import'
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-use-before-define': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
    'no-extend-native':0,
    'no-param-reassign': 0,
    'no-debugger': 'warn',
    'react/jsx-filename-extension': 0,
    'no-console': 0,
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    "no-unused-expressions": 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'no-irregular-whitespace': 0,
    'react/no-children-prop': 0,
    'arrow-body-style': 0,
    'no-prototype-builtins': 0,
    "jsx-a11y/anchor-is-valid": 0,
    'eol-last': 0,
    'arrow-parens': 0,
    'comma-dangle': 0,
    "no-extend-native": [2, {"exceptions": ["Date"]}],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'no-trailing-spaces': [
      'off',
      {
        IgnoreComments: true
      }
    ],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    'no-useless-return': 'warn',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1
      }
    ],
    'array-element-newline': ['warn', { multiline: true, minItems: 4 }],
    'object-curly-spacing': ['warn', 'always'],
    'object-curly-newline': [
      'warn',
      {
        ObjectExpression: { minProperties: 5, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 5, multiline: true, consistent: true },
        ImportDeclaration: { minProperties: 5, multiline: true, consistent: true },
        ExportDeclaration: { minProperties: 5, multiline: true, consistent: true }
      }
    ],
    'eqeqeq': ["error", "always"]
    // "quotes": ["error", "double"],
    // "jsx-quotes": ["error", "prefer-double"]
  }
};
`;
}

function readme () {
    return `## Установка:
\`yarn make\` - подключает сабмодуль и устанавливает зависимости. Выполняет команды \`yarn subi\` и \`yarn i\`.

\`yarn subi\` - подключить сабмодуль.

\`yarn sub\` - подтянуть изменения в сабмодуль.

\`yarn i\` - установить зависимости.

## Запуск приложения

\`yarn start:имя приложения\` - запуск локального сервера на 8000 порту.

\`yarn commit\` - коммит в репозитарий (после отдельно git push).

\`yarn build:имя приложения\` - продуктовая сборка приложения.

___
#### Все что дальше работает ТОЛЬКО после подключения сабмодулей

* Посмотреть все подзадачи которые назначены на разработчика

\`yarn jira\`

* Создать сущность редакса

\`yarn redux\`

* запустить сторибук

\`yarn story\`

    `;
}

function packageJSON () {
    return `{
  "name": "global",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "make": "yarn subi && yarn i",
    "subi": "git submodule add https://sbtatlas.sigma.sbrf.ru/stash/scm/sf_extensions/rootfront.git ${PROJECT_NAME}/src/_rootFront ",
    "sub": "git submodule update --remote",
    "start:${PROJECT_NAME}": "yarn --cwd ${PROJECT_NAME} start",
    "i": "yarn && cd ${PROJECT_NAME} && yarn && cd ..",
    "commit": "git add . && npx git-cz",
    "jira": "node ${PROJECT_NAME}/src/_rootFront/nodejs/jira/create.js --path ./",
    "redux": "node ${PROJECT_NAME}/src/_rootFront/nodejs/_cli/create.js",
    "story": "cd ${PROJECT_NAME}/src/_rootFront && yarn && yarn storybook",
    "build:test:${PROJECT_NAME}": "cd ${PROJECT_NAME} && env-cmd -f .env.test node scripts/build.js",
    "build:prod:${PROJECT_NAME}": "cd ${PROJECT_NAME} && env-cmd -f .env.production node scripts/build.js",
    "test": "node ${PROJECT_NAME}/scripts/test.js"
  },
  "dependencies": {
    "husky": "4.2.3"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^2.3.2",
    "@typescript-eslint/parser": "^2.3.2",
    "@commitlint/cli": "8.2.0",
    "@commitlint/config-conventional": "8.2.0",
    "@commitlint/prompt": "8.2.0",
    "@ptsecurity/commitlint-config": "1.0.0",
    "prettier": "1.19.1",
    "lint-staged": "10.0.7",
    "commitizen": "4.0.3",
    "git-cz": "3.3.0",
    "env-cmd": "10.1.0",
    "eslint": "6.1.0",
    "eslint-config-react-app": "5.0.2",
    "eslint-loader": "3.0.2",
    "eslint-plugin-import": "2.18.2",
    "eslint-plugin-jsx-a11y": "6.2.3",
    "eslint-plugin-react": "7.14.3",
    "eslint-plugin-flowtype": "4.6.0",
    "eslint-plugin-react-hooks": "1.6.1",
    "typescript": "3.8.2",
    "request": "2.88.2"
  },
  "eslintConfig": {
    "root": true,
    "extends": [
      "./_conf/eslint-config/index.js"
    ]
  },
  "eslintIgnore": [
    "*.{js,jsx}",
    "**/__tests__/*",
    "**/build/*",
    "**/node_modules/*",
    "serviceWorker.ts"
  ],
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --format=table --fix"
    ],
    "*.{md,json}": [
      "prettier --write"
    ]
  }

}

    `;

    //     `{
    //   "name": "main",
    //   "version": "1.0.0",
    //   "private": true,
    //   "scripts": {
    //     "subi": "git submodule add https://sbtatlas.sigma.sbrf.ru/stash/scm/sf_extensions/rootfront.git ${PROJECT_NAME}/src/_rootFront ",
    //     "sub": "git submodule update --init --recursive",
    //     "jira": "node ${PROJECT_NAME}/src/_rootFront/nodejs/jira/create.js --path ./",
    //     "cli": "node ${PROJECT_NAME}/src/_rootFront/nodejs/_cli/create.js",
    //     "/* =============== START DEV ================ */": "",
    //     "start": "yarn --cwd ${PROJECT_NAME} start",
    //      "/* ================= DEPLOY ================= */": "",
    //     "build": "yarn --cwd ${PROJECT_NAME} build",
    //     "/* ================= TEST ================= */": "",
    //     "test": "yarn --cwd ${PROJECT_NAME} test",
    //     "/* ============= CODE ANALYSIS ============== */": "",
    //     "analyze": "yarn run lint:js",
    //     "lint": "yarn run lint:js",
    //     "lint:js": "eslint --max-warnings=5 --format=table --fix --ext .ts,.tsx .",
    //     "format:css": "yarn prettier --write src/*.styles.ts",
    //     "pre-commit": "lint-staged",
    //     "/* ============== BUNDLE UTILS ============== */": "",
    //     "check": "depcheck --ignore-dirs=dist",
    //     "npm-check": "npm-check",
    //     "/* ============== UTILS ============== */": "",
    //     "i": "yarn && cd ${PROJECT_NAME} && yarn && cd .. ",
    //     "commit": "git add . && npx git-cz",
    //     "kill": "kill-port 8009 && kill-port 8001"
    //
    //   },
    //   "devDependencies": {
    //     "@babel/preset-typescript": "^7.8.3",
    //     "@commitlint/cli": "8.2.0",
    //     "@commitlint/config-conventional": "8.2.0",
    //     "@commitlint/prompt": "8.2.0",
    //     "@ptsecurity/commitlint-config": "1.0.0",
    //     "commitizen": "4.0.3",
    //     "cross-env": "6.0.3",
    //     "cross-port-killer": "1.2.1",
    //     "git-cz": "3.3.0",
    //     "husky": "3.0.9",
    //     "inquirer": "7.0.1",
    //     "lint-staged": "9.4.2",
    //     "prettier": "1.19.1",
    //     "request": "2.88.0",
    //     "rimraf": "3.0.0",
    //     "typescript": "3.7.3"
    //   },
    //   "config": {
    //     "commitizen": {
    //       "path": "git-cz"
    //     }
    //   },
    //   "husky": {
    //     "hooks": {
    //       "pre-commit": "lint-staged",
    //       "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    //     }
    //   },
    //   "eslintConfig": {
    //     "root": true,
    //     "extends": [
    //       "./_conf/eslint-config/index.js"
    //     ]
    //   },
    //   "eslintIgnore": [
    //     "*.{js,jsx}",
    //     "**/__tests__/*",
    //     "**/build/*",
    //     "**/node_modules/*",
    //     "serviceWorker.ts"
    //   ],
    //   "lint-staged": {
    //     "*.{ts,tsx}": [
    //       "eslint --format=table --fix",
    //       "git add"
    //     ],
    //     "*.{md,json}": [
    //       "prettier --write",
    //       "git add"
    //     ]
    //   },
    //   "dependencies": {
    //     "jest": "^25.1.0"
    //   }
    // }
    // `;
}

function changelog () {
    return `'use strict';
const child_process = require('child_process');
const branch=child_process.execSync("git rev-parse --abbrev-ref HEAD").toString().trim()


module.exports = {
  disableEmoji: false,
  list: [
    'feat',
    'fix',
    'merge',
    'refactor'
  ],
  maxMessageLength: 100,
  minMessageLength: 3,
  questions: ['type',  'subject'],
  types: {
    feat: {
      description: 'Добавление нового функционала',
      emoji:"["+branch+"]",
      value: 'feat'
    },
    fix: {
      description: 'Исправление ошибок',
      value: 'fix',
      emoji:"["+branch+"]",
    },
    merge: {
      description: 'Слияние веток',
      emoji:"["+branch+"]",
      value: 'merge'

    },
    refactor: {
      description: 'Правки кода без исправления ошибок или добавления новых функций',
      emoji:"["+branch+"]",
      value: 'refactor'
    }
  }
};
`;
}

function packageProj () {
    return `{
   "name": "${PROJECT_NAME.toLowerCase ()}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "/* =============== START DEV ================ */": "",
    "start": "node scripts/start.js --env.ENVIRONMENT=development",
    "/* ================= DEPLOY ================= */": "",
    "build": "node scripts/build.js",
    "build_prod": "node scripts/build.js"
  },
  "dependencies": {
    "//": "***************************Сюда добавляем кастомные либы****************************************************",
    "redux-observable": "^1.2.0",
    "axios-observable": "^1.1.3",
    "axios": "^0.19.2",
    "redux-actions": "^2.6.5",
    "redux": "^4.0.5",
    "rxjs": "^6.5.4",
    "react-redux": "^7.2.0",
    "rootFront":"git+https://github.com/mun4kin/rootFront.git#master"
  },
  "devDependencies": {
    "//": "******************************Основные компоненты сбоки****************************************************",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "@types/node": "^12.0.0",
    "@types/react": "^16.9.0",
    "@types/react-dom": "^16.9.0",
    "@types/react-redux": "^7.1.7",
    "postcss-flexbugs-fixes": "^4.1.0",
    "postcss-loader": "^3.0.0",
    "postcss-normalize": "^8.0.1",
    "postcss-preset-env": "^6.7.0",
    "postcss-safe-parser": "^4.0.1",
    "resolve": "^1.15.0",
    "camelcase": "^5.3.1",
    "@svgr/webpack": "^4.3.3",
    "webpack": "^4.41.5",
    "typescript": "^3.7.2",
    "react-app-polyfill": "^1.0.6",
    "react-dev-utils": "^10.2.0",
    "webpack-bundle-analyzer": "^3.6.0",
    "webpack-dev-server": "^3.10.2",
    "babel-plugin-named-asset-import": "^0.3.6",
    "babel-loader": "^8.0.6",
    "webpack-manifest-plugin": "^2.2.0",
    "workbox-webpack-plugin": "^4.3.1",
    "babel-preset-react-app": "^9.1.1",
    "@babel/core": "^7.8.4",
    "case-sensitive-paths-webpack-plugin": "^2.3.0",
    "css-loader": "^3.4.2",
    "file-loader": "^4.3.0",
    "fs-extra": "^8.1.0",
    "html-webpack-plugin": "4.0.0-beta.11",
    "url-loader": "^3.0.0",
    "style-loader": "0.23.1",
    "mini-css-extract-plugin": "0.9.0",
    "optimize-css-assets-webpack-plugin": "5.0.3",
    "resolve-url-loader": "3.1.1",
    "pnp-webpack-plugin": "1.6.0",
    "node-sass": "^4.13.1",
    "sass-loader": "8.0.2",
    "dotenv-expand": "5.1.0",
    "dotenv": "8.2.0",
    "//": "semver",
    "//": "identity-obj-proxy",
    "//": "ts-pnp",
    "//": "***************************Сюда добавляем кастомные либы****************************************************",
    "@types/redux-actions": "^2.6.1",
    "redux-devtools-extension": "^2.13.8"
  },
  "babel": {
    "presets": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all",
      "ie 11"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
      "ie 11"
    ]
  }
}

`;
}

function ico () {
    return `         h     (                                                    µ| µ| µ|Rµ|uµ| µ|                                 µ| µ|µ|µ|µ|›µ|Бµ|µ| µ|µ|                         µ| µ|7µ|aµ|µ|rµ|Ќµ|
µ|Fµ|Uµ| µ|         µ| µ|µ|#µ|µ|*µ|„µ|µ|µ| µ|µ|qµ|Jµ| µ|µ|µ|µ| µ|qµ|Чµ|wµ|
µ|µ| µ|µ|*µ| µ|µ|µ|Wµ|Мµ|њµ|µ| µ|µ|“µ|„µ|µ| µ| µ|[µ|lµ| µ| µ|µ|lµ| µ|6µ|     µ| µ|µ|µ|µ| µ|µ|Ёµ|¶µ|µ| µ| µ|µ|	µ| µ| µ| µ|(µ|pµ|#µ| µ| µ|5µ|йµ|рµ|Bµ| µ| µ|µ|hµ|?µ| µ| µ|'µ|lµ|"µ| µ|µ|Ґµ|Жµ|Ѕµ|№µ|µ| µ|µ|eµ|=µ|     µ| µ|µ|µ|	µ|aµ|ѓµ|‚µ|њµ|“µ|…µ|µ|µ|
µ| µ| µ| µ|µ|–µ|…µ|µ|µ|µ|‡µ|®µ|µ|µ|µ|mµ|ўµ|8µ| µ| µ|rµ|Цµ|vµ|	µ|µ|µ|	µ|
µ| µ|µ|µ|Vµ|Лµ|њµ|µ| µ|µ|!µ|µ|+µ|†µ|µ|µ|µ|µ|rµ|Kµ| µ|µ|µ|            µ| µ|6µ|_µ|µ|tµ|Џµ|
µ|Dµ|Sµ| µ|                     µ| µ|µ|µ|µ|љµ|Бµ|µ| µ|µ|                                 µ| µ| µ|Pµ|rµ| µ|                     ю?  р/  р      Ђ@  †a  Д#  Њ1  €  А  Ђ  Ђ       р  р'  ю?  `;
}

function manifest () {
    return `{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`;
}
function indexHTML () {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8"/>
    <base href="/"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta name="theme-color" content="#000000"/>
    <link rel="manifest" crossorigin="use-credentials" href="%PUBLIC_URL%/manifest.json"/>
    <title>RootFrontProject</title>

</head>
<body>
<noscript>Вам нужно разрешить использование JavaScript, чтобы использовать это приложение.</noscript>
<div id="root"></div>
<div id="modal"></div>
</body>
</html>

`;
}
function reduxIndex () {
    return `import { addEpics, injectAsyncReducer, store } from '../_utils/redux';
  /*[imports:end] Место автоматической вставки импортов черей yarn redux */

export const initRedux = () => {
  /*[reducers:end] Место автоматической вставки импортов черей yarn redux */
  /*[effects:end] Место автоматической вставки импортов черей yarn redux */
};

`;
}
function webpackDevServerConfig () {
    return `'use strict';

const fs = require('fs');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const paths = require('./paths');
const getHttpsConfig = require('./getHttpsConfig');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function(proxy, allowedHost) {
  return {
    // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
    // websites from potentially accessing local content through DNS rebinding:
    // https://github.com/webpack/webpack-dev-server/issues/887
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // However, it made several existing use cases such as development in cloud
    // environment or subdomains in development significantly more complicated:
    // https://github.com/facebook/create-react-app/issues/2271
    // https://github.com/facebook/create-react-app/issues/2233
    // While we're investigating better solutions, for now we will take a
    // compromise. Since our WDS configuration only serves files in the \`public\`
    // folder we won't consider accessing them a vulnerability. However, if you
    // use the \`proxy\` feature, it gets more dangerous because it can expose
    // remote code execution vulnerabilities in backends like Django and Rails.
    // So we will disable the host check normally, but enable it if you have
    // specified the \`proxy\` setting. Finally, we let you override it if you
    // really know what you're doing with a special environment variable.
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in 'public' directory
    // get served. Our build script will copy 'public' into the 'build' folder.
    // In 'index.html', you can get URL of 'public' folder with %PUBLIC_URL%:
    // link rel="icon" href="%PUBLIC_URL%/favicon.ico"
    // In JavaScript code, you can access it with \`process.env.PUBLIC_URL\`.
    // Note that we only recommend to use \`public\` folder as an escape hatch
    // for files like \`favicon.ico\`, \`manifest.json\`, and libraries that are
    // for some reason broken when imported through webpack. If you just want to
    // use an image, put it in \`src\` and \`import\` it from JavaScript instead.
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    // By default files from \`contentBase\` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // Use 'ws' instead of 'sockjs-node' on server since we're using native
    // websockets in 'webpackHotDevClient'.
    transportMode: 'ws',
    // Prevent a WS client from getting injected as we're already including
    // 'webpackHotDevClient'.
    injectClient: false,
    // Enable custom sockjs pathname for websocket connection to hot reloading server.
    // Enable custom sockjs hostname, pathname and port for websocket connection
    // to hot reloading server.
    sockHost,
    sockPath,
    sockPort,
    // It is important to tell WebpackDevServer to use the same "publicPath" path as
    // we specified in the webpack config. When homepage is '.', default to serving
    // from the root.
    // remove last slash so user can land on \`/test\` instead of \`/test/\`
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with \`compiler.hooks[...].tap\` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebook/create-react-app/issues/293
    // src/node_modules is not ignored to support absolute imports
    // https://github.com/facebook/create-react-app/issues/1065
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    https: getHttpsConfig(),
    host,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    public: allowedHost,
    // \`proxy\` is run between \`before\` and \`after\` \`webpack-dev-server\` hooks
    proxy,
    before(app, server) {
      // Keep \`evalSourceMapMiddleware\` and \`errorOverlayMiddleware\`
      // middlewares before \`redirectServedPath\` otherwise will not have any effect
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server));
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        require(paths.proxySetup)(app);
      }
    },
    after(app) {
      // Redirect to \`PUBLIC_URL\` or \`homepage\` from \`package.json\` if url not match
      app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
};
`;
}

function webpackConfig () {
    return `'use strict';
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const postcssNormalize = require('postcss-normalize');

const appPackageJson = require(paths.appPackageJson);

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes
const cssRegex = /\\.css$/;
const cssModuleRegex = /\\.module\\.css$/;
const sassRegex = /\\.(scss|sass)$/;
const sassModuleRegex = /\\.module\\.(scss|sass)$/;

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  // Variable used for enabling profiling in Production
  // passed into alias object. Uses a flag if passed into the build command
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile');

  // We will provide \`paths.publicUrlOrPath\` to our app
  // as %PUBLIC_URL% in \`index.html\` and \`process.env.PUBLIC_URL\` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  // common function to get style loaders
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        // css is located in \`static/css\`, use '../../' to locate index.html folder
        // in production \`paths.publicUrlOrPath\` can be a relative path
        options: paths.publicUrlOrPath.startsWith('.')
          ? { publicPath: '../../' }
          : {},
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: [
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience for Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      // require.resolve('webpack-dev-server/client') + '?/',
      // require.resolve('webpack/hot/dev-server'),
      isEnvDevelopment &&
        require.resolve('react-dev-utils/webpackHotDevClient'),
      // Finally, this is your app's code:
      paths.appIndexJs,
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
    ].filter(Boolean),
    output: {
      // The build folder.
      path: isEnvProduction ? paths.appBuild : undefined,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      // TODO: remove this when upgrading to webpack 5
      futureEmitAssets: true,
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      // webpack uses \`publicPath\` to determine where the app is being served from.
      // It requires a trailing slash, or the file assets will get an incorrect path.
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.publicUrlOrPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\\\/g, '/')),
      // Prevents conflicts when multiple webpack runtimes (from different apps)
      // are used on the same page.
      jsonpFunction: "webpackJsonp" + appPackageJson.name,
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },

    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          sourceMap: shouldUseSourceMap,
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  // \`inline: false\` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // \`annotation: true\` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true,
                }
              : false,
          },
          cssProcessorPluginOptions: {
            preset: ['default', { minifyFontValues: { removeQuotes: false } }],
          },
        }),
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // https://github.com/facebook/create-react-app/issues/5358
      runtimeChunk: {
        name: entrypoint => "runtime-" + entrypoint.name,
      },
    },
    resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want \`node_modules\` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // \`web\` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions
        .map(ext => "." + ext)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin,
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      ],
    },
    resolveLoader: {
      plugins: [

        // Also related to Plug'n'Play, but this time it tells webpack to load its loaders
        // from the current package.
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },

        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing \`test\` is equivalent to a match.
            {
              test: [/\\.bmp$/, /\\.gif$/, /\\.jpe?g$/, /\\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test: /\\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                presets: ["react-app"],
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                ],
                // This is a feature of \`babel-loader\` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\\.(js|mjs)$/,
              exclude: /@babel(?:\\/|\\\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                
                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps: shouldUseSourceMap,
                inputSourceMap: shouldUseSourceMap,
              },
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject style tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: cssModuleRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              }),
            },
            // Opt-in support for SASS (using .scss or .sass extensions).
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'sass-loader'
              ),
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you \`import\` an asset, you get its (virtual) filename.
            // In production, they would get copied to the \`build\` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader: require.resolve('file-loader'),
              // Exclude \`js\` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude \`html\` and \`json\` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\\.(js|mjs|jsx|ts|tsx)$/, /\\.html$/, /\\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    plugins: [

      // Generates an \`index.html\` file with the script injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
            isEnvProduction && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../report/report.html',
        openAnalyzer: true
      }),
      
      
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // link rel="icon" href="%PUBLIC_URL%/favicon.ico"
      // It will be an empty string unless you specify "homepage"
      // in \`package.json\`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See \`./env.js\`.
      // It is absolutely essential that NODE_ENV is set to production
      // during a production build.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin(env.stringified),
      // This is necessary to emit hot updates (currently CSS only):
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      // If you require a missing module and then \`npm install\` it, you still have
      // to restart the development server for webpack to discover it. This plugin
      // makes the discovery automatic so you don't have to restart.
      // See https://github.com/facebook/create-react-app/issues/186
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   \`index.html\`
      // - "entrypoints" key: Array of files which are included in \`index.html\`,
      //   can be used to reconstruct the HTML if necessary
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\\.\\/locale$/, /moment$/),
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the webpack build.
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\\.map$/, /asset-manifest\\.json$/],
          importWorkboxFrom: 'cdn',
          navigateFallback: paths.publicUrlOrPath + 'index.html',
          navigateFallbackBlacklist: [
            // Exclude URLs starting with /_, as they're likely an API call
            new RegExp('^/_'),
            // Exclude any URLs whose last part seems to be a file extension
            // as they're likely a resource and not a SPA route.
            // URLs containing a "?" character won't be blacklisted as they're likely
            // a route with query params (e.g. auth callbacks).
            new RegExp('/[^/?]+\\\\.[^/]+$'),
          ],
        }),
      // TypeScript type checking
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          typescript: resolve.sync('typescript', {
            basedir: paths.appNodeModules,
          }),
          async: isEnvDevelopment,
          useTypescriptIncrementalApi: true,
          checkSyntacticErrors: true,
          resolveModuleNameModule: process.versions.pnp
            ? __dirname + "/pnpTs.js"
            : undefined,
          resolveTypeReferenceDirectiveModule: process.versions.pnp
            ? __dirname + "/pnpTs.js"
            : undefined,
          tsconfig: paths.appTsConfig,
          reportFiles: [
            '**',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!**/src/setupProxy.*',
            '!**/src/setupTests.*',
          ],
          silent: true,
          // The formatter is invoked directly in WebpackDevServerUtils during development
          formatter: isEnvProduction ? typescriptFormatter : undefined,
        }),
    ].filter(Boolean),
    // Some libraries import Node modules but don't use them in the browser.
    // Tell webpack to provide empty mocks for them so importing them works.
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};
`;
}

function getHTTPConfig () {
    return `'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const chalk = require('react-dev-utils/chalk');
const paths = require('./paths');

// Ensure the certificate and key provided are valid and if not
// throw an easy to debug error
function validateKeyAndCerts({ cert, key, keyFile, crtFile }) {
  let encrypted;
  try {
    // publicEncrypt will throw an error with an invalid cert
    encrypted = crypto.publicEncrypt(cert, Buffer.from('test'));
  } catch (err) {
    throw new Error(
      "The certificate " + chalk.yellow(crtFile) + " is invalid.\\n" + err.message
    );
  }

  try {
    // privateDecrypt will throw an error with an invalid key
    crypto.privateDecrypt(key, encrypted);
  } catch (err) {
    throw new Error(
      "The certificate " + chalk.yellow(keyFile) + " is invalid.\\n" + err.message
    );
  }
}

// Read file and throw an error if it doesn't exist
function readEnvFile(file, type) {
  if (!fs.existsSync(file)) {
    throw new Error(
      "You specified " + chalk.cyan(type) + " in your env, but the file " + chalk.yellow(file) + " can't be found."
    );
  }
  return fs.readFileSync(file);
}

// Get the https config
// Return cert files if provided in env, otherwise just true or false
function getHttpsConfig() {
  const { SSL_CRT_FILE, SSL_KEY_FILE, HTTPS } = process.env;
  const isHttps = HTTPS === 'true';

  if (isHttps && SSL_CRT_FILE && SSL_KEY_FILE) {
    const crtFile = path.resolve(paths.appPath, SSL_CRT_FILE);
    const keyFile = path.resolve(paths.appPath, SSL_KEY_FILE);
    const config = {
      cert: readEnvFile(crtFile, 'SSL_CRT_FILE'),
      key: readEnvFile(keyFile, 'SSL_KEY_FILE'),
    };

    validateKeyAndCerts({ ...config, keyFile, crtFile });
    return config;
  }
  return isHttps;
}

module.exports = getHttpsConfig;`;
}

function envJS () {
    return `'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  paths.dotenv + "." + NODE_ENV + ".local",
  paths.dotenv + "." + NODE_ENV ,
  // Don't include \`.env.local\` for \`test\` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && "paths.dotenv" + ".local",
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to \`NODE_PATH\`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to \`NODE_PATH\` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from \`NODE_PATH\` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in \`public\`.
        // For example, img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the \`src\` and \`import\` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection \`hostname\`, \`pathname\` and \`port\`
        // in webpackHotDevClient. They are used as the \`sockHost\`, \`sockPath\`
        // and \`sockPort\` options in webpack-dev-server.
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
      }
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;`;
}

function pnpTS () {
    return `'use strict';

const { resolveModuleName } = require('ts-pnp');

exports.resolveModuleName = (
  typescript,
  moduleName,
  containingFile,
  compilerOptions,
  resolutionHost
) => {
  return resolveModuleName(
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost,
    typescript.resolveModuleName
  );
};

exports.resolveTypeReferenceDirective = (
  typescript,
  moduleName,
  containingFile,
  compilerOptions,
  resolutionHost
) => {
  return resolveModuleName(
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost,
    typescript.resolveTypeReferenceDirective
  );
};
`;
}
function paths () {
    return `'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use \\PUBLIC_URL\\ environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right 'script' hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We cant use a relative path in HTML because we dont want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(filePath+"."+extension))
  );

  if (extension) {
    return resolveFn(filePath+"."+extension);
  }

  return resolveFn(filePath+".js");
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
`;
}

function modules () {
    return `'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const chalk = require('react-dev-utils/chalk');
const resolve = require('resolve');

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const baseUrl = options.baseUrl;

  // We need to explicitly check for null and undefined (and not a falsy value) because
  // TypeScript treats an empty string as \`.\`.
  if (baseUrl == null) {
    // If there's no baseUrl set we respect NODE_PATH
    // Note that NODE_PATH is deprecated and will be removed
    // in the next major release of create-react-app.

    const nodePath = process.env.NODE_PATH || '';
    return nodePath.split(path.delimiter).filter(Boolean);
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  // We don't need to do anything if \`baseUrl\` is set to \`node_modules\`. This is
  // the default behavior.
  if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
    return null;
  }

  // Allow the user set the \`baseUrl\` to \`appSrc\`.
  if (path.relative(paths.appSrc, baseUrlResolved) === '') {
    return [paths.appSrc];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of \`src\`. We do allow importing them with the
  // absolute path (e.g. \`src/Components/Button.js\`) but we set that up with
  // an alias.
  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return null;
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold(
      "Your project's \`baseUrl\` can only be set to \`src\` or \`node_modules\`." +
        ' Create React App does not support other values at this time.'
    )
  );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      src: paths.appSrc,
    };
  }
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      '^src/(.*)$': '<rootDir>/src/$1',
    };
  }
}

function getModules() {
  // Check if TypeScript is setup
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  const hasJsConfig = fs.existsSync(paths.appJsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.'
    );
  }

  let config;

  // If there's a tsconfig.json we assume it's a
  // TypeScript project and set up the config
  // based on tsconfig.json
  if (hasTsConfig) {
    const ts = require(resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }));
    config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
    // Otherwise we'll check if there is jsconfig.json
    // for non TS projects.
  } else if (hasJsConfig) {
    config = require(paths.appJsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths: additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

module.exports = getModules();
`;
}

function tsconfigN () {
    return `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "plugins": [
      {
        "name": "typescript-styled-plugin",
        "tags": ["css", ".css", "styled", "styles"]
      }
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "removeComments": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": false,
    "noEmit": true,
    "jsx": "preserve",
    "outDir": "build"
  },
  "files": ["custom.d.ts"],
  "exclude": [
    "**/node_modules/*",
    "**/_assets/*",
    "**/build/*",
    "**/scripts/*",
    "**/acceptance-tests/*",
    "**/webpack/*",
    "**/jest/*",
    "**/setupTests.ts"
  ],
  "include": ["src"],
  "esModuleInterop": true
}
`;
}

function customType () {
    return `// declare module '*.svg?inline' {
//   const content: any;
//   export default content
// }

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module "*.png" {
  const value: any;
  export default value;
}
`;
}

function serviceWorker () {
    return `// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      (process as { env: { [key: string]: string } }).env.PUBLIC_URL,
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = process.env.PUBLIC_URL + "/service-worker.js";

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker === null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType !== null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
`;
}

function index () {
    return `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import intercept from './_utils/interceptor';
import { Provider } from 'react-redux';
import { store } from './_utils/redux';

/** Подключаем интерцептор */
intercept();
ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
    `;
}
function interceptor () {
    return `import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';
import { of } from 'rxjs';

/** Interceptors */
const intercept = () => {
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers.hasOwnProperty('NOINTERCEPT')) {
        return config;
      }
      // авторизация на дев стенде
      if (process.env.REACT_APP_ENV === 'dev') {
        config.headers.Authorization = process.env.REACT_APP_BASIC_AUTH;
      }
      //  стандартный конфиг ссылки
      config.url = (process.env.REACT_APP_HOST as string) + config.url;

      return config;
    },
    (error) => {
      return of(new Error(error));
    }
  );
};

export default intercept;
 `;
}
function appTSX () {
    return `import React, { useEffect } from 'react';
import { initRedux } from './_store';
import './App.scss';
// import { useDispatch } from 'react-redux';

const App = () => {
  // const dispatch = useDispatch();
  // Инициализация redux стора
  useEffect(() => {
    initRedux();

  }, []);

  return (
    <div className="App">
      <div className="preview">
        <h1 className='preview__title'><span className='preview__title--green'>Sberbank</span> Template</h1>
      </div>
    </div>
  );
};

export default App;

`;
}

function appSCSS () {
    return `//@import './_reactShared/ui/uiScss/atoms/Input/career-Input';
//@import './_reactShared/ui/uiScss/atoms/Textarea/career-Textarea';
//@import './_reactShared/ui/uiScss/atoms/Checkbox/career-Checkbox';

// После подключения темы из сабмодуля удалить эти переменные
$grey: #161B22;
$text_grey: #939FB1;
$white: #ffffff;
$black: #000000;
$primary: #19BB4F;
$secondary: #E6F8EA;
$accent: #EC4141;
$mint: #C8F5E4;
$form_border: #dbdbdb;
$border: #89929C;
$border-light: #D8D8D8;
$purple: #9B51E0;
$purple_secondary: #EBE6F8;

html {
  height: 100%;
  font-size: 16px;
}

body {
  height: 100%;
  min-width: 1024px;
  min-height: 700px;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fefefe;
  cursor: default;
}

// Фикс баунса в сафари
@media (max-width: 768px) {
  html,
  body {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
  }
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

h1,
h2,
h3,
h4,
h5,
h6,
ul,
p,
input,
button,
textarea {
  margin: 0;
  padding: 0;
  font-family: inherit;
}

input,
textarea {
  font-family: 'SBSansDisplay', sans-serif;
}

// сброс стилей для отображения на мобильных устройствах
input,
textarea {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
}

// кастомный скролл
::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  position: relative;
  left: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(85, 85, 85, 0.3);
}

// запрет на ресайз textarea
body textarea {
  resize: none;
}

a {
  text-decoration: none;
}

button,
input,
textarea,
a {
  outline: none;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 0;
  }
}

// Classes

#root {
  max-width: 1920px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;
}

.root {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
}

input:focus {
  color: $black;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: $text_grey;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
  color: $text_grey;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: $text_grey;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
  color: $text_grey;
}

.no-event {
  pointer-events: none;
}

.popup-content__container {
  padding: 50px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  margin: 0;
}

.short__submit {
  max-width: 364px;
}

// Стили элементов начальной страницы

.preview {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.preview__title {
  font-size: 3rem;
}

.preview__title--green {
  color: $primary;
}

`;
}

function startScript () {
    return `'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');


const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      "Attempting to bind to HOST environment variable: "+chalk.yellow(chalk.bold(process.env.HOST))
    )
  );
  console.log(
    "If this was unintentional, check that you haven't mistakenly set it in your shell."
  );
  console.log(
    "Learn more here:" + chalk.yellow('https://bit.ly/CRA-advanced-config')
  );
  console.log();
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const config = configFactory('development');
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
    const urls = prepareUrls(protocol, HOST, port);
    const devSocket = {
      warnings: warnings =>
        devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: errors =>
        devServer.sockWrite(devServer.sockets, 'errors', errors),
    };
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      useTypeScript,
      tscCompileOnError,
      webpack,
    });
    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    // Serve webpack assets generated by the compiler over a web server.
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }


      if (process.env.NODE_PATH) {
        console.log(
          chalk.yellow(
            'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
          )
        );
        console.log();
      }

      console.log(chalk.cyan('Starting the development server...\\n'));
      openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
`;
}

function buildScript () {
    return `'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');


const path = require('path');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Generate configuration
const config = configFactory('production');

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // First, read the current file sizes in build directory.
    // This lets us display how much they changed later.
    return measureFileSizesBeforeBuild(paths.appBuild);
  })
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\\n'));
        console.log(warnings.join('\\n\\n'));
        console.log(
          '\\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\\n'));
      }

      console.log('File sizes after gzip:\\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
      if (tscCompileOnError) {
        console.log(chalk.yellow(
          'Compiled with the following type errors (you may want to check these before deploying your app):\\n'
        ));
        printBuildError(err);
      } else {
        console.log(chalk.red('Failed to compile.\\n'));
        printBuildError(err);
        process.exit(1);
      }
    }
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  // We used to support resolving modules according to \`NODE_PATH\`.
  // This now has been deprecated in favor of jsconfig/tsconfig.json
  // This lets you use absolute paths in imports inside large monorepos:
  if (process.env.NODE_PATH) {
    console.log(
      chalk.yellow(
        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.'
      )
    );
    console.log();
  }

  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\\n\\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\\nTreating warnings as errors because process.env.CI = true.\\n' +
              'Most CI servers set it automatically.\\n'
          )
        );
        return reject(new Error(messages.warnings.join('\\n\\n')));
      }

      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
`;
}

function testScript () {
    return `'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');


const jest = require('jest');
const execSync = require('child_process').execSync;
let argv = process.argv.slice(2);

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Watch unless on CI or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--watchAll') === -1 &&
  argv.indexOf('--watchAll=false') === -1
) {
  // https://github.com/facebook/create-react-app/issues/5210
  const hasSourceControl = isInGitRepository() || isInMercurialRepository();
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}


jest.run(argv);

`;
}

function tsconfigJSON () {
    return `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "plugins": [
      {
        "name": "typescript-styled-plugin",
        "tags": ["css", ".css", "styled", "styles"]
      }
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "removeComments": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": false,
    "noEmit": true,
    "jsx": "preserve",
    "outDir": "build"
  },
  "files": ["custom.d.ts"],
  "exclude": [
    "**/node_modules/*",
    "**/_assets/*",
    "**/build/*",
    "**/scripts/*",
    "**/acceptance-tests/*",
    "**/webpack/*",
    "**/jest/*",
    "**/setupTests.ts"
  ],
  "include": ["src"],
  "esModuleInterop": true
}
`;
}
