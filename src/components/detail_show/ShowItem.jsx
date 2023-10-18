import styled from "styled-components";

const ItemContainer = styled.div `
    width : 225px;
    height : 120px;
    background-color : #0b0b0b;
    margin-right : 5px;
    overflow : hidden;
    cursor : pointer;
    color : white;
`

const MainImage = styled.Image`
    width : 100%;
    height : 100%;
    objectif-fit : cover;
`

const ShowItem = ({ index }) => {
    return (
        <ItemContainer >
            <MainImage />
        </ItemContainer>
    )
}
export default ShowItem