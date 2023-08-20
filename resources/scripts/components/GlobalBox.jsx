import React, { useContext } from "react"
import { WebsiteContext } from "../contexts/WebsiteContext.jsx";

const GlobalBox = (props) => {
    const { website } = useContext(WebsiteContext);
    const { title, children } = props

    const ConfigTitle = !website ? "Core" : website.title
    document.title = `${ConfigTitle} - ${title || "Desconhecido"}`

    return (
        <div className="relative overflow-hidden">
            {children}
        </div>
    )
}

export default GlobalBox
