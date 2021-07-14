export function executeFunction(
    wrapper: string
): string {
    return `
        query executeFunction {
            ${wrapper}
        }
    `;
}
