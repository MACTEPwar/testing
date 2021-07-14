export function getItemsQuery(nameModel: string, modelField: string, filter: string): string{
    // ! TODO: убрать toLowerCase когда бек доедлает
    return `
        query getItems {
            ${nameModel[0].toLowerCase() + nameModel.slice(1)} {
                all ${filter} {
                    items
                        ${modelField}
                }
            }
        }
    `;
}
