import { component$, useStore,
    useContextProvider,
    createContext, } from '@builder.io/qwik';
import { Desc, PortfolioImgGlryPhoto } from '~/types';
import R from '../R';
import RDescs from './RDescs';
import RImgGlry from './RImgGlry';
import RTitle from './RTitle';

export interface RPortfolioProps{
  title: string,
  photos: Array<PortfolioImgGlryPhoto>
  descs: Array<Desc>
}
    
export default component$((props: RPortfolioProps) => {
    
    return(
      <R>
        <RImgGlry q:slot='landing' photos={props.photos} />
        <RDescs q:slot='content' descs={props.descs}/>
      </R>
      )

})