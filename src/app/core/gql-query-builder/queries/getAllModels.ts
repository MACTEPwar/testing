export function getAllModels(): string {
    return `
        query getHeaders {
            headers {
                modelName
                fields {
                    property
                    title
                    typeName
                    kind
                    isHidden
                    isRequired
                    isFilterKey
                    isReadOnly
                    ofModel
                }
            }
        }
    `;
}
