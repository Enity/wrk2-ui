// @flow

export function relativeMouseOffset(
    offset,
    base
) {
    const bounds = base.getBoundingClientRect();
    return {
        left: offset.clientX - bounds.left,
        top: offset.clientY - bounds.top
    };
}

export function round(
    value,
    min,
    max,
    step
) {
    if (value <= min) {
        return min;
    }

    const roundedMax = Math.floor((max - min) / step) * step + min;
    if (value >= roundedMax) {
        return roundedMax;
    }

    const normalize = (value - min) / step;
    const decimal = Math.floor(normalize);
    const fraction = normalize - decimal;

    if (fraction === 0) return value;

    if (fraction < 0.5) {
        return step * decimal + min;
    } else {
        return step * (decimal + 1) + min;
    }
}
