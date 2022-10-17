import { component$, } from '@builder.io/qwik';
import md from 'markdown-it';
import { Desc } from '~/types';
import "./RDescs.css"

export interface RDescsProps {
    descs: Array<Desc>
}

export default component$((props: RDescsProps) => {
    if(!props.descs)
        return <></>
    return(
        <>
            {props.descs.map( (desc: Desc) => {
                return(
                    <section>
                        <title>
                            {desc.sessionTitle}
                        </title>
                        <p dangerouslySetInnerHTML={md().render(desc.text)}>
                        </p>
                    </section>
                )
            })}
        </>)
})