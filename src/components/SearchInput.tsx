import styled from 'styled-components';
import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



type SearchProps = {
    setMovies: Function,
}

const SearchInput = ({setMovies}: SearchProps) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        if(!event.target.value) {
            fetch('./api/v1/movies/list')
            .then((res) => res.json())
            .then((data) => {
            setMovies(data)
        })
        }
    }

    const handleSearch = () => {
        if (query) {
            fetch(`./api/v1/movies/search?name=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
            })
        }
        
    }

    return (
        <SearchBox role='search-box'>
            
            <div style={{
                background: '#3b3b3b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    height: '100%',
                    borderRight: '1px solid rgba(0,0,0,.3)',
                    padding: '9px 10px',
                    boxShadow: '-3px 0 11px 7px rgba(0,0,0,0.7)',
                    zIndex: '2'
                }}>
                    <FontAwesomeIcon style={{width: '20px'}} icon={faMagnifyingGlass} />
                </div>
                <Input role='search-input' placeholder='Movie title..' onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : null} type="search" autoFocus value={query}  onChange={handleChange} />
                
            </div>
            <SearchButton data-testid='search-button' disabled={query ? false : true} onClick={handleSearch}>
                
                <Front>Search</Front>
            </SearchButton>
        </SearchBox>
        
    )
}

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 48px;
    text-align: center;
    gap: 24px;
`;

const Input = styled.input`
    padding: 8px 12px;
    font-size: 20px;
    border: none;
    color: #ddd;
    width: 240px;
    border-radius: 0 8px 8px 0;
    background: #3b3b3b;
`;

const Front = styled.span`
    display: block;
    position: relative;
    padding: 10px 16px;
    border-radius: 12px;
    font-size: 18px;
    color: #fff;
    background: #f0003c;
    transition:
        transform 600ms cubic-bezier(.3, .7, .4, 1)
`;

const SearchButton = styled.button`
    position: relative;
    border: none;
    font-size: 16px;
    font-weight: 900;
    color: #fff;
    cursor: pointer;
    border-radius: 12px;
    text-transform: uppercase;
    outline-offset: 4px;
    background: transparent;
    transition: filter 250ms;

    &:hover {
        filter: brightness(110%);
    }

    &:hover ${Front} {
        transform: translateY(-6px);
        transition:
            transform
            250ms
            cubic-bezier(.3, .7, .4, 1.5);
    }

    &:active ${Front} {
        transform: translateY(-2px);
        transition: transform 34ms;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }
`;


export default SearchInput;