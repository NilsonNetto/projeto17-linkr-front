import styled from "styled-components";
import { ReactModal } from 'react-modal';

export default function DeletePost() {
    const test = true
    function sendChoice() {
        alert("escolheu sabiamente")
    }

    return (
        <>
            <ReactModal isOpen={test} onAfterClose={sendChoice}> 
                OIIII
            </ReactModal>
        </>
    )
}