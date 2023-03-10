import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


type ModalProps = {
    title: string,
    image: string,
    plot: string,
    direction: string,
    genres: string[],
    date: string,
    handleClose: any,
}

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 600px;
    background-color: #000;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 0 18px 6px rgb(237 37 25 / 80%);
    @media (max-width: 700px) {
        max-width: 90%;
    }

`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
`;

const MovieTitle = styled.h2`
    font-size: 24px;
    font-weight: 900;
    text-transform: uppercase;
    color: #fff;

`;

const ModalCover = styled.div`
    width: 100%;
    height: 300px;
    margin-bottom: 24px;
    border-radius: 7px 7px 0 0;
    background-repeat: no-repeat;
    background-size: cover;
`;

const ModalDetails = styled.div`
    padding: 24px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MovieYearAndDirector = styled.p`
    font-size: 14px;
    color: #7d7d7d;
    margin-top: 0px;
`;

const MoviePlot = styled.p`
    font-size: 16px;
    line-height: 1.5;
    color: #7d7d7d;
`;

const MovieGenres = styled.div`
    display: flex;
    font-size: 14px;
    color: #7d7d7d;
    white-space: pre;
    margin: 10px 0 18px 0;
`;

const Genre = styled.span`
    color: #fff;

    &:not(:last-child):after {
        content: ' / ';
        
    }
`;



const MovieModal = ({title, image, plot, direction, genres, date, handleClose} :ModalProps) => {
    const handleOverlayClose = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    }

    return (
        <ModalBackground onClick={handleOverlayClose}>
            <ModalContent>
                <CloseButton onClick={handleClose}>
                    <FontAwesomeIcon width={22} height={22} icon={faXmark} />
                </CloseButton>
                <ModalCover style={{
                    backgroundImage: `linear-gradient(transparent 65%, rgb(0, 0, 0)),
                     url(${image})`
                }}></ModalCover>
                <ModalDetails>
                    <MovieTitle>{title}</MovieTitle>
                    <MovieYearAndDirector>{date} | {direction}</MovieYearAndDirector>
                    <MovieGenres>
                        <p>Genres: </p>
                        {
                            genres?.map((genre, index) => (
                                <Genre key={index}>{genre}</Genre>
                            ))
                        }
                    </MovieGenres>
                    
                    <MoviePlot>
                        {plot}
                    </MoviePlot>
                </ModalDetails>

            </ModalContent>
        </ModalBackground>
    )
}

export default MovieModal;