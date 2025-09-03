// Type augmentation for framer-motion to fix CSSStyleDeclarationWithTransform interface
declare module 'framer-motion' {
  // Fix the problematic interface by properly extending CSSStyleDeclaration
  // and excluding conflicting properties before redefining them
  interface CSSStyleDeclarationWithTransform 
    extends Omit<CSSStyleDeclaration, "direction" | "transition" | "x" | "y" | "z"> {
    // Transform properties that can accept both number and string values
    x?: number | string;
    y?: number | string;
    z?: number | string;
    
    // Additional transform properties commonly used with framer-motion
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
    rotate?: number | string;
    scaleX?: number | string;
    scaleY?: number | string;
    scaleZ?: number | string;
    scale?: number | string;
    skewX?: number | string;
    skewY?: number | string;
    skew?: number | string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    
    // Override direction and transition to allow more flexible types
    direction?: string;
    transition?: string;
  }
}
