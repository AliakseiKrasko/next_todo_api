import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import nextPlugin from "@next/eslint-plugin-next"
import prettier from "eslint-plugin-prettier"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    // Базовые рекомендованные правила JS
    js.configs.recommended,

    // Рекомендованные правила для TypeScript (включают парсер)
    ...tseslint.configs.recommended,

    // Общие настройки для исходников
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react,
            "@next/next": nextPlugin,
            prettier,
        },
        settings: {
            react: { version: "detect" },
        },
        rules: {
            // Правила Next.js (core-web-vitals)
            ...nextPlugin.configs["core-web-vitals"].rules,

            // Рекомендованные правила React
            ...react.configs.recommended.rules,

            // Не требовать импорт React в JSX (Next сам всё делает)
            "react/react-in-jsx-scope": "off",

            // Пробрасываем Prettier как правило ESLint
            "prettier/prettier": [
                "error",
                {
                    singleQuote: false,
                    semi: false,
                    endOfLine: "lf",
                    trailingComma: "es5",
                    printWidth: 100,
                    tabWidth: 4,
                },
            ],
        },
    },

    // Игнорируем служебные директории
    {
        ignores: ["node_modules", ".next", "dist", "coverage"],
    },
]
