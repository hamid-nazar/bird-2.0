import { SVGProps } from "../../utils/GlobalInterfaces";

export default function PeopleYouFollowSVG(props:SVGProps){
    return(
        <svg viewBox="0 0 24 24" aria-hidden="true" width={props.width} height={props.height}>
            <g>
                <path 
                fill={props.color ? props.color : "#000"} d="M10 4c-1.105 0-2 .9-2 2s.895 
                2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 
                4-4-1.79-4-4zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 
                11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627
                 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 
                 1.155-4.88 2.632-6.46zm19.75-7.22l-4.141 6.21L16.1 9.7l1.2-1.6 1.954 1.47 2.969-4.46 1.664 1.11z">
                </path>
            </g>
        </svg>
    )
}