import styled from 'styled-components'


interface FeedPostCreatorProgressProps {
    percent: number
}

export const FeedPostCreatorProgress = styled.div<FeedPostCreatorProgressProps>`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: ${({percent}) => `radial-gradient(closest-side, white 80%, transparent 80% 100%), conic-gradient(#1DA1F2 ${percent}%, #E1E8ED 0)`};
    `
