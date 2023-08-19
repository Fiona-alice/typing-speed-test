import { createGlobalStyle } from 'styled-components';


export const GlobalStyles = createGlobalStyle`

body{
    background: black;
    color: white;
}
.current{
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;
    #keyframes blinking{
        0% {border-left-color: white;}
        25% {border-left-color: black;}
        50% {border-left-color: white;}
        75% {border-left-color: black;}
        100% {border-left-color: white;}
    }
}
.current-right{
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;
    #keyframes blinking{
        0% {border-left-color: white;}
        25% {border-left-color: black;}
        50% {border-left-color: white;}
        75% {border-left-color: black;}
        100% {border-left-color: white;}
    }
}
.correct{
    color: green;
}
.incorrect{
    color: red;
}
.upper-menu{
  display: flex;
  width: 1000px;
  margin-left: auto;
  margi-right: auto;
  font-size: 1, 3.5rem;
  justify-content: space-between;
  padding: 0.5rem;
}
.modes{
    display: flex;
    gap: 0.4rem;
}
.time-mode:hover{
    color: green;
    cursor: pointer;

}
`