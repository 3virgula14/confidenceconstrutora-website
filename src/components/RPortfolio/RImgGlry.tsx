import { component$, } from '@builder.io/qwik';
import {PortfolioImgGlryPhoto} from '../../types'
import RImg from './RImg';


interface RImgGlryProps {
  photos: Array<PortfolioImgGlryPhoto>
} 

export default component$((props: RImgGlryProps) => {
  if(!props.photos)
    return (<></>)
  return(
    <div id="img-galery">
      {props.photos.map((d:PortfolioImgGlryPhoto, index:number) => <RImg d={d} index={index}/>)}
    </div>
  )
});