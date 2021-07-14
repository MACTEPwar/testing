export function getCountQuery(nameModel: string, filter?: string): string{
    // ! TODO: убрать toLowerCase когда бек доедлает
    return `
        query getCount {
            ${nameModel[0].toLowerCase() + nameModel.slice(1)} {
                all ${filter} {
                    totalCount
                }
            }
        }
    `;
}
