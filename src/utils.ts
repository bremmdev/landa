export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};