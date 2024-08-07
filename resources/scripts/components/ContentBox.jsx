import React, { useContext } from "react"
import { FlashProvider } from "../contexts/FlashContext.jsx"
import { WebsiteContext } from "../contexts/WebsiteContext.jsx";

const ContentBox = (props) => {
    const { website } = useContext(WebsiteContext);
    const { title, children } = props

    const ConfigTitle = !website ? "Core" : website.title
    document.title = `${ConfigTitle} - ${title || "Desconhecido"}`

    return (
        <div className="relative overflow-hidden">
            <FlashProvider>
                {children}
            </FlashProvider>
        </div>
    )
}

export default ContentBox
