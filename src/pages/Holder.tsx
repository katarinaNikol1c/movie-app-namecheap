import { useEffect, useState } from "react";

import SearchInput from "./SearchInput";
import Movies from "./Movies";
import styled from 'styled-components'

const Title = styled.h3`
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 24px;
    letter-spacing: 1.3;
`;

const Holder = ( ) => {
    const [movies, setMovies] = useState([]);

    useEffect( () => {
        fetch('./api/v1/movies/list')
        .then((res) => res.json())
        .then((data) => {
            setMovies(data)
        })
      }, []);

      return (
        <>
            <Title>Movie App</Title>
            <SearchInput setMovies={setMovies} />
            <Movies moviesList={movies} />
        </>
      )

}

export default Holder;