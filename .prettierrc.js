'use strict';

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
