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
  export type BlockType = 'code' | 'block-end'
  export type Object = {
    type: ObjectType
    content: OzmObject[] | string | ''
    args?: string[]
    toRemove?: true
  }
  export type Block = {
    type: BlockType
    content: OzmObject[] | string | ''
    args?: string[]
    toRemove?: true
  }
  export type OzmObject = Block | Object
}

export default IOzmo
