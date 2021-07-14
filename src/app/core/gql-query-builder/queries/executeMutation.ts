export function executeMutation(wrapper: string): string {
    return `
        mutation executeMutation {
            ${wrapper}
        }
    `;
}
