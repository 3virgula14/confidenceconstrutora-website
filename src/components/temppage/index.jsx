
import { component$ } from '@builder.io/qwik';
import './index.css';
const mockData = {
  photos: [{
    titulo: "Portfólio - Título de teste",
    imagem: "https://www.construtoraconfidence.com/favicon.png",
    d_short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur tempus scelerisque. In hac habitasse platea dictumst. Integer ornare varius nisi, eu aliquet nibh placerat a. Pellentesq",
    d_full: `
    ## Lists
    
    Unordered
    
    + Create a list by starting a line with `+`, `-`, or `*`
    + Sub-lists are made by indenting 2 spaces:
      - Marker character change forces new list start:
        * Ac tristique libero volutpat at
        + Facilisis in pretium nisl aliquet
        - Nulla volutpat aliquam velit
    + Very easy!
    
    Ordered
    
    1. Lorem ipsum dolor sit amet
    2. Consectetur adipiscing elit
    3. Integer molestie lorem at massa
    
    
    1. You can use sequential numbers...
    1. ...or keep all the numbers as \`1.\`
    
    Start numbering with offset:
    
    57. foo
    1. bar
    
    
    ## Code
    
    Inline \`code\`
    
    Indented code
    
        // Some comments
        line 1 of code
        line 2 of code
        line 3 of code
    
    
    Block code "fences"
    
    ``\`
    Sample text here...
    ``\`
    
    Syntax highlighting
    
    ``\` js
    var foo = function (bar) {
      return bar++;
    };
    
    console.log(foo(5));
    ``\`
    
    ## Tables
    
    | Option | Description |
    | ------ | ----------- |
    | data   | path to data files to supply the data that will be passed into templates. |
    | engine | engine to be used for processing templates. Handlebars is the default. |
    | ext    | extension to be used for dest files. |
    
    Right aligned columns
    
    | Option | Description |
    | ------:| -----------:|
    | data   | path to data files to supply the data that will be passed into templates. |
    | engine | engine to be used for processing templates. Handlebars is the default. |
    | ext    | extension to be used for dest files. |
    
    `
  }]
}

export default component$(() => {
  return (
  <div id="temp_page" style="">
    {/* <img src={PostData.photos[0].image} alt="" /> */}
  </div>
  )
})
 