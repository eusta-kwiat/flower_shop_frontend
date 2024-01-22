import styled from "styled-components";

export const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100px;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
`

export const Thumbnail = styled.img`
    max-width: 90%;
    max-height: 90%;
    margin: 5px;
    aspect-ratio: 1/1;
    border-radius: 50%;
`

export const mg = {margin: '5px'};

export const ProductTitle = styled.p`
    width: 200px;
`