export default function getRandomId() {
    return Math.random().toString(36).substring(7);
}