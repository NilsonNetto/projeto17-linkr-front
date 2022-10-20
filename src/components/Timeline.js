import { useState } from "react";
import styled from "styled-components";
import { postPost } from './../services/linkr';

export default function Timeline() {
    const [form, setForm] = useState({ description: '', link: '' });
    const [loading, setLoading] = useState(false);

    function post(event) {
        event.preventDefault();
        setLoading(true);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjI4NTI3NCwiZXhwIjoxNjY4ODc3Mjc0fQ.XKUQZ1CZOy-FU8-ZIvv3Mz0NDgDFv5jeWjYYL6C6S3g';

        postPost({
            "description": form.description,
            "link": form.link
        }, token)
            .then(resposta => {
                console.log(resposta);
                setLoading(false);
                setForm({ description: '', link: '' });
            })
            .catch(resposta => {
                console.log(resposta);
                alert('Houve um erro ao publicar seu link');
                setLoading(false);
                setForm({ description: '', link: '' });
            })
    }

    return (
        <Container>
            <Title>timeline</Title>
            <Publish>
                <ImgDiv>
                    <Img></Img>
                </ImgDiv>

                <FormDiv>
                    <PublishTitle>What are you going to share today?</PublishTitle>
                    <Form onSubmit={post}>
                        <InputLink
                            type='url'
                            name='link'
                            value={form.link}
                            placeholder='https://...'
                            required
                            disabled={loading}
                            onChange={e => setForm({...form, link: e.target.value})}
                        />
                        <InputDescription
                            type='text'
                            name='description'
                            value={form.description}
                            placeholder='Awesome article about #Javascript'
                            disabled={loading}
                            onChange={e => setForm({...form, description: e.target.value})}
                        />
                        <button type="submit">
                            { loading ? 
                                <>Publishing...</>
                                :
                                <>Publish</>
                            }
                        </button>
                    </Form>
                </FormDiv>

            </Publish>
        </Container>
    );
}

const Container = styled.div`
    width: 611px;
    margin: 78px auto 0px auto;   
`;

const Title = styled.h1`
    font-size: 43px;
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
`;

const Publish = styled.div`
    height: 209px;
    width: 611px;
    background-color: #FFFFFF;
    border-radius: 16px;
    margin-top: 43px;
    display: flex;
`;

const ImgDiv = styled.div`
    margin-right: 21px;
`;

const Img = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 26.5px;
    background-color: antiquewhite;
    margin-top: 16px;
    margin-left: 18px;
`;

const FormDiv = styled.div``;

const PublishTitle = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    color: #707070;
    margin-top: 21px;
    margin-bottom: 10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 22px;

    input {
        width: 503px;
        background-color: #EFEFEF;
        border-radius: 5px;
        border: #EFEFEF;
    }

    button {
        height: 31px;
        width: 112px;
        border-radius: 5px;
        background-color: #1877F2;
        border: #1877F2;
        margin-top: 5px;
        color: #FFFFFF;
        font-size: 14px;
        font-family: 'Lato', sans-serif;
    }
`;

const InputLink = styled.input`
    height: 30px;

    ::placeholder {
        color: #949494;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        padding-left: 13px;
    }
`;

const InputDescription = styled.input`
    height: 66px;
    margin-top: 5px;

    ::placeholder {
        color: #949494;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        padding-left: 13px;
        display: flex;
        justify-content: center;
    }
`;