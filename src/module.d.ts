declare namespace IOzmo {
  export type ObjectType =
    | 'text'
    | 'image'
    | 'video'
    | 'slide'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'empty'
  export interface Object {
    type: IOzmo.ObjectType
    content: IOzmo.Object[] | string | ''
  }
}

export default IOzmo
