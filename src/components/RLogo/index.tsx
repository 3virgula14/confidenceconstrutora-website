import { component$, useStore,
    useContextProvider,
    createContext,
    useContext, } from '@builder.io/qwik';
import { LogoRestModeProps } from '~/types';
import { LogoRestModeContext, NavigationContext, PageTypes, PortfolioPageProps } from '../L';


export interface RLogoProps{
    dataIndex: number,    
    dataIndexAttribute: string,
    data: any,
    location: string,
}

 interface NavigatorStateStruct {
    dataIndex: number,
    dataIndexAttribute: string,
    dataType: string
  }

import "./styles.css";

export default  component$((props: RLogoProps) => {   
    const state = useStore({
        lowPage: false
    })
    
    let driverParam2 = (flag?: string, value?: number) => {
            if(!(flag && value)) return parseInt(props.location)
            if(flag == ("+"))
                if((parseInt(props.location) + value) <= props.data.length)
                    return parseInt(props.location) + value
                else return (parseInt(props.location))
            
                    
            if(flag == ("-")) {
                if((parseInt(props.location) - value) > 0)
                    return (parseInt(props.location) - value)
                else return (parseInt(props.location))
            }
    }

    let LogoRestMode:LogoRestModeProps = useContext(LogoRestModeContext) as LogoRestModeProps;

    let NavigatorLocalState = useContext(NavigationContext) as any;
    
    return (
        <div id="LogoNavigator">
            <div id="bar">
                
                <div id="nav_links"
                    style="
                        width: 200px;
                        display: flex;
                        justify-content: space-between;
                        border-right: 2px solid #333333e6;
                        padding-right: 26px;
                        pointer-events: all;
                    "
                    >
                    <a style="color: #222;
                        text-decoration: none;" href="/sobre">Quem Somos</a>
                    <a style="color: #222;
                        text-decoration: none;"   href="/porfolio">Portfólio</a></div>
                
                <title>{(props.data[parseInt(props.location)-1] || {title:""}).title}</title>
                <span style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        gap: "3px",
                        cursor: "pointer",
                        pointerEvents: "all"}}>

                    <a href={ "/"+(parseInt(props.location) - 1) }>
                        <svg style={{transform: "rotate(180deg)"}} class="wh-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                    <span>{driverParam2()}/{props.data.length}</span>
                    
                        <a href={ "/"+(parseInt(props.location) + 1) }>
                            <svg class="wh-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                </span>
            </div>
            
            <div id="img">
            <img onClick$={(e)=> {
                let parentNode = ((e.target as HTMLElement).parentNode as any)
                let contains = parentNode.classList.contains("activated");
                parentNode.classList[`${contains? "remove": "add"}`]("activated");
                
            }} src={"favicon.png"} />
            </div>
        </div>
    )
})
