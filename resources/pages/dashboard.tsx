type DashboardProps = {
  user: {
    email: string
    username: string
  }
  links?: {
    names: string[]
    urls: string[]
  }
  header_content?: {
    title: string
    description: string
  }
  images?: Array<string>
  style?: {
    body: string
    text: string
    bg_links: string
    border_radius: string
    header_color: string
  }
}

const dashboard = ({ user, header_content, style, links }: DashboardProps) => {
  return (
    <main>
      <section>
        <h1>{header_content?.title}</h1>
        <p>{header_content?.description}</p>
      </section>
    </main>
  )
}

export default dashboard
