import styled from "styled-components";

export default function Header() {
    return (
        <Top>
            <Title>linkr</Title>
            <Logout>
                <ion-icon name="chevron-down-outline"></ion-icon>
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

    ion-icon[name='chevron-down-outline'] {
       height: 20px;
       width: 30px;
    }
`;

const Img = styled.div`
    height: 53px;
    width: 53px;
    border-radius: 26.5px;
    background-color: aqua;
`;