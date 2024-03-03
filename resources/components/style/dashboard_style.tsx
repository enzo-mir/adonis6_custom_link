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

  & article {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: clamp(300px, 40svw, 500px);
    height: 100%;
    max-height: 40svh;
    padding: 1em;
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
    gap: 0.5em;
    width: 100%;
    max-width: 500px;
    padding-block: 2em;
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
    font-size: clamp(0.8em, 1.8vw, 1.2em);
  }

  & button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: ${(provider) => provider.theme.body};
    opacity: 0.75;
    padding: 0.5em;
    border: none;
    border-radius: 5px;
    transition: filter 0.25s ease-out;
    backdrop-filter: blur(10px);
    color: red;
    background-color: #fff;
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
  }
`

const DashboardMain = styled.main`
  height: 100%;
  display: grid;
  place-items: center;
`

export { DashboardSection, DashboardMain }
