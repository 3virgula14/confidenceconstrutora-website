import { component$,useContext, } from '@builder.io/qwik';
import {PortfolioImgGlryPhoto} from '../../types'

export interface RImgProps {
    index: number,
    d: PortfolioImgGlryPhoto
}

export default component$((props: RImgProps) => {
    let {d, index} = props
    return (
        <div 
          className={`item `} 
          id={`img-galery-item#${index}`}
          style="height: 300px">
          <img 
            onClick$={(e:MouseEvent) => {
              if(e.target){
                let test:boolean = false;
                let parentElement = (e.target as HTMLDivElement).parentElement;
                if(parentElement){
                  test = parentElement.classList.contains("actived")
                  parentElement.classList[`${!test ? "add": "remove"}`]("actived") 
                  if(!test) {
                    let imgGlr = document.querySelector("#img-galery")
                    if(imgGlr!=null)
                      imgGlr.scrollTop = 0
                  }
                }
              }
            }}
          src={d.src} alt={d.caption} />
          <span style={{pointerEvents: 'none'}}>
            <caption>
              {d.caption}
            </caption>
            {d.full_desc}
          </span>
        </div>
        )

});