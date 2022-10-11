import { component$ } from '@builder.io/qwik';
import ';/styles.css';

export default component$(() => {
    return(
        <div className="wrapper">
            <img src="favicon.png" alt="" />
            <div className="b_nav">
                <span className="indexing">1/5</span>
                <div className="bottons">
                    <span>p</span><span>n</span>
                </div>
            </div>
            
        </div>
    );
});