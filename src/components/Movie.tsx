import {useState} from 'react'
import MovieModal from './MovieModal';
import styled from 'styled-components';

type MovieProps = {
    original_title: string,
    release_date: string,
    backdrop_path: string,
    image_path: string,
    overview: string,
    genres: string[],
    direction: string,
}

export default function Movie({
    original_title, 
    release_date, 
    image_path, 
    backdrop_path, 
    genres,
    overview,
    direction,
}: MovieProps) {

    const [showModal, setShowModal] = useState(false);
    

    const handleClick = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
            <MoviePoster style={{
                background: `url(${image_path}) no-repeat center center / cover`,
            }}
            onClick={handleClick}
            >
                <MovieDetails>
                    <h2 style={{marginBottom: '8px'}}>{original_title}</h2>
                    <p style={{color: '#fff'}}>{release_date.slice(0,4)}</p>
                    {genres?.map((genre, index) => (
                        <MovieGenre key={index}>{genre}</MovieGenre>
                    ))}
                </MovieDetails>
            </MoviePoster>
            {showModal && 
                <MovieModal 
                    title={original_title}
                    image={backdrop_path}
                    plot={overview}
                    direction={direction}
                    genres={genres}
                    handleClose={handleClose}
                    date={release_date.slice(0,4)}
                />
            }
        </>
    )
}

const MovieDetails = styled.div`
    position: absolute;
    bottom: 24px;
    z-index: 1;
    transition: all .3s ease-out;
`;

const MoviePoster = styled.div`
    height: 450px;
    cursor: pointer;
    position: relative;
    padding: 12px;
    border-radius: 8px;
    background-size: cover;
    transition: all .3s ease-out;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 400px;
        border-radius: 0 0 8px 8px;
        background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.9));
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 8px 4px rgb(237, 37, 25);

        &:after {
            height: 450px;
            background: linear-gradient(transparent 15%, rgba(0, 0, 0, .8) 40%, rgba(0, 0, 0, 1));
        }
    }

    &:hover ${MovieDetails} {
        color: red;
        transform: translateY(-10px);
    }
`

const MovieGenre = styled.span`
    font-size: 12px;
    color: #fff;

    &:not(:last-child):after {
        content: " / ";
        white-space: pre;
    }
`;