export const getPdfFilePageTitle = (fileName: string): string => {
    return fileName.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");
};
