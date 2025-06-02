// Combine the pageContent of all docs into a single string
export function combineDocuments(docs){
    return docs.map((doc)=>doc.pageContent).join('\n\n')
}