import { component$, useContext, useContextProvider, useStore } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { LogoRestModeContext, NavigationContext } from '~/components/L';
import RLogo from '~/components/RLogo';
import RPortfolio from '~/components/RPortfolio';
import mockData from "../../../public/mockData.json";

import "../../components/img-galery.css";
import "../content.css"

export default component$(() => {
  const state = useStore({
    dataIndex: 0,
    dataIndexAttribute: "title",
    dataType: "portfolio"
  })

  useContextProvider(NavigationContext, state);

  const logoRestModeInitialState = useStore({activated: true})
  useContextProvider(LogoRestModeContext, logoRestModeInitialState)

  const location = useLocation();
  // console.log("Location: ", location)
  let c_data = mockData["portfolio"][state.dataIndex]; //todo: link mockData and dataType together
  
  return (
    <div id="whole">
      <RLogo 
        data={mockData["portfolio"]} 
        dataIndex={state.dataIndex} 
        dataIndexAttribute={state.dataIndexAttribute}/>
      <RPortfolio 
        descs={c_data.descs}
        photos={c_data.photos}
        title={c_data.title}
      />
    </div>
  );
});
