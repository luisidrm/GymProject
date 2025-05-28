import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={144.67}
    viewBox="0 0 400 144.67"
    backgroundColor="#f3f3f3"
    foregroundColor="#5e5e5e"
    {...props}
  >
    <rect x="141" y="11" rx="3" ry="3" width="177" height="12" /> 
    <rect x="139" y="36" rx="3" ry="3" width="122" height="14" /> 
    <rect x="78" y="76" rx="3" ry="3" width="410" height="6" /> 
    <rect x="87" y="95" rx="3" ry="3" width="380" height="6" /> 
    <circle cx="92" cy="32" r="30" />
  </ContentLoader>
)

export default CardSkeleton

