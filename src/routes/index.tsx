import { component$, useContext, useContextProvider, useStore } from '@builder.io/qwik';
import {  NavigationContext } from '~/components/L';
import RLogo from '~/components/RLogo';
import RPortfolio from '~/components/RPortfolio';
import mockData from "../../dist/public/mockData.json";

import "../components/img-galery.css";
import "./content.css"

export default component$(() => {
  
  const state = useStore({
    dataIndex: "1",
    dataIndexAttribute: "title",
    dataType: "portfolio"
  })

  useContextProvider(NavigationContext, state);
  
  let derivedData = JSON.parse(JSON.stringify(mockData))
  let derivedDataKeys = Object.keys(derivedData);
  let indexedData = derivedDataKeys[derivedDataKeys.indexOf(state.dataType as string)]
  let c_data = derivedData[indexedData][parseInt(state.dataIndex)]; //todo: link mockData and dataType together
  console.log(c_data)
  return (
    <div id="whole">
      <RLogo 
        location={ state.dataIndex.toString()}
        data={derivedData[indexedData]} 
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
