import { SVGProps } from "../../utils/GlobalInterfaces";

export default function GIFSVG(props:SVGProps){
    return(
        <svg viewBox="0 0 24 24" aria-hidden="true" height={props.height} width={props.width}>
            <g>
                <path
                 fill={props.color ? props.color : "#000"} d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 
                 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0
                  .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7
                  v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 
                  9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 
                  0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z">
                </path>
            </g>
        </svg>
    )}