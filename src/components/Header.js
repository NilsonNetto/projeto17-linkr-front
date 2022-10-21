import styled from "styled-components";
import { FiChevronDown } from 'react-icons/fi';

export default function Header() {
    return (
        <Top>
            <Title>linkr</Title>
            <Logout>
                    <FiChevronDown 
                        size={25}
                    />
                <Img>
                </Img>
            </Logout>
        </Top>
    );
}

const Top = styled.div`
    height: 72px;
    width: 100%;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-family: 'Passion One', cursive;
    font-weight: 700;
    font-size: 49px;
    margin-left: 28px;
`;

const Logout = styled.div`
    display: flex;
    align-items: center;
    margin-right: 26px;
`;

const Img = styled.div`
    height: 53px;
    width: 53px;
    border-radius: 26.5px;
    background-color: aqua;
`;