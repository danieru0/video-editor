export default function getSizesWithoutPadding(element: HTMLElement) {
    const computedStyles = getComputedStyle(element);

    let width = element.clientWidth;
    let height = element.clientHeight;

    height -= parseFloat(computedStyles.paddingTop) + parseFloat(computedStyles.paddingBottom);
    width -= parseFloat(computedStyles.paddingLeft) + parseFloat(computedStyles.paddingRight);

    return [width, height];
}