import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons";
import ShowItem from "./ShowItem";
import styled from "styled-components";

const ListContainer = styled.div` 
    largeur : 100 % ; 
    marge supérieure : 10 px ; 
` 

const Wrapper = styled.div` 
    position : relative ; 
    .sliderArrow { 
        largeur : 50 px ; 
        hauteur : 100 % ; 
        couleur d'arrière-plan : RVB (22, 22, 22, 0,5) ; 
        Couleur blanche; 
        position : absolue ; 
        indice z : 99 ; 
        haut : 0 ; 
        bas : 0 ; 
        marge : auto ; 
        curseur : pointeur ;
&.gauche { 
            gauche : 0; 
        }
&.droit { 
            droite : 0 ; 
        } 
    } 
`

const ShowContainer = styled.div` 
    margin-left : 50px ; 
    affichage : flexible ; 
    marge supérieure : 10 px ; 
    largeur : contenu maximum ; 
    transformer : traduireX(0px); 
    transition : tous les 1 sont faciles ; 
`

const ShowList = () => {
    return (
        <ListContainer>
            <Wrapper>
                <ArrowBackIosOutlined className="sliderArrow left"/>
                <ShowContainer>
                    <ShowItem index={ 0 } />
                    <ShowItem index={ 1 } />
                    <ShowItem index={ 2 } />
                    <ShowItem index={ 3 } />
                    <ShowItem index={ 4 } />
                    <ShowItem index={ 5 } />
                    <ShowItem index={ 6 } />
                    <ShowItem index={ 7 } />
                    <ShowItem index={ 8 } />
                    <ShowItem index={ 9 } />
                </ShowContainer>
                <ArrowForwardIosOutlined className="sliderArrow right"/>
            </Wrapper>
        </ListContainer>
    )}

    export default ShowList