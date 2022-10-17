import { component$, } from '@builder.io/qwik';

interface RTitleProps {
      titulo: string
}
export default component$((props: RTitleProps) => {
      return(
            <h1 
                  id="project_title"
            >{props.titulo}</h1>
      )});