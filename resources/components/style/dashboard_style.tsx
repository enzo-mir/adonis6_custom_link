import styled from 'styled-components'

const DashboardSection = styled.section`
  position: relative;
  display: grid;
  place-items: center;
  transition: all 0.3s ease-out;
  background-color: ${(provider) => provider.theme.body};
  box-shadow: 0 20px 20px 0px rgba(0, 0, 0, 0.3);
  width: clamp(300px, 40svw, 500px);
  height: 40svh;
  min-height: 300px;

  & article {
    position: relative;
    display: grid;
    justify-items: center;
    align-items: start;
    grid-template-columns: 100%;
    grid-template-rows: auto auto minmax(50px, 1fr) auto;
    gap: 1em;
    width: clamp(300px, 40svw, 500px);
    min-height: 300px;
    height: max-content;
    max-height: 40svh;
    padding: 1em;
    overflow: hidden;
    & > div:last-child {
      display: flex;
      gap: 1em;
      justify-self: end;
    }
  }
  h1,
  h2 {
    color: ${(provider) => provider.theme.header_color};
    text-align: center;
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
    max-height: 100%;
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
    background-color: ${(provider) => provider.theme.body};
    justify-self: end;
    opacity: 0.75;
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    transition: filter 0.25s ease-out;
    backdrop-filter: blur(10px);
    color: white;
    background-color: #333;
    font-size: clamp(0.8em, 1.8vw, 1em);
    font-weight: bold;
    &:hover,
    &:focus-visible {
      cursor: pointer;
      filter: brightness(75%);
      opacity: 1;
    }
  }

  &.preview {
    width: 100%;
    height: 100svh;

    & > article {
      max-height: fit-content;
      overflow: visible;
    }

    & ul {
      max-height: 60svh;
    }
  }
`

const DashboardMain = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
`

export { DashboardSection, DashboardMain }
