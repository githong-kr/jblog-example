type Params = {
  id: string
}

type Props = {
  params: Params
}

export default function Posts({ params }: Props) {
  return <h1>Post ID: {params.id}</h1>
}
