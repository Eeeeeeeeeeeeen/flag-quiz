export default function useTextUtils() {
    let sanitiseText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("saint", "st")
    }

    return [sanitiseText]
}