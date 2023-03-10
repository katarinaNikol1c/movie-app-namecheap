import Movie from "./Movie";
import styled from 'styled-components'
import Image from "next/image";

const MovieHolder = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(250px, 300px), 1fr));
    gap: 36px 24px;
    width: 100%;
`;
const NoMovies = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    margin: auto;
`

const Movies = ({moviesList}) => {
    
  
  return (
     moviesList.length ? (
        <MovieHolder>
            {moviesList?.map(movie =>  (
                <Movie key={movie.id} {...movie} />
           ))
            }
        </MovieHolder>
        ) : (
            <NoMovies>
                <Image
                src="/Subject.png"
                alt="Vercel Logo"
                width={371}
                height={250}
                priority
              />
                <h1 style={{marginTop: '24px'}}>Sorry, no movies were found..</h1>

            </NoMovies>
        )
  );
};

export default Movies;