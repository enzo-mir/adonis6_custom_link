import styled from 'styled-components'

const DashboardSection = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  transition: all 0.3s ease-out;
  background-color: ${(provider) => provider.theme.body};
  width: clamp(300px, 40svw, 500px);
  height: clamp(350px, 50svh, 500px);

  & article {
    position: relative;
    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: 100%;
    grid-template-rows: auto auto minmax(100px, 1fr) auto;
    background-color: ${(provider) => provider.theme.body};
    gap: 1em;
    width: clamp(300px, 40svw, 500px);
    height: clamp(350px, 50svh, 500px);
    padding: 2em 1em;
    overflow: hidden;
    transition: all 0.2s ease-out;

    & > *,
    * {
      transition: all 0.2s ease-out;
    }

    & > div:last-child {
      display: flex;
      gap: 1em;
      justify-self: end;

      & a {
        justify-self: end;
        opacity: 1;
        padding: 0.5em;
        border: none;
        border-radius: 5px;
        transition: filter 0.25s ease-out;
        color: white;
        background-color: #000;
        font-size: clamp(0.8em, 1.8vw, 1em);
        font-weight: bold;
        &:hover,
        &:focus-visible {
          cursor: pointer;
          filter: brightness(75%);
          opacity: 0.75;
        }
      }
    }
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
  ul {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    max-width: 500px;
    padding-block: 2em 0;
    height: 100%;
    overflow-y: auto;
    transition: all 0.25s ease-out;
  }
  li {
    list-style-type: none;
    width: 100%;
  }

  a {
    display: flex;
    background-color: ${(provider) => provider.theme.bg_links};
    color: ${(provider) => provider.theme.text};
    border-radius: ${(provider) => provider.theme.border_radius};
    text-decoration: none;
    width: 100%;
    padding: 0.5em;
    font-size: clamp(1em, 1.8vw, 1.2em);
  }

  & button {
    justify-self: end;
    opacity: 1;
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    transition: filter 0.25s ease-out;
    color: white;
    background-color: #000;
    font-size: clamp(0.8em, 1.8vw, 1em);
    font-weight: bold;
    &:hover,
    &:focus-visible {
      cursor: pointer;
      filter: brightness(75%);
      opacity: 0.75;
    }
  }

  &.preview {
    width: 100%;
    height: 100svh;

    & > article {
      overflow: visible;
      background-color: transparent;
      grid-template-rows: auto auto minmax(50px, 50svh) auto;
      height: clamp(350px, 75svh, 100svh);
    }

    & ul {
      padding-inline: 1em;
      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${(provider) => provider.theme.bg_links};
        border-radius: 25px;
      }
    }
  }
`

const DashboardMain = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
`

export { DashboardSection, DashboardMain }
