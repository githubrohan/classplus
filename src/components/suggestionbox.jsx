import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

const Suggestion = styled.div`
  .s-box {
    margin: auto;
    padding: 1.5em;
    justify-content: center;
    max-width: 27em;
    max-height: 11em;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.2);
    border-radius: 0.5em;
  }
  .list {
    display: flex;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
  }
  .list {
    &:hover {
      background: #4e4e4e46;
      cursor: pointer;
    }
  }
  .list p {
    padding-left: 1em;
  }
`;

export default function SuggestionBox(props) {
  return (
    <Suggestion>
      <div className="s-box">
        {props.searchQuery.map((query) => (
          <div
            key={query}
            className="list"
            onClick={() => props.onQuerySelect(query)}
          >
            <div className="cross">
              <BiSearch />
            </div>
            <p>{query}</p>
          </div>
        ))}
      </div>
    </Suggestion>
  );
}
