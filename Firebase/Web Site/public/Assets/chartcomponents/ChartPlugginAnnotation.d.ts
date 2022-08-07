interface ChartPlugginAnnotation {
    /** optional annotation ID (must be unique) */
    id?: string | number,
    type?: "line" |"box",
    mode?: "horizontal" | "vertical",
    scaleID?: string,
    value?: number | string | Date,
    borderColor?: string,
    borderWidth?: number,
    label?: ChartPlugginAnnotationLabel,
    /** Optional value at which the line draw should end */
    endValue?: number,
    borderDash?: number[],
    drawTime?: "afterDraw" | "afterDatasetsDraw" | "beforeDatasetsDraw";
    onClick?: any;
}

interface ChartPlugginAnnotationLabel {
    /** Background color of label, default below */
    backgroundColor?: string,

    /**  Font family of text, inherits from global */
    fontFamily?: string,

    /**  Font size of text, inherits from global */
    fontSize?: number,

    /**  Font style of text, default below */
    fontStyle?: string,

    /**  Font color of text, default below */
    fontColor?: string,

    /**  Padding of label to add left/right, default below */
    xPadding?: number,

    /**  Padding of label to add top/bottom, default below */
    yPadding?: number,

    /**  Radius of label rectangle, default below */
    cornerRadius?: number,

    /**  Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below. */
    position?: "top" | "bottom" | "left" | "right" | "center" | "below" ,

    /** Adjustment along x-axis (left-right) of label relative to above number (can be negative)
     For horizontal lines positioned left or right, negative values move
     the label toward the edge, and positive values toward the center.
    */
    xAdjust?: number,

    /** Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
     For vertical lines positioned top or bottom, negative values move
     the label toward the edge, and positive values toward the center.
    */
    yAdjust?: number,

    /** Whether the label is enabled and should be displayed */
    enabled?: boolean,

    /** Text to display in label - default is null */
    content?: string
}