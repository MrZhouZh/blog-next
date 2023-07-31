export default function Page({ params }: { params: { slug: string }}) {
  return <div>Shop: {params.slug}</div>
}
