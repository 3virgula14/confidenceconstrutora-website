import { component$, useContext, useContextProvider, useStore } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import {  NavigationContext } from '~/components/L';
import RLogo from '~/components/RLogo';
import RPortfolio from '~/components/RPortfolio';
import mockData from "../../public/mockData.json";

import "../components/img-galery.css";
import "./content.css"

export default component$(() => {
  
  const location = {params:{port_id:"0"}};
  
  const state = useStore({
    dataIndex: location.params.port_id,
    dataIndexAttribute: "title",
    dataType: "portfolio"
  })

  useContextProvider(NavigationContext, state);
  
  let derivedData = JSON.parse(JSON.stringify(mockData))
  let c_data = derivedData[state.dataType as string][(parseInt(state.dataIndex) | 0)-1]; //todo: link mockData and dataType together
  let indexStr= state.dataIndex.toString();

  return (
    <div id="whole">
      <RLogo 
        location={indexStr}
        data={mockData["portfolio"]} 
        dataIndex={state.dataIndex} 
        dataIndexAttribute={state.dataIndexAttribute}>
        <div>
          <a> Quem Somos </a>
          <a> Portfólio </a>
        </div>
      </RLogo>
      <RPortfolio 
        descs={c_data.descs}
        photos={c_data.photos}
        title={c_data.title}
      />
    </div>
  );
});
