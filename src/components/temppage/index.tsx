
import { component$, useStore } from '@builder.io/qwik';
import './index.css';
import md from 'markdown-it';


export default component$(() => {
  const actived_class_css = "actived" 
  const opacity_class_css = "no-opacity"
  let state = useStore({scrollback: false, actived_class: false, opacity_class: false, bg: "https://picsum.photos/1300/1000"});

  const mockData:any = [{
      titulo: "Portfólio - Título de teste",
      photos: [
        {
          src: "https://picsum.photos/1900/1000",
          alt: "Foto de construção #1"
        },{
          src: "https://picsum.photos/1800/1000",
          alt: "Foto de construção #1"
        },{
          src: "https://picsum.photos/1700/1000",
          alt: "Foto de construção #1"
        },{
          src: "https://picsum.photos/1600/1000",
          alt: "Foto de construção #1"
        },{
          src: "https://picsum.photos/1500/1000",
          alt: "Foto de construção #1"
        },{
          src: "https://picsum.photos/1400/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/1200/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/1300/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/1000/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/900/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/2000/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/2100/1000",
          alt: "Foto de construção #1"
        },
        {
          src: "https://picsum.photos/2200/1000",
          alt: "Foto de construção #1"
        },

      ],
      d_short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur tempus scelerisque. In hac habitasse platea dictumst. Integer ornare varius nisi, eu aliquet nibh placerat a. Pellentesq",
      d_full: `
      ## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
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
`
    }]
  
  let e_h = "300px"
  let DescFull =  () => md().render(mockData[0].d_full)

  return (
  <div id="temp_page" style="">
    <div id="bg-wrapper">

      <div className={`fundo 
        ${state.opacity_class? opacity_class_css: ""}`}
        style={{backgroundImage: `url("${state.bg}")`}}
        ></div>

      <div id="img-galery">
        {mockData[0].photos.map((d:any, index:any) => 
          <div 
            className={`item `} 
            style={{height: e_h}}>
            <img 
              onClick$={(e) => {
                setTimeout(() => {
                  state.bg = d.src;
                }, 250)
                if(e.target){
                  let test:boolean = (e.target as any).parentElement.classList.contains(actived_class_css)
                  if(test != undefined) (e.target as any).parentElement.classList[`${test==false ? "add": "remove"}`](actived_class_css) 

                  if(!test) {
                    let imgGlr = document.querySelector("#img-galery")
                    if(imgGlr!=null)
                      imgGlr.scrollTop = 0
                  }
                }
              }}
            src={d.src} alt={d.alt} />
            <span>
              {d.alt}
            </span>
          </div>
        )}
      </div>

      <div id="content">
          <h1 
            window:onScroll$={(e) => {
              window.scrollY > 200?
              state.scrollback = true
              : state.scrollback = false
            }}
            class={`${state.scrollback? "back": "actived"}`}>{mockData[0].titulo}</h1>
          <h2>{mockData[0].d_short}</h2>
          <p dangerouslySetInnerHTML={DescFull()}>
          </p>
      </div>
    </div>
  </div>
  )
})
 
