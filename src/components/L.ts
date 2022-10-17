import { createContext } from "@builder.io/qwik"

export interface GaleryImg {
    src: string,
    caption: string,
    full_desc?: string
}

export interface Desc {
    sessionTitle?: string,
    text: string
}

export interface PortfolioPageProps {
    photos: Array<GaleryImg>,
    title: string,
    descs: Array<Desc>
}

export interface AboutPageProps {
    title: string,
    descs: Array<Desc>
}

export type PageTypes = (AboutPageProps | Array<PortfolioPageProps>)

export const NavigationContext = createContext("contexto de navegação da pagina")
export const LogoRestModeContext = createContext("LogoRestModeContext activated")
