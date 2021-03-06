interface ImportMetaEnv {
    readonly VITE_ALGOLIA_APP_ID: string
    readonly VITE_ALGOLIA_APP_READ_KEY: string
    readonly VITE_API_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}