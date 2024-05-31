export interface Meta {
  current_page: number
  from: number
  last_page: number
}

export interface Links {
  first: string
  last: string
  next: string | null
  prev: string | null
}