import React from 'react'

function Iframe({width, height,src, title, frameBorder, allow, referrerPolicy }) {
    return (
        <div>
            <iframe 
                width={width ? width : "360"}
                height={height ? height : "634"}
                src={src ? src : "https://www.youtube.com/embed/1DCj8NpMGq8"}
                title={title ? title : "Sri Ranganathaswamy Temple: Among the Largest and Most Revered"}
                frameBorder={frameBorder ? frameBorder : "0"} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy={referrerPolicy ? referrerPolicy : "strict-origin-when-cross-origin"} 
                allowFullScreen
            />
        </div>
    )
}

export default Iframe