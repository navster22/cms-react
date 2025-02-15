import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export default function ContentProvider({children}) {
    const [data, setData] = useState([]);

    const addContent = (content) => {
        setData((prev) => [...prev, {...content, comments: []}])
    }


    const editContent = (updatedContent) => {
        setData((prev) => prev.map((item) => 
            item.id === updatedContent.id ? {...updatedContent, comments: item.comments} : item
        ))
    }


    const deleteContent = (id) => {
        setData((prev) => prev.filter((item) => item.id !== id))
    }

    const addComment = (contentId, comment) => {
        setData((prev) => prev.map(
            (item) => item.id === contentId ? item.comments.push(comment) : item))
    }

    return (
        <ContentContext.Provider value={{data, addContent, editContent, deleteContent, addComment}}>
            {children}
        </ContentContext.Provider>
    )
}

export const useContent = () => useContext(ContentContext);

