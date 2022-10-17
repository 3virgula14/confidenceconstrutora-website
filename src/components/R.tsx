import { component$, Slot } from "@builder.io/qwik"

export default component$( () => {
    return (
    <div id="wrapper">
        <Slot name="title"/>
        <Slot name="landing"/>
        <div id="content">
            <Slot name="content"/>
        </div>
    </div>)
});