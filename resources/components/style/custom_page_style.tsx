import styled from 'styled-components'

export const MainCustomPage = styled.main`
  display: grid;
  place-items: center;
  height: 100%;
  background-color: ${(provider) => provider.theme.body};
  li {
    list-style-type: none;
    width: 100%;

    text-align: left;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    max-width: 500px;
    padding-inline: 1em;
    max-height: 100%;
    overflow-y: auto;
    transition: all 0.25s ease-out;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(provider) => provider.theme.bg_links};
      border-radius: 25px;
    }
  }
  a {
    display: flex;
    background-color: ${(provider) => provider.theme.bg_links};
    color: ${(provider) => provider.theme.text};
    border-radius: ${(provider) => provider.theme.border_radius};
    text-decoration: none;
    width: 100%;
    height: 100%;
    padding: 0.5em;
    font-size: clamp(0.8em, 1.8vw, 1.2em);
  }
  h1,
  h2 {
    color: ${(provider) => provider.theme.header_color};
    text-align: center;
    overflow-wrap: anywhere;
  }
  h1 {
    font-size: clamp(1.5em, 2.5vw, 2.5em);
  }
  h2 {
    font-weight: 400;
    font-size: clamp(1.25em, 2vw, 2em);
  }
  & article {
    position: relative;
    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: 100%;
    grid-template-rows: auto auto minmax(50px, 50svh);
    gap: 1em;
    width: clamp(300px, 40svw, 500px);
    min-height: 300px;
    height: max-content;
    padding: 1em;
    overflow: hidden;
  }
`
