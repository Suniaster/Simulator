


interface Vector{
  x:number,
  y:number,
  z?:number
}

interface socketEvent{
  name: string,
  callback: (data)=>{}
}

interface ObjectInfoMessage{
  position:{
    x:number,
    y:number
  },
  vel:{
    x:number,
    y: number
  },
  accel:{
    x:number,
    y: number
  }
  symbol:string,
  width: number,
  height: number,
  id: string
}