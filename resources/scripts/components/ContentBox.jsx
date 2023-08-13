import React from "react"
import { FlashProvider } from "../contexts/FlashContext.jsx"

const ContentBox = (props) => {
    const { title, children } = props

    document.title = title || "Desconhecido"

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow max-w-screen-lg p-4 bg-white shadow-md overflow-auto">
                <FlashProvider>
                    {children}
                </FlashProvider>
            </div>
        </div>
    )
}

export default ContentBox
